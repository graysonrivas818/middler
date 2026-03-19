import { gql } from '@apollo/client';

export default gql`
mutation timeEstimate(
  $email: String!, 
  $recentEstimate: String!,
  $estimate: TimeEstimateInputType
) {
  timeEstimate(
    email: $email,
    recentEstimate: $recentEstimate,
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