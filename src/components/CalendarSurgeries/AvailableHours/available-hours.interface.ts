import { Surgery } from 'global-interfaces';

export interface AvailableHours {
  selectedDay: Date;
  jornada: Array<number>;
  pendingSurgeries: Array<Surgery>;
}

interface SurgeryTagContent {
  tag: string;
  duration?: number;
}

export interface SurgeryTag {
  [hour: string]: SurgeryTagContent;
}
