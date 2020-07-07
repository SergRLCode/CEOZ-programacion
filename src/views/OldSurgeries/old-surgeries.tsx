import React from 'react';
import { useSelector } from 'react-redux';
import Collapsible from 'components/OldSurgeries/Collapsible';
import { State } from 'redux/state.interface';
import { OldSurgeriesByDate } from 'global-interfaces';
import './old-surgeries.style.sass';

const OldSurgeries: React.FC = () => {
  const oldSurgeries = useSelector((state: State) => state['OldSurgeries']);

  const getYears = () => {
    let years: Set<string> = new Set();

    oldSurgeries.forEach((oldSurgery: OldSurgeriesByDate) => {
      const date = Object.keys(oldSurgery)[0];
      const year = date.split('-')[0];
      years.add(year);
    });

    const sortedYears: Array<string> = Array.from(years).sort().reverse();

    return sortedYears;
  };

  const collapsiblesForYear = getYears().map((year: string) => {
    let surgeriesOfYear: Array<OldSurgeriesByDate> = oldSurgeries.filter(
      (oldSurgery: OldSurgeriesByDate) => Object.keys(oldSurgery)[0].match(year),
    );

    return <Collapsible key={year} year={year} oldSurgeries={surgeriesOfYear} />;
  });

  return <div className="old-surgeries">{collapsiblesForYear}</div>;
};

export default OldSurgeries;
