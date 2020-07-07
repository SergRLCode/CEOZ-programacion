import { SET_SELECTED_SURGERY } from 'redux/types';

interface SET_SELECTED_SURGERY_ACTION {
  type: typeof SET_SELECTED_SURGERY;
  data: string;
}

export type SELECTED_SURGERY_ACTIONS = SET_SELECTED_SURGERY_ACTION;
