import { SET_DRAGGED_SURGERY } from 'redux/types';
import { DRAGGED_SURGERY_ACTIONS } from './draggedSurgery.interfaces';

export const setDraggedSurgery = (data: string): DRAGGED_SURGERY_ACTIONS => {
  return {
    type: SET_DRAGGED_SURGERY,
    data,
  };
};
