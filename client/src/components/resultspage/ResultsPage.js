// Tally all of a user's results

import { useState, useEffect } from 'react';
import axios from 'axios';

const ResultsPage = () => {
  const [sessions, setSessions] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/sessions`);
        if (response.status === 200){
          setSessions(response.data);
        }
      } catch (err) {
        throw err;
      }
    };
    fetchData();
  }, [])
  const renderResults = sessions.map(session => {
    return (
      <div>
        <h2>{session.stake.replace("_", "/")} {session.limit_type} {session.game}</h2>
        <h2>{session.venue}</h2>
        <h6>{session.played_date} for {session.time_length} hours</h6>
        <h4>{session.profit}</h4>
      </div>
    )
  })
  return (
    <div>
      {renderResults || 'Loading...'}
    </div>
  )
};

export default ResultsPage;