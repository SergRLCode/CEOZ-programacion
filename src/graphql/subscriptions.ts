import { gql, DocumentNode } from 'apollo-boost';

export const SUB_PENDING_SURGERIES: DocumentNode = gql`
  subscription subPendingSurgeries {
    subPendingSurgeries {
      id
      name
      serial
      profesionalID
      status
      date
      patientName
      duration
    }
  }
`;
