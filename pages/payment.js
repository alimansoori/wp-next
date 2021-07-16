import axios from 'axios';
import { withRouter } from 'next/router';
import React, { useEffect } from 'react'
import GET_CART from '../gql/queries/get-cart';
import REFRESH_TOKEN from '../gql/mutations/refresh-token';
import { v4 } from 'uuid';
import client, { ssrClient } from '../components/ApolloClient';
import nookies from 'nookies'
import { stringToNumber2 } from '../functions';

function Payment(props) {
  // const { cart } = props

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

export const getServerSideProps = async (ctx) => {
  let cart = null;
  let data = null
  let refreshJwtAuthToken = null

  const { req, res, query } = ctx

  const cookies = nookies.get(ctx)

  try {
    const res = await client.mutate({
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

    // const result = await client.query({
    //   query: GET_CART,
    // });

    // // console.log(cookies['wp-next-token'])
    // console.log(result?.data?.cart)
    // cart = result?.data?.cart
  } catch (e) {
    refreshJwtAuthToken = null
    nookies.destroy(ctx, 'wp-next-token')
  }

  try {
    const result = await ssrClient(ctx).query({
      query: GET_CART
    });

    cart = result?.data?.cart
    console.log(stringToNumber2(cart?.total + 0))
  } catch (e) {
    console.log(e)
  }

  if (query['Status'] == 'OK') {
    try {
      const result = await axios({
        method: 'POST',
        url: "https://api.zarinpal.com/pg/v4/payment/verify.json",
        data: {
          merchant_id: "f19c638c-3bcc-11e6-9fe2-005056a205be",
          amount: stringToNumber2(cart?.total + 0),
          // amount: 10000,
          authority: query['Authority'],
        }
      })

      console.log(result)
      data = result.data

    } catch (error) {
      console.log(error.response.data)
      data = error.response.data
    }
  }

  return {
    props: {
      refreshJwtAuthToken,
      cart,
      data
    },
    // redirect: {
    //   destination: '/shop',
    //   permanent: false
    // }
  }
}

export default withRouter(Payment)