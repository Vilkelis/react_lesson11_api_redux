import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import ServiceForm from './components/ServiceForm';
import ServiceList from './components/ServiceList';


function App() {
  return (
    <div className="App">
      <div className="app-container">
        <Router>
          <Switch>
            <Redirect exact from='/' to='/services' />
            <Route exact path="/services" component={ServiceList} />
            <Route exact path="/services/:id" component={ServiceForm} />
          </Switch>      
        </Router>
      </div>
    </div>
  );
}

export default App;
