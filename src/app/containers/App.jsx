import React, {useEffect, useState} from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import {
  useDispatch,
  useSelector,
} from 'react-redux';
import axios, { addAxiosInterceptors } from 'misc/requests';
import * as pages from 'constants/pages';
import AuthoritiesProvider from 'misc/providers/AuthoritiesProvider';
import DefaultPage from 'pageProviders/Default';
import Loading from 'components/Loading';
import PageContainer from 'pageProviders/components/PageContainer';
import pageURLs from 'constants/pagesURLs';

import SecretPage from 'pageProviders/Secret';
import Flights from "pageProviders/Flights";
import FlightDetails from "pageProviders/FlightDetails";
import Profile from "pageProviders/Profile";

import ThemeProvider from 'misc/providers/ThemeProvider';
import UserProvider from 'misc/providers/UserProvider';

import actionsUser from '../actions/user';
import Header from '../components/Header';
import IntlProvider from '../components/IntlProvider';
import MissedPage from '../components/MissedPage';
import SearchParamsConfigurator from '../components/SearchParamsConfigurator';


function App() {
  const dispatch = useDispatch();
  const [state, setState] = useState({
    componentDidMount: false,
  });

  const {
    isFetchingUser,
  } = useSelector(({ user }) => user);

  useEffect(() => {
    addAxiosInterceptors();
    dispatch(actionsUser.fetchUser());
    setState({
      ...state,
      componentDidMount: true,
    });
  }, []);

  return (
    <UserProvider>
      <AuthoritiesProvider>
        <ThemeProvider>
          <BrowserRouter>
            <SearchParamsConfigurator />
            {/* This is needed to let first render passed for App's
              * configuration process will be finished (e.g. locationQuery
              * initializing) */}
            {state.componentDidMount && (
              <IntlProvider>
                <Header
                    // onLogout={() => dispatch(actionsUser.fetchSignOut())}
                />
                {isFetchingUser && (
                  <PageContainer>
                    <Loading />
                  </PageContainer>
                )}
                {!isFetchingUser && (
                  <Routes>
                    <Route
                      element={<DefaultPage />}
                      path={`${pageURLs[pages.defaultPage]}`}
                    />
                    <Route
                        element={<Flights />}
                        path={`${pageURLs[pages.flights]}`}
                    />
                    <Route
                        element={<FlightDetails />}
                        path={`${pageURLs[pages.flightDetails]}`}
                    />
                    <Route
                      element={<Profile />}
                      path={`${pageURLs[pages.profile]}`}
                    />
                    <Route
                      element={(
                        <MissedPage
                          redirectPage={`${pageURLs[pages.defaultPage]}`}
                        />
                      )}
                      path="*"
                    />
                  </Routes>
                )}
              </IntlProvider>
            )}
          </BrowserRouter>
        </ThemeProvider>
      </AuthoritiesProvider>
    </UserProvider>
  );
}

export default App;
