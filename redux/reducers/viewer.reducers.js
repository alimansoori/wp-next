import {viewerConstants} from "../actions/constants";

const initState = {
    viewer: null,
    error: null,
    message: null,
    loading: false
}

export default (state = initState, action) => {
    switch (action.type) {
        case viewerConstants.VIEWER_REGISTER_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case viewerConstants.VIEWER_REGISTER_SUCCESS:
            state = {
                ...state,
                loading: false,
                viewer: action.payload.viewer,
                message: action.payload.message,
                error: null
            }
            break;
        case viewerConstants.VIEWER_REGISTER_FAILURE:
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