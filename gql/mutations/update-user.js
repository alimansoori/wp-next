import gql from "graphql-tag";
import UserFragment from "../fragments/user-fragment";

const UPDATE_USER = gql`

mutation ($input: UpdateUserInput!) {
  updateUser(input: $input) {
    clientMutationId
    user {
      ...UserThatLogin
    }
  }
}
${UserFragment.fragments.UserThatLogin}
`;

export default UPDATE_USER;
