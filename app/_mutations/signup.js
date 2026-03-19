import { gql } from '@apollo/client';

export default gql`
mutation signup(
  $firstName: String!, 
  $lastName: String!, 
  $email: String!, 
  $password: String!
) {
  signup(
    firstName: $firstName, 
    lastName: $lastName, 
    email: $email, 
    password: $password
  ) {
    message
  }
}
`;