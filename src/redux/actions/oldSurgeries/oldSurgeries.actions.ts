import { SET_OLD_SURGERIES } from 'redux/types';
import { OLD_SURGERIES_ACTIONS } from './oldSurgeries.interfaces';

export const setOldSurgeries = (oldSurgeries: any): OLD_SURGERIES_ACTIONS => {
  return {
    type: SET_OLD_SURGERIES,
    data: {
      oldSurgeries,
    },
  };
};
