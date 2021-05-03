import {customerConstants} from "../actions/constants";

const initState = {
    customer: null,
    error: null,
    message: null,
    loading: false
}

export default (state = initState, action) => {
    switch (action.type) {
        case customerConstants.GET_CUSTOMER_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case customerConstants.GET_CUSTOMER_SUCCESS:
            state = {
                ...state,
                loading: false,
                customer: action.payload.customer,
                error: null
            }
            break;
        case customerConstants.GET_CUSTOMER_FAILURE:
            state = {
                ...state,
                loading: false,
                error: action.payload.error,
                message: null
            }
            break;
        case customerConstants.CUSTOMER_UPDATE_SUCCESS:
            state = {
                ...state,
                loading: false,
                customer: action.payload.customer,
                error: null
            }
            break;
        case customerConstants.CUSTOMER_UPDATE_FAILURE:
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