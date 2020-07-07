import { DOCTORS_STATE, DOCTORS_ACTIONS } from './doctors.interfaces';
import { SET_DOCTORS } from 'redux/types';

export const setDoctorData = (data: DOCTORS_STATE): DOCTORS_ACTIONS => {
  return {
    type: SET_DOCTORS,
    data,
  };
};
