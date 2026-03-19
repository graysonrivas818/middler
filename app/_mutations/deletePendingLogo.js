import { gql } from '@apollo/client';

export default gql`
mutation deletePendingLogo(
  $url: String!
) {
  deletePendingLogo(
    url: $url
  ) {
    message,
    businessLogo
  }
}
`;