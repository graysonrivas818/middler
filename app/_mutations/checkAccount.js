import { gql } from '@apollo/client';

export default gql`
mutation checkAccount(
  $email: String!
) {
  checkAccount(
    email: $email
  ) {
    message
  }
}
`