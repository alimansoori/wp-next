import axios from 'axios';
import { useRouter, withRouter } from 'next/router';
import React, { useEffect } from 'react'
// import client from '../components/ApolloClient';
import GET_VIEWER from '../gql/queries/get-viewer';
import cookie, { serialize } from 'cookie';
import jscookie from 'js-cookie';
import ApolloClient from 'apollo-boost';
import { InMemoryCache } from 'apollo-cache-inmemory';
import GET_CART from '../gql/queries/get-cart';
import REFRESH_TOKEN from '../gql/mutations/refresh-token';
import { v4 } from 'uuid';
import client, { ssrClient } from '../components/ApolloClient';
import nookies from 'nookies'
import { stringToNumber, stringToNumber2 } from '../functions';
import clientConfig from '../client-config';

function Payment(props) {
  const { cart } = props

  useEffect(() => {
    console.log(props)
  }, [])

  return (
    <div>Test</div>
  )
}

export const getServerSideProps = async (ctx) => {
  let cart = null;
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

  try {
    const result = await axios({
      method: 'post',
      url: "https://api.zarinpal.com/pg/v4/payment/request.json",
      data: {
        merchant_id: clientConfig.merchantId,
        amount: stringToNumber2(cart?.total + 0),
        // amount: 10000,
        callback_url: clientConfig.siteUrl + "payment",
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
      refreshJwtAuthToken,
      cart
    },
    // redirect: {
    //   destination: '/shop',
    //   permanent: false
    // }
  }
}

export default withRouter(Payment)