import {gql} from "@apollo/client";

const REGISTER_USER = gql`
  mutation ($input: RegisterUserInput!) {
    registerUser(input: $input) {
      user {
        id
        email
        username
      }
    }
  }
`;

export default REGISTER_USER;
