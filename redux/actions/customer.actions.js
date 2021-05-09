import { authConstants, customerConstants } from "./constants";
import client from "../../components/ApolloClient";
import GET_CUSTOMER from "../../gql/queries/get-customer";
import UPDATE_CUSTOMER from "../../gql/mutations/update-customer";
import { getCart } from "./cart.actions";

export const getCustomer = () => {
    return async dispatch => {
        dispatch({
            type: customerConstants.GET_CUSTOMER_REQUEST
        })

        try {
            const result = await client.query({
                query: GET_CUSTOMER,
                variables: {
                    key: "number-address",
                    multiple: true
                },
                fetchPolicy: 'network-only'
            })

            const { customer } = result.data

            dispatch({
                type: customerConstants.GET_CUSTOMER_SUCCESS,
                payload: {
                    customer
                }
            })
        } catch (error) {
            dispatch({
                type: customerConstants.GET_CUSTOMER_FAILURE,
                payload: {
                    error: error.message
                }
            })
        }
    }
}

export const updateCustomer = (input) => {
    return async dispatch => {
        dispatch({
            type: customerConstants.CUSTOMER_UPDATE_REQUEST
        })

        try {
            const result = await client.mutate({
                mutation: UPDATE_CUSTOMER,
                variables: {
                    input,
                },
                fetchPolicy: "no-cache"
            })

            const { customer } = result.data.updateCustomer

            dispatch({
                type: customerConstants.CUSTOMER_UPDATE_SUCCESS,
                payload: {
                    customer
                }
            })

            dispatch(getCart())
        } catch (error) {
            dispatch({
                type: customerConstants.CUSTOMER_UPDATE_FAILURE,
                payload: {
                    error: error.message
                }
            })
        }
    }
}