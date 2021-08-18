import { viewerConstants } from "./constants";
import client from "../../components/ApolloClient";
import GET_VIEWER from "../../gql/queries/get-viewer";
import GET_PRODUCTS from "../../gql/queries/get-products";
import { initAddressesAndFavorites, saveAddressesAndFavorites } from "./customer.actions";
import {initializeApollo} from "../../components/Apollo";

export const getViewer = () => {
    return async dispatch => {
        dispatch({
            type: viewerConstants.VIEWER_REGISTER_REQUEST
        })

        const apolloClient = initializeApollo()
        try {
            const result = await apolloClient.query({
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

export const addToFavorites = (productSlug) => {
    return async (dispatch, getState) => {
        dispatch({
            type: viewerConstants.ADD_TO_FAVORITES_REQUEST
        })

        try {
            dispatch({
                type: viewerConstants.ADD_TO_FAVORITES_SUCCESS,
                payload: {
                    productSlug: productSlug,
                    message: `این محصول با موفقیت به لیست علاقه‌مندی‌های شما افزوده شد!`
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

export const removeFromFavorites = (productSlug) => {
    return async (dispatch, getState) => {
        dispatch({
            type: viewerConstants.REMOVE_FROM_FAVORITES_REQUEST
        })

        try {
            dispatch({
                type: viewerConstants.REMOVE_FROM_FAVORITES_SUCCESS,
                payload: {
                    productSlug: productSlug
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

        const apolloClient = initializeApollo()
        try {

            const {viewer} = getState()
            const {favorites} = viewer.favorite

            const result = await apolloClient.query({
                query: GET_PRODUCTS,
                variables: {
                    first: 200,
                    where: {
                        slugIn: favorites
                    },
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