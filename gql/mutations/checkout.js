import {gql} from '@apollo/client';

const CHECKOUT = gql`
mutation CHECKOUT( $input: CheckoutInput! ) {
  checkout(input: $input) {
    clientMutationId
    order {
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
      shippingTotal
      shippingLines {
        nodes {
          total
          methodTitle
        }
      }
      status
    }
    customer {
      billing {
        country
        state
        city
        address1
        address2
        company
        email
        firstName
        lastName
        phone
        postcode
      }
      calculatedShipping
      databaseId
      date
      displayName
      email
      firstName
      hasCalculatedShipping
      id
      isPayingCustomer
      isVatExempt
      lastName
      orderCount
      metaData {
        key
        value
      }
      role
      sessionToken
      shipping {
        country
        state
        city
        address1
        address2
        company
        email
        firstName
        lastName
        phone
        postcode
      }
      totalSpent
      username
      modified
    }
    result
    redirect
  }
}
`;
  
export default CHECKOUT;