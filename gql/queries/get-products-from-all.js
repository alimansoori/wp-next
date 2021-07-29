import { gql } from '@apollo/client';

const GET_PRODUCTS_FROM_ALL = gql` 
query GET_PRODUCTS_FROM_ALL($search: String, $first: Int) {
	products(where: {search: $search}, first: $first) {
    edges {
      cursor
      node {
        id
        databaseId
        name
        type
        slug
        image {
          altText
          sourceUrl(size: MEDIUM)
          title
        }
        paPublishers {
          nodes {
            name
          }
        }
        paTranslators {
          nodes {
            name
          }
        }
        paWriters {
          nodes {
            name
          }
        }
        ... on SimpleProduct {
          price(format: RAW)
        }
      }
    }
    pageInfo {
      endCursor
      hasNextPage
      hasPreviousPage
      seo {
        schema {
          raw
        }
      }
      startCursor
    }
  }
  paPublishers(where: {search: $search}) {
    edges {
      cursor
      node {
        name
        products(first: $first) {
          edges {
            node {
              id
              databaseId
              name
              type
              slug
              image {
                altText
                sourceUrl(size: MEDIUM)
                title
              }
              paPublishers {
                nodes {
                  name
                }
              }
              paTranslators {
                nodes {
                  name
                }
              }
              paWriters {
                nodes {
                  name
                }
              }
              ... on SimpleProduct {
                price(format: RAW)
              }
            }
          }
        }
      }
    }
    pageInfo {
      endCursor
      hasNextPage
      hasPreviousPage
      startCursor
    }
  }
  paTranslators(where: {search: $search}) {
    edges {
      cursor
      node {
        name
        products(first: $first) {
          edges {
            node {
              id
              databaseId
              name
              type
              slug
              image {
                altText
                sourceUrl(size: MEDIUM)
                title
              }
              paPublishers {
                nodes {
                  name
                }
              }
              paTranslators {
                nodes {
                  name
                }
              }
              paWriters {
                nodes {
                  name
                }
              }
              ... on SimpleProduct {
                price(format: RAW)
              }
            }
          }
        }
      }
    }
    pageInfo {
      endCursor
      hasNextPage
      hasPreviousPage
      startCursor
    }
  }
  paWriters(where: {search: $search}, first: $first) {
    edges {
      cursor
      node {
        name
        products(first: $first) {
          edges {
            node {
              id
              databaseId
              name
              type
              slug
              image {
                altText
                sourceUrl(size: MEDIUM)
                title
              }
              paPublishers {
                nodes {
                  name
                }
              }
              paTranslators {
                nodes {
                  name
                }
              }
              paWriters {
                nodes {
                  name
                }
              }
              ... on SimpleProduct {
                price(format: RAW)
              }
            }
          }
        }
      }
    }
    pageInfo {
      endCursor
      hasNextPage
      hasPreviousPage
      startCursor
    }
  }
}
`;

export default GET_PRODUCTS_FROM_ALL;
