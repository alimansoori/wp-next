import {gql} from '@apollo/client';

function ProductFragment() {
    return null
}

ProductFragment.fragments = {
    MyProduct: gql`
        fragment MyProduct on Product {
          id
          databaseId
          averageRating
          slug
          description
          shortDescription
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
            products {
              nodes {
                ... on SimpleProduct {
                  id
                  price
                }
              }
            }
            id
          }
        }
  `,
};

export default ProductFragment