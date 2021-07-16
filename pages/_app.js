import React, { useEffect } from 'react'
import Router from 'next/router'
import BaseLayout from '../components/layouts/BaseLayout'
import ProgressBar from "@badrap/bar-of-progress"
import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles/main.scss'
import { Provider, useDispatch } from 'react-redux'
import store from '../redux/store'
import nookies from 'nookies'
import { ssrClient } from '../components/ApolloClient'
import REFRESH_TOKEN from '../gql/mutations/refresh-token'
import { v4 } from 'uuid'
import GET_VIEWER from '../gql/queries/get-viewer'
import { viewerConstants } from '../redux/actions/constants'

const progress = new ProgressBar({
  size: 4,
  color: "#38a169",
  className: "bar-of-progress",
  delay: 100,
});

Router.events.on("routeChangeStart", progress.start);
Router.events.on("routeChangeComplete", progress.finish);
Router.events.on("routeChangeError", progress.finish);

function Viewer({ children, viewer }) {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch({
      type: viewerConstants.SET_VIEWER,
      payload: {
        viewer
      }
    })
  }, [])

  return children
}

class App extends React.Component {

  static async getInitialProps({ Component, ctx }) {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    let viewer = null
    let refreshJwtAuthToken = null

    const { req, res, query } = ctx

    const cookies = nookies.get(ctx)

    try {
      const res = await ssrClient(ctx).mutate({
        mutation: REFRESH_TOKEN,
        variables: {
          input: {
            clientMutationId: v4(),
            jwtRefreshToken: cookies['wp-next-token']
          }
        },
        fetchPolicy: 'no-cache'
      })

      refreshJwtAuthToken = res?.data?.refreshJwtAuthToken

      const { authToken } = refreshJwtAuthToken

      nookies.set(ctx, 'wp-next-token', authToken)
    } catch (e) {
      refreshJwtAuthToken = null
      nookies.destroy(ctx, 'wp-next-token')
    }

    try {
      const result = await ssrClient(ctx).query({
        query: GET_VIEWER
      });

      viewer = result?.data?.viewer
    } catch (e) {
      console.log(e)
    }

    return { pageProps, viewer }
  }

  render() {
    const { Component, pageProps, viewer } = this.props

    return (
      <Provider store={store}>
        <Viewer viewer={viewer}>
          <BaseLayout>
            <Component {...pageProps} />
          </BaseLayout>
        </Viewer>
      </Provider>
    )
  }
}

// function App(props) {
//   const { Component, pageProps, viewer } = props

//   console.log(props)
//   // const dispatch = useDispatch()

//   // useEffect(() => {
//   //   dispatch({
//   //     type: viewerConstants.SET_VIEWER,
//   //     payload: {
//   //       viewer
//   //     }
//   //   })
//   // }, [])

//   return (
//     <Provider store={store}>
//       <BaseLayout>
//         <Component {...pageProps} />
//       </BaseLayout>
//     </Provider>
//   )
// }

// export const getServerSideProps = async ({ Component, ctx }) => {
//   let pageProps = {}

//   if (Component.getInitialProps) {
//     pageProps = await Component.getInitialProps(ctx)
//   }

//   let viewer = null
//   let refreshJwtAuthToken = null

//   const { req, res, query } = ctx

//   const cookies = nookies.get(ctx)

//   try {
//     const res = await ssrClient(ctx).mutate({
//       mutation: REFRESH_TOKEN,
//       variables: {
//         input: {
//           clientMutationId: v4(),
//           jwtRefreshToken: cookies['wp-next-token']
//         }
//       },
//       fetchPolicy: 'no-cache'
//     })

//     refreshJwtAuthToken = res?.data?.refreshJwtAuthToken

//     const { authToken } = refreshJwtAuthToken

//     nookies.set(ctx, 'wp-next-token', authToken)
//   } catch (e) {
//     refreshJwtAuthToken = null
//     nookies.destroy(ctx, 'wp-next-token')
//   }

//   try {
//     const result = await ssrClient(ctx).query({
//       query: GET_VIEWER
//     });

//     viewer = result?.data?.viewer
//   } catch (e) {
//     console.log(e)
//   }

//   return {
//     props: {
//       Component,
//       pageProps,
//       viewer
//     }
//   }
// }

export default App