import { Surgery } from 'global-interfaces';

export interface ListByDateInterface {
  date: string;
  surgeries: Array<Surgery>;
}
