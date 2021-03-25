import gql from "graphql-tag";

/**
 * GraphQL categories and products query.
 */
const PRODUCTS_AND_CATEGORIES_QUERY = gql`query{
	productCategories(first: 50) {
        nodes {
          id
          name
          slug
          image {
            id
            sourceUrl
            srcSet
          }
        }
    }
    
    products(first: 50) {
        nodes {
          databaseId
          id
          name
          averageRating
          description
          slug
          image {
            id
            uri
            title
            srcSet
            sourceUrl
          }
          ... on SimpleProduct {
            id
            price
          }
          ... on VariableProduct {
            id
            price
          }
          ... on GroupProduct {
            id
            name
            products {
              nodes {
                ... on SimpleProduct {
                  id
                  price
                }
              }
            }
          }
        }
    }
}`;

export default PRODUCTS_AND_CATEGORIES_QUERY;
