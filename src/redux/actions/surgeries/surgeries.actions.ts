import { SURGERIES_STATE, SURGERIES_ACTIONS } from './surgeries.interfaces';
import { SET_SURGERIES } from 'redux/types';

export const setSurgeriesData = (data: SURGERIES_STATE): SURGERIES_ACTIONS => {
  return {
    type: SET_SURGERIES,
    data,
  };
};
