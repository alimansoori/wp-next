import {gql} from '@apollo/client';

const GET_ORDERS = gql`
  query GET_ORDERS($where: RootQueryToOrderConnectionWhereArgs) {
    orders(where: $where) {
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
