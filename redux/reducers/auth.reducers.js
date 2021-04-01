import {authConstants} from "../actions/constants";

const initState = {
    token: "",
    user: {},
    authenticate: false,
    authenticating: false,
    loading: false,
    error: "",
    message: ""
}

const AuthReducers = (state = initState, action) => {

    switch (action.type) {
        case authConstants.LOGIN_REQUEST:
            state = {
                ...state,
                authenticating: true
            }
            break;
        case authConstants.LOGIN_SUCCESS:
            state = {
                ...state,
                user: action.payload.user,
                token: action.payload.token,
                authenticate: true,
                authenticating: false
            }
            break;
        case authConstants.LOGIN_FAILURE:
            state = {
                ...state,
                authenticate: false,
                authenticating: false,
                error: action.payload.error
            }
            break;
        case authConstants.LOGOUT_REQUEST:
            state = {
                ...state,
                authenticating: true
            }
            break;
        case authConstants.LOGOUT_SUCCESS:
            state = {
                ...state,
                authenticate: false,
                authenticating: false
            }
            break;
        case authConstants.LOGOUT_FAILURE:
            state = {
                ...state,
                error: action.payload.error,
                authenticating: false
            }
            break;
        case authConstants.REFRESH_TOKEN_REQUEST:
            state = {
                ...state,
                authenticating: true
            }
            break;
        case authConstants.REFRESH_TOKEN_SUCCESS:
            state = {
                ...state,
                token: action.payload.token,
                user: action.payload.user,
                authenticating: false,
                authenticate: true
            }
            break;
        case authConstants.REFRESH_TOKEN_FAILURE:
            state = {
                ...state,
                error: action.payload.error,
                authenticate: false,
                authenticating: false
            }
            break;
    }

    return state;
}

export default AuthReducers;