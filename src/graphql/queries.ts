import { gql, DocumentNode } from 'apollo-boost';

export const GET_SURGERIES: DocumentNode = gql`
  query {
    pendingSurgeries {
      name
      date
      duration
      patientName
    }
  }
`;

export const SURGERY: DocumentNode = gql`
  query surgery($id: String!) {
    surgery(id: $id) {
      name
      duration
      anesthesia
      serial
      patientName
      price
      status
      needLens
      dioptria
      flexibleOrPMMA
      needSilicon
      otherThing
    }
  }
`;

export const GET_JORNADA: DocumentNode = gql`
  query {
    getSeason
  }
`;

export const ALL_SURGERIES: DocumentNode = gql`
  query {
    allSurgeries {
      name
      duration
    }
  }
`;

export const GET_DOCTORS: DocumentNode = gql`
  query {
    getDoctors {
      profesionalID
      name
    }
  }
`;

export const ALL_SURGERIES_ADMIN = gql`
  query {
    allSurgeriesAdmin {
      id
      serial
      profesionalID
      status
      date
    }
  }
`;
