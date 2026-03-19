import { gql } from '@apollo/client';

export default gql`
mutation userLogin(
  $email: String!, 
  $password: String!
) {
  userLogin(
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