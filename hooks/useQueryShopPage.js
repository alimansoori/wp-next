import {useQuery} from "@apollo/client";
import GET_PRODUCTS from "../gql/queries/get-products";
import {getTaxonomyFilter, orderBy, sortByArray} from "../functions";
import {useEffect, useRef, useState} from "react";
import GET_PUBLISHER_WRITER_TRANSLATOR_FOR_SEARCH from "../gql/queries/get-publisher-writer-translator-for-search";
import GET_CATS from "../gql/queries/get-categories";

function useQueryShopPage(router, sort = 1, category=undefined, search, t) {
    const {publisher, writer, translator} = router.query
    const [loadingFetchMore, setLoadingFetchMore] = useState(false);
    const [size, setSize] = useState(15);
    const [categoryState, setCategoryState] = useState(category);
    const [publisherState, setPublisherState] = useState(publisher);
    const [writerState, setWriterState] = useState(writer);
    const [translatorState, setTranslatorState] = useState(translator);

    let dataFinish = {}

    const taxonomyFilter = getTaxonomyFilter(category, publisherState, writerState, translatorState)

    const {loading, error, data, fetchMore, refetch} = useQuery(GET_PRODUCTS, {
        variables: {
            first: size,
            where: {
                orderby: sort ? orderBy(sort) : orderBy(1),
                search: search ? search : '',
                taxonomyFilter
            }
        },
    })

    let taxFilter = []
    const {loading: loadingS, error: errorS, data: tSearch, refetch: refetchS} = useQuery(GET_PUBLISHER_WRITER_TRANSLATOR_FOR_SEARCH, {
        variables: {first: 50, search: search}
    })

    if (!loadingS) {
        if (typeof tSearch !== "undefined") {
            const {paPublishers, paTranslators, paWriters} = tSearch
            const publisherSlugs = paPublishers?.nodes.map(elem => elem?.slug)
            const writerSlugs = paWriters?.nodes.map(elem => elem?.slug)
            const translatorSlugs = paTranslators?.nodes.map(elem => elem?.slug)


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
        }

        if (!taxFilter.length) {
            taxFilter = [{
                operator: "IN",
                taxonomy: "VISIBLEPRODUCT",
                terms: ["XXXYYY"]
            }]
        }
    }

    const {
        loading: loadingP,
        error: errorP,
        data: dataP,
        fetchMore: fetchMoreP,
        refetch: refetchP
    } = useQuery(GET_PRODUCTS, {
        variables: {
            first: 15,
            where: {
                orderby: sort ? orderBy(sort) : orderBy(1),
                taxonomyFilter: {
                    filters: taxFilter,
                    relation: "OR"
                }
            }
        }
    })

    const onFetchMore = () => {
        setLoadingFetchMore(true)
        fetchMore({
            variables: {
                after: data?.products?.pageInfo?.endCursor,
                first: size,
                where: {
                    orderby: sort ? orderBy(sort) : orderBy(1),
                    search: search ? search : '',
                    taxonomyFilter
                }
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

        fetchMoreP({
            variables: {
                after: dataP?.products?.pageInfo?.endCursor,
                first: size,
                where: {
                    orderby: sort ? orderBy(sort) : orderBy(1),
                    taxonomyFilter: {
                        filters: taxFilter,
                        relation: "OR"
                    }
                }
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
    }

    // Refetch when change sortby and search query
    const didMount = useRef(false);
    useEffect(() => {
        if (didMount.current) {
            refetch()
            refetchS()
            refetchP()
            /*let query = {...router.query}
            if (search) query.q = search
            if (sort) query.orderby = sort

            router.push({
                pathname: '/shop',
                query
            }, undefined, {
                shallow: true,
            })*/
        } else didMount.current = true;
    }, [search, sort])

    // Refetch when change sortby and search query
    const didMountCat = useRef(false);
    useEffect(() => {
        if (didMountCat.current) {
            refetch()
            refetchS()
            refetchP()
        } else didMountCat.current = true;
    }, [category])

    if (typeof t === "undefined" || t === 't') {
        dataFinish = data
    }
    const tArray = ["a", "tr", "pu", "wr"]
    if (typeof t !== "undefined" && tArray.includes(t)) {
        if (typeof data !== "undefined" && typeof dataP !== "undefined" && t === 'a') {
            dataFinish = Object.assign({}, data, {
                products: {
                    pageInfo: {...data?.products?.pageInfo},
                    pageInfo2: {...dataP?.products?.pageInfo},
                    edges: [...data?.products?.edges, ...dataP?.products?.edges],
                }
            })

            dataFinish.products.edges = sortByArray(sort, dataFinish.products.edges)
        } else if (typeof dataP !== "undefined" && (t === 'wr' || t === 'tr' || t === 'pu')) {
            dataFinish = Object.assign({}, {
                products: {
                    pageInfo: {},
                    pageInfo2: {...dataP?.products?.pageInfo},
                    edges: [...dataP?.products?.edges],
                }
            })
        }
    }

    return {
        loading: (loading || loadingP || loadingS),
        error,
        data: dataFinish,
        refetch,
        onFetchMore,
        loadingFetchMore
    }
}

export default useQueryShopPage