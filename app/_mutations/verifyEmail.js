import { gql } from '@apollo/client';

export default gql`
mutation verifyEmail(
  $checkID: String!,
  $token: String!, 
) {
  verifyEmail(
    checkID: $checkID,
    token: $token
  ) {
    id,
    token,
    username,
    message
  }
}
`;