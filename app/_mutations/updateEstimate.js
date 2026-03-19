import { gql } from '@apollo/client';

export default gql`
mutation updateEstimate(
  $userID: String!, 
  $clientID: String!,
  $estimate: EstimatorInputType
) {
  updateEstimate(
    userID: $userID, 
    clientID: $clientID,
    estimate: $estimate
  ) {
    message,
    estimate {
      id,
      clientName,
      clientPhone,
      clientPropertyAddress,
      clientEmail,
      clientZipCode,
      interiorSquareFeet,
      interiorCondition,
      interiorDetail,
      interiorItems {
        id,
        type,
        title
      },
      interiorIndividualItems {
        title,
        price,
        gallons
      },
      interiorEstimate,
      doorsAndDrawers,
      insideCabinet,
      cabinetCondition,
      cabinetDetail,
      cabinetEstimate,
      exteriorSquareFeet,
      exteriorCondition,
      exteriorDetail,
      exteriorItems {
        id,
        type,
        title
      },
      exteriorIndividualItems {
        title,
        price,
        gallons
      },
      exteriorEstimate,
      painters,
      hoursPerDay,
      days,
      paintBrand,
      paintQuality,
      warranty,
      payments,
      deposit,
      depositType,
      painterTapeRolls,
      plasticRolls,
      dropCloths,
      adjustment,
      adjustments {
        interiorAdjusted,
        cabinetAdjusted,
        exteriorAdjusted,
        dateAdjusted
      },
      notesAndDisclosure,
      createdAt
    }
  }
}
`;