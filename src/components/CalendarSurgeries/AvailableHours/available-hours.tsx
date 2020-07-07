import React, { useEffect, useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { setSelectedDay } from 'redux/actions/selectedDay/selectedDay.actions';

import { AvailableHours as AHInterface, SurgeryTag } from './available-hours.interface';
import { Surgery } from 'global-interfaces';

import { WEEKDAY_HOURS, SATURDAY_HOURS } from 'global-values';

import './available-hours.sass';

const AvailableHours: React.FC<AHInterface> = ({ selectedDay, jornada, pendingSurgeries }) => {
  const [surgeriesToday, setSurgeriesToday] = useState<SurgeryTag>({});
  const history = useHistory();
  const dispatch = useDispatch();

  let initBusyHours: Array<string> = [];
  const initHours: Array<string> = selectedDay.getDay() === 6 ? SATURDAY_HOURS : WEEKDAY_HOURS;

  const jornadaLabelContent: string =
    !!jornada && jornada.includes(selectedDay.getTime()) ? 'jornada' : '';

  if (surgeriesToday) {
    for (let val in surgeriesToday) {
      const duration: number | undefined = surgeriesToday[val].duration;
      for (let i = initHours.indexOf(val); i < initHours.indexOf(val) + (duration || 0) * 2; i++)
        initBusyHours.push(initHours[i]);
    }
  }

  const onClick = (isBusy: boolean, hour: string) => {
    if (!isBusy && !jornadaLabelContent) {
      const time: Array<string> = hour.split(':');
      const _day: Date = new Date(selectedDay.setHours(parseInt(time[0]), parseInt(time[1]), 0, 0));
      let verifyBusyHours: Array<string> = initBusyHours.filter((item: string) => item > hour);
      let availableTime: number = 0;
      const minutes: string = _day.getMinutes() === 0 ? '00' : '30';
      const _hour: string | number = _day.getHours() < 10 ? `0${_day.getHours()}` : _day.getHours();
      const day: string | number = _day.getDate() < 10 ? `0${_day.getDate()}` : _day.getDate();
      const month: string | number =
        _day.getMonth() < 10 ? `0${_day.getMonth() + 1}` : _day.getMonth() + 1;

      verifyBusyHours = verifyBusyHours.sort();

      if (!!verifyBusyHours[0]) {
        for (let i = initHours.indexOf(hour); i < initHours.indexOf(verifyBusyHours[0]); i++)
          availableTime += 0.5;
      } else {
        for (let i = initHours.indexOf(hour); i < initHours.length; i++) availableTime += 0.5;
        availableTime += 0.5;
      }

      history.push('/surgeryForm');
      dispatch(
        setSelectedDay({
          selected_day: `${_day.getFullYear()}-${month}-${day} ${_hour}:${minutes}:00`,
          availableTime,
        }),
      );
    }
  };

  const setSelectedDaySurgeries: Function = useCallback(() => {
    let _surgeriesToday: Array<Surgery>;
    let surgeryTags: SurgeryTag = {};

    if (!!pendingSurgeries) {
      _surgeriesToday = pendingSurgeries.filter((surgery: Surgery) => {
        const _date: Date = new Date(surgery.date);
        _date.setHours(0, 0, 0, 0);

        return _date.getTime() === selectedDay.getTime();
      });

      for (let i: number = 0; i < _surgeriesToday.length; i++) {
        const key: string = _surgeriesToday[i].date.substring(11, 16);
        surgeryTags[key] = {
          tag: `${_surgeriesToday[i].name} ${_surgeriesToday[i].patientName}`,
          duration: _surgeriesToday[i].duration,
        };
      }

      setSurgeriesToday(surgeryTags);
    }
  }, [selectedDay, pendingSurgeries]);

  useEffect(() => {
    setSelectedDaySurgeries();
  }, [setSurgeriesToday, setSelectedDaySurgeries]);

  const initHoursListElement: Array<JSX.Element> = initHours.map((hour: string) => {
    let content: string = '';
    const busy: boolean = initBusyHours.includes(hour);

    if (!!surgeriesToday && !!surgeriesToday[hour]) content = ` - ${surgeriesToday[hour].tag}`;

    return (
      <p
        key={hour}
        className={`available ${jornadaLabelContent} ${busy && 'busy'}`}
        onClick={() => onClick(busy, hour)}
      >
        {hour}
        {!!jornadaLabelContent && ' - JORNADA'}
        {content}
      </p>
    );
  });

  return <div className="available-hours">{initHoursListElement}</div>;
};

export default AvailableHours;
