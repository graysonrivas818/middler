import { gql } from '@apollo/client';

export default gql`
mutation pinEmailVerification(
  $pin: [String]!, 
  $email: String!
) {
  pinEmailVerification(
    email: $email, 
    pin: $pin
  ) {
    id,
    token,
    username,
    message
  }
}
`;