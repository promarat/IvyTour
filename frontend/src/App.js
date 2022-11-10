import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { connect } from 'react-redux';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import AppLayout from './layouts/AppLayout';
import { frontRoutes, innerRoutes } from './routes/routes';
import { getUniversities } from './store/actions/universityActions';
import './App.css';

const App = (props) => {
  const { getUniversities } = props;
  const routes = [...frontRoutes, ...innerRoutes];
  const stripeKey = !!process.env.REACT_APP_DEVELOPMENT
    ? process.env.REACT_APP_STRIPE_TEST_KEY
    : process.env.REACT_APP_STRIPE_REAL_KEY;
  const stripePromise = loadStripe(stripeKey);

  useEffect(() => {
    getUniversities();
  }, [getUniversities]);

  return (
    <BrowserRouter>
      <Elements stripe={stripePromise}>
        <AppLayout>
          <Routes>
            {routes.map((route, idx) => (
              route.component && (
                <Route
                  key={idx}
                  path={route.path}
                  exact={route.exact ?? false}
                  element={<route.component />}
                />
              )
            ))}
          </Routes>
        </AppLayout>
      </Elements>
    </BrowserRouter>
  );
}

const mapDispatchToProps = { getUniversities };
export default connect(null, mapDispatchToProps)(App);
