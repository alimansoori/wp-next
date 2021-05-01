import { gql } from "@apollo/client";
import UserFragment from "../fragments/user-fragment";

const LOGIN_USER = gql`
  mutation ($input: LoginInput!) {
    login(input: $input) {
        authToken
        user {
          ...UserThatLogin
        }
    }
  }
  ${UserFragment.fragments.UserThatLogin}
`;

export default LOGIN_USER;
