import React, {FC} from 'react'
import Router from 'next/router'
import BaseLayout from '../components/layouts/BaseLayout'
import ProgressBar from "@badrap/bar-of-progress"
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-notifications/lib/notifications.css';
import '../styles/main.scss'
// import "@assets/main.css"
import {Provider} from 'react-redux'
import store from '../redux/store'
import {viewerConstants} from '../redux/actions/constants'
import {ApolloProvider} from "@apollo/client";
import {ApolloProvider as ApolloHooksProvider} from '@apollo/react-hooks'
import {useApollo} from "../components/Apollo";
// @ts-ignore
import {NotificationContainer} from "react-notifications";
import {AppProps} from "next/app"

const progress = new ProgressBar({
    size: 4,
    color: "#38a169",
    className: "bar-of-progress",
    delay: 100,
});
Router.events.on("routeChangeStart", progress.start);
Router.events.on("routeChangeComplete", progress.finish);
Router.events.on("routeChangeError", progress.finish);

// Goftino
if (typeof window !== "undefined") {
    // @ts-ignore
    !function () {
        var i = "WYuF9k", a = window, d = document;

        function g() {
            var g = d.createElement("script"), s = "https://www.goftino.com/widget/" + i,
                l = localStorage.getItem("goftino_" + i);
            g.async = !0, g.src = l ? s + "?o=" + l : s;
            d.getElementsByTagName("head")[0].appendChild(g);
        }

        // @ts-ignore
        "complete" === d.readyState ? g() : a.attachEvent ? a.attachEvent("onload", g) : a.addEventListener("load", g, !1);
    }();
}

const Noop: FC = ({children}) => <>{children}</>

function MyApp({Component, pageProps}: AppProps & { Component: { Layout: FC } }) {
    const client = useApollo(pageProps?.initialApolloState)

    const Layout = Component.Layout ?? Noop

    return (
        <Layout>
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
        </Layout>
    )
}

export default MyApp