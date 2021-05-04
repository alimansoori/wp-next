import React, { useState } from "react";
import { authConstants, customerConstants, userConstants, viewerConstants } from "./constants";
import LOGIN_USER from "../../gql/mutations/login-user";
import client from "../../components/ApolloClient";
import { v4 } from "uuid";
import REFRESH_TOKEN from "../../gql/mutations/refresh-token";
import GET_VIEWER from "../../gql/queries/get-viewer";
import { getViewer } from "./viewer.actions";
import { getCustomer } from "./customer.actions";

export const loginUser = (loginForm = {}) => {
    return async dispatch => {
        dispatch({
            type: authConstants.LOGIN_REQUEST
        })

        try {
            const result = await client.mutate({
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
                }
            })

            const { user, authToken, customer } = result.data.login

            localStorage.setItem('wp-next-token', authToken);
            localStorage.setItem('user', JSON.stringify(user));

            dispatch({
                type: authConstants.LOGIN_SUCCESS,
                payload: {
                    token: authToken,
                    user: user
                }
            })
            dispatch({
                type: viewerConstants.VIEWER_REGISTER_SUCCESS,
                payload: {
                    viewer: user
                }
            })
            dispatch({
                type: customerConstants.GET_CUSTOMER_SUCCESS,
                payload: {
                    customer
                }
            })
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

export const isUserLoggedIn = () => {
    return async dispatch => {
        dispatch({ type: authConstants.REFRESH_TOKEN_REQUEST });

        const token = localStorage.getItem('wp-next-token');

        if (typeof token === undefined) {
            localStorage.removeItem('wp-next-token');
        }


        try {
            if (token) {
                const result = await client.mutate({
                    mutation: REFRESH_TOKEN,
                    variables: {
                        input: {
                            clientMutationId: v4(),
                            jwtRefreshToken: token
                        }
                    }
                })

                

                // const qry = await client.query({
                //     query: GET_VIEWER,
                // })

                const { authToken } = result.data.refreshJwtAuthToken
                // const { viewer } = qry.data
                localStorage.setItem('wp-next-token', authToken)
                console.log('wp-next-token', authToken)

                dispatch({
                    type: authConstants.REFRESH_TOKEN_SUCCESS,
                    payload: {
                        token: authToken
                    }
                });

                dispatch(getViewer())
                dispatch(getCustomer())
                // dispatch({
                //     type: viewerConstants.VIEWER_REGISTER_SUCCESS,
                //     payload: {
                //         viewer
                //     }
                // });
                return true
            }
        } catch (error) {
            localStorage.removeItem('wp-next-token');
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
        dispatch({ type: authConstants.LOGOUT_REQUEST });
        localStorage.removeItem('wp-next-token');
        dispatch({
            type: authConstants.LOGOUT_SUCCESS
        });
    }
}