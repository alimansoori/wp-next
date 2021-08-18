import { cartConstants } from "./constants";
import ADD_TO_CART from "../../gql/mutations/add-to-cart";
import UPDATE_CART from "../../gql/mutations/update-cart";
import CLEAR_CART_MUTATION from "../../gql/mutations/clear-cart";
import GET_CART from "../../gql/queries/get-cart";
import client from "../../components/ApolloClient";
import APPLY_COUPON from "../../gql/mutations/apply-coupon";
import { v4 } from "uuid";
import UPDATE_SHIPPING_METHOD from "../../gql/mutations/update-shipping-method";
import {initializeApollo} from "../../components/Apollo";

export const getCart = () => {
    return async dispatch => {
        dispatch({
            type: cartConstants.CART_REQUEST
        });

        const apolloClient = initializeApollo()
        try {
            const result = await apolloClient.query({
                query: GET_CART,
            });

            const { cart } = result.data;
            console.log(cart)

            dispatch({
                type: cartConstants.CART_SUCCESS,
                payload: {
                    cart
                }
            });
        } catch (error) {
            dispatch({
                type: cartConstants.CART_FAILURE,
                payload: {
                    error: error?.message
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

        const apolloClient = initializeApollo()

        try {
            const result = await apolloClient.mutate({
                mutation: ADD_TO_CART,
                variables: {
                    input: addToCartInput
                },
            });

            const { addToCart } = result.data;

            dispatch({
                type: cartConstants.ADD_TO_CART_SUCCESS,
                payload: {
                    cart: addToCart.cart,
                    message: `این محصول با موفقیت به سبد خرید شما افزوده شد!`
                }
            });
        } catch (error) {
            dispatch({
                type: cartConstants.ADD_TO_CART_FAILURE,
                payload: {
                    error: error?.message
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

        const apolloClient = initializeApollo()

        try {
            const result = await apolloClient.mutate({
                mutation: UPDATE_CART,
                variables: variables,
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
                    error: error?.message
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

        const apolloClient = initializeApollo()

        try {
            const result = await apolloClient.mutate({
                mutation: CLEAR_CART_MUTATION,
                variables: variables,
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

export const applyCoupon = (code) => {
    return async dispatch => {
        dispatch({
            type: cartConstants.APPLY_COUPON_REQUEST
        });

        const apolloClient = initializeApollo()

        try {
            const result = await apolloClient.mutate({
                mutation: APPLY_COUPON,
                variables: {
                    input: {
                        clientMutationId: v4(),
                        code
                    }
                },
            });

            const { cart } = result.data.applyCoupon;

            dispatch({
                type: cartConstants.APPLY_COUPON_SUCCESS,
                payload: {
                    cart
                }
            });
        } catch (error) {
            dispatch({
                type: cartConstants.APPLY_COUPON_FAILURE,
                payload: {
                    error: error.message
                }
            });
        }
    }
}

export const updateShippingMethod = (input) => {
    return async dispatch => {
        dispatch({
            type: cartConstants.UPDATE_SHIPPING_METHOD_REQUEST
        });

        if (input.shippingMethods.length && input.shippingMethods.includes('WC_Courier_Method:4')) {
            dispatch({
                type: cartConstants.UPDATE_SHIPPING_COURIER_METHOD_REQUEST
            });
        }

        const apolloClient = initializeApollo()

        try {
            const result = await apolloClient.mutate({
                mutation: UPDATE_SHIPPING_METHOD,
                variables: {
                    input: {
                        clientMutationId: v4(),
                        ...input
                    }
                },
            });

            const { cart } = result.data.updateShippingMethod;

            dispatch({
                type: cartConstants.UPDATE_SHIPPING_METHOD_SUCCESS,
                payload: {
                    cart
                }
            });
        } catch (error) {
            dispatch({
                type: cartConstants.UPDATE_SHIPPING_METHOD_FAILURE,
                payload: {
                    error: error?.message
                }
            });
        }
    }
}