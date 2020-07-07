import { SET_SELECTED_DAY } from 'redux/types';

export interface SELECTED_DAY_STATE {
  selected_day: string;
  availableTime: number;
}

interface SET_SELECTED_DAY_ACTION {
  type: typeof SET_SELECTED_DAY;
  data: SELECTED_DAY_STATE;
}

export type SELECTED_DAY_ACTIONS = SET_SELECTED_DAY_ACTION;
