import React, {Fragment, useEffect, useRef, useState} from 'react'
import GET_PRODUCTS from "../../gql/queries/get-products";
import {useQuery} from "@apollo/client";
import {initializeApollo} from "../../components/Apollo";
import {useRouter} from "next/router";
import ProductHeader from "../../components/productHeader/ProductHeader";
import ShopBody from "../../components/shopBody/ShopBody";
import {alertMessage, getTaxonomyFilter, orderBy} from "../../functions";
import useQueryShopPage from "../../hooks/useQueryShopPage";
import GET_PUBLISHER_WRITER_TRANSLATOR_FOR_SEARCH from "../../gql/queries/get-publisher-writer-translator-for-search";
import GET_CATS from "../../gql/queries/get-categories";
import ProductSidebar from "../../components/productSidebar/ProductSidebar";
import {useDispatch, useSelector} from "react-redux";
import {cartConstants, viewerConstants} from "../../redux/actions/constants";


export default function Shop() {
    const router = useRouter()
    const dispatch = useDispatch()
    const {q, t, orderby, category} = router.query
    const [sort, setSort] = useState(orderby ? orderby : 1);
    const {message: messageCart} = useSelector(state => state.cart)
    const {message: messageFavorite} = useSelector(state => state.viewer.favorite)

    useEffect(() => {
        if (messageFavorite) {
            alertMessage(messageFavorite, 'success')
            dispatch({
                type: viewerConstants.CLEAR_FAVORITE_MESSAGE
            })
        }
        if (messageCart) {
            alertMessage(messageCart, 'success')
            dispatch({
                type: cartConstants.CLEAR_MESSAGE
            })
        }
    }, [messageFavorite, messageCart])

    const {
        loading: loadingP,
        error: errorP,
        data,
        onFetchMore,
        loadingFetchMore
    } = useQueryShopPage( router, sort, category, q, t)

    // Fetch Categories
    const {loading: loadingCats, error: errorCats, data: dataCats} = useQuery(GET_CATS, {
        variables: {
            first: 200,
        },
    })

    if (errorP) {
        return (<div>Errors: {errorP}</div>)
    }

    return (
        <div className="search-wrap">
            <ProductHeader fixed={true}/>
            <div className="search__body">
                <ShopBody
                    products={data?.products?.edges ? data?.products?.edges : []}
                    page_info={data?.products?.pageInfo ? data?.products?.pageInfo : {}}
                    page_info2={data?.products?.pageInfo2 ? data?.products?.pageInfo2 : {}}
                    loading={loadingP}
                    loadingfetchmore={loadingFetchMore}
                    onFetchMore={onFetchMore}
                    setSort={setSort}
                    sort={sort}
                />
                <div className="search__body__side">
                    <ProductSidebar cats={dataCats} loading={loadingCats} cat={category}/>
                </div>
            </div>
        </div>
    )
}

Shop.getInitialProps = async (ctx) => {
    const apolloClient = initializeApollo(null, ctx)

    if (typeof window !== "undefined") {
        return {
            initialApolloState: apolloClient.cache.extract()
        }
    }

    const {q, t, orderby, category, publisher, writer, translator} = ctx.query
    const taxonomyFilter = getTaxonomyFilter(category, publisher, writer, translator)

    // const tArray = ["a", "t", "tr", "p", "w"]
    // if (typeof t !== "undefined" && tArray.includes(t)) {
    const tSearch = await apolloClient.query({
        query: GET_PUBLISHER_WRITER_TRANSLATOR_FOR_SEARCH,
        variables: {
            first: 50,
            search: q
        }
    })

    const {paPublishers, paTranslators, paWriters} = await tSearch.data
    const publisherSlugs = paPublishers?.nodes.map(elem => elem?.slug)
    const writerSlugs = paWriters?.nodes.map(elem => elem?.slug)
    const translatorSlugs = paTranslators?.nodes.map(elem => elem?.slug)

    let taxFilter = []
    if (publisherSlugs.length && (t === 'pu' || t === 'a')) {
        taxFilter.push({
            operator: "IN",
            taxonomy: "PAPUBLISHER",
            terms: publisherSlugs
        })
    }
    if (translatorSlugs.length && (t === 'tr' || t === 'a')) {
        taxFilter.push({
            operator: "IN",
            taxonomy: "PATRANSLATOR",
            terms: translatorSlugs
        })
    }
    if (writerSlugs.length && (t === 'wr' || t === 'a')) {
        taxFilter.push({
            operator: "IN",
            taxonomy: "PAWRITER",
            terms: writerSlugs
        })
    }

    await apolloClient.query({
        query: GET_PRODUCTS,
        variables: {
            first: 15,
            where: {
                orderby: orderby ? orderBy(orderby) : orderBy(1),
                taxonomyFilter: {
                    filters: taxFilter,
                    relation: "OR"
                }
            }
        }
    })
    // }

    await apolloClient.query({
        query: GET_PRODUCTS,
        variables: {
            first: 15,
            where: {
                orderby: orderby ? orderBy(orderby) : orderBy(1),
                search: q ? q : '',
                taxonomyFilter
            }
        }
    })
    await apolloClient.query({
        query: GET_CATS,
        variables: {
            first: 200,
        }
    })

    return {
        initialApolloState: apolloClient.cache.extract()
    }
}