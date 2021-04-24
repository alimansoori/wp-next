import React, { useState } from "react";
import { authConstants, userConstants } from "./constants";
import LOGIN_USER from "../../gql/mutations/login-user";
import client from "../../components/ApolloClient";
import { v4 } from "uuid";
import REFRESH_TOKEN from "../../gql/mutations/refresh-token";
import GET_VIEWER from "../../gql/queries/get-viewer";

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
                    }
                }
            })

            const { user, authToken } = result.data.login

            localStorage.setItem('wp-next-token', authToken);
            localStorage.setItem('user', JSON.stringify(user));

            dispatch({
                type: authConstants.LOGIN_SUCCESS,
                payload: {
                    token: authToken,
                    user: user
                }
            })
        } catch (error) {
            console.log(error.message);
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

                const qry = await client.query({
                    query: GET_VIEWER,
                })

                const { authToken } = result.data.refreshJwtAuthToken
                const { viewer } = qry.data
                localStorage.setItem('wp-next-token', authToken)

                dispatch({
                    type: authConstants.REFRESH_TOKEN_SUCCESS,
                    payload: {
                        token: authToken,
                        user: viewer
                    }
                });
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