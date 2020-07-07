import { SET_SELECTED_DAY } from 'redux/types';
import { SELECTED_DAY_STATE, SELECTED_DAY_ACTIONS } from './selectedDay.interfaces';

export const setSelectedDay = (data: SELECTED_DAY_STATE): SELECTED_DAY_ACTIONS => {
  return {
    type: SET_SELECTED_DAY,
    data,
  };
};
