const productsConnection = `
    edges {
      cursor
      node {
        id
        databaseId
        averageRating
        date
        name
        type
        slug
        image {
          altText
          sourceUrl
          title
        }
        paPublishers {
          nodes {
            name
            slug
            uri
          }
        }
        paTranslators {
          nodes {
            name
            slug
            uri
          }
        }
        paWriters {
          nodes {
            name
            slug
            uri
          }
        }
        ... on SimpleProduct {
          price(format: RAW)
          regularPrice(format: RAW)
          stockStatus
        }
      }
    }
    pageInfo {
      endCursor
      hasNextPage
      hasPreviousPage
      startCursor
    }
`

const getAllProductsQueries = `
    query GET_PRODUCTS($after: String, $before: String, $first: Int, $last: Int, $where: RootQueryToProductConnectionWhereArgs) {
      products(after: $after, before: $before, first: $first, last: $last, where: $where) {
        ${productsConnection}
      }
    }
`

export default getAllProductsQueries