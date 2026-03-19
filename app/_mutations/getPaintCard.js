import { gql } from '@apollo/client';

export default gql`
mutation getPaintCard(
  $id: String!
) {
  getPaintCard(
    id: $id
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
      interiorGallons,
      interiorGallonsCost,
      interiorGallonsItems {
        type,
        gallons
      }
      doorsAndDrawers,
      insideCabinet,
      cabinetCondition,
      cabinetDetail,
      cabinetEstimate,
      cabinetGallons,
      cabinetGallonsCost,
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
      exteriorGallons,
      exteriorGallonsCost,
      exteriorGallonsItems {
        type,
        gallons
      }
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