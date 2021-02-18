// Tally all of a user's results

import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { formatResultTime } from '../utils/timeFunctions';
import UserNoInput from '../utils/UserNoInput';
import renderWait from '../utils/renderWait';

const ResultsPage = (props) => {
  const { id } = props.user;
  const [results, setResults] = useState(null);
  useEffect(() => {
      const fetchData = async () => {
        const user = localStorage.getItem('token');
        try {
          const response = await axios.get(`http://localhost:5000/api/sessions/accum?u_id=${id}`, {
            headers: { 'Authorization': `Bearer ${user}`}
          });
          setResults(response.data);
        } catch (err) {
          throw err;
        }
    };
    if(id){
      fetchData();
    }
  }, [id])

  const renderResults = () => {
    if (results.num_sessions === 0) {
      return (
        <UserNoInput page="results" />
      )
    }
    return (
      <section className="results__section">
        <div className="results__section--row">
          <div>Total Profit</div>
          <div>{results.profit < 0 ? `-$${Math.abs(results.profit)}` : `$${results.profit}`}</div>
        </div>
        <div className="results__section--row">
          <div>Total Time Played</div>
          <div>{formatResultTime(results.time_length)}</div>
        </div>
        <div className="results__section--row">
          <div>Session Winning Percentage</div>
          <div>{Math.round((results.num_profit / results.num_sessions) * 100)} %</div>
        </div>
        <div className="results__section--row">
          <div>Profit Per Hour</div>
          <div>${(results.profit / results.time_length).toFixed(2)}</div>
        </div>
        <div className="results__section--row">
          <div>Profit Per Session</div>
          <div>${(results.profit / results.num_sessions).toFixed(2)}</div>
        </div>
      </section>
    )
  }

  return (
    <div>
      {results ? renderResults() : renderWait(localStorage.getItem('id'), id)}
    </div>
  )
};

function mapStateToProps(state) {
  return { user: state.auth }
}

export default connect(mapStateToProps)(ResultsPage);