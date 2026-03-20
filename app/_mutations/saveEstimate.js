import { gql } from '@apollo/client';

export default gql`
mutation saveEstimate(
  $email: String!,
  $estimateID: String!
) {
  saveEstimate(
    email: $email,
    estimateID: $estimateID
  ) {
    message
  }
}
`;
