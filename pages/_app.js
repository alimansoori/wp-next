import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles/main.scss'
import BaseLayout from '../components/layouts/BaseLayout'

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
      <BaseLayout>
        <Component {...pageProps} />
      </BaseLayout>
    )
  }
}

export default App