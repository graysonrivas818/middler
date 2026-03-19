import { gql } from '@apollo/client';

export default gql`
mutation sendEstimate(
  $userID: String!,
  $clientID: String!,
  $email: String!,
  $format: String!
) {
  sendEstimate(
    userID: $userID,
    clientID: $clientID,
    email: $email,
    format: $format
  ) {
    message
  }
}
`;