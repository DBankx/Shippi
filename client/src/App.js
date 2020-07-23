import React from 'react';
import Navbar from './components/layout/navbar/Navbar';
import './app.css';
import Landing from './components/layout/home/Landing';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <div className='App'>
      <Router>
        <Navbar />
        <Route exact path='/' component={Landing} />
      </Router>
    </div>
  );
}

export default App;
