import React from 'react'
import client from '../components/ApolloClient';
import BasePage from '../components/BasePage'
import GET_PAGE from '../gql/queries/get-page';

class Page extends React.Component {
  constructor(props) {
    super(props)
    console.log(props.pageData)
  }

  static async getInitialProps({ query }) {
    let pageData = null;
    const { page } = query
    const id = page ? page : query.id;

    try {
      const result = await client.query({
        query: GET_PAGE,
        variables: { id }
      });
      pageData = result.data.page
    } catch (e) {
      console.error(e)
    }

    return {
      pageData
    }
  }

  render() {
    const { pageData } = this.props
    return (
      <BasePage
        className={pageData.slug}
        seo={pageData.seo}
      >
        <h1>{pageData.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: pageData.content }} />
      </BasePage>
    )
  }
}

export default Page