// Tally all of a user's results

import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { formatResultTime } from '../utils/timeFunctions';
import UserNoInput from '../utils/UserNoInput';
import NeedAccount from '../utils/NeedAccount';

const ResultsPage = (props) => {
  const { user } = props;
  const [results, setResults] = useState(null);
  useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/api/sessions/accum?u_id=${user}`);
          setResults(response.data);
        } catch (err) {
          throw err;
        }
    };
    if(user){
      fetchData();
    }
  }, [user])

  const renderWait = () => {
    if (!user) {
      return (
        <NeedAccount />
      )
    } else {
      return (
        <p>Loading...</p>
      )
    }
  }

  const renderResults = () => {
    if (results.num_sessions === 0) {
      return (
        <UserNoInput page="results" />
      )
    }
    return (
      <table>
        <tbody>
          <tr>
            <td>Total Profit</td>
            <td>{results.profit < 0 ? `-$${Math.abs(results.profit)}` : `$${results.profit}`}</td>
          </tr>
          <tr>
            <td>Total Time Played</td>
            <td>{formatResultTime(results.time_length)}</td>
          </tr>
          <tr>
            <td>Profit Per Hour</td>
            <td>${(results.profit / results.time_length).toFixed(2)}</td>
          </tr>
          <tr>
            <td>Profit Per Session</td>
            <td>${(results.profit / results.num_sessions).toFixed(2)}</td>
          </tr>
        </tbody>
      </table>
    )
  }

  return (
    <div>
      {results ? renderResults() : renderWait()}
    </div>
  )
};

function mapStateToProps(state) {
  return { user: state.auth.auth.id }
}

export default connect(mapStateToProps)(ResultsPage);