import { SET_DOCTORS } from 'redux/types';

interface DOCTOR {
  profesionalID: string;
  name: string;
}

export interface DOCTORS_STATE {
  doctors: Array<DOCTOR>;
}

interface SET_DOCTORS_ACTION {
  type: typeof SET_DOCTORS;
  data: DOCTORS_STATE;
}

export type DOCTORS_ACTIONS = SET_DOCTORS_ACTION;
