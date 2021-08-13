import React, {memo, useEffect, useRef} from 'react'
import Router, {useRouter} from 'next/router'
import BaseLayout from '../components/layouts/BaseLayout'
import ProgressBar from "@badrap/bar-of-progress"
import 'bootstrap/dist/css/bootstrap.min.css'
// import 'mdbreact/dist/css/mdb.css';
import '../styles/main.scss'
import {Provider, useDispatch} from 'react-redux'
import store from '../redux/store'
import {viewerConstants} from '../redux/actions/constants'
import {ApolloProvider} from "@apollo/client";
import {ApolloProvider as ApolloHooksProvider} from '@apollo/react-hooks'
import {useApollo} from "../components/Apollo";
import GET_HOME_PAGE from "../gql/queries/get-home-page";
import GET_CART from "../gql/queries/get-cart";

const progress = new ProgressBar({
    size: 4,
    color: "#38a169",
    className: "bar-of-progress",
    delay: 100,
});

Router.events.on("routeChangeStart", progress.start);
Router.events.on("routeChangeComplete", progress.finish);
Router.events.on("routeChangeError", progress.finish);

const ROUTES_TO_RETAIN = ['/shop']

function App(props) {
    const {Component, pageProps} = props
    const client = useApollo(pageProps?.initialApolloState)

    const router = useRouter()
    const retainedComponents = useRef({})

    const isRetainableRoute = ROUTES_TO_RETAIN.includes(router.asPath)

    // Add Component to retainedComponents if we haven't got it already
    if (isRetainableRoute && !retainedComponents.current[router.asPath]) {
        const MemoComponent = memo(Component)
        retainedComponents.current[router.asPath] = {
            component: <MemoComponent {...pageProps} />,
            scrollPos: 0
        }
    }

    // Save the scroll position of current page before leaving
    const handleRouteChangeStart = url => {
        if (isRetainableRoute) {
            retainedComponents.current[router.asPath].scrollPos = window.scrollY
        }
    }

    // Save scroll position - requires an up-to-date router.asPath
    useEffect(() => {
        router.events.on('routeChangeStart', handleRouteChangeStart)
        return () => {
            router.events.off('routeChangeStart', handleRouteChangeStart)
        }
    }, [router.asPath])

    // Scroll to the saved position when we load a retained component
    useEffect(() => {
        if (isRetainableRoute) {
            window.scrollTo(0, retainedComponents.current[router.asPath].scrollPos)
        }
    }, [Component, pageProps])


    return (
        <ApolloProvider client={client}>
            <ApolloHooksProvider client={client}>
                <Provider store={store}>
                    <BaseLayout>
                        <Component {...pageProps}/>
                    </BaseLayout>
                </Provider>
            </ApolloHooksProvider>
        </ApolloProvider>
    )
}

export default App