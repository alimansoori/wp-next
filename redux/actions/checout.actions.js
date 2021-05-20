import { checkoutConstants, customerConstants } from "./constants";
import client from "../../components/ApolloClient";
import CHECKOUT from "../../gql/mutations/checkout";
import { getCart } from "./cart.actions";
import { v4 } from "uuid";

export const checkout = (input) => {
    return async dispatch => {
        dispatch({
            type: checkoutConstants.CHECKOUT_REQUEST
        })

        try {
            const result = await client.mutate({
                mutation: CHECKOUT,
                variables: {
                    input: input,
                },
                fetchPolicy: "no-cache"
            })

            const { customer, order } = result.data.checkout

            console.log('order', order)

            dispatch({
                type: customerConstants.SET_CUSTOMER,
                payload: {
                    customer
                }
            })

            dispatch(getCart())
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