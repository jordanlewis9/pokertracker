// Tally all of a user's results

import { useState, useEffect } from 'react';
import axios from 'axios';
import { formatResultTime } from '../utils/timeFunctions';

const ResultsPage = () => {
  const [results, setResults] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/sessions/accum`);
        if (response.status === 200){
          console.log(response.data);
          setResults(response.data);
        }
      } catch (err) {
        throw err;
      }
    };
    fetchData();
  }, [])
  const renderResults = () => {
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
      {results ? renderResults() : 'Loading...'}
    </div>
  )
};

export default ResultsPage;