import {gql} from '@apollo/client';

const PRODUCT_QUERY = gql` 
  query PRODUCT_QUERY($id: ID!, $idType: ProductIdTypeEnum) {
    product(id: $id, idType: $idType) {
      id
      databaseId
      averageRating
      slug
      description
      shortDescription
      productCategories {
        nodes {
         name
         slug
        }
      }
      extraFields {
        extraAbout
        extraentitle
      }
      seo {
        title
        metaDesc
        metaKeywords
        canonical
        opengraphTitle
        opengraphUrl
        opengraphSiteName
        opengraphType
        opengraphPublisher
        opengraphPublishedTime
        opengraphModifiedTime
        opengraphImage {
            sourceUrl
        }
        twitterTitle
        twitterDescription
        twitterImage {
            sourceUrl
        }
      }
      related {
        nodes {
            id
            name
            slug
            databaseId
            averageRating
            ...on SimpleProduct {
                price
                regularPrice
                stockStatus
            }
            image {
                id
                altText
                sourceUrl
                srcSet
                uri
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
        }
      }
      image {
        id
        uri
        title
        srcSet
        sourceUrl
      }
      name
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
      paBookSeriesPrints {
        nodes {
          name
        }
      }
      paDimensions {
        nodes {
          name
        }
      }
      paCoverTypes {
        nodes {
          name
        }
      }
      paNumberPages {
        nodes {
          name
        }
      }
      paSolarPublishDates {
        nodes {
          name
        }
      }
      ...on SimpleProduct {
        price
        id
        regularPrice
        stockStatus
      }
      ... on VariableProduct {
        price
        id
      }
      ... on ExternalProduct {
        price
        id
        externalUrl
      }
      ... on GroupProduct {
        id
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
`;

export default PRODUCT_QUERY;
