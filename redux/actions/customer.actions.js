import { authConstants, cartConstants, customerConstants, viewerConstants } from "./constants";
import client from "../../components/ApolloClient";
import GET_CUSTOMER from "../../gql/queries/get-customer";
import UPDATE_CUSTOMER from "../../gql/mutations/update-customer";
import UPDATE_USER from "../../gql/mutations/update-user";
import { getCart } from "./cart.actions";
import { getViewer } from "./viewer.actions";
import { v4 } from "uuid";
import {initializeApollo} from "../../components/Apollo";

export const getCustomer = () => {
    return async (dispatch, getState) => {
        dispatch({
            type: customerConstants.GET_CUSTOMER_REQUEST
        })

        try {
            const apolloClient = initializeApollo()

            const { viewer } = (getState()).viewer
            let variables = {}

            if (viewer) {
                variables = {
                    customerId: viewer.databaseId,
                    id: viewer.id
                }
            }

            const result = await apolloClient.query({
                query: GET_CUSTOMER,
                variables: { ...variables },
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
    return async (dispatch, getState) => {
        dispatch({
            type: customerConstants.CUSTOMER_UPDATE_REQUEST
        })

        const apolloClient = initializeApollo()
        try {
            const {viewer} = (getState()).viewer
            const {loading} = (getState()).customer
            let newInput = input


            if (viewer) {
                newInput = {
                    ...input,
                    id: viewer?.id
                }
            }

            const result = await apolloClient.mutate({
                mutation: UPDATE_CUSTOMER,
                variables: {
                    input: {
                        ...newInput,
                        clientMutationId: v4()
                    }
                },
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
                    error: error?.message
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
            const { address, favorites } = JSON.parse(addressesString)

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

            dispatch({
                type: cartConstants.SHIPPING_METHOD_REQUEST
            })

            dispatch(
                updateCustomer({
                    billing: {
                        ...addresses[active]
                    },
                    shipping: {
                        ...addresses[active]
                    }
                })
            )

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

        const apolloClient = initializeApollo()
        try {
            const { customer, viewer } = getState()
            const { addresses, active } = customer.address

            const result = await apolloClient.mutate({
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
            console.log(error.message)
            dispatch({
                type: customerConstants.SAVE_ADDRESSES_FAILURE,
                payload: {
                    error: error.message
                }
            })
        }
    }
}