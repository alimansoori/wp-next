import { productConstants } from "../actions/constants";

const initState = {
    products: [],
    pageInfo: null,
    error: null,
    loading: false,
    loadingAddToProducts: false,
    searchInput: {
        first: 50,
        last: null,
        after: "",
        before: "",
        where: {
            search: "",
            status: "publish",
            type: "SIMPLE",
            tagIdIn: [],
            tagIn: [],
            categoryIn: [],
            categoryIdIn: [],
            taxonomyFilter: [
                {
                    and: [
                        {
                            ids: [],
                            operator: "AND",
                            taxonomy: "PAPUBLISHER",
                            terms: []
                        },
                        {
                            ids: [],
                            operator: "AND",
                            taxonomy: "PATRANSLATOR",
                            terms: []
                        }
                    ]
                }
            ]
        }
    }
}

export default (state = initState, action) => {

    switch (action.type) {
        case productConstants.SEARCH_PRODUCTS_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case productConstants.SEARCH_PRODUCTS_SUCCESS:
            state = {
                ...state,
                loading: false,
                products: action.payload.products
            }
            break;
        case productConstants.SEARCH_PRODUCTS_FAILURE:
            state = {
                ...state,
                error: action.payload.error,
                loading: false
            }
            break;
        case productConstants.GET_ALL_PRODUCTS_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case productConstants.GET_ALL_PRODUCTS_SUCCESS:
            state = {
                ...state,
                loading: false,
                products: action.payload.products,
                pageInfo: action.payload.pageInfo
            }
            break;
        case productConstants.GET_ADD_PRODUCTS_REQUEST:
            state = {
                ...state,
                loadingAddToProducts: true
            }
            break;
        case productConstants.GET_ADD_PRODUCTS_SUCCESS:
            state = {
                ...state,
                loadingAddToProducts: false,
                products: state.products.concat(action.payload.products),
                pageInfo: action.payload.pageInfo
            }
            break;
        case productConstants.GET_ALL_PRODUCTS_FAILURE:
            state = {
                ...state,
                error: action.payload.error,
                loadingAddToProducts: false
            }
            break;
        case productConstants.GET_ALL_PRODUCTS_FAILURE:
            state = {
                ...state,
                error: action.payload.error,
                loading: false
            }
            break;
        case productConstants.PRODUCTS_NEW_DATA:
            state = {
                ...state,
                loading: false,
                products: action.payload.products
            }
            break;
        case productConstants.PRODUCT_SEARCH_BY_TEXT:
            state = {
                ...state,
                searchInput: {
                    ...state.searchInput,
                    where: {
                        ...state.searchInput.where,
                        search: action.payload.search
                    }

                },
            }
            break;
        case productConstants.PRODUCT_SEARCH_BY_CATEGORY_SLUG:
            state = {
                ...state,
                searchInput: {
                    ...state.searchInput,
                    where: {
                        ...state.searchInput.where,
                        categoryIn: action.payload.categoryIn
                    }
                },
            };
            break;
        case productConstants.PRODUCTS_INIT:
            state = {
                ...state,
                products: action.payload.products,
                pageInfo: action.payload.pageInfo
            };
            break;
    }

    return state;
}