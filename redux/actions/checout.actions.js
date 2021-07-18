import { checkoutConstants, customerConstants } from "./constants";
import client from "../../components/ApolloClient";
import CHECKOUT from "../../gql/mutations/checkout";
import { getCart } from "./cart.actions";
import { v4 } from "uuid";

export const checkout = (input) => {
    return async (dispatch, getState) => {
        dispatch({
            type: checkoutConstants.CHECKOUT_REQUEST
        })

        console.log(input)

        try {
            const {viewer} = (getState()).viewer
            
            const result = await client.mutate({
                mutation: CHECKOUT,
                variables: {
                    input: {
                        ...input,
                        clientMutationId: "jjjjj"
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
                type: customerConstants.SET_CUSTOMER,
                payload: {
                    customer
                }
            })

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

            // dispatch(getCart())
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