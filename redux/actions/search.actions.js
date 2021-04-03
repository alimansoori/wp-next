import { searchConstants } from "./constants";
import client from "../../components/ApolloClient";
import PRODUCTS_FILTER_BY_LOCAL from "../../gql/queries/products-filter-by-local";
import GET_PRODUCTS from "../../gql/queries/get-products";
import GET_PRODUCTS_FROM_WRITERS from "../../gql/queries/get-products-from-writers";
import GET_PRODUCTS_FROM_TRANSLATORS from "../../gql/queries/get-products-from-translators";
import GET_PRODUCTS_FROM_PUBLISHERS from "../../gql/queries/get-products-from-publishers";

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
            let result = null
            let products = {}

            switch (activeKey) {
                case 'translator':
                    result = await client.query({
                        query: GET_PRODUCTS_FROM_TRANSLATORS,
                        variables: {
                            where: {
                                search: value
                            },
                            first: count
                        },
                        fetchPolicy: 'no-cache'
                    });
                    result.data.paTranslators.edges.map(translator => {
                        products = Object.assign(translator.node.products.edges, products)
                    })
                    break;

                case 'writer':
                    result = await client.query({
                        query: GET_PRODUCTS_FROM_WRITERS,
                        variables: {
                            search: value,
                            first: count
                        }
                    });
                    result.data.paWriters.edges.map(writer => {
                        products = Object.assign(writer.node.products.edges, products)
                    })
                    break;

                case 'publisher':
                    result = await client.query({
                        query: GET_PRODUCTS_FROM_PUBLISHERS,
                        variables: {
                            where: {
                                search: value
                            },
                            first: count
                        }
                    });
                    result.data.paPublishers.edges.map(publisher => {
                        products = Object.assign(publisher.node.products.edges, products)
                    })
                    break;

                case 'all':
                    result = await client.query({
                        query: GET_PRODUCTS,
                        variables: {
                            where: {
                                search: value
                            },
                            first: count
                        }
                    });
                    // products = result.data.paTranslator.edges
                    break;

                default:
                    result = await client.query({
                        query: GET_PRODUCTS,
                        variables: {
                            where: {
                                search: value
                            },
                            first: count
                        }
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