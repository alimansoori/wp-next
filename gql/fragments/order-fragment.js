import { gql } from '@apollo/client';

function OrderFragment() {
  return null
}

OrderFragment.fragments = {
  MyOrder: gql`
    fragment MyOrder on Order {
      billing {
        address1
        address2
        city
        company
        country
        email
        firstName
        lastName
        phone
        postcode
        state
      }
      cartHash
      commentCount
      commentStatus
      createdVia
      currency
      customer {
        firstName
        email
        lastName
      }
      customerIpAddress
      customerNote
      customerUserAgent
      databaseId
      date
      dateCompleted
      datePaid
      hasBillingAddress
      hasDownloadableItem
      hasShippingAddress
      id
      isDownloadPermitted
      modified
      metaData {
        id
        key
        value
      }
      needsPayment
      needsProcessing
      needsShippingAddress
      orderKey
      orderNumber
      orderVersion
      paymentMethod
      paymentMethodTitle
      pricesIncludeTax
      shipping {
        address1
        address2
        city
        company
        country
        email
        firstName
        lastName
        phone
        postcode
        state
      }
      total
      status
    }
  `,
};

export default OrderFragment