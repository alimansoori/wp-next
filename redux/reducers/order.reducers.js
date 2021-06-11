import {orderConstants} from "../actions/constants";

const initState = {
    orders: [],
    error: null,
    message: null,
    loading: false
}

export default (state = initState, action) => {
    switch (action.type) {
        case orderConstants.GET_ORDERS_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case orderConstants.GET_ORDERS_SUCCESS:
            state = {
                ...state,
                loading: false,
                orders: action.payload.orders,
                error: null
            }
            break;
        case orderConstants.GET_ORDERS_FAILURE:
            state = {
                ...state,
                loading: false,
                error: action.payload.error,
                message: null
            }
            break;
    }

    return state;
}