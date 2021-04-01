import { productConstants } from "./constants";
import SEARCH_PRODUCTS from "../../gql/queries/search-products";
import client from "../../components/ApolloClient";
import GET_PRODUCTS from "../../gql/queries/get-products";

export const getProducts = () => {
    return async dispatch => {
        try {
            const result = await client.query({
                query: GET_PRODUCTS
            })

            return result.data.products

            // console.log(result)
            
        } catch (error) {
            console.log('Error', error)
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

            console.log('getState', searchInput);
            const result = await client.query({
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