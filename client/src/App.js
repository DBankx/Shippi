import React, { useEffect } from 'react';
import Navbar from './components/layout/navbar/Navbar';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './app.css';
import Landing from './components/layout/home/Landing';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Register from './components/auth/Register';
import { Provider } from 'react-redux';
import store from './store';
import AlertSet from './components/layout/layoutUtils/Alert';
import Login from './components/auth/Login';
import setToken from './helpers/setToken';
import { loadUser } from './actions/auth';
import Profile from './components/profile/Profile';
import PrivateRoute from './helpers/PrivateRoute';
import EditProfile from './components/profile/editProfile/EditProfile';
import ProfileSetup from './components/profile/profileSetup/ProfileSetup';
import ProductForm from './components/product/createProduct/ProductForm';
import Preview from './components/product/createProduct/Preview';

if (localStorage.token) {
  setToken(localStorage.token);
}

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
            <Route exact path='/profile/:username' component={Profile} />
            <PrivateRoute exact path='/edit-profile' component={EditProfile} />
            <PrivateRoute
              exact
              path='/profile-setup'
              component={ProfileSetup}
            />
            <Route exact path='/sell' component={ProductForm} />
          </Switch>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
