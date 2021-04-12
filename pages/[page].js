import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react'
import useSWR from 'swr';
import client from '../components/ApolloClient';
import BasePage from '../components/BasePage'
import GET_PAGE from '../gql/queries/get-page';

// class Page extends React.Component {
//   constructor(props) {
//     super(props)
//     console.log(props.pageData)
//   }

//   static async getInitialProps({ query }) {
//     let pageData = null;
//     const { page } = query
//     const id = page ? page : query.id;

//     try {
//       const result = await client.query({
//         query: GET_PAGE,
//         variables: { id },
//         partialRefetch:true
//       });
//       pageData = result.data.page
//     } catch (e) {
//       console.error(e)
//     }

//     return {
//       pageData
//     }
//   }

//   render() {
//     const { pageData } = this.props
//     return (
//       <BasePage
//         className={pageData.slug}
//         seo={pageData.seo}
//       >
//         <h1>{pageData.title}</h1>
//         <div dangerouslySetInnerHTML={{ __html: pageData.content }} />
//       </BasePage>
//     )
//   }
// }

function Page(props) {
  const { pageData } = props

  const router = useRouter()

  // const { data, error, loading } = useSWR('tttt', getPageData(router.query) , pageData)

  useEffect(() => {
    console.log(pageData)
  }, [])

  return (
    <>
      {pageData ? (
        <BasePage
          className={pageData.slug}
          seo={pageData.seo}
        >
          <h1>{pageData.title}</h1>
          <div dangerouslySetInnerHTML={{ __html: pageData.content }} />
          <Link href={`/`}>
            <a>
              {`Home`}
            </a>
          </Link>
        </BasePage>
      ) : <div>Loading ...</div>}
    </>
  )
}

export const getServerSideProps = async ({ query, params }) => {
  let pageData = null;
  const { page } = query
  const id = page ? page : query.id;

  try {
    const result = await client.query({
      query: GET_PAGE,
      variables: { id },
      partialRefetch: true
    });
    pageData = result.data.page
  } catch (e) {
    console.error(e)
  }

  // let pageData = await getPageData(query)

  return {
    props: {
      pageData
    }
  }
}

// async function getPageData(query) {
//   let pageData = null;
//   const { page } = query
//   const id = page ? page : query.id;

//   try {
//     const result = await client.query({
//       query: GET_PAGE,
//       variables: { id },
//       partialRefetch:true
//     });
//     pageData = result.data.page
//   } catch (e) {
//     console.error(e)
//   }

//   return pageData
// }

export default Page