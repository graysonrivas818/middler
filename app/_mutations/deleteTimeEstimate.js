import { gql } from '@apollo/client';

export default gql`
mutation deleteTimeEstimate(
  $id: String!
) {
  deleteTimeEstimate(
    id: $id
  ) {
    message
  }
}
`;