import React, { useState, useEffect } from 'react';
import { useQuery, useSubscription } from '@apollo/react-hooks';
import AvailableHours from 'components/CalendarSurgeries/AvailableHours';
import Calendar from 'components/CalendarSurgeries/Calendar';
import { GET_SURGERIES, GET_JORNADA } from 'graphql/queries';
import { SUB_PENDING_SURGERIES } from 'graphql/subscriptions';
import { Surgery } from 'global-interfaces';
import './calendarSurgeries.style.sass';

const CalendarSurgeries: React.FC = () => {
  const defaultDay: Date = new Date();
  defaultDay.setHours(0, 0, 0, 0);
  const [selectedDay, setSelectedDay] = useState<Date>(defaultDay); // Date used to know which day was selected by user
  const [surgeries, setSurgeries] = useState<Array<Surgery>>([]);

  const getSurgeries = useQuery(GET_SURGERIES);
  const getJornada = useQuery(GET_JORNADA);
  const subPendingSurgeries = useSubscription(SUB_PENDING_SURGERIES);

  useEffect(() => {
    getSurgeries.refetch();
    console.log(subPendingSurgeries.error);

    if (!!subPendingSurgeries.data) {
      setSurgeries(subPendingSurgeries.data['subPendingSurgeries']);
    } else if (!getSurgeries.loading) {
      setSurgeries(getSurgeries.data['pendingSurgeries']);
    }
  }, [getSurgeries, subPendingSurgeries]);

  let jornada = getJornada['loading'] ? undefined : getJornada.data['getSeason'];

  if (!!jornada)
    jornada = jornada.map((item: string) => {
      const _day: Date = new Date(item);
      _day.setHours(0, 0, 0, 0);
      return _day.getTime();
    });

  return (
    <div className="calendar-surgeries">
      <Calendar
        selectedDay={selectedDay}
        setSelectedDay={(day: Date) => setSelectedDay(day)}
        pendingSurgeries={surgeries}
        loadingStatus={getSurgeries['loading']}
        jornada={jornada}
      />
      <AvailableHours selectedDay={selectedDay} jornada={jornada} pendingSurgeries={surgeries} />
    </div>
  );
};

export default CalendarSurgeries;
