import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Header from "./components/utils/Header";
import Home from './components/home/Home';
import SessionForm from './components/sessionform/SessionForm';
import SessionsPage from './components/sessionspage/SessionsPage';
import ResultsPage from './components/resultspage/ResultsPage';
import Graph from './components/graph/Graph';
import EditSession from './components/sessionspage/EditSession';

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
            <Route exact path="/graph" component={Graph} />
            <Route path="/sessions/edit/:session_id" component={EditSession} />
          </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
