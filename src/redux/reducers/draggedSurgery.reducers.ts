import { SET_DRAGGED_SURGERY } from 'redux/types';

export const DraggedSurgery = (state = '', action: any) => {
  switch (action.type) {
    case SET_DRAGGED_SURGERY: {
      return action.data;
    }
    default:
      return state;
  }
};
