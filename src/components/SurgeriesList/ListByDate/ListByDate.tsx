import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { setSelectedSurgery } from 'redux/actions/selectedSurgery/selectedSurgery.actions';
import { setDraggedSurgery } from 'redux/actions/draggedSurgery/draggedSurgery.actions';

import { Surgery } from 'global-interfaces';
import { ListByDateInterface } from './ListByDate.interface';

import { MONTHS } from 'global-values';

import './ListByDate.style.sass';

const ListByDate: React.FC<ListByDateInterface> = ({ date, surgeries }) => {
  const _date: Array<string> = date.split('-');
  const month: string = MONTHS[parseInt(_date[1]) - 1];
  const router = useHistory();
  const dispatch = useDispatch();

  const onClick: Function = (id: string) => {
    dispatch(setSelectedSurgery(id));
    router.push('/surgeryDetails');
  };

  const onDragStart: Function = (id: string) => dispatch(setDraggedSurgery(id));

  const onDragEnd: Function = () => dispatch(setDraggedSurgery(''));

  let sortedList: Array<string | undefined> = surgeries.map((surgery: Surgery) => surgery['hour']);
  sortedList = sortedList.sort();
  let _surgeries: Array<JSX.Element> = [];

  sortedList.forEach((item: string | undefined) => {
    surgeries.forEach((surgery: Surgery) => {
      if (item === surgery['hour']) {
        const approved: object =
          surgery['status'] === 'Aceptada'
            ? {
                borderLeft: '3em solid #4FC3F7',
              }
            : {
                borderLeft: '3em solid #FFFFFF',
              };

        _surgeries.push(
          <div
            key={surgery['id']}
            className="list-by-day__surgeries"
            draggable
            style={approved}
            onClick={() => onClick(surgery['id'])}
            onDragStart={() => onDragStart(surgery['id'])}
            onDragEnd={() => onDragEnd()}
          >
            <p>{`${surgery['hour']} - ${surgery['serial']}`}</p>
            <p>{surgery['profesionalID']}</p>
          </div>,
        );
      }
    });
  });

  return (
    <div className="list-by-day">
      <div className="list-by-day__header">{`${_date[2]}-${month}-${_date[0]}`}</div>
      {_surgeries}
    </div>
  );
};

export default ListByDate;
