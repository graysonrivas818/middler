import { gql } from '@apollo/client';

export default gql`
mutation disableAccount(
  $id: String!
) {
  disableAccount(
    id: $id
  ) {
    message
  }
}
`