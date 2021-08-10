import React, {Fragment, useEffect, useRef, useState} from 'react'
import GET_PRODUCTS from "../../gql/queries/get-products";
import {useQuery} from "@apollo/client";
import {initializeApollo} from "../../components/Apollo";
import {useRouter} from "next/router";
import ProductHeader from "../../components/productHeader/ProductHeader";
import ShopBody from "../../components/shopBody/ShopBody";
import {orderBy} from "../../functions";


export default function Shop() {
    const router = useRouter()
    const {q, orderby} = router.query
    const [offset, setOffset] = useState(15);
    const [size, setSize] = useState(15);
    const [loadingFetchMore, setLoadingFetchMore] = useState(false);
    const [sort, setSort] = useState(orderby);
    const [search, setSearch] = useState(q);

    let products = []

    const {loading: loadingProducts, error, data, fetchMore, refetch} = useQuery(GET_PRODUCTS, {
        variables: {
            offset: 0,
            size: size,
            orderby: sort ? orderBy(sort) : orderBy(1),
            search: search ? search : ''
        },
    })

    if (error) {
        return (<div>Errors: {error}</div>)
    }

    products = data?.products?.edges ? data?.products?.edges : []

    // OnFetch
    const onFetchMore = () => {
        setLoadingFetchMore(true)
        fetchMore({
            variables: {
                offset,
                size,
                orderby: sort ? orderBy(sort) : orderBy(1),
                search: search ? search : ''
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

    useEffect(() => {
        console.log(products)
    })

    return (
        <>
            <div className="search-wrap">
                <ProductHeader/>
                <ShopBody
                    products={products}
                    loading={loadingProducts}
                    loadingfetchmore={loadingFetchMore}
                    onFetchMore={onFetchMore}
                    setSort={setSort}
                    sort={sort}
                />
            </div>
        </>
    )
}

Shop.getInitialProps = async (ctx) => {
    const {q, orderby} = ctx.query
    const apolloClient = initializeApollo(null, ctx)

    if (typeof window === 'undefined') {
        await apolloClient.query({
            query: GET_PRODUCTS,
            variables: {
                offset: 0,
                size: 15,
                orderby: orderby ? orderBy(orderby) : orderBy(1),
                search: q ? q : ''
            }
        })
    }

    return {
        initialApolloState: apolloClient.cache.extract()
    }
}

/*
export async function getStaticProps(context) {

    const res = await apolloClient.query({
        query: GET_PRODUCTS,
        variables: {
            size: 10
        }
    })

    const {products} = await res.data

    return {
        props: {
            products,
            initialApolloState: apolloClient.cache.extract()
        },
        revalidate: 200
    }
}*/
