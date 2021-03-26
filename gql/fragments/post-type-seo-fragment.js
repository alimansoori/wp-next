import { gql } from '@apollo/client';

function PostTypeSeoFrg() {
  return null
}

PostTypeSeoFrg.fragments = {
  PostTypeSeoFrg: gql`
    fragment PostTypeSeoFrg on PostTypeSEO {
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
  `,
};

export default PostTypeSeoFrg