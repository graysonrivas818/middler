import { gql } from '@apollo/client';

export default gql`
mutation verificationEmail(
  $email: String!, 
  $clientId: String!
) {
  verificationEmail(
    email: $email,
    clientId: $clientId
  ) {
    message
  }
}
`;