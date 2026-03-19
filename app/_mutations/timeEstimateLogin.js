import { gql } from '@apollo/client';

export default gql`
mutation timeEstimateLogin(
  $email: String!, 
  $password: String!,
  $estimate: TimeEstimateInputType
) {
  timeEstimateLogin(
    email: $email,
    password: $password,
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
      createdAt
    },
    token, 
    username,
    userID,
    emailVerified
  }
}
`