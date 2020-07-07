import { SELECTED_DAY_STATE } from './actions/selectedDay/selectedDay.interfaces';
import { DOCTORS_STATE } from './actions/doctors/doctors.interfaces';
import { SURGERIES_STATE } from './actions/surgeries/surgeries.interfaces';
import { OldSurgeriesByDate } from 'global-interfaces';

export interface State {
  SelectedDay: SELECTED_DAY_STATE;
  Doctors: DOCTORS_STATE;
  Surgeries: SURGERIES_STATE;
  SelectedSurgery: string;
  DraggedSurgery: string;
  OldSurgeries: Array<OldSurgeriesByDate>;
}
