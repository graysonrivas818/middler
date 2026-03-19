import { gql } from '@apollo/client';

export default gql`
mutation subscriptionInfo(
  $subscriptionID: String!,
  $paymentIntent: String!
) {
  subscriptionInfo(
    subscriptionID: $subscriptionID,
    paymentIntent: $paymentIntent
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
    subscriptionStatus,
    message
  }
}
`;