import { SET_DRAGGED_SURGERY } from 'redux/types';

interface SET_DRAGGED_SURGERY_ACTION {
  type: typeof SET_DRAGGED_SURGERY;
  data: string;
}

export type DRAGGED_SURGERY_ACTIONS = SET_DRAGGED_SURGERY_ACTION;
