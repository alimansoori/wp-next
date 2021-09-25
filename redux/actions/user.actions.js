import {authConstants, userConstants, viewerConstants} from "./constants";
import client from "../../components/ApolloClient";
import REGISTER_USER from "../../gql/mutations/register-user";
import {v4} from "uuid";
import UPDATE_USER from "../../gql/mutations/update-user";
import {initializeApollo} from "../../components/Apollo";
import {setCookie} from "nookies";

export const signup = (user) => {

    return async (dispatch) => {

        dispatch({type: userConstants.USER_REGISTER_REQUEST});

        try {
            const res = await axios.post(`/wp/v2/users/register`,
                {...user},
                {
                    "headers": {

                        "content-type": "application/json",

                    }
                }
            );

            if (res.status === 200) {
                const {message} = res.data;

                dispatch({
                    type: userConstants.USER_REGISTER_SUCCESS,
                    payload: {
                        message,
                        user: {...user}
                    }
                });
            }
        } catch (error) {
            if (error.response.status === 400) {
                dispatch({
                    type: userConstants.USER_REGISTER_FAILURE,
                    payload: {
                        error: error.response.data.message
                    }
                });
            }
        }
    }
}

export const registerUser = (registerForm = {}) => {
    return async dispatch => {
        dispatch({
            type: authConstants.LOGIN_REQUEST
        })

        const apolloClient = initializeApollo()
        try {
            const result = await apolloClient.mutate({
                mutation: REGISTER_USER,
                variables: {
                    input: {
                        clientMutationId: v4(),
                        ...registerForm
                    }
                }
            })

            const {
                user,
                authToken,
                refreshToken,
                secondSendAgain,
                message
            } = result.data.register;

            if (authToken) {
                setCookie(null, 'wp-next-token', authToken);
                setCookie(null, 'user', JSON.stringify(user));
                dispatch({
                    type: authConstants.LOGIN_SUCCESS,
                    payload: {
                        token: authToken,
                        user: user,
                        secondSendAgain,
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
                type: authConstants.LOGIN_FAILURE,
                payload: {
                    error: error.message
                }
            })
        }
    }
}

export const updateUser = (updateForm = {}) => {
    return async (dispatch, getState) => {
        dispatch({
            type: userConstants.UPDATE_USER_REQUEST
        })
        const apolloClient = initializeApollo()

        const {viewer} = getState()

        try {
            const result = await apolloClient.mutate({
                mutation: UPDATE_USER,
                variables: {
                    input: {
                        clientMutationId: v4(),
                        id: viewer.viewer.id,
                        ...updateForm
                    }
                }
            })

            const {user} = result.data.updateUser

            dispatch({
                type: userConstants.UPDATE_USER_SUCCESS,
                payload: {
                    message: 'تغییرات با موفقیت انجام شد'
                }
            })

            dispatch({
                type: viewerConstants.VIEWER_REGISTER_SUCCESS,
                payload: {
                    viewer: user
                }
            })
        } catch (error) {
            dispatch({
                type: userConstants.UPDATE_USER_FAILURE,
                payload: {
                    error: error.message
                }
            })
        }
    }
}