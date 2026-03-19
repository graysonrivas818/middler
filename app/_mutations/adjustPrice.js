import { gql } from '@apollo/client';

export default gql`
mutation adjustPrice(
  $id: String!, 
  $interiorAdjusted: String!,
  $cabinetAdjusted: String!,
  $exteriorAdjusted: String!,
  $adjustment: Boolean!
) {
  adjustPrice(
    id: $id, 
    interiorAdjusted: $interiorAdjusted,
    cabinetAdjusted: $cabinetAdjusted,
    exteriorAdjusted: $exteriorAdjusted,
    adjustment: $adjustment
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