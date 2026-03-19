import { gql } from '@apollo/client';

export default gql`
mutation resumeSubscription(
  $subscriptionID: String!
) {
  resumeSubscription(
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