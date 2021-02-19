import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import history from './createHistory';
import Header from "./components/header/Header";
import Home from './components/home/Home';
import NewSession from './components/newsession/NewSession';
import SessionsPage from './components/sessionspage/SessionsPage';
import ResultsPage from './components/resultspage/ResultsPage';
import GraphPage from './components/graph/GraphPage';
import EditSession from './components/sessionspage/EditSession';
import Signin from './components/signinform/Signin';
import Signup from './components/signupform/Signup';
import Error from './components/error/Error';
import EditUser from './components/user/EditUser';
import './main.css';

const App = () => {
  window.addEventListener('click', (e) => {
    const menu = document.querySelector('.nav__container');
    const navlink = document.querySelector('.nav__toggle-button');
    if (window.innerWidth < 800) {
      if (menu.contains(e.target) || navlink.contains(e.target)) {
        return null;
      } else {
        if (menu.classList.contains('nav__container--active') && navlink.classList.contains('hide-nav__toggle')) {
          menu.classList.remove('nav__container--active');
          navlink.classList.remove('hide-nav__toggle');
        }
      }
    }
  })

  return (
    <div className="App">
      <Router history={history}>
        <Route component={Header} />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/input-session" component={NewSession} />
            <Route exact path="/sessions" component={SessionsPage} />
            <Route exact path="/results" component={ResultsPage} />
            <Route exact path="/graph" component={GraphPage} />
            <Route exact path="/signin" component={Signin} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/user" component={EditUser} />
            <Route path="/sessions/edit/:session_id" component={EditSession} />
            <Route component={Error} />
          </Switch>
      </Router>
    </div>
  );
}

export default App;
