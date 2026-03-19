import { gql } from '@apollo/client';

export default gql`
mutation firstEstimate(
  $email: String!, 
  $estimate: EstimatorInputType
) {
  firstEstimate(
    email: $email, 
    estimate: $estimate
  ) {
    message
  }
}
`;