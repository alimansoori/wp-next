import { viewerConstants } from "./constants";
import client from "../../components/ApolloClient";
import GET_VIEWER from "../../gql/queries/get-viewer";

export const getViewer = () => {
    return async dispatch => {
        dispatch({
            type: viewerConstants.VIEWER_REGISTER_REQUEST
        })

        try {
            const result = await client.query({
                query: GET_VIEWER,
            })

            const { viewer } = result.data

            dispatch({
                type: viewerConstants.VIEWER_REGISTER_SUCCESS,
                payload: {
                    viewer
                }
            })
        } catch (error) {
            dispatch({
                type: viewerConstants.VIEWER_REGISTER_FAILURE,
                payload: {
                    error: error.message
                }
            })
        }
    }
}