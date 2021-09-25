import {userConstants} from "../actions/constants";

const initState = {
    error: null,
    message: null,
    loading: false
}

export default (state = initState, action) => {
    switch (action.type) {
        case userConstants.USER_REGISTER_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case userConstants.USER_REGISTER_SUCCESS:
            state = {
                ...state,
                loading: false,
                message: action.payload.message,
                error: null
            }
            break;
        case userConstants.USER_REGISTER_FAILURE:
            state = {
                ...state,
                loading: false,
                error: action.payload.error,
                message: null
            }
            break;
            case userConstants.UPDATE_USER_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case userConstants.UPDATE_USER_SUCCESS:
            state = {
                ...state,
                loading: false,
                message: action.payload.message,
                error: null
            }
            break;
        case userConstants.UPDATE_USER_FAILURE:
            state = {
                ...state,
                loading: false,
                error: action.payload.error,
                message: null
            }
            break;
        case userConstants.INIT:
            state = {
                ...initState
            }
            break;
        case userConstants.MESSAGE:
            state = {
                ...state,
                message: action.payload.message,
            }
            break;
    }

    return state;
}