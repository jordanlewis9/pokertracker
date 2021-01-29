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
      {results ? renderResults() : renderWait(id)}
    </div>
  )
};

function mapStateToProps(state) {
  return { user: state.auth.auth }
}

export default connect(mapStateToProps)(ResultsPage);