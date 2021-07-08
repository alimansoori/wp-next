import { useRouter, withRouter } from 'next/router';
import React, { useEffect } from 'react'
// import axios from 'axios';
import client from '../components/ApolloClient';
import cookie from 'cookie';
import GET_VIEWER from '../gql/queries/get-viewer';

function Payment(props) {
  const { pp } = props

  useEffect(() => {
    console.log(props)
  }, [])

  return (
    <div>Test</div>
  )
}

const isServer = () => {
  if (typeof window === 'undefined') {
    return true
  }

  return false
}

export const getServerSideProps = async ({ query, req, res, params }) => {
  let pp = null;

  // if (isServer()) {
  //   const cookies = cookie.parse(req.headers.cookie)
  //   // console.log(cookies['wp-next-session'])

  //   try {
  //     const result = await client.query({
  //       query: GET_VIEWER,
  //       context: {
  //         headers: {
  //           authorization: `Bearer ${cookies['wp-next-token']}`
  //         }
  //       }

  //     });

  //     console.log(cookies['wp-next-token'])
  //     console.log(result)
  //     pp = result.data.viewer
  //   } catch (e) {
  //     console.error(e)
  //   }
  // }



  try {
    const result = await axios({
      method: 'post',
      url: "https://api.zarinpal.com/pg/v4/payment/request.json",
      data: {
        merchant_id: "f19c638c-3bcc-11e6-9fe2-005056a205be",
        amount: "10000",
        callback_url: "https://projekt.ir",
        description: "داستانا"
      }
    })

    if (result.data.data.code === 100) {
      return {
        redirect: {
          destination: `https://www.zarinpal.com/pg/StartPay/${result.data.data.authority}`,
          permanent: false
        }
      }
    }

  } catch (error) {
    console.log(error)
  }

  return {
    props: {
      pp
    },
    // redirect: {
    //   destination: '/shop',
    //   permanent: false
    // }
  }
}

export default withRouter(Payment)