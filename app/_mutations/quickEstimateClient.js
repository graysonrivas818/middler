import { gql } from '@apollo/client';

export default gql`
mutation quickEstimateClient(
  $estimate: EstimatorInputType
) {
  quickEstimateClient(
    estimate: $estimate
  ) {
    id,
    message
  }
}
`