import { Routes, Route, BrowserRouter } from 'react-router-dom';
import AppLayout from './layouts/AppLayout';
import { routes } from './routes/routes';

function App() {

  return (
    <BrowserRouter>
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
    </BrowserRouter>
  );
}

export default App;
