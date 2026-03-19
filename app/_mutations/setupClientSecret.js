import { gql } from '@apollo/client';

export default gql`
mutation setupClientSecret(
  $id: String!,
  $email: String!, 
  $name: String!,
  $paymentPlan: String!
  $code: String!
) {
  setupClientSecret(
    id: $id,
    email: $email, 
    name: $name,
    paymentPlan: $paymentPlan,
    code: $code
  ) {
    message,
    clientSecret,
    status,
    subscriptionID
  }
}
`;