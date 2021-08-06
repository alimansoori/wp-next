import {useMemo} from "react";
import {ApolloClient, InMemoryCache, HttpLink, createHttpLink, ApolloLink} from "@apollo/client";
import clientConfig from "../client-config";
import nookies, {parseCookies, setCookie} from "nookies";
import fetch from "node-fetch";
import {ssrAfterware, ssrAuthLink, ssrMiddleware} from "./ApolloClient";
import {setContext} from "@apollo/client/link/context";

let apolloClient;

export const myMiddleware = (ctx) => new ApolloLink((operation, forward) => {

    let cookies = null;
    if (typeof window === "undefined") {
        cookies = nookies.get(ctx)
    } else {
        cookies = parseCookies()
    }
    /**
     * If session data exist in local storage, set value as session header.
     */
    const session = cookies['wp-next-session'] ? cookies['wp-next-session'] : null

    if (session) {
        operation.setContext(({headers = {}}) => ({
            headers: {
                'woocommerce-session': `Session ${session}`,
            }
        }));
    }

    return forward(operation);

});

export const myAfterware = (ctx) => new ApolloLink((operation, forward) => {

    let cookies = null;
    if (typeof window === "undefined") {
        cookies = nookies.get(ctx)
    } else {
        cookies = parseCookies()
    }

    return forward(operation).map(response => {
        /**
         * Check for session header and update session in local storage accordingly.
         */
        const context = operation.getContext();
        const {response: {headers}} = context;
        const session = headers.get("woocommerce-session");

        if (session) {
            if (cookies["wp-next-session"] && cookies["wp-next-session"] !== session) {
                if (ctx) {
                    nookies.set(ctx, 'wp-next-session', headers.get("woocommerce-session"))
                } else if (typeof window !== "undefined") {
                    setCookie(null, "wp-next-session", headers.get("woocommerce-session"));
                }
            }
        }

        return response;

    });
});

export const myAuthLink = (ctx) => setContext((_, {headers}) => {

    let cookies = null;
    if (typeof window === "undefined") {
        cookies = nookies.get(ctx)
    } else {
        cookies = parseCookies()
    }

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

/*function createApolloClient(ctx = null) {

    return new ApolloClient({
        ssrMode: typeof window === "undefined",
        link: myMiddleware(ctx).concat(
            myAfterware(ctx).concat(
                myAuthLink(ctx).concat(
                    createHttpLink({
                        uri: clientConfig.graphqlUrl,
                        fetch: fetch
                    })
                )
            )
        ),
        cache: new InMemoryCache()
    })
}*/

function createApolloClient(ctx = null) {
    return new ApolloClient({
        ssrMode: typeof window === "undefined", // set to true for SSR
        link: new HttpLink({
            uri: clientConfig.graphqlUrl,
        }),
        cache: new InMemoryCache(),
    });
}

export function initializeApollo(initialState = null, ctx = null) {
    const _apolloClient = apolloClient ?? createApolloClient(ctx);

    // If your page has Next.js data fetching methods that use Apollo Client,
    // the initial state gets hydrated here
    if (initialState) {
        // Get existing cache, loaded during client side data fetching
        const existingCache = _apolloClient.extract();

        // Restore the cache using the data passed from
        // getStaticProps/getServerSideProps combined with the existing cached data
        _apolloClient.cache.restore({...existingCache, ...initialState});
    }

    // For SSG and SSR always create a new Apollo Client
    if (typeof window === "undefined") return _apolloClient;

    // Create the Apollo Client once in the client
    if (!apolloClient) apolloClient = _apolloClient;
    return _apolloClient;
}

export function useApollo(initialState = null) {
    const store = useMemo(() => initializeApollo(initialState), [initialState]);
    return store;
}