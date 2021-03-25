import gql from "graphql-tag";

const SEARCH_BY_VALUE = gql` query Products($search: String!, $first: Int! ) {
	products(where: {search: $search}, first: $first) {
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
      type
      status
      shortDescription
      ... on VariableProduct {
        name
        variations {
          nodes {
            databaseId
            name
            price(format: RAW)
            onSale
            salePrice(format: RAW)
            type
            uri
            attributes {
              nodes {
                value
                name
                label
                attributeId
              }
            }
            image {
              altText
              srcSet
              sourceUrl
              title(format: RAW)
            }
            status
            databaseId
            description
          }
        }
        content
      }
    }
  }
}
`;

export default SEARCH_BY_VALUE;
