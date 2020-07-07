import { SET_SURGERIES } from 'redux/types';

interface SURGERY {
  name: string;
  duration: number;
}

export interface SURGERIES_STATE {
  surgeries: Array<SURGERY>;
}

interface SET_SURGERIES_ACTION {
  type: typeof SET_SURGERIES;
  data: SURGERIES_STATE;
}

export type SURGERIES_ACTIONS = SET_SURGERIES_ACTION;
