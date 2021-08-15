import React, {memo, useEffect, useRef} from 'react'
import Router, {useRouter} from 'next/router'
import BaseLayout from '../components/layouts/BaseLayout'
import ProgressBar from "@badrap/bar-of-progress"
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-notifications/lib/notifications.css';
import '../styles/main.scss'
import {Provider, useDispatch} from 'react-redux'
import store from '../redux/store'
import {viewerConstants} from '../redux/actions/constants'
import {ApolloProvider} from "@apollo/client";
import {ApolloProvider as ApolloHooksProvider} from '@apollo/react-hooks'
import {initializeApollo, useApollo} from "../components/Apollo";
import GET_VIEWER from "../gql/queries/get-viewer";
import {NotificationContainer} from "react-notifications";

const progress = new ProgressBar({
    size: 4,
    color: "#38a169",
    className: "bar-of-progress",
    delay: 100,
});

Router.events.on("routeChangeStart", progress.start);
Router.events.on("routeChangeComplete", progress.finish);
Router.events.on("routeChangeError", progress.finish);

function App(props) {
    const {Component, pageProps} = props
    const client = useApollo(pageProps?.initialApolloState)

    if (props.viewer) {
        store.dispatch({
            type: viewerConstants.VIEWER_REGISTER_SUCCESS,
            payload: {
                viewer: props.viewer
            }
        })
    }

    return (
        <ApolloProvider client={client}>
            <ApolloHooksProvider client={client}>
                <Provider store={store}>
                    <BaseLayout>
                        <Component {...pageProps}/>
                        <NotificationContainer/>
                    </BaseLayout>
                </Provider>
            </ApolloHooksProvider>
        </ApolloProvider>
    )
}

App.getInitialProps = async (ctx) => {
    if (typeof window !== "undefined") return {viewer: {}}

    const apolloClient = initializeApollo(null, ctx.ctx)

    try {
        const resViewer = await apolloClient.query({
            query: GET_VIEWER
        })

        const {viewer} = await resViewer.data

        return {viewer}
    } catch (error) {
        return {viewer: null}
    }

    return {viewer: null}
}

export default App