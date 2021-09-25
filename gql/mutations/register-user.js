import {gql} from "@apollo/client";

const REGISTER_USER = gql`
  mutation ($input: RegisterInput!) {
    register(input: $input) {
        authToken
        clientMutationId
        message
        refreshToken
        secondSendAgain
        type
        user {
        id
        email
        username
        }
    }
  }
`;

export default REGISTER_USER;
