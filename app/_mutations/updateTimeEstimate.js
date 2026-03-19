import { gql } from '@apollo/client';

export default gql`
mutation updateTimeEstimate(
  $email: String!, 
  $estimate: TimeEstimateInputType
) {
  updateTimeEstimate(
    email: $email
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