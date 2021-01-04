import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Header from "./components/utils/Header";
import Home from './components/home/Home';
import ResultsForm from './components/resultsform/ResultsForm';
import SessionsPage from './components/sessionspage/SessionsPage';
import ResultsPage from './components/resultspage/ResultsPage';
import Graph from './components/graph/Graph';

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/input-results" component={ResultsForm} />
            <Route exact path="/sessions" component={SessionsPage} />
            <Route exact path="/results" component={ResultsPage} />
            <Route exact path="/graph" component={Graph} />
          </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
