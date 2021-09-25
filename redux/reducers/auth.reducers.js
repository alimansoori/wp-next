import {authConstants} from "../actions/constants";

const initState = {
    token: "",
    user: {},
    authenticate: false,
    authenticating: false,
    loading: false,
    error: "",
    secondSendAgain: 0,
    message: ""
}

const AuthReducers = (state = initState, action) => {

    switch (action.type) {
        case authConstants.LOGIN_REQUEST:
            state = {
                ...state,
                authenticating: true,
                loading: true
            }
            break;
        case authConstants.LOGIN_SUCCESS:
            state = {
                ...state,
                user: action.payload.user,
                token: action.payload.token,
                message: action.payload.message,
                secondSendAgain: action.payload.secondSendAgain,
                authenticate: true,
                authenticating: false,
                loading: false,
            }
            break;
        case authConstants.LOGIN_ALERT:
            state = {
                ...state,
                message: action.payload.message,
                authenticating: false,
                loading: false,
            }
            break;
        case authConstants.LOGIN_FAILURE:
            state = {
                ...state,
                authenticate: false,
                authenticating: false,
                error: action.payload.error,
                loading: false
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
        case authConstants.SET_LOGIN:
            state = {
                ...state,
                authenticate: true,
                authenticating: false,
                loading: false
            }
            break;
        case authConstants.INIT:
            state = {
                ...initState
            }
            break;
        case authConstants.CHANGE_STATE:
            state = {
                ...state,
                secondSendAgain: action?.payload?.secondSendAgain,
                message: action?.payload?.message,
                loading: false,
                authenticating: false
            }
            break;
        case authConstants.FORGET_PASSWORD_REQUEST:
            state = {
                ...state,
                authenticating: true,
                loading: true
            }
            break;
        case authConstants.FORGET_PASSWORD_SUCCESS:
            state = {
                ...state,
                message: action.payload.message,
                authenticating: false,
                loading: false,
            }
            break;
        case authConstants.FORGET_PASSWORD_FAILURE:
            state = {
                ...state,
                authenticate: false,
                authenticating: false,
                error: action.payload.error,
                loading: false
            }
            break;
    }

    return state;
}

export default AuthReducers;