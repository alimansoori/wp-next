import {searchConstants} from "../actions/constants";

const initState = {
    products: [],
    value: '',
    loading: false,
    error: null
}

export default (state = initState, action) => {

    switch (action.type) {
        case searchConstants.SEARCH_REQUEST:
            state = {
                ...state,
                loading: true,
                value: action.payload.value
            }
            break;
        case searchConstants.SEARCH_SUCCESS:
            state = {
                ...state,
                loading: false,
                products: action.payload.products
            }
            break;
        case searchConstants.SEARCH_FAILURE:
            state = {
                ...state,
                error: action.payload.error,
                loading: false
            }
            break;
        case searchConstants.SEARCH_BOX_CLEAR:
            state = {
                ...initState
            }
            break;
    }

    return state;
}