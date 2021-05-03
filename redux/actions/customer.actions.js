import { authConstants, customerConstants } from "./constants";
import client from "../../components/ApolloClient";
import GET_CUSTOMER from "../../gql/queries/get-customer";
import UPDATE_CUSTOMER from "../../gql/mutations/update-customer";

export const getCustomer = () => {
    return async dispatch => {
        dispatch({
            type: customerConstants.CUSTOMER_REGISTER_REQUEST
        })

        try {
            const result = await client.query({
                query: GET_CUSTOMER,
            })

            const { customer } = result.data

            dispatch({
                type: customerConstants.CUSTOMER_REGISTER_SUCCESS,
                payload: {
                    customer
                }
            })
        } catch (error) {
            dispatch({
                type: customerConstants.CUSTOMER_REGISTER_FAILURE,
                payload: {
                    error: error.message
                }
            })
        }
    }
}

export const updateCustomer = () => {
    return async dispatch => {
        dispatch({
            type: customerConstants.CUSTOMER_UPDATE_REQUEST
        })

        try {
            const result = await client.mutate({
                mutation: UPDATE_CUSTOMER,
                variables: {
                    input: {
                        billing: {
                            address1: 'kkkkkkk',
                            address2: "22222222222",
                            city: "8443",
                            country: "IR",
                            state: "8433",
                        }
                    }
                }
            })

            const { customer, clientMutationId } = result.data

            // localStorage.setItem('wp-next-token', authToken)

            // dispatch({
            //     type: authConstants.REFRESH_TOKEN_SUCCESS,
            //     payload: {
            //         token: authToken
            //     }
            // });

            dispatch({
                type: customerConstants.CUSTOMER_UPDATE_SUCCESS,
                payload: {
                    customer
                }
            })
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