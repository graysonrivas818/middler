import { gql } from '@apollo/client';

export default gql`
mutation changePassword(
  $id: String!,
  $currentPassword: String!,
  $newPassword: String!
) {
  changePassword(
    id: $id,
    currentPassword: $currentPassword,
    newPassword: $newPassword
  ) {
    message
  }
}
`