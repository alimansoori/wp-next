import { productConstants } from "./constants";
import SEARCH_PRODUCTS from "../../gql/queries/search-products";
import client from "../../components/ApolloClient";
import GET_PRODUCTS from "../../gql/queries/get-products";
import {initializeApollo} from "../../components/Apollo";

export const getProducts = (search = "", categoryIn = [], sortby = "1", size = 20, offset = null) => {
    return async dispatch => {
        if (offset) {
            dispatch({
                type: productConstants.GET_ADD_PRODUCTS_REQUEST
            });
        } else {
            dispatch({
                type: productConstants.GET_ALL_PRODUCTS_REQUEST
            });
        }

        let taxonomyFilter = [];

        if (categoryIn.length) {
            taxonomyFilter = [
                {
                    and: [
                        {
                            operator: "IN",
                            taxonomy: "PRODUCTCATEGORY",
                            terms: [categoryIn[categoryIn.length - 1]]
                        }
                    ]
                }
            ]
        }

        var orderby = [];

        switch (sortby) {
            case "1":
                orderby.push({
                    'field': 'DATE',
                    'order': 'DESC'
                })
                break;
            case "2":
                orderby.push({
                    'field': 'DATE',
                    'order': 'ASC'
                })
                break;
            case "3":
                orderby.push({
                    'field': 'PRICE',
                    'order': 'DESC'
                })
                break;
            case "4":
                orderby.push({
                    'field': 'PRICE',
                    'order': 'ASC'
                })
                break;
            case "5":
                orderby.push({
                    'field': 'RATING',
                    'order': 'DESC'
                })
                break;

            default:
                orderby.push({
                    'field': 'DATE',
                    'order': 'DESC'
                })
                break;
        }

        const apolloClient = initializeApollo()
        try {
            const result = await apolloClient.query({
                query: GET_PRODUCTS,
                variables: {
                    search,
                    size,
                    offset,
                    orderby,
                    taxonomyFilter
                },
            })

            const { pageInfo, edges } = result.data.products;

            if (offset) {
                dispatch({
                    type: productConstants.GET_ADD_PRODUCTS_SUCCESS,
                    payload: {
                        products: edges,
                        pageInfo: pageInfo
                    }
                });
            } else {
                dispatch({
                    type: productConstants.GET_ALL_PRODUCTS_SUCCESS,
                    payload: {
                        products: edges,
                        pageInfo: pageInfo
                    }
                });
            }


        } catch (error) {
            if (offset) {
                dispatch({
                    type: productConstants.GET_ADD_PRODUCTS_FAILURE,
                    payload: {
                        error: error.response.data.message
                    }
                });
            } else {
                dispatch({
                    type: productConstants.GET_ALL_PRODUCTS_FAILURE,
                    payload: {
                        error: error.response.data.message
                    }
                });
            }
        }
        return
    }
}


// export const getProductsAndCategories = () => {
//     return async dispatch => {
//         dispatch({
//             type: productConstants.GET_ALL_PRODUCTS_REQUEST
//         });
//         dispatch({
//             type: categoryConstants.GET_ALL_CATEGORIES_REQUEST
//         });

//         try {
//             const result = await client.query({
//                 query: PRODUCTS_AND_CATEGORIES_QUERY,
//             });

//             const {products} = result.data;


//             dispatch({
//                 type: productConstants.GET_ALL_PRODUCTS_SUCCESS,
//                 payload: {
//                     products: products.nodes,
//                 }
//             });
//         } catch (error) {
//             dispatch({
//                 type: productConstants.GET_ALL_PRODUCTS_FAILURE,
//                 payload: {
//                     error: error.response.data.message
//                 }
//             });
//         }
//     }
// }

export const moveSearchResultToProducts = (products) => {
    return async dispatch => {
        dispatch({
            type: productConstants.PRODUCTS_NEW_DATA,
            payload: {
                products: products,
            }
        });
    }
}

export const searchProducts = (filterQueries = {}) => {
    return async (dispatch, getState) => {
        dispatch({
            type: productConstants.SEARCH_PRODUCTS_REQUEST
        });

        const apolloClient = initializeApollo()

        try {
            dispatch({
                type: productConstants.PRODUCT_SEARCH_BY_TEXT,
                payload: {
                    search: ((filterQueries.search && typeof filterQueries.search === 'string') ? filterQueries.search : '')
                }
            });
            dispatch({
                type: productConstants.PRODUCT_SEARCH_BY_CATEGORY_SLUG,
                payload: {
                    categoryIn: (
                        (
                            filterQueries.slugs &&
                            Array.isArray(filterQueries.slugs) &&
                            filterQueries.slugs.length
                        )
                            ? filterQueries.slugs[filterQueries.slugs.length - 1]
                            : []
                    )
                }
            });

            const { searchInput } = getState().product;

            const result = await apolloClient.query({
                query: SEARCH_PRODUCTS,
                variables: {
                    ...searchInput
                }
            });

            const { products } = result.data;

            dispatch({
                type: productConstants.SEARCH_PRODUCTS_SUCCESS,
                payload: {
                    products: products.edges,
                }
            });
        } catch (error) {
            dispatch({
                type: productConstants.SEARCH_PRODUCTS_FAILURE,
                payload: {
                    error: error.message
                }
            });
        }
    }
};

// export const getProductBySlug = () => {
//     return new Promise((resolve, reject) => {

//     })
// }