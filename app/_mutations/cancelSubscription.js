import { gql } from '@apollo/client';

export default gql`
mutation cancelSubscription(
  $subscriptionID: String!
) {
  cancelSubscription(
    subscriptionID: $subscriptionID
  ) {
    name,
    email,
    order,
    invoiceHostedUrl,
    invoicePdf,
    paymentStatus,
    periodStart,
    periodEnd,
    subscriptionStatus,
    paymentPlan,
    paymentIntent,
    message
  }
}
`;