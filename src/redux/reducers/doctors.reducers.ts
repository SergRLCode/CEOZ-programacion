import { SET_DOCTORS } from 'redux/types';

export const Doctors = (state = [], action: any) => {
  switch (action['type']) {
    case SET_DOCTORS: {
      return action.data;
    }
    default:
      return state;
  }
};
