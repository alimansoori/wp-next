import { v4 } from "uuid";
import { checkoutConstants } from "../actions/constants";

const initState = {
    checkout: null,
    input: {
        clientMutationId: v4(),
        paymentMethod: "WC_ZPal",
    },
    error: null,
    message: null,
    loading: false
}

export default (state = initState, action) => {
    switch (action.type) {
        case checkoutConstants.CHECKOUT_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case checkoutConstants.CHECKOUT_SUCCESS:
            state = {
                ...state,
                loading: false,
                checkout: action.payload.checkout,
                error: null
            }
            break;
        case checkoutConstants.CHECKOUT_FAILURE:
            state = {
                ...state,
                loading: false,
                error: action.payload.error,
                message: null
            }
            break;
        case checkoutConstants.CHECKOUT_UPDATE_BILLING:
            state = {
                ...state,
                input: {
                    ...state.input,
                    billing: action.payload.billing
                }
            }
            break;
    }

    return state;
}