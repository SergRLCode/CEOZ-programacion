import { SET_SELECTED_DAY } from 'redux/types';

export const SelectedDay = (state = {}, action: any) => {
  switch (action.type) {
    case SET_SELECTED_DAY: {
      return action.data;
    }
    default:
      return state;
  }
};
