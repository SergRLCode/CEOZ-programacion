import { SET_OLD_SURGERIES } from 'redux/types';

export const OldSurgeries = (state = {}, action: any) => {
  switch (action.type) {
    case SET_OLD_SURGERIES: {
      return action.data.oldSurgeries;
    }
    default:
      return state;
  }
};
