import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { SelectedDay } from '../reducers/selectedDay.reducers';
import { Doctors } from '../reducers/doctors.reducers';
import { Surgeries } from '../reducers/surgeries.reducers';
import { SelectedSurgery } from '../reducers/selectedSurgery.reducers';
import { DraggedSurgery } from '../reducers/draggedSurgery.reducers';
import { OldSurgeries } from '../reducers/oldsurgeries.reducers';
import thunk from 'redux-thunk';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducers = combineReducers({
  SelectedDay,
  Surgeries,
  SelectedSurgery,
  Doctors,
  OldSurgeries,
  DraggedSurgery,
});

const Store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

export default Store;
