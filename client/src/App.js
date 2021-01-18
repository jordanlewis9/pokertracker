import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Header from "./components/utils/Header";
import Home from './components/home/Home';
import SessionForm from './components/sessionform/SessionForm';
import SessionsPage from './components/sessionspage/SessionsPage';
import ResultsPage from './components/resultspage/ResultsPage';
import GraphPage from './components/graph/GraphPage';
import EditSession from './components/sessionspage/EditSession';
import Signin from './components/signinform/Signin';
import Signup from './components/signupform/Signup';

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/input-session" component={SessionForm} />
            <Route exact path="/sessions" component={SessionsPage} />
            <Route exact path="/results" component={ResultsPage} />
            <Route exact path="/graph" component={GraphPage} />
            <Route exact path="/signin" component={Signin} />
            <Route exact path="/signup" component={Signup} />
            <Route path="/sessions/edit/:session_id" component={EditSession} />
          </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
