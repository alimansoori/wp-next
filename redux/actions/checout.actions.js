import { checkoutConstants, customerConstants, orderConstants } from "./constants";
import client from "../../components/ApolloClient";
import CHECKOUT from "../../gql/mutations/checkout";
import { v4 } from "uuid";
import {initializeApollo} from "../../components/Apollo";
import {getCart} from "./cart.actions";

export const checkout = (input) => {
    return async (dispatch, getState) => {
        dispatch({
            type: checkoutConstants.CHECKOUT_REQUEST
        })

        const apolloClient = initializeApollo()
        try {
            const { customer: myCustomer, cart: myCart } = getState()

            let fillInput = {
                ...input,
                paymentMethod: "WC_ZPal",
                billing: { ...myCustomer.customer.billing },
                shipping: { ...myCustomer.customer.shipping },
                clientMutationId: v4(),
                shippingMethod: myCart.cart.chosenShippingMethods[0]
            }

            let metaData = myCustomer.customer.metaData.filter((meta) => (meta.key === 'shippingDate' || meta.key === 'shippingHour'))

            if (metaData) {
                fillInput.metaData = metaData
            }

            const result = await apolloClient.mutate({
                mutation: CHECKOUT,
                variables: {
                    input: {
                        ...fillInput
                    },
                }
            })

            const { customer, order } = result.data.checkout

            dispatch({
                type: checkoutConstants.CHECKOUT_SUCCESS,
                payload: {
                    input
                }
            })
            dispatch({
                type: orderConstants.SET_ORDER,
                payload: {
                    order
                }
            })

            // dispatch({
            //     type: customerConstants.SET_CUSTOMER,
            //     payload: {
            //         customer
            //     }
            // })

            // dispatch(getCart())
        } catch (error) {
            dispatch({
                type: checkoutConstants.CHECKOUT_FAILURE,
                payload: {
                    error: error.message
                }
            })
        }
    }
}

export const setBillingInput = () => {
    return async (dispatch, getState) => {
        dispatch({
            type: checkoutConstants.CHANGE_BILLING_INPUT_REQUEST
        })

        try {
            const { addresses, active } = getState().customer.address

            dispatch({
                type: checkoutConstants.CHANGE_BILLING_INPUT_SUCCESS,
                payload: {
                    billing: {
                        ...addresses[active]
                    }
                }
            })

            dispatch(getCart())
        } catch (error) {
            dispatch({
                type: checkoutConstants.CHANGE_BILLING_INPUT_FAILURE,
                payload: {
                    error: error.message
                }
            })
        }
    }
}

export const changeInputCheckout = (input) => {
    return async dispatch => {
        dispatch({
            type: checkoutConstants.CHANGE_INPUT_REQUEST
        })

        try {

            dispatch({
                type: checkoutConstants.CHANGE_INPUT_SUCCESS,
                payload: {
                    input
                }
            })

        } catch (error) {
            dispatch({
                type: checkoutConstants.CHANGE_INPUT_FAILURE,
                payload: {
                    error: error.message
                }
            })
        }
    }
}