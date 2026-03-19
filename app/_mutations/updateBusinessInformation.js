import { gql } from '@apollo/client';

export default gql`
mutation updateBusinessInformation (
  $id: String!,
  $businessName: String!,
  $estimatorName: String!,
  $businessAddress: String!,
  $businessPhone: String!,
  $businessEmail: String!
  $businessWebsite: String!,
  $businessLicenseNumber: String!,
  $businessInstagram: String!
) {
  updateBusinessInformation (
    id: $id,
    businessName: $businessName,
    estimatorName: $estimatorName,
    businessAddress: $businessAddress,
    businessPhone: $businessPhone,
    businessEmail: $businessEmail,
    businessWebsite: $businessWebsite,
    businessLicenseNumber: $businessLicenseNumber,
    businessInstagram: $businessInstagram
  ) {
    message
  }
}
`;