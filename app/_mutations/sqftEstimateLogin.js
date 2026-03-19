import { gql } from '@apollo/client';

export default gql`
mutation sqftEstimateLogin(
  $email: String!, 
  $password: String!,
  $estimate: EstimatorInputType
) {
  sqftEstimateLogin(
    email: $email,
    password: $password,
    estimate: $estimate
  ) {
    id,
    message,
    token, 
    username,
    userID,
    emailVerified
  }
}
`