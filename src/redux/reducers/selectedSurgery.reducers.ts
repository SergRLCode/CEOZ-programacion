import { SET_SELECTED_SURGERY } from 'redux/types';

export const SelectedSurgery = (surgery = '', action: any) => {
  switch (action.type) {
    case SET_SELECTED_SURGERY: {
      return action.data;
    }
    default:
      return surgery;
  }
};
