import React from 'react'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import BasePage from '../components/BasePage'
import GET_HOME_PAGE from '../gql/queries/get-home-page';
import client from '../components/ApolloClient'

class Home extends React.Component {
  constructor(props) {
    super(props)
    console.log(props.homePageData)
  }

  static async getInitialProps({ query }) {
    let homePageData = null;

    try {
      const result = await client.query({
        query: GET_HOME_PAGE,
        partialRefetch:true
      });
      homePageData = result.data.homepage
    } catch (e) {
      console.error(e)
    }

    return {
      homePageData
    }
  }

  render() {
    const { homePageData } = this.props
    return (
      <BasePage
        homePage
        className={`home-page`}
        seo={homePageData.seo}
      >
        <Link as={`/shop/slllluuuug`} href={`/shop/[[...slugs]]`}>
          <a>
            {`Shop`}
          </a>
        </Link>
        <hr />
        <Link as={`/sample-page`} href={`/[page]`} refetch={true} >
          <a>
            {`Sample Page`}
          </a>
        </Link>
      </BasePage>
    )
  }
}

export default Home