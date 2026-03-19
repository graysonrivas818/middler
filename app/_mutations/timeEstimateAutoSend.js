import { gql } from '@apollo/client';

export default gql`
mutation timeEstimateAutoSend(
  $email: String!, 
  $token: String!,
  $userID: String!,
  $estimate: TimeEstimateInputType
) {
  timeEstimateAutoSend(
    email: $email,
    token: $token,
    userID: $userID,
    estimate: $estimate
  ) {
    id,
    message,
    timeEstimate {
      id,
      clientName,
      clientPhone,
      clientPropertyAddress,
      clientEmail,
      zipCode,
      zipCode,
      chargePerHour,
      painterPerHour,
      percentageFee,
      painters,
      hoursPerDay,
      days,
      totalLabor,
      paintBrand,
      gallons,
      paintCost,
      totalPaintCost,
      materials,
      workersPerHour,
      percentageFee,
      workersNeeded,
      notes,
      formType,
      totalEstimate,
      createdAt
    },
    token, 
    username,
    userID,
    emailVerified
  }
}
`