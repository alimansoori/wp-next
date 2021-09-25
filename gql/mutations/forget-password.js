import {gql} from "@apollo/client";

const FORGET_PASSWORD = gql`
  mutation ($input: ForgetPasswordInput!) {
    forgetPassword(input: $input) {
        clientMutationId
        message
        secondSendAgain
        type
    }
  }
`;

export default FORGET_PASSWORD;
