import { gql } from '@apollo/client';

export default gql`
mutation updateLogo(
  $id: String!, 
  $url: String!
) {
  updateLogo(
    id: $id, 
    url: $url
  ) {
    message,
    businessLogo
  }
}
`;