import React from 'react';
import { useSelector } from 'react-redux';
import { State } from 'redux/state.interface';
import ListByDate from 'components/SurgeriesList/ListByDate';
import './old-surgeries-by-date.sass';

const OldSurgeriesByDate: React.FC = (props: any) => {
  const { date } = props.match.params;
  let OldSurgeries = useSelector((state: State) => state['OldSurgeries']);
  OldSurgeries = OldSurgeries.filter((oldSurgery: any) => {
    return Object.keys(oldSurgery)[0].match(date);
  });

  const surgeriesOfMonth = OldSurgeries.map((oldSurgery: any) => {
    const key = Object.keys(oldSurgery)[0];
    return <ListByDate key={key} date={key} surgeries={oldSurgery[key]} />;
  });

  return <div className="old-surgeries">{surgeriesOfMonth}</div>;
};

export default OldSurgeriesByDate;
