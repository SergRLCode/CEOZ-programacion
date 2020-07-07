import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import arrow_down from 'assets/icons/arrow_down.svg';

import { MONTHS } from 'global-values';

import { OldSurgeriesByDate } from 'global-interfaces';
import { CollapsibleInterface } from './collapsible.interface';

import './collapsible.sass';

const Collapsible: React.FC<CollapsibleInterface> = ({ year, oldSurgeries }) => {
  const [collapsed, setCollapsed] = useState(true);
  const router = useHistory();

  const getMonths = () => {
    let months: Set<string> = new Set();
    oldSurgeries.forEach((oldSurgery: OldSurgeriesByDate) => {
      const date: string = Object.keys(oldSurgery)[0];
      const numericMonth: number = parseInt(date.split('-')[1]);
      months.add(MONTHS[numericMonth - 1]);
    });
    return Array.from(months);
  };

  const onClick = () => setCollapsed(!collapsed);

  const iconClass = collapsed ? 'arrowUp' : 'arrowDown';

  const months = getMonths().map((month: string) => {
    const date = `${year}-${
      MONTHS.indexOf(month) + 1 < 10
        ? `0${MONTHS.indexOf(month) + 1}`
        : `${MONTHS.indexOf(month) + 1}`
    }`;
    return (
      <div
        key={month}
        className="collapsible__items__item"
        onClick={() => router.push(`/oldSurgeries/${date}`)}
      >
        <h1>{month}</h1>
      </div>
    );
  });

  return (
    <>
      <div className="collapsible" onClick={onClick}>
        <h1>{year}</h1>
        <img className={iconClass} src={arrow_down} alt="arrow_down" />
      </div>
      <div
        className="collapsible__items"
        style={{
          height: collapsed ? '0' : `${5.375 * getMonths().length}em`,
          overflow: 'hidden',
        }}
      >
        {months}
      </div>
    </>
  );
};

export default Collapsible;
