import gql from "graphql-tag";
import UserFragment from "../fragments/user-fragment";

const GET_VIEWER = gql`
  query GET_VIEWER {
    viewer {
      ...UserThatLogin
    }
  }
  ${UserFragment.fragments.UserThatLogin}
`;

export default GET_VIEWER;
