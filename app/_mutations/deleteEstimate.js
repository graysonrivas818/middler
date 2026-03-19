import { gql } from '@apollo/client';

export default gql`
mutation deleteEstimate(
  $id: String!
) {
  deleteEstimate(
    id: $id
  ) {
    message
  }
}
`;