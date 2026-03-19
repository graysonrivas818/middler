import { gql } from '@apollo/client';

export default gql`
mutation noPasswordTimeSignup(
  $email: String!,
  $estimate: TimeEstimateInputType
) {
  noPasswordTimeSignup(
    email: $email,
    estimate: $estimate
  ) {
    message
  }
}
`;