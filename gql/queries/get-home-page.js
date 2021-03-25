import gql from "graphql-tag";

const GET_HOME_PAGE = gql`
  query GET_HOME_PAGE {
    homepage {
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

export default GET_HOME_PAGE;
