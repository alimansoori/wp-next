import { viewerConstants } from "../actions/constants";

const initState = {
    viewer: null,
    favorite: {
        favorites: [],
        favoritesProducts: [],
        loading: false,
        error: null,
        message: null
    },
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
        case viewerConstants.INIT_FAVORITES_REQUEST:
            state = {
                ...state,
                favorite: {
                    ...state.favorite,
                    loading: true
                }
            }
            break;
        case viewerConstants.INIT_FAVORITES_SUCCESS:
            state = {
                ...state,
                favorite: {
                    ...state.favorite,
                    loading: false,
                    favorites: action.payload.favorites
                }
            }
            break;
        case viewerConstants.INIT_FAVORITES_FAILURE:
            state = {
                ...state,
                favorite: {
                    ...state.favorite,
                    loading: false,
                    error: action.payload.error
                }
            }
            break;
        case viewerConstants.ADD_TO_FAVORITES_REQUEST:
            state = {
                ...state,
                favorite: {
                    ...state.favorite,
                    loading: true,
                    message: null
                }
            }
            break;
        case viewerConstants.ADD_TO_FAVORITES_SUCCESS:
            if (!state.favorite.favorites.includes(action.payload.productSlug)) {
                state = {
                    ...state,
                    favorite: {
                        ...state.favorite,
                        loading: false,
                        message: action.payload.message,
                        favorites: [
                            ...state.favorite.favorites,
                            action.payload.productSlug,
                        ]
                    }
                }
            } else {
                state = {
                    ...state,
                    favorite: {
                        ...state.favorite,
                        loading: false,
                        message: `این محصول در لیست علاقه‌مندی‌های شما موجود است!`,
                    }
                }
            }
            break;
        case viewerConstants.ADD_TO_FAVORITES_FAILURE:
            state = {
                ...state,
                favorite: {
                    ...state.favorite,
                    loading: false,
                    error: action.payload.error
                }
            }
            break;
        case viewerConstants.REMOVE_FROM_FAVORITES_REQUEST:
            state = {
                ...state,
                favorite: {
                    ...state.favorite,
                    loading: true
                }
            }
            break;
        case viewerConstants.REMOVE_FROM_FAVORITES_SUCCESS:
            const index = state.favorite.favorites.indexOf(action.payload.productSlug);
            if (index > -1) {
                state.favorite.favorites.splice(index, 1);
            }
            state = {
                ...state,
                favorite: {
                    ...state.favorite,
                    loading: false
                }
            }
            break;
        case viewerConstants.REMOVE_FROM_FAVORITES_FAILURE:
            state = {
                ...state,
                favorite: {
                    ...state.favorite,
                    loading: false,
                    error: action.payload.error
                }
            }
            break;
        case viewerConstants.INIT_FAVORITES_PRODUCTS_REQUEST:
            state = {
                ...state,
                favorite: {
                    ...state.favorite,
                    loading: true
                }
            }
            break;
        case viewerConstants.INIT_FAVORITES_PRODUCTS_SUCCESS:
            state = {
                ...state,
                favorite: {
                    ...state.favorite,
                    loading: false,
                    favoritesProducts: action.payload.products,
                    error: action.payload.error
                }
            }
            break;
        case viewerConstants.INIT_FAVORITES_PRODUCTS_FAILURE:
            state = {
                ...state,
                favorite: {
                    ...state.favorite,
                    loading: false,
                    error: action.payload.error
                }
            }
            break;
        case viewerConstants.SET_VIEWER:
            state = {
                ...state,
                viewer: action.payload.viewer
            }
            break;
        case viewerConstants.CLEAR_FAVORITE_MESSAGE:
            state = {
                ...state,
                favorite: {
                    ...state.favorite,
                    message: null
                }
            }
            break;

    }

    return state;
}