import { gql, DocumentNode } from 'apollo-boost';

export const LOGIN: DocumentNode = gql`
  mutation login($profesionalID: String!, $password: String!) {
    login(profesionalID: $profesionalID, password: $password)
  }
`;

export const LOGOUT: DocumentNode = gql`
  mutation {
    logout
  }
`;

export const CHANGE_PASSWORD = gql`
  mutation changePassword($newPass: String!, $oldPass: String!) {
    changePassword(newPass: $newPass, oldPass: $oldPass)
  }
`;

export const ADD_SURGERY: DocumentNode = gql`
  mutation newSurgeryByAdmin(
    $patientName: String!
    $name: String!
    $date: String!
    $anesthesia: String!
    $price: String!
    $profesionalID: String!
    $needLens: Boolean!
    $dioptria: String!
    $flexibleOrPMMA: String!
    $needSilicon: Boolean!
    $otherThing: String!
  ) {
    newSurgeryByAdmin(
      data: {
        patientName: $patientName
        name: $name
        date: $date
        anesthesia: $anesthesia
        price: $price
        profesionalID: $profesionalID
        needLens: $needLens
        dioptria: $dioptria
        flexibleOrPMMA: $flexibleOrPMMA
        needSilicon: $needSilicon
        otherThing: $otherThing
      }
    )
  }
`;

export const APPROVE_SURGERY: DocumentNode = gql`
  mutation approveSurgery($id: String!) {
    approveSurgery(id: $id)
  }
`;
export const DELETE_SURGERY: DocumentNode = gql`
  mutation deleteSurgery($id: String!) {
    deleteSurgery(id: $id)
  }
`;

export const SAVE_SEASON: DocumentNode = gql`
  mutation saveSeason($SecondDate: String!, $firstDate: String!) {
    saveSeason(firstDate: $firstDate, SecondDate: $SecondDate)
  }
`;
