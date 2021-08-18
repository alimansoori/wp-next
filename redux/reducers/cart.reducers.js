import { cartConstants } from "../actions/constants";

const initState = {
    cart: {
        contents: {
            nodes: []
        },
        chosenShippingMethods: [],
        availableShippingMethods: [
            {
                rates: []
            }
        ],
        total: 0,
        isEmpty: true
    },
    loading: false,
    loadingCoupon: false,
    loadingUpdateShippingMethod: false,
    loadingUpdateShippingMethods: false,
    loadingUpdateShippingCourierMethod: false,
    error: null,
    message: null,
    errorCoupon: null,
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
                loadingUpdateShippingMethods: false,
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
                cart: action.payload.cart,
                message: action.payload.message
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
        case cartConstants.APPLY_COUPON_REQUEST:
            state = {
                ...state,
                loading: true,
                loadingCoupon: true,
            }
            break;
        case cartConstants.APPLY_COUPON_SUCCESS:
            state = {
                ...state,
                loading: false,
                loadingCoupon: false,
                cart: action.payload.cart
            }
            break;
        case cartConstants.APPLY_COUPON_FAILURE:
            state = {
                ...state,
                errorCoupon: action.payload.error,
                loading: false,
                loadingCoupon: false
            }
            break;
        case cartConstants.UPDATE_SHIPPING_METHOD_REQUEST:
            state = {
                ...state,
                loadingUpdateShippingMethod: true
            }
            break;
        case cartConstants.UPDATE_SHIPPING_METHOD_SUCCESS:
            state = {
                ...state,
                loadingUpdateShippingMethod: false,
                loadingUpdateShippingCourierMethod: false,
                cart: action.payload.cart
            }
            break;
        case cartConstants.UPDATE_SHIPPING_METHOD_FAILURE:
            state = {
                ...state,
                error: action.payload.error,
                loadingUpdateShippingMethod: false
            }
            break;
        case cartConstants.EMPTY_SHIPPING_METHODS:
            state = {
                ...state,
                chosenShippingMethods: []
            }
            break;
        case cartConstants.UPDATE_SHIPPING_COURIER_METHOD_REQUEST:
            state = {
                ...state,
                loadingUpdateShippingCourierMethod: true
            }
            break;
        case cartConstants.SHIPPING_METHOD_REQUEST:
            state = {
                ...state,
                loadingUpdateShippingMethods: true
            }
            break;
        case cartConstants.CLEAR_MESSAGE:
            state = {
                ...state,
                message: null,
                error: null
            }
            break;
    }

    return state;
}