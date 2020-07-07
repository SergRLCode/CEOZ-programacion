import { SET_OLD_SURGERIES } from 'redux/types';
import { OldSurgeriesByDate } from 'global-interfaces';

interface SetOldSurgeryAction {
  type: typeof SET_OLD_SURGERIES;
  data: {
    oldSurgeries: Array<OldSurgeriesByDate>;
  };
}

export type OLD_SURGERIES_ACTIONS = SetOldSurgeryAction;
