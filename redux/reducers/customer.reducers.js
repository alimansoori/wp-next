import { customerConstants } from "../actions/constants";

const initState = {
    customer: null,
    address: {
        active: null,
        loading: false,
        error: null,
        addresses: null
    },
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
        case customerConstants.SET_CUSTOMER:
            state = {
                ...state,
                loading: false,
                customer: action.payload.customer,
                error: null
            }
            break;
        case customerConstants.SET_ACTIVE_ADDRESS_REQUEST:
            state = {
                ...state,
                address: {
                    ...state.address,
                    loading: true
                }
            }
            break;
        case customerConstants.SET_ACTIVE_ADDRESS_SUCCESS:
            state = {
                ...state,
                address: {
                    ...state.address,
                    loading: false,
                    active: action.payload.active
                }
            }
            break;
        case customerConstants.SET_ACTIVE_ADDRESS_FAILURE:
            state = {
                ...state,
                address: {
                    ...state.address,
                    loading: false,
                    error: action.payload.error
                }
            }
            break;
        case customerConstants.INIT_ADDRESSES_REQUEST:
            state = {
                ...state,
                address: {
                    ...state.address,
                    loading: true
                }
            }
            break;
        case customerConstants.INIT_ADDRESSES_SUCCESS:
            state = {
                ...state,
                address: {
                    ...state.address,
                    loading: false,
                    ...action.payload.addresses
                }
            }
            break;
        case customerConstants.INIT_ADDRESSES_FAILURE:
            state = {
                ...state,
                address: {
                    ...state.address,
                    loading: false,
                    error: action.payload.error
                }
            }
            break;
    }

    return state;
}