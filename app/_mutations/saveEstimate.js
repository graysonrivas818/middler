import { gql } from '@apollo/client';

// export default gql`
// mutation saveEstimate(
//   $email: String!,
//   $estimateID: String!
// ) {
//   saveEstimate(
//     email: $email,
//     estimateID: $estimateID
//   ) {
//     message
//   }
// }
// `;

const SAVE_ESTIMATE = gql`
  mutation SaveEstimate($email: String!, $estimateID: String!, $estimate: EstimatorInputType) {
    saveEstimate(email: $email, estimateID: $estimateID, estimate: $estimate) {
      message
    }
  }
`;
export default SAVE_ESTIMATE;
