import React from 'react'
import Router from 'next/router'
import BaseLayout from '../components/layouts/BaseLayout'
import ProgressBar from "@badrap/bar-of-progress"
import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles/main.scss'
import { Provider } from 'react-redux'
import store from '../redux/store'

const progress = new ProgressBar({
  size: 4,
  color: "#38a169",
  className: "bar-of-progress",
  delay: 100,
});

Router.events.on("routeChangeStart", progress.start);
Router.events.on("routeChangeComplete", progress.finish);
Router.events.on("routeChangeError", progress.finish);


class App extends React.Component {

  static async getInitialProps({ Component, ctx }) {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return { pageProps }
  }

  render() {
    const { Component, pageProps } = this.props

    return (
      <Provider store={store}>
        <BaseLayout>
          <Component {...pageProps} />
        </BaseLayout>
      </Provider>
    )
  }
}

export default App