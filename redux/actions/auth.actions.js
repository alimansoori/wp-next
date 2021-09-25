import React, {useState} from "react";
import {authConstants, customerConstants, userConstants, viewerConstants} from "./constants";
import LOGIN_USER from "../../gql/mutations/login-user";
import client from "../../components/ApolloClient";
import {v4} from "uuid";
import REFRESH_TOKEN from "../../gql/mutations/refresh-token";
import {getViewer} from "./viewer.actions";
import {getCustomer, initAddressesAndFavorites} from "./customer.actions";
import {getCart} from "./cart.actions";
import {parseCookies, setCookie, destroyCookie} from 'nookies'
import {initializeApollo} from "../../components/Apollo";
import FORGET_PASSWORD from "../../gql/mutations/forget-password";

export const loginUser = (loginForm = {}) => {
    return async dispatch => {
        dispatch({
            type: authConstants.LOGIN_REQUEST
        })

        const apolloClient = initializeApollo()
        try {
            const result = await apolloClient.mutate({
                mutation: LOGIN_USER,
                variables: {
                    input: {
                        clientMutationId: v4(),
                        ...loginForm
                    },
                    keysIn: [
                        "number-address",
                        "address-"
                    ],
                    multiple: true
                },
            })

            const {user, authToken, refreshToken, message, secondSendAgain} = result.data.login

            if (authToken) {
                setCookie(null, 'wp-next-token', authToken);
                setCookie(null, 'user', JSON.stringify(user));
                dispatch({
                    type: authConstants.LOGIN_SUCCESS,
                    payload: {
                        token: authToken,
                        user: user,
                        message
                    }
                })
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
            } else {
                dispatch({
                    type: authConstants.CHANGE_STATE,
                    payload: {
                        message,
                        secondSendAgain
                    }
                })
            }

            /*dispatch({
                type: customerConstants.GET_CUSTOMER_SUCCESS,
                payload: {
                    customer
                }
            })*/

            // dispatch(getCart())
        } catch (error) {
            dispatch({
                type: authConstants.LOGIN_FAILURE,
                payload: {
                    error: error.message
                }
            })
        }
    }
}

export const forgetPassword = (forgetPasswordInput = {}) => {
    return async dispatch => {
        dispatch({
            type: authConstants.FORGET_PASSWORD_REQUEST
        })

        const apolloClient = initializeApollo()
        try {
            const result = await apolloClient.mutate({
                mutation: FORGET_PASSWORD,
                variables: {
                    input: {
                        clientMutationId: v4(),
                        ...forgetPasswordInput
                    }
                },
            })

            const {message, secondSendAgain, type} = result.data.forgetPassword

            if (type === 'authenticate') {
                dispatch({
                    type: authConstants.FORGET_PASSWORD_SUCCESS,
                    payload: {
                        message
                    }
                })
            } else {
                dispatch({
                    type: authConstants.CHANGE_STATE,
                    payload: {
                        message,
                        secondSendAgain
                    }
                })
            }
        } catch (error) {
            dispatch({
                type: authConstants.FORGET_PASSWORD_FAILURE,
                payload: {
                    error: error.message
                }
            })
        }
    }
}

export const isUserLoggedIn = () => {
    return async dispatch => {
        dispatch({type: authConstants.REFRESH_TOKEN_REQUEST});

        const apolloClient = initializeApollo()
        const cookies = parseCookies()
        const token = cookies['wp-next-token'];

        if (typeof token === "undefined") {
            destroyCookie(null, 'wp-next-token')
        }

        try {
            if (token) {
                const result = await apolloClient.mutate({
                    mutation: REFRESH_TOKEN,
                    variables: {
                        input: {
                            clientMutationId: v4(),
                            jwtRefreshToken: token
                        }
                    },
                })

                // const qry = await client.query({
                //     query: GET_VIEWER,
                // })

                const {authToken} = result.data.refreshJwtAuthToken
                // const { viewer } = qry.data
                setCookie(null, 'wp-next-token', authToken)
                // console.log('wp-next-token', authToken)

                dispatch({
                    type: authConstants.REFRESH_TOKEN_SUCCESS,
                    payload: {
                        token: authToken
                    }
                });

                dispatch(getViewer())
                // dispatch(getCart())
                dispatch(getCustomer())
                // dispatch({
                //     type: viewerConstants.VIEWER_REGISTER_SUCCESS,
                //     payload: {
                //         viewer
                //     }
                // });
                return true
            } else {
                throw "User is Guest"
            }
        } catch (error) {
            destroyCookie(null, 'wp-next-token')
            dispatch({
                type: authConstants.REFRESH_TOKEN_FAILURE,
                payload: {
                    error: error.message
                }
            });
            return false
        }
    }
}

export const signout = () => {
    return async dispatch => {
        dispatch({type: authConstants.LOGOUT_REQUEST});
        destroyCookie(null, 'wp-next-token')
        dispatch({
            type: authConstants.LOGOUT_SUCCESS
        });
    }
}