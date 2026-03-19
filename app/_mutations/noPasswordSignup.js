import { gql } from '@apollo/client';

export default gql`
mutation noPasswordSignup(
  $email: String!,
  $estimate: EstimatorInputType
) {
  noPasswordSignup(
    email: $email,
    estimate: $estimate
  ) {
    message
  }
}
`;