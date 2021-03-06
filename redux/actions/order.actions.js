import { orderConstants } from "./constants";
import client from "../../components/ApolloClient";
import GET_ORDERS from "../../gql/queries/get-orders";
import {initializeApollo} from "../../components/Apollo";

export const getOrders = () => {
    return async dispatch => {
        dispatch({
            type: orderConstants.GET_ORDERS_REQUEST
        })

        const apolloClient = initializeApollo()
        try {
            const result = await apolloClient.query({
                query: GET_ORDERS,
                variables: {
                    where: {
                        statuses: 'COMPLETED'
                    }
                }
            })

            const { orders } = result.data

            dispatch({
                type: orderConstants.GET_ORDERS_SUCCESS,
                payload: {
                    orders: orders.edges
                }
            })

        } catch (error) {
            dispatch({
                type: orderConstants.GET_ORDERS_FAILURE,
                payload: {
                    error: error.message
                }
            })
        }
    }
}