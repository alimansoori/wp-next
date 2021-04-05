import fetch from 'node-fetch';
import { setContext } from "@apollo/client/link/context";
import { ApolloClient, InMemoryCache, ApolloLink, createHttpLink } from '@apollo/client';


import { IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';
import introspectionQueryResultData from '../fragmentTypes.json';

import clientConfig from './../client-config';

// Fragment matcher.
const fragmentMatcher = new IntrospectionFragmentMatcher({
    introspectionQueryResultData
});

/**
 * Middleware operation
 * If we have a session token in localStorage, add it to the GraphQL request as a Session header.
 */
export const middleware = new ApolloLink((operation, forward) => {
    /**
     * If session data exist in local storage, set value as session header.
     */
    const session = (process.browser) ? localStorage.getItem("wp-next-session") : null;

    if (session) {
        operation.setContext(({ headers = {} }) => ({
            headers: {
                "woocommerce-session": `Session ${session}`
            }
        }));
    }

    return forward(operation);

});

/**
 * Afterware operation.
 *
 * This catches the incoming session token and stores it in localStorage, for future GraphQL requests.
 */
export const afterware = new ApolloLink((operation, forward) => {

    return forward(operation).map(response => {
        /**
         * Check for session header and update session in local storage accordingly.
         */
        const context = operation.getContext();
        const { response: { headers } } = context;
        const session = headers.get("woocommerce-session");

        if (session) {

            // Remove session data if session destroyed.
            if ("false" === session) {

                (process.browser) ? localStorage.removeItem("wp-next-session") : null;

                // Update session new data if changed.
            } else if (process.browser && localStorage.getItem("wp-next-session") !== session) {
                localStorage.setItem("wp-next-session", headers.get("woocommerce-session"));
            }
        }

        return response;

    });
});

export const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = process.browser ? localStorage.getItem('wp-next-token') : null;
    // return the headers to the context so httpLink can read them
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : "",
        }
    }
});

// Apollo GraphQL client.
const client = new ApolloClient({
    link: middleware.concat(
        afterware.concat(
            authLink.concat(
                createHttpLink({
                    uri: clientConfig.graphqlUrl,
                    fetch: fetch
                })
            )
        )
    ),
    cache: new InMemoryCache({ fragmentMatcher }),
});

export default client;
