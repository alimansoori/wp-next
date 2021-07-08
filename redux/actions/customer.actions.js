import { authConstants, customerConstants, viewerConstants } from "./constants";
import client from "../../components/ApolloClient";
import GET_CUSTOMER from "../../gql/queries/get-customer";
import UPDATE_CUSTOMER from "../../gql/mutations/update-customer";
import UPDATE_USER from "../../gql/mutations/update-user";
import { getCart } from "./cart.actions";
import { getViewer } from "./viewer.actions";
import { v4 } from "uuid";

export const getCustomer = () => {
    return async dispatch => {
        dispatch({
            type: customerConstants.GET_CUSTOMER_REQUEST
        })

        try {
            const result = await client.query({
                query: GET_CUSTOMER,
                variables: {
                    key: "number-address",
                    multiple: true
                },
                fetchPolicy: 'network-only'
            })

            const { customer } = result.data

            dispatch({
                type: customerConstants.GET_CUSTOMER_SUCCESS,
                payload: {
                    customer
                }
            })
        } catch (error) {
            dispatch({
                type: customerConstants.GET_CUSTOMER_FAILURE,
                payload: {
                    error: error.message
                }
            })
        }
    }
}

export const updateCustomer = (input) => {
    return async dispatch => {
        dispatch({
            type: customerConstants.CUSTOMER_UPDATE_REQUEST
        })

        try {
            const result = await client.mutate({
                mutation: UPDATE_CUSTOMER,
                variables: {
                    input,
                },
                fetchPolicy: "no-cache"
            })

            const { customer } = result.data.updateCustomer

            dispatch({
                type: customerConstants.CUSTOMER_UPDATE_SUCCESS,
                payload: {
                    customer
                }
            })

            dispatch(getCart())
        } catch (error) {
            dispatch({
                type: customerConstants.CUSTOMER_UPDATE_FAILURE,
                payload: {
                    error: error.message
                }
            })
        }
    }
}

export const initAddressesAndFavorites = (addressesString) => {
    return async (dispatch, getState) => {
        dispatch({
            type: customerConstants.INIT_ADDRESSES_REQUEST
        })
        dispatch({
            type: viewerConstants.INIT_FAVORITES_REQUEST
        })
        

        try {
            const {address, favorites} = JSON.parse(addressesString)

            if (typeof address === "object" && address !== null) {
                dispatch({
                    type: customerConstants.INIT_ADDRESSES_SUCCESS,
                    payload: {
                        addresses: { ...address }
                    }
                })
            } else throw "address is not json"

            if (Array.isArray(favorites) && favorites !== null) {
                dispatch({
                    type: viewerConstants.INIT_FAVORITES_SUCCESS,
                    payload: {
                        favorites
                    }
                })
            } else throw "favorites is not array"

        } catch (error) {
            dispatch({
                type: customerConstants.INIT_ADDRESSES_FAILURE,
                payload: {
                    error: error.message
                }
            })
            dispatch({
                type: viewerConstants.INIT_FAVORITES_FAILURE,
                payload: {
                    error: error.message
                }
            })
        }
    }
}

export const setActiveAddress = (active = null) => {
    return async (dispatch, getState) => {
        dispatch({
            type: customerConstants.SET_ACTIVE_ADDRESS_REQUEST
        })

        try {
            const { customer } = getState()
            const { addresses } = customer.address
            if (!addresses) throw "آدرسی هنوز تنظیم نشده است"
            if (!addresses[active]) throw "آدرسی برای این اکتیو وجود ندارد"

            dispatch({
                type: customerConstants.SET_ACTIVE_ADDRESS_SUCCESS,
                payload: {
                    active: active
                }
            })

            dispatch(saveAddressesAndFavorites())

        } catch (error) {
            dispatch({
                type: customerConstants.SET_ACTIVE_ADDRESS_FAILURE,
                payload: {
                    error: error.message
                }
            })
        }
    }
}

export const removeAddress = (key = null) => {
    return async (dispatch, getState) => {
        dispatch({
            type: customerConstants.REMOVE_ADDRESS_REQUEST
        })

        try {
            const { customer } = getState()
            const { addresses } = customer.address
            if (!addresses) throw "آدرسی هنوز تنظیم نشده است"
            if (!addresses[key]) throw "آدرسی برای این ایندکس وجود ندارد"

            dispatch({
                type: customerConstants.REMOVE_ADDRESS_SUCCESS,
                payload: {
                    key: key
                }
            })

            dispatch(saveAddressesAndFavorites())

        } catch (error) {
            dispatch({
                type: customerConstants.REMOVE_ADDRESS_FAILURE,
                payload: {
                    error: error.message
                }
            })
        }
    }
}

export const addNewAddress = (newAddress) => {
    return async (dispatch, getState) => {
        dispatch({
            type: customerConstants.ADD_NEW_ADDRESS_REQUEST
        })

        try {
            const { customer } = getState()
            const { addresses } = customer.address

            // last key
            let key = 1
            if (addresses !== null && typeof addresses === "object" && typeof addresses !== "undefined") {
                if (Object.keys(addresses).length !== 0) {
                    key = parseInt((Object.keys(addresses))[Object.keys(addresses).length - 1]) + 1
                }
            }

            dispatch({
                type: customerConstants.ADD_NEW_ADDRESS_SUCCESS,
                payload: {
                    newAddress,
                    key
                }
            })

            dispatch(saveAddressesAndFavorites())

        } catch (error) {
            dispatch({
                type: customerConstants.ADD_NEW_ADDRESS_FAILURE,
                payload: {
                    error: error.message
                }
            })
        }
    }
}

export const editAddress = (editKey, editAddress) => {
    return async (dispatch, getState) => {
        dispatch({
            type: customerConstants.EDIT_ADDRESS_REQUEST
        })

        try {
            const { customer } = getState()
            const { addresses } = customer.address
            if (!addresses) throw "آدرسی هنوز تنظیم نشده است"
            if (!addresses[editKey]) throw "آدرسی برای این ایندکس وجود ندارد"


            dispatch({
                type: customerConstants.EDIT_ADDRESS_SUCCESS,
                payload: {
                    editAddress,
                    editKey
                }
            })

            dispatch(saveAddressesAndFavorites())

        } catch (error) {
            dispatch({
                type: customerConstants.EDIT_ADDRESS_FAILURE,
                payload: {
                    error: error.message
                }
            })
        }
    }
}

export const saveAddressesAndFavorites = () => {
    return async (dispatch, getState) => {
        dispatch({
            type: customerConstants.SAVE_ADDRESSES_REQUEST
        })

        try {
            const { customer, viewer } = getState()
            const { addresses, active } = customer.address

            const result = await client.mutate({
                mutation: UPDATE_USER,
                variables: {
                    input: {
                        id: viewer.viewer.id,
                        description: JSON.stringify({
                            address: {
                                active,
                                addresses
                            },
                            favorites: viewer.favorite.favorites
                        }),
                        clientMutationId: v4()
                    }
                },
                fetchPolicy: "no-cache"
            })

            const { user } = result.data.updateUser

            dispatch({
                type: viewerConstants.VIEWER_REGISTER_SUCCESS,
                payload: {
                    viewer: user
                }
            })

            // set address billing
            if (user.description) {
                dispatch(initAddressesAndFavorites(user.description))
            }

            dispatch({ type: customerConstants.SAVE_ADDRESSES_SUCCESS })

        } catch (error) {
            dispatch({
                type: customerConstants.SAVE_ADDRESSES_FAILURE,
                payload: {
                    error: error.message
                }
            })
        }
    }
}