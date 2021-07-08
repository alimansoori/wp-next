import { viewerConstants } from "./constants";
import client from "../../components/ApolloClient";
import GET_VIEWER from "../../gql/queries/get-viewer";
import GET_PRODUCTS from "../../gql/queries/get-products";
import { initAddressesAndFavorites, saveAddressesAndFavorites } from "./customer.actions";

export const getViewer = () => {
    return async dispatch => {
        dispatch({
            type: viewerConstants.VIEWER_REGISTER_REQUEST
        })

        try {
            const result = await client.query({
                query: GET_VIEWER,
            })

            const { viewer } = result.data
            // console.log('viewer.jwtAuthExpiration', viewer.jwtAuthExpiration)
            // console.log('viewer.jwtAuthToken', viewer.jwtAuthToken)
            // console.log('viewer.jwtRefreshToken', viewer.jwtRefreshToken)
            // console.log('viewer.jwtUserSecret', viewer.jwtUserSecret)

            dispatch({
                type: viewerConstants.VIEWER_REGISTER_SUCCESS,
                payload: {
                    viewer
                }
            })

            // set address billing
            if (viewer.description) {
                dispatch(initAddressesAndFavorites(viewer.description))
            }

        } catch (error) {
            dispatch({
                type: viewerConstants.VIEWER_REGISTER_FAILURE,
                payload: {
                    error: error.message
                }
            })
        }
    }
}

export const addToFavorites = (productId) => {
    return async (dispatch, getState) => {
        dispatch({
            type: viewerConstants.ADD_TO_FAVORITES_REQUEST
        })

        try {
            dispatch({
                type: viewerConstants.ADD_TO_FAVORITES_SUCCESS,
                payload: {
                    productId
                }
            })

            dispatch(initFavoritesProducts())

            dispatch(saveAddressesAndFavorites())

        } catch (error) {
            dispatch({
                type: viewerConstants.ADD_TO_FAVORITES_FAILURE,
                payload: {
                    error: error.message
                }
            })
        }
    }
}

export const removeFromFavorites = (productId) => {
    return async (dispatch, getState) => {
        dispatch({
            type: viewerConstants.REMOVE_FROM_FAVORITES_REQUEST
        })

        try {
            dispatch({
                type: viewerConstants.REMOVE_FROM_FAVORITES_SUCCESS,
                payload: {
                    productId
                }
            })

            dispatch(initFavoritesProducts())

            dispatch(saveAddressesAndFavorites())

        } catch (error) {
            dispatch({
                type: viewerConstants.REMOVE_FROM_FAVORITES_FAILURE,
                payload: {
                    error: error.message
                }
            })
        }
    }
}

export const initFavoritesProducts = () => {
    return async (dispatch, getState) => {
        dispatch({
            type: viewerConstants.INIT_FAVORITES_PRODUCTS_REQUEST
        })

        try {

            const {viewer} = getState()
            const {favorites} = viewer.favorite

            const result = await client.query({
                query: GET_PRODUCTS,
                variables: {
                    include: favorites,
                    size: 100
                }
            })

            const { edges } = result.data.products

            dispatch({
                type: viewerConstants.INIT_FAVORITES_PRODUCTS_SUCCESS,
                payload: {
                    products: edges
                }
            })

        } catch (error) {
            dispatch({
                type: viewerConstants.INIT_FAVORITES_PRODUCTS_FAILURE,
                payload: {
                    error: error.message
                }
            })
        }
    }
}