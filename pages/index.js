import React from 'react'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Link from 'next/link'

class Home extends React.Component {

  static async getInitialProps(ctx) {
    return { }
  }

  render() {
    return (
      <div className={styles.container}>
        <Head>
          <title>Create Next App</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <Link as={`/shop/slllluuuug`} href={`/shop/[[...slugs]]`}>
          <a>
            Shop
            </a>
        </Link>

        <Link as={`/sample-page`} href={`/[page]`}>
          <a>
            Sample Page
            </a>
        </Link>
      </div>
    )
  }
}

export default Home