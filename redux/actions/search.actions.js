import { searchConstants } from "./constants";
import client from "../../components/ApolloClient";
import PRODUCTS_FILTER_BY_LOCAL from "../../gql/queries/products-filter-by-local";
import GET_PRODUCTS from "../../gql/queries/get-products";
import GET_PRODUCTS_FROM_WRITERS from "../../gql/queries/get-products-from-writers";
import GET_PRODUCTS_FROM_TRANSLATORS from "../../gql/queries/get-products-from-translators";
import GET_PRODUCTS_FROM_PUBLISHERS from "../../gql/queries/get-products-from-publishers";
import GET_PRODUCTS_FROM_ALL from "../../gql/queries/get-products-from-all";
import {getTaxonomyFilter, orderBy, sortByArray} from "../../functions";
import {useQuery} from "@apollo/client";
import {initializeApollo} from "../../components/Apollo";
import GET_PUBLISHER_WRITER_TRANSLATOR_FOR_SEARCH from "../../gql/queries/get-publisher-writer-translator-for-search";

export const getProductsBySearchInput = (value, count, activeKey = 't') => {
    return async dispatch => {
        dispatch({
            type: searchConstants.SEARCH_REQUEST,
            payload: {
                value
            }
        });

        const apolloClient = initializeApollo()

        try {
            if (!value) {
                dispatch({
                    type: searchConstants.SEARCH_SUCCESS,
                    payload: {
                        products: [],
                    }
                });
                return
            }


            const dataProductTopic = await apolloClient.query({
                query: GET_PRODUCTS,
                variables: {
                    first: 10,
                    where: {
                        orderby: orderBy(1),
                        search: value ? value : '',
                    }
                },
            })

            const dataGetPWT = await apolloClient.query({
                query: GET_PUBLISHER_WRITER_TRANSLATOR_FOR_SEARCH,
                variables: {
                    first: 10,
                    search: value
                },
            })

            const {paPublishers, paTranslators, paWriters} = dataGetPWT.data
            const publisherSlugs = paPublishers?.nodes.map(elem => elem?.slug)
            const writerSlugs = paWriters?.nodes.map(elem => elem?.slug)
            const translatorSlugs = paTranslators?.nodes.map(elem => elem?.slug)

            let taxFilter = []

            if (publisherSlugs.length && (activeKey === 'pu' || activeKey === 'a')) {
                taxFilter.push({
                    operator: "IN",
                    taxonomy: "PAPUBLISHER",
                    terms: publisherSlugs
                })
            }
            if (translatorSlugs.length && (activeKey === 'tr' || activeKey === 'a')) {
                taxFilter.push({
                    operator: "IN",
                    taxonomy: "PATRANSLATOR",
                    terms: translatorSlugs
                })
            }
            if (writerSlugs.length && (activeKey === 'wr' || activeKey === 'a')) {
                taxFilter.push({
                    operator: "IN",
                    taxonomy: "PAWRITER",
                    terms: writerSlugs
                })
            }

            if (!taxFilter.length) {
                taxFilter = [{
                    operator: "IN",
                    taxonomy: "VISIBLEPRODUCT",
                    terms: ["XXXYYY"]
                }]
            }

            const dataProductKey = await apolloClient.query({
                query: GET_PRODUCTS,
                variables: {
                    first: 10,
                    where: {
                        orderby: orderBy(1),
                        taxonomyFilter: {
                            filters: taxFilter,
                            relation: "OR"
                        }
                    }
                },
            })

            let dataFinish = {}

            if (typeof activeKey === "undefined" || activeKey === 't') {
                dataFinish = dataProductTopic.data
            }
            const tArray = ["a", "tr", "pu", "wr"]
            if (typeof activeKey !== "undefined" && tArray.includes(activeKey)) {
                if (activeKey === 'a') {
                    dataFinish = Object.assign({}, dataProductTopic.data, {
                        products: {
                            edges: [...dataProductTopic?.data?.products?.edges, ...dataProductKey?.data?.products?.edges],
                        }
                    })
                } else if (activeKey === 'wr' || activeKey === 'tr' || activeKey === 'pu') {
                    dataFinish = Object.assign({}, {
                        products: {
                            edges: [...dataProductKey?.data?.products?.edges],
                        }
                    })
                }
            }

            dispatch({
                type: searchConstants.SEARCH_SUCCESS,
                payload: {
                    products: dataFinish?.products?.edges ? dataFinish.products.edges : [],
                }
            })

            /*let result = null
            var products = []

            switch (activeKey) {
                case 'translator':
                    result = await client.query({
                        query: GET_PRODUCTS_FROM_TRANSLATORS,
                        variables: {
                            search: value,
                            first: count
                        },
                        fetchPolicy: 'network-only',
                        errorPolicy: 'all'
                    });

                    result.data.paTranslators.edges.map(elem => {
                        products = [...elem.node.products.edges, ...products];
                    })

                    break;

                case 'writer':
                    result = await client.query({
                        query: GET_PRODUCTS_FROM_WRITERS,
                        variables: {
                            search: value,
                            first: count
                        },
                        fetchPolicy: 'network-only',
                        errorPolicy: 'all'
                    });

                    result.data.paWriters.edges.map(elem => {
                        products = [...elem.node.products.edges, ...products];
                    })
                    break;

                case 'publisher':
                    result = await client.query({
                        query: GET_PRODUCTS_FROM_PUBLISHERS,
                        variables: {
                            search: value,
                            first: count
                        },
                        fetchPolicy: 'network-only',
                        errorPolicy: 'all'
                    });

                    result.data.paPublishers.edges.map(elem => {
                        products = [...elem.node.products.edges, ...products];
                    })
                    break;

                case 'all':
                    result = await client.query({
                        query: GET_PRODUCTS_FROM_ALL,
                        variables: {
                            search: value,
                            first: count
                        },
                        fetchPolicy: 'network-only',
                        errorPolicy: 'all'
                    });

                    products = [...result.data.products.edges, ...products];

                    result.data.paPublishers.edges.map(elem => {
                        products = [...elem.node.products.edges, ...products];
                    })
                    result.data.paWriters.edges.map(elem => {
                        products = [...elem.node.products.edges, ...products];
                    })
                    result.data.paTranslators.edges.map(elem => {
                        products = [...elem.node.products.edges, ...products];
                    })
                    break;

                default:
                    result = await client.query({
                        query: GET_PRODUCTS,
                        variables: {
                            search: value,
                            size: count
                        },
                        fetchPolicy: 'network-only',
                        errorPolicy: 'all'
                    });
                    console.log(result)
                    products = result.data.products.edges
            }

            dispatch({
                type: searchConstants.SEARCH_SUCCESS,
                payload: {
                    products: products,
                }
            });*/
        } catch (error) {
            dispatch({
                type: searchConstants.SEARCH_FAILURE,
                payload: {
                    error: error.response.data.message
                }
            });
        }
    }
}

export const getSearch = (value, slugLocation, count) => {
    return async dispatch => {
        dispatch({
            type: searchConstants.SEARCH_REQUEST,
            payload: {
                value
            }
        });

        const apolloClient = initializeApollo()
        try {
            if (!value) value = "fkdfkasllfasdsfh";

            const result = await apolloClient.query({
                query: PRODUCTS_FILTER_BY_LOCAL,
                variables: {
                    slugLocation,
                    search: value,
                    first: count
                }
            });

            const { nodes } = result.data.paLocation.variations;
            dispatch({
                type: searchConstants.SEARCH_SUCCESS,
                payload: {
                    products: nodes,
                }
            });
        } catch (error) {
            dispatch({
                type: searchConstants.SEARCH_FAILURE,
                payload: {
                    error: error.response.data.message
                }
            });
        }
    }
}