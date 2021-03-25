import gql from "graphql-tag";

const GET_PAGE = gql`
  query GET_PAGE($id: ID!) {
    page(idType: URI, id: $id) {
      title
      slug
      content(format: RENDERED)
      featuredImageId
      featuredImageDatabaseId
      featuredImage {
        node {
          altText
          title(format: RAW)
          sourceUrl
          srcSet
        }
      }
      isPreview
      isFrontPage
      isPostsPage
      isRestricted
      isRevision
      status
      uri
      seo {
        title
        canonical
        metaKeywords
        metaDesc
        focuskw
        schema {
          articleType
          pageType
          raw
        }
      }
    }
  }
`;

export default GET_PAGE;
