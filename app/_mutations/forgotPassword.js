import { gql } from '@apollo/client';

export default gql`
mutation forgotPassword(
  $email: String!
) {
  forgotPassword(
    email: $email
  ) {
    message
  }
}
`;