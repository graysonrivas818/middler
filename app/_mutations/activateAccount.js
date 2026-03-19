import { gql } from '@apollo/client';

export default gql`
mutation activateAccount(
  $email: String!, 
  $password: String!
) {
  activateAccount(
    email: $email, 
    password: $password
  ) {
    id,
    token,
    username,
    role,
    emailVerified,
    message
  }
}
`;