import {productConstants} from "../actions/constants";

const initState = {
    lang: "fa",
    localPrice: true,
    loading: false,
    error: null,
}

export default (state = initState, action) => {

    /*switch (action.type) {
        case productConstants.GET_ALL_PRODUCTS_REQUEST:
            console.log(action);
            state = {
                ...state,
                loading: true
            }
            break;
        case productConstants.GET_ALL_PRODUCTS_SUCCESS:
            console.log(action);
            state = {
                ...state,
                loading: false,
                products: action.payload.products
            }
            break;
        case productConstants.GET_ALL_PRODUCTS_FAILURE:
            console.log(action);
            state = {
                ...state,
                error: action.payload.error,
                loading: false
            }
            break;
    }*/

    return state;
}