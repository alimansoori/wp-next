import {categoryConstants} from "../actions/constants";

const initState = {
    categories: [],
    categoriesFilter: {
        isRoot: false,
        activeId: null,
        node: []
    },
    parentId: 0,
    currentCategory: {},
    error: null,
    loading: false,
    searchInput: {
        first: 200
    }
}

export default (state = initState, action) => {
    switch (action.type) {
        case categoryConstants.SEARCH_CATEGORY_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case categoryConstants.SEARCH_CATEGORY_SUCCESS:
            state = {
                ...state,
                categories: action.payload.categories,
                loading: false
            }
            break;
        case categoryConstants.SEARCH_CATEGORY_FAILURE:
            state = {
                ...state,
                loading: false,
                error: action.payload.error
            }
            break;
        case categoryConstants.CATEGORY_FILTERS_BY_SLUGS:
            state = {
                ...state,
                categoriesFilter: action.payload.categoriesFilter
            }
            break;
    }

    return state;
}