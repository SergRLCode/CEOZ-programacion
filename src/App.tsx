import React from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import { Provider } from 'react-redux';
import { client } from './graphql';
import Store from 'redux/store/store';
import 'App.sass';
// Components
import Navbar from 'components/Navbar';
// Views
import Login from 'components/Login';
import SurgeriesList from 'views/SurgeriesList';
import CalendarSurgeries from 'views/CalendarSurgeries';
import NewSurgeryForm from 'views/NewSurgeryForm';
import OldSurgeries from 'views/OldSurgeries';
import SurgeryDetails from 'views/SurgeryDetails';
import OldSurgeriesByDate from 'views/OldSurgeriesByDate';

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Provider store={Store}>
        <HashRouter>
          <div className="main-view">
            <Navbar />
            <Switch>
              <Route exact path="/" component={Login} />
              <Route path="/surgeriesList" component={SurgeriesList} />
              <Route path="/calendarSurgeries" component={CalendarSurgeries} />
              <Route path="/surgeryForm" component={NewSurgeryForm} />
              <Route path="/surgeryDetails" component={SurgeryDetails} />
              <Route exact path="/oldSurgeries" component={OldSurgeries} />
              <Route path="/oldSurgeries/:date" component={OldSurgeriesByDate} />
            </Switch>
          </div>
        </HashRouter>
      </Provider>
    </ApolloProvider>
  );
};

export default App;
