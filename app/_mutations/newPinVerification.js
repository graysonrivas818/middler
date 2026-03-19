import { gql } from '@apollo/client';

export default gql`
mutation newPinVerification(
  $email: String!
) {
  newPinVerification(
    email: $email
  ) {
    id,
    token,
    username,
    message
  }
}
`;