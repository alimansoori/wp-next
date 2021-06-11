import gql from "graphql-tag";

const GET_ORDERS = gql`
  query GET_ORDERS {
    orders {
      edges {
        cursor
        node {
          orderNumber
          date
          dateCompleted
          datePaid
          total
          lineItems {
            nodes {
              total
              quantity
              orderId
              product {
                image {
                  sourceUrl(size: SHOP_THUMBNAIL)
                }
              }
            }
          }
        }
      }
      pageInfo {
        offsetPagination {
          hasMore
          hasPrevious
          total
        }
      }
    }
  }
`;

export default GET_ORDERS;
