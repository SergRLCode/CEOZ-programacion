import { SET_SELECTED_SURGERY } from 'redux/types';
import { SELECTED_SURGERY_ACTIONS } from './selectedSurgery.interfaces';

export const setSelectedSurgery = (data: string): SELECTED_SURGERY_ACTIONS => {
  return {
    type: SET_SELECTED_SURGERY,
    data,
  };
};
