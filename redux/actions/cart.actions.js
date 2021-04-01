import { cartConstants } from "./constants";
import ADD_TO_CART from "../../gql/mutations/add-to-cart";
import UPDATE_CART from "../../gql/mutations/update-cart";
import CLEAR_CART_MUTATION from "../../gql/mutations/clear-cart";
import GET_CART from "../../gql/queries/get-cart";
import client from "../../components/ApolloClient";

export const getCart = () => {
    return async dispatch => {
        dispatch({
            type: cartConstants.CART_REQUEST
        });

        try {
            const result = await client.query({
                query: GET_CART,
            });

            const { cart } = result.data;

            dispatch({
                type: cartConstants.CART_SUCCESS,
                payload: {
                    cart: cart,
                }
            });
        } catch (error) {
            dispatch({
                type: cartConstants.CART_FAILURE,
                payload: {
                    error: error.message
                }
            });
        }
    }
}

export const addToCart = (addToCartInput) => {
    return async dispatch => {
        dispatch({
            type: cartConstants.ADD_TO_CART_REQUEST
        });

        try {
            const result = await client.mutate({
                mutation: ADD_TO_CART,
                variables: {
                    input: addToCartInput
                }
            });

            const { addToCart } = result.data;

            dispatch({
                type: cartConstants.ADD_TO_CART_SUCCESS,
                payload: {
                    cart: addToCart.cart,
                }
            });
        } catch (error) {
            dispatch({
                type: cartConstants.ADD_TO_CART_FAILURE,
                payload: {
                    error: error.response.data.message
                }
            });
        }
    }
}


export const updateCart = (variables) => {
    return async dispatch => {
        dispatch({
            type: cartConstants.UPDATE_CART_REQUEST
        });

        try {
            const result = await client.mutate({
                mutation: UPDATE_CART,
                variables: variables
            });

            const { updateItemQuantities } = result.data;

            dispatch({
                type: cartConstants.UPDATE_CART_SUCCESS,
                payload: {
                    cart: updateItemQuantities.cart,
                }
            });
        } catch (error) {
            dispatch({
                type: cartConstants.UPDATE_CART_FAILURE,
                payload: {
                    error: error.response.data.message
                }
            });
        }
    }
}

export const clearCart = (variables) => {
    return async dispatch => {
        dispatch({
            type: cartConstants.CLEAR_CART_REQUEST
        });

        try {
            const result = await client.mutate({
                mutation: CLEAR_CART_MUTATION,
                variables: variables
            });

            const { removeItemsFromCart } = result.data;

            dispatch({
                type: cartConstants.CLEAR_CART_SUCCESS,
                payload: {
                    cart: removeItemsFromCart.cart,
                }
            });
        } catch (error) {
            dispatch({
                type: cartConstants.CLEAR_CART_FAILURE,
                payload: {
                    error: error.message
                }
            });
        }
    }
}