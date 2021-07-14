import fetch from 'node-fetch';
import { setContext } from "@apollo/client/link/context";
import { ApolloClient, InMemoryCache, ApolloLink, createHttpLink } from '@apollo/client';
import cookie from 'js-cookie'
import nookies, { setCookie, parseCookies } from 'nookies'



import { IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';
import introspectionQueryResultData from '../fragmentTypes.json';

import clientConfig from './../client-config';

// Fragment matcher.
const fragmentMatcher = new IntrospectionFragmentMatcher({
    introspectionQueryResultData
});

const isServer = () => {
    if (typeof window === 'undefined') {
        return true
    }

    return false
}

/**
 * Middleware operation
 * If we have a session token in localStorage, add it to the GraphQL request as a Session header.
 */
export const middleware = new ApolloLink((operation, forward) => {
    const cookies = parseCookies()
    /**
     * If session data exist in local storage, set value as session header.
     */
    // console.log('fff', sessionStorage.getItem("wp-next-session"))
    const session = cookies['wp-next-session']

    if (session) {
        operation.setContext(({ headers = {} }) => ({
            headers: {
                'woocommerce-session': `Session ${session}`,
            }
        }));
    }

    return forward(operation);

});

export const ssrMiddleware = (ctx) => new ApolloLink((operation, forward) => {

    const cookies = nookies.get(ctx)
    /**
     * If session data exist in local storage, set value as session header.
     */
    const session = cookies['wp-next-session'] ? cookies['wp-next-session'] : null

    if (session) {
        operation.setContext(({ headers = {} }) => ({
            headers: {
                'woocommerce-session': `Session ${session}`,
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
    const cookies = parseCookies()

    return forward(operation).map(response => {
        /**
         * Check for session header and update session in local storage accordingly.
         */
        const context = operation.getContext();
        const { response: { headers } } = context;
        const session = headers.get("woocommerce-session");

        if (session) {
            if (cookies["wp-next-session"] !== session) {
                setCookie(null, "wp-next-session", headers.get("woocommerce-session"));
            }
        }

        return response;

    });
});

export const ssrAfterware = (ctx) => new ApolloLink((operation, forward) => {

    const cookies = nookies.get(ctx)

    return forward(operation).map(response => {
        /**
         * Check for session header and update session in local storage accordingly.
         */
        const context = operation.getContext();
        const { response: { headers } } = context;
        const session = headers.get("woocommerce-session");

        if (session) {
            if (cookies["wp-next-session"] !== session) {
                nookies.set(ctx, 'wp-next-session', headers.get("woocommerce-session"))
            }
        }

        return response;

    });
});

export const authLink = setContext((_, { headers }) => {
    const cookies = parseCookies()

    // get the authentication token from local storage if it exists
    const token = cookies['wp-next-token'] ? cookies['wp-next-token'] : null

    // if (_.variables?.token) {
    //     delete _.variables.token
    // }
    // return the headers to the context so httpLink can read them
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : "",
        }
    }
});

export const ssrAuthLink = (ctx) => setContext((_, { headers }) => {

    const cookies = nookies.get(ctx)
    // get the authentication token from local storage if it exists
    const token = cookies['wp-next-token'] ? cookies['wp-next-token'] : null

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

// Apollo GraphQL SSR client.
export const ssrClient = (ctx) => new ApolloClient({
    link: ssrMiddleware(ctx).concat(
        ssrAfterware(ctx).concat(
            ssrAuthLink(ctx).concat(
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
