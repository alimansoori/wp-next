import {gql} from '@apollo/client';
import PostTypeSeoFrg from '../fragments/post-type-seo-fragment'

const GET_POST = gql`
  query GET_POST($id: ID!, $idType: PostIdType) {
    post(idType: $idType, id: $id) {
      databaseId
      title
      content
    }
  }
`;

export default GET_POST;
