import { gql } from "@apollo/client";
import UserFragment from "../fragments/user-fragment";
import CustomerFragment from "../fragments/customer-fragment";

const LOGIN_USER = gql`
  mutation ($input: LoginInput!) {
    login(input: $input) {
        authToken
        refreshToken
        sessionToken
        user {
          ...UserThatLogin
        }
        customer {
          ...MyCustomer
        }
    }
  }
  ${UserFragment.fragments.UserThatLogin}
  ${CustomerFragment.fragments.MyCustomer}
`;

export default LOGIN_USER;
