import { gql } from '@apollo/client';

export default gql`
mutation sendTimeEstimate(
  $email: String!, 
  $userID: String!,
  $estimate: TimeEstimateInputType
) {
  sendTimeEstimate(
    email: $email,
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
    }
  }
}
`