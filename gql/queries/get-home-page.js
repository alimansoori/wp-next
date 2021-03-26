import gql from "graphql-tag";
import PostTypeSeoFrg from '../fragments/post-type-seo-fragment'

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
        ...PostTypeSeoFrg
      }
    }
  }
  ${PostTypeSeoFrg.fragments.PostTypeSeoFrg}
`;

export default GET_HOME_PAGE;
