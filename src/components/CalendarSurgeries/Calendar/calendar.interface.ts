import { Surgery } from 'global-interfaces';

export interface CalendarInterface {
  selectedDay: Date;
  setSelectedDay: Function;
  pendingSurgeries: Array<Surgery> | undefined;
  loadingStatus: boolean;
  jornada: Array<number>;
}
