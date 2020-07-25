import React, { useEffect } from 'react';
import Navbar from './components/layout/navbar/Navbar';
import './app.css';
import Landing from './components/layout/home/Landing';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Register from './components/auth/Register';
import { Provider } from 'react-redux';
import store from './store';
import AlertSet from './components/layout/layoutUtils/Alert';
import Login from './components/auth/Login';
import setAuthToken from './helpers/setToken';
import { loadUser } from './actions/auth';

function App() {
  // try loading the user as soon as app starts
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <div className='App'>
      <Provider store={store}>
        <Router>
          <Navbar />
          <AlertSet />
          <Route exact path='/' component={Landing} />
          <Switch>
            <Route exact path='/register' component={Register} />
            <Route exact path='/login' component={Login} />
          </Switch>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
