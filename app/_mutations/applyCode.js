import { gql } from '@apollo/client';

export default gql`
mutation applyCode(
  $id: String!, 
  $code: String!,
  $paymentPlan: String!
) {
  applyCode(
    id: $id, 
    code: $code,
    paymentPlan: $paymentPlan
  ) {
    message
  }
}
`;