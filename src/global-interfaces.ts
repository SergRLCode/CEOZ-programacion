export interface Surgery {
  id: string;
  serial: string;
  hour?: string;
  status: string;
  date: string;
  profesionalID: string;
  name?: string;
  duration?: number;
  patientName?: string;
}

export interface OldSurgeriesByDate {
  [dateSurgery: string]: Array<Surgery>;
}

export interface RadioGroupInterface {
  question?: string;
  firstVal: string;
  firstLabel: string;
  secondVal: string;
  secondLabel: string;
  onClick: Function;
}
