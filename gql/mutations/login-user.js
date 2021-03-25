import {gql} from "@apollo/client";

const LOGIN_USER = gql`
  mutation ($input: LoginInput!) {
    login(input: $input) {
        authToken
        user {
          id
          userId
          username
          email
          name
        }
    }
  }
`;

export default LOGIN_USER;
