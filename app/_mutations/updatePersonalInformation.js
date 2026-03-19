import { gql } from '@apollo/client';

export default gql`
mutation updatePersonalInformation (
  $id: String!,
  $firstName: String!,
  $lastName: String!,
  $email: String!,
  $bio: String!
) {
  updatePersonalInformation (
    id: $id,
    firstName: $firstName,
    lastName: $lastName,
    email: $email,
    bio: $bio
  ) {
    message
  }
}
`;