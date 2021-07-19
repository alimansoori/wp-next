import axios from 'axios';
import { withRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import GET_CART from '../gql/queries/get-cart';
import REFRESH_TOKEN from '../gql/mutations/refresh-token';
import { v4 } from 'uuid';
import client, { ssrClient } from '../components/ApolloClient';
import nookies from 'nookies'
import { stringToNumber2 } from '../functions';
import LandingLoading from '../components/landingLoading/LandingLoading';
import UserHeader from '../components/userHeader/UserHeader';
import { useDispatch, useSelector } from 'react-redux';
import PayNav from '../components/payNav/PayNav';
import GET_VIEWER from '../gql/queries/get-viewer';
import GET_CUSTOMER from '../gql/queries/get-customer';
import CHECKOUT from '../gql/mutations/checkout';
import GET_ORDER from '../gql/queries/get-order';
import clientConfig from '../client-config';
import EMPTY_CART from '../gql/mutations/empty-cart';

function Payment(props) {
  const dispatch = useDispatch()
  const { data } = props
  const { authenticate } = useSelector(state => state.auth)
  const { order } = useSelector(state => state.order)

  useEffect(() => {
    console.log('Order', order)
  }, [order])

  useEffect(() => {
    console.log(props)
    // dispatch(
    //   checkout({
    //     isPaid: true,
    //     transactionId: data?.data?.ref_id
    //   })
    // )
    if (data?.data?.code == 100) {
      // setOrder(
      //   dispatch(
      //     checkout({
      //       isPaid: true,
      //       transactionId: data?.data?.ref_id
      //     })
      //   )
      // )
    } else if (data?.data?.code == 101) {
      // تکرار پرداخت
    } else if (data?.errors?.code) {
      if (data?.errors?.code == -51) {
        console.log('پرداخت ناموفق')
      } else if (data?.errors?.code == -52) {
        console.log('خطای غیر منتظره با پشتیبانی تماس بگیرید')
      } else if (data?.errors?.code == -53) {
        console.log('اتوریتی برای این مرچنت کد نیست')
      } else if (data?.errors?.code == -54) {
        console.log('اتوریتی نامعتبر است')
      } else if (data?.errors?.code == -9) {
        console.log('خطای اعتبار سنجی')
      } else if (data?.errors?.code == -10) {
        console.log('ای پی و يا مرچنت كد پذيرنده صحيح نيست')
      } else if (data?.errors?.code == -11) {
        console.log('مرچنت کد فعال نیست لطفا با تیم پشتیبانی ما تماس بگیرید')
      } else if (data?.errors?.code == -12) {
        console.log('تلاش بیش از حد در یک بازه زمانی کوتاه.')
      } else if (data?.errors?.code == -15) {
        console.log('ترمینال شما به حالت تعلیق در آمده با تیم پشتیبانی تماس بگیرید')
      } else if (data?.errors?.code == -15) {
        console.log('')
      }
    }
  }, [])

  return (
    <>
      <LandingLoading />
      <UserHeader />
      {authenticate ? (
        <>
          <PayNav {...props} />
        </>
      ) : <div>Access Denied! ... Please Log in</div>}
    </>
  )
}

export const getServerSideProps = async (ctx) => {
  let viewer = null;
  let order = null;
  let cart = null;
  let customer = null;
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

  // Viewer
  try {
    const viewerRes = await ssrClient(ctx).query({
      query: GET_VIEWER
    });

    viewer = viewerRes?.data?.viewer
  } catch (e) {
    console.log(e)
  }

  if (refreshJwtAuthToken) {
    // Customer
    try {
      const customerRes = await ssrClient(ctx).query({
        query: GET_CUSTOMER,
        variables: {
          customerId: viewer.databaseId,
          id: viewer.id
        }
      })
      customer = customerRes?.data?.customer
    } catch (e) {
      console.log(e)
    }
  }

  try {
    const result = await ssrClient(ctx).query({
      query: GET_CART
    });

    cart = result?.data?.cart
  } catch (e) {
    console.log(e)
  }

  if (query['Status'] == 'OK') {
    try {
      const result = await axios({
        method: 'POST',
        url: "https://api.zarinpal.com/pg/v4/payment/verify.json",
        data: {
          merchant_id: clientConfig.merchantId,
          amount: stringToNumber2(cart?.total + 0),
          // amount: 10000,
          authority: query['Authority'],
        }
      })

      data = result.data

    } catch (error) {
      data = error.response.data
    }

    // CheckOut
    if (data?.data && data?.data?.code == 100) {
      try {
        let fillInput = {
          isPaid: true,
          paymentMethod: "WC_ZPal",
          billing: {
            address1: customer.billing.address1,
            address2: customer.billing.address2,
            city: customer.billing.city,
            company: customer.billing.company,
            country: customer.billing.country,
            email: customer.billing.email,
            firstName: customer.billing.firstName,
            lastName: customer.billing.lastName,
            phone: customer.billing.phone,
            postcode: customer.billing.postcode,
            state: customer.billing.state
          },
          shipping: {
            address1: customer.shipping.address1,
            address2: customer.shipping.address2,
            city: customer.shipping.city,
            company: customer.shipping.company,
            country: customer.shipping.country,
            email: customer.shipping.email,
            firstName: customer.shipping.firstName,
            lastName: customer.shipping.lastName,
            phone: customer.shipping.phone,
            postcode: customer.shipping.postcode,
            state: customer.shipping.state
          },
          clientMutationId: v4(),
          shippingMethod: cart.chosenShippingMethods.length ? cart.chosenShippingMethods[0] : null
        }

        // Set Meta Data
        let metaData = []
        let shippingDate = customer.metaData.find((meta) => (meta.key === 'shippingDate'))
        let shippingHour = customer.metaData.find((meta) => (meta.key === 'shippingHour'))

        if (shippingDate) {
          metaData = metaData.concat({
            key: shippingDate.key,
            value: shippingDate.value,
          })
          fillInput.metaData = metaData
        }

        if (shippingHour) {
          metaData = metaData.concat({
            key: shippingHour.key,
            value: shippingHour.value,
          })
          fillInput.metaData = metaData
        }

        const resultCheckout = await ssrClient(ctx).mutate({
          mutation: CHECKOUT,
          variables: {
            input: {
              ...fillInput
            },
          }
        })

        const { customer: checkoutCustomer, order: checkoutOrder } = resultCheckout.data.checkout
        order = checkoutOrder

        const resultEmptyCart = await ssrClient(ctx).mutate({
          mutation: EMPTY_CART,
          variables: {
            input: {
              clearPersistentCart: true,
              clientMutationId: v4()
            },
          }
        })

        cart = resultEmptyCart.data.emptyCart

      } catch (error) {
        console.log('Checkout Error', error)
      }
    }
  }

  if (query['Status'] == 'NOK' && query['Authority']) {
    try {
      const result = await axios({
        method: 'POST',
        url: "https://api.zarinpal.com/pg/v4/payment/verify.json",
        data: {
          merchant_id: clientConfig.merchantId,
          // amount: stringToNumber2(cart?.total + 0),
          amount: 10000,
          authority: query['Authority'],
        }
      })

      data = result.data

    } catch (error) {
      data = error.response.data
    }
  }

  return {
    props: {
      refreshJwtAuthToken,
      cart,
      customer,
      data,
      viewer,
      order
    },
    // redirect: {
    //   destination: '/shop',
    //   permanent: false
    // }
  }
}

export default withRouter(Payment)