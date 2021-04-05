import { searchConstants } from "./constants";
import client from "../../components/ApolloClient";
import PRODUCTS_FILTER_BY_LOCAL from "../../gql/queries/products-filter-by-local";
import GET_PRODUCTS from "../../gql/queries/get-products";
import GET_PRODUCTS_FROM_WRITERS from "../../gql/queries/get-products-from-writers";
import GET_PRODUCTS_FROM_TRANSLATORS from "../../gql/queries/get-products-from-translators";
import GET_PRODUCTS_FROM_PUBLISHERS from "../../gql/queries/get-products-from-publishers";
import GET_PRODUCTS_FROM_ALL from "../../gql/queries/get-products-from-all";

export const getProductsBySearchInput = (value, count, activeKey = 'topic') => {
    return async dispatch => {
        dispatch({
            type: searchConstants.SEARCH_REQUEST,
            payload: {
                value
            }
        });

        try {
            if (!value) value = "fkdfkasllfasdsfh";
            var result = null
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
                        first: count
                    },
                    fetchPolicy: 'network-only',
                    errorPolicy: 'all'
                });
                products = result.data.products.edges
            }

            dispatch({
                type: searchConstants.SEARCH_SUCCESS,
                payload: {
                    products: products,
                }
            });
        } catch (error) {
            // dispatch({
            //     type: searchConstants.SEARCH_FAILURE,
            //     payload: {
            //         error: error.response.data.message
            //     }
            // });
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

        try {
            if (!value) value = "fkdfkasllfasdsfh";

            const result = await client.query({
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