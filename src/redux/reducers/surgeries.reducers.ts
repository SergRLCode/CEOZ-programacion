import { SET_SURGERIES } from 'redux/types';

export const Surgeries = (state = [], action: any) => {
  switch (action['type']) {
    case SET_SURGERIES: {
      return action.data;
    }
    default:
      return state;
  }
};
