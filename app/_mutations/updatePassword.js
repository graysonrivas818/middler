import { gql } from '@apollo/client';

export default gql`
mutation updatePassword(
  $newPassword: String!, 
  $id: String!, 
  $token: String!
) {
  updatePassword(
    newPassword: $newPassword, 
    id: $id, 
    token: $token
  ) {
    message
  }
}
`;