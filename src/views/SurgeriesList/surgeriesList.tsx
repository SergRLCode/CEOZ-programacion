import React, { useEffect, useState } from 'react';
import { useQuery, useSubscription, useMutation } from '@apollo/react-hooks';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '@material-ui/core';

import ListByDate from 'components/SurgeriesList/ListByDate';
import CircularProg from 'components/CircularProgress';
import SimpleModal from 'components/Modal';

import { ALL_SURGERIES_ADMIN } from 'graphql/queries';
import { SUB_PENDING_SURGERIES } from 'graphql/subscriptions';
import { DELETE_SURGERY } from 'graphql/mutations';

import { State } from 'redux/state.interface';
import { setOldSurgeries } from 'redux/actions/oldSurgeries/oldSurgeries.actions';

import { Surgery, OldSurgeriesByDate } from 'global-interfaces';
import { IconStyle } from './surgeriesList.interfaces';

import del_r from 'assets/icons/delete_r.svg';
import del_w from 'assets/icons/delete_w.svg';
import past from 'assets/icons/past.svg';

import './surgeriesList.style.sass';

const SurgeriesList: React.FC = () => {
  const router = useHistory();
  const dispatch = useDispatch();
  const surgeryDragged = useSelector((state: State) => state['DraggedSurgery']);

  const allSurgeriesAdmin = useQuery(ALL_SURGERIES_ADMIN);
  const [deleteSurgery] = useMutation(DELETE_SURGERY);
  const subPendingSurgeries = useSubscription(SUB_PENDING_SURGERIES);

  const [pending, setPending] = useState<Array<Surgery>>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [dragged, setDragged] = useState<string>('');
  const [iconStyle, setIconStyle] = useState<IconStyle>({
    icon: del_r,
    style: {
      backgroundColor: '',
    },
  });

  let oldSurgeries: Array<OldSurgeriesByDate> = [];
  let listsByDate: Array<JSX.Element> = [];
  let listDates: Set<string> = new Set();
  let oldSurgeriesByDate: OldSurgeriesByDate = {};

  useEffect(() => {
    allSurgeriesAdmin.refetch();

    if (!!subPendingSurgeries.data) {
      setPending(subPendingSurgeries.data['subPendingSurgeries']);
    } else if (!allSurgeriesAdmin.loading) {
      setPending(allSurgeriesAdmin.data['allSurgeriesAdmin']);
    }
  }, [allSurgeriesAdmin, subPendingSurgeries]);

  if (pending) {
    // To extract dates
    pending.forEach((surgery: Surgery) => {
      const surgery_date: string = surgery['date'].split(' ')[0];
      listDates.add(surgery_date);
    });

    const _listDates: Array<string> = Array.from(listDates).sort();
    _listDates.forEach((date: string) => (oldSurgeriesByDate[date] = []));

    listDates.forEach((date: string) => {
      pending.forEach((surgery: Surgery) => {
        if (surgery['date'].match(date)) {
          oldSurgeriesByDate[date].push({
            id: surgery['id'],
            serial: surgery['serial'],
            hour: surgery['date'].substring(11, 16),
            status: surgery['status'],
            date: surgery['date'],
            profesionalID: surgery['profesionalID'],
          });
        }
      });
    });
  }

  for (let val in oldSurgeriesByDate) {
    const today: Date = new Date();
    today.setHours(0, 0, 0, 0);

    if (today <= new Date(`${val} 00:00:00`))
      listsByDate.push(<ListByDate key={val} date={val} surgeries={oldSurgeriesByDate[val]} />);
    else oldSurgeries.push({ [val]: oldSurgeriesByDate[val] });
  }

  const handleDeleteButton: Function = () => {
    deleteSurgery({ variables: { id: dragged } });
    setTimeout(() => {
      setOpen(false);
      setDragged('');
    }, 100);
  };

  const handleCancelButton: Function = () => {
    setOpen(false);
    setDragged('');
  };

  const handleClickOldSurgeriesButton: Function = () => {
    dispatch(setOldSurgeries(oldSurgeries));
    router.push('/oldSurgeries');
  };

  const onDragEnter: Function = () => {
    setIconStyle({
      icon: del_w,
      style: {
        backgroundColor: 'red',
      },
    });
  };

  const onDragExit: Function = () => {
    setIconStyle({
      icon: del_r,
      style: {
        backgroundColor: '',
      },
    });
  };

  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragged(surgeryDragged);
    setOpen(true);
    setTimeout(() => setIconStyle({ icon: del_r, style: { backgroundColor: '' } }), 10);
  };

  const modalContent: JSX.Element = (
    <div>
      <p style={{ padding: '2em 0' }}>¿Eliminar cirugia?</p>
      <Button variant="contained" color="primary" onClick={() => handleDeleteButton()}>
        Eliminar
      </Button>
      <Button onClick={() => handleCancelButton()}>Cancelar</Button>
    </div>
  );

  return (
    <div className="surgeries-list">
      {allSurgeriesAdmin['loading'] ? (
        <div className="loading">
          <CircularProg />
        </div>
      ) : (
        <>
          <div
            className={`delete delete--${!!surgeryDragged || !!dragged ? 'show' : 'hide'}`}
            onDragEnter={() => onDragEnter()}
            onDragExit={() => onDragExit()}
            onDragOver={onDragOver}
            onDrop={onDrop}
            style={iconStyle['style']}
          >
            <img src={iconStyle['icon']} alt="delete" />
          </div>
          <>
            {listsByDate.length !== 0 ? (
              listsByDate
            ) : (
              <h1 className="message">No hay cirugias pendientes por revisar</h1>
            )}
          </>
          <div className="past_surgeries" onClick={() => handleClickOldSurgeriesButton()}>
            <img src={past} alt="past" />
          </div>
          <SimpleModal
            title="Borrar cirugia"
            content={modalContent}
            open={open}
            setOpen={(val: boolean) => setOpen(val)}
          />
        </>
      )}
    </div>
  );
};

export default SurgeriesList;
