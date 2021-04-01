import { cartConstants } from "../actions/constants";

const initState = {
    cart: {
        contents: {
            nodes: []
        },
        total: 0
    },
    loading: false,
    error: null,
    clearCartProcessing: false,
    clearCartError: null,
}

export default (state = initState, action) => {

    switch (action.type) {
        case cartConstants.CART_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case cartConstants.CART_SUCCESS:
            state = {
                ...state,
                loading: false,
                cart: action.payload.cart
            }
            break;
        case cartConstants.CART_FAILURE:
            state = {
                ...state,
                error: action.payload.error,
                loading: false
            }
            break;
        case cartConstants.ADD_TO_CART_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case cartConstants.ADD_TO_CART_SUCCESS:
            state = {
                ...state,
                loading: false,
                cart: action.payload.cart
            }
            break;
        case cartConstants.ADD_TO_CART_FAILURE:
            state = {
                ...state,
                error: action.payload.error,
                loading: false
            }
            break;
        case cartConstants.UPDATE_CART_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case cartConstants.UPDATE_CART_SUCCESS:
            state = {
                ...state,
                loading: false,
                cart: action.payload.cart
            }
            break;
        case cartConstants.UPDATE_CART_FAILURE:
            state = {
                ...state,
                error: action.payload.error,
                loading: false
            }
            break;
        case cartConstants.CLEAR_CART_REQUEST:
            state = {
                ...state,
                clearCartProcessing: true
            }
            break;
        case cartConstants.CLEAR_CART_SUCCESS:
            state = {
                ...state,
                clearCartProcessing: false,
                cart: action.payload.cart
            }
            break;
        case cartConstants.CLEAR_CART_FAILURE:
            state = {
                ...state,
                clearCartError: action.payload.error,
                clearCartProcessing: false
            }
            break;
    }

    return state;
}