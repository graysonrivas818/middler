import { gql } from '@apollo/client';

export default gql`
mutation contactMiddler(
  $email: String!,
  $message: String!
) {
  contactMiddler(
    email: $email,
    message: $message
  ) {
    message
  }
}
`