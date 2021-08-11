import React, {Fragment, useEffect, useRef, useState} from 'react'
import GET_PRODUCTS from "../../gql/queries/get-products";
import {useQuery} from "@apollo/client";
import {initializeApollo} from "../../components/Apollo";
import {useRouter} from "next/router";
import ProductHeader from "../../components/productHeader/ProductHeader";
import ShopBody from "../../components/shopBody/ShopBody";
import {getTaxonomyFilter, orderBy} from "../../functions";


export default function Shop() {
    const router = useRouter()
    const {q, orderby, category, publisher, writer, translator} = router.query
    const [offset, setOffset] = useState(15);
    const [size, setSize] = useState(15);
    const [loadingFetchMore, setLoadingFetchMore] = useState(false);
    const [sort, setSort] = useState(orderby);
    const [search, setSearch] = useState(q);
    const [categoryState, setCategoryState] = useState(category);
    const [publisherState, setPublisherState] = useState(publisher);
    const [writerState, setWriterState] = useState(writer);
    const [translatorState, setTranslatorState] = useState(translator);

    let products = []
    const taxonomyFilter = getTaxonomyFilter(categoryState, publisherState, writerState, translatorState)

    const {loading: loadingProducts, error, data, fetchMore, refetch} = useQuery(GET_PRODUCTS, {
        variables: {
            offset: 0,
            size: size,
            orderby: sort ? orderBy(sort) : orderBy(1),
            search: search ? search : '',
            taxonomyFilter
        },
    })

    if (error) {
        return (<div>Errors: {error}</div>)
    }

    products = data?.products?.edges ? data?.products?.edges : []
    const pageInfo = data?.products?.pageInfo ? data?.products?.pageInfo : {}

    // OnFetch
    const onFetchMore = () => {
        setLoadingFetchMore(true)
        fetchMore({
            variables: {
                offset,
                size,
                orderby: sort ? orderBy(sort) : orderBy(1),
                search: search ? search : '',
                taxonomyFilter
            },
            updateQuery: (previousResult, {fetchMoreResult}) => {
                setLoadingFetchMore(false)
                if (!fetchMoreResult) return previousResult;
                return Object.assign({}, previousResult, {
                    products: {
                        ...fetchMoreResult.products,
                        edges: [...previousResult.products.edges, ...fetchMoreResult.products.edges],
                    }
                })
            }
        })
        setOffset(offset + size)
    }

    // Refetch when change sortby and search query
    const didMount = useRef(false);
    useEffect(() => {
        if (didMount.current) {
            router.push({
                pathname: '/shop',
                query: {
                    ...router.query,
                    q: search,
                    orderby: sort
                }
            }, undefined, {
                shallow: true,
            })
            refetch()
        } else didMount.current = true;
    }, [search, sort])

    console.log(pageInfo)
    return (
        <div className="search-wrap">
            <ProductHeader/>
            <ShopBody
                products={products}
                page_info={pageInfo}
                loading={loadingProducts}
                loadingfetchmore={loadingFetchMore}
                onFetchMore={onFetchMore}
                setSort={setSort}
                sort={sort}
            />
        </div>
    )
}

Shop.getInitialProps = async (ctx) => {
    const {q, orderby, category, publisher, writer, translator} = ctx.query
    const apolloClient = initializeApollo(null, ctx)
    const taxonomyFilter = getTaxonomyFilter(category, publisher, writer, translator)

    if (typeof window === 'undefined') {
        await apolloClient.query({
            query: GET_PRODUCTS,
            variables: {
                offset: 0,
                size: 15,
                orderby: orderby ? orderBy(orderby) : orderBy(1),
                search: q ? q : '',
                taxonomyFilter
            }
        })
    }

    return {
        initialApolloState: apolloClient.cache.extract()
    }
}