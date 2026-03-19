import { gql } from '@apollo/client';

export default gql`
mutation applyGiftCard(
  $email: String!, 
  $estimateID: String!,
  $where: String!,
  $why: String!
) {
  applyGiftCard(
    email: $email, 
    estimateID: $estimateID,
    where: $where,
    why: $why
  ) {
    message
  }
}
`;