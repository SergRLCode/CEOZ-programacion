import React, { useState, useEffect, useCallback } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { useDispatch } from 'react-redux';
import { Button } from '@material-ui/core';

import CircularProg from 'components/CircularProgress';
import SimpleModal from 'components/Modal';

import { ALL_SURGERIES, GET_DOCTORS } from 'graphql/queries';
import { SAVE_SEASON } from 'graphql/mutations';

import { setDoctorData } from 'redux/actions/doctors/doctors.actions';
import { setSurgeriesData } from 'redux/actions/surgeries/surgeries.actions';

import { CalendarInterface } from './calendar.interface';

import './calendar.sass';

const Calendar: React.FC<CalendarInterface> = ({
  selectedDay,
  setSelectedDay,
  pendingSurgeries,
  loadingStatus,
  jornada,
}) => {
  const [surgeriesDate, setSurgeriesDate] = useState<Array<number> | undefined>([]);
  const [date, setCurrentDate] = useState<Date>(new Date()); // Date used to define calendar days
  const [openModal, setOpenModal] = useState<boolean>(false);
  const dispatch = useDispatch();

  const [saveSeason] = useMutation(SAVE_SEASON);
  const allSurgeries = useQuery(ALL_SURGERIES);
  const getDoctors = useQuery(GET_DOCTORS);

  const first: Date = new Date(selectedDay.getTime());
  const second: Date = new Date(selectedDay.getTime() + 60 * 60 * 24 * 1000);
  const first_day: string | number = first.getDate() < 10 ? `0${first.getDate()}` : first.getDate();
  const second_day: string | number =
    second.getDate() < 10 ? `0${second.getDate()}` : second.getDate();
  const first_month: string | number =
    first.getMonth() < 9 ? `0${first.getMonth() + 1}` : first.getMonth() + 1;
  const second_month: string | number =
    second.getMonth() < 9 ? `0${second.getMonth() + 1}` : second.getMonth() + 1;

  const nameOfMonth: string = date.toLocaleString('default', { month: 'long' }).toUpperCase(); // Change the name of current month to spanish

  const rangeDays: Array<Date> = [
    new Date(date.getFullYear(), date.getMonth(), 1),
    new Date(date.getFullYear(), date.getMonth() + 1, 0),
  ];

  const daysOfMonth: Array<number | string> = Array.from(Array(rangeDays[1].getDate()).keys()).map(
    (v: number) => v + 1,
  );
  let contentBody: Array<Array<number | string>> = [];
  let _array: Array<number | string> = [];

  // This loops are being used to fill empty spaces
  for (let i = 0; i < rangeDays[0].getDay(); i++) daysOfMonth.unshift(' ');
  for (let i = 0; i < 6 - rangeDays[1].getDay(); i++) daysOfMonth.push(' ');

  // In this function, the content of daysOfMonth will be sort in arrays with length of 7
  daysOfMonth.forEach((element: number | string) => {
    _array.push(element);
    if (_array.length === 7) {
      contentBody.push(_array);
      _array = [];
    }
  });

  const getSurgeries: Function = useCallback(() => {
    let _surgeries: Array<number> = [];

    if (!!pendingSurgeries) {
      for (let surgery of pendingSurgeries) {
        const surgeryDate: Date = new Date(surgery['date']);
        surgeryDate.setHours(0, 0, 0, 0);
        _surgeries.push(surgeryDate.getTime());
      }
      return _surgeries;
    }
  }, [pendingSurgeries]);

  useEffect(() => {
    const _data: Array<number> = getSurgeries();
    setSurgeriesDate(_data);
    if (!allSurgeries['loading'] && !getDoctors['loading']) {
      dispatch(setDoctorData(getDoctors['data']['getDoctors']));
      dispatch(setSurgeriesData(allSurgeries['data']['allSurgeries']));
    }
  }, [pendingSurgeries, getSurgeries, allSurgeries, getDoctors, dispatch]);

  // This variable contains the body of the table
  const calendarBody: Array<JSX.Element> = contentBody.map(
    (item: Array<number | string>, index: number) => {
      const today: Date = new Date();
      today.setHours(0, 0, 0, 0);
      return (
        <tr className="row" key={index}>
          {item.map((item: number | string, index: number) => {
            const day: Date = new Date(date);
            let surgeries: Array<number> | undefined = [];
            let dayClass: string = '';
            let actualDayClass: string = '';
            let selectedDayClass: string = '';
            let jornadaDay: string = '';

            if (typeof item === 'number') {
              day.setDate(item);
              day.setHours(0, 0, 0, 0);

              dayClass = 'day'; // This variable is the class in CSS to squares that have the date
              actualDayClass = day.getTime() === today.getTime() ? 'actualDay' : ''; // This variable is the class in CSS to the square of today
              selectedDayClass = selectedDay.getTime() === day.getTime() ? 'selectedDay' : ''; // This variable is the class in CSS to the square of selected day
              jornadaDay = jornada && jornada.includes(day.getTime()) ? 'jornadaDay' : '';

              if (!!surgeriesDate)
                surgeries = surgeriesDate.filter((item: number) => item === day.getTime());
            }

            return (
              <td
                key={index}
                className={`${dayClass} ${actualDayClass} ${selectedDayClass} ${jornadaDay}`}
                onClick={() => setSelectedDay(day)}
              >
                {item}
                {surgeries.length > 0 && <p className="count">{surgeries.length}</p>}
                {!!jornadaDay && <p className="jornadaBadge">J</p>}
              </td>
            );
          })}
        </tr>
      );
    },
  );

  const changeMonth: Function = (action: string) => {
    switch (action) {
      case 'prev': {
        setCurrentDate(new Date(date.setMonth(date.getMonth() - 1)));
        break;
      }
      case 'next': {
        setCurrentDate(new Date(date.setMonth(date.getMonth() + 1)));
        break;
      }
    }
  };

  const CalendarControls: React.FC = () => (
    <div className="header">
      <button onClick={() => changeMonth('prev')}>
        <b>{'<'}</b>
      </button>
      <p>{`${nameOfMonth} ${date.getFullYear()}`}</p>
      <button onClick={() => changeMonth('next')}>
        <b>{'>'}</b>
      </button>
    </div>
  );

  const CalendarComponent: React.FC = () => (
    <table>
      <thead>
        <tr>
          <th>Domingo</th>
          <th>Lunes</th>
          <th>Martes</th>
          <th>Miércoles</th>
          <th>Jueves</th>
          <th>Viernes</th>
          <th>Sábado</th>
        </tr>
      </thead>
      <tbody>{calendarBody}</tbody>
    </table>
  );

  const SetJornadaButton: React.FC = () => (
    <button
      className="set_jornada_button"
      disabled={jornada?.length > 0 ? true : false}
      onClick={() => {
        setOpenModal(true);
      }}
    >
      ESTABLECER JORNADA
    </button>
  );

  const ModalContent: JSX.Element = (
    <div>
      <p style={{ padding: '2em 0' }}>
        ¿Establecer jornada del {first.getDate()} de{' '}
        {first.toLocaleString('default', { month: 'long' }).toUpperCase()} al {second.getDate()} de{' '}
        {second.toLocaleString('default', { month: 'long' }).toUpperCase()}?
      </p>
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          saveSeason({
            variables: {
              firstDate: `${first.getFullYear()}-${first_month}-${first_day} 00:00:00`,
              SecondDate: `${second.getFullYear()}-${second_month}-${second_day} 00:00:00`,
            },
          });
        }}
      >
        Aceptar
      </Button>
      <Button onClick={() => setOpenModal(false)}>Cancelar</Button>
    </div>
  );

  const CircularProgress: React.FC = () => {
    return loadingStatus ? (
      <div className="loading">
        <CircularProg />
      </div>
    ) : (
      <></>
    );
  };

  return (
    <div className="calendar">
      <CalendarControls />
      <CalendarComponent />
      <SetJornadaButton />
      <SimpleModal
        title="Establecer jornada"
        content={ModalContent}
        open={openModal}
        setOpen={(val: boolean) => setOpenModal(val)}
      />
      <CircularProgress />
    </div>
  );
};

export default Calendar;
