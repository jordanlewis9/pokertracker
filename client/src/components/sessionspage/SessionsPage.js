import { useState, useEffect } from 'react';
import axios from 'axios';
import Session from './Session';

const SessionsPage = () => {
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
  const renderSessions = sessions.map(session => {
    const { stake, limit_type, game, venue, played_date, time_length, profit } = session;
    return (
      <Session key={session.id} stake={stake} limit_type={limit_type} game={game} venue={venue} played_date={played_date}
      time_length={time_length} profit={profit} />
    )
  })
  return (
    <div>
      {renderSessions ?? 'Loading...'}
    </div>
  )
};

export default SessionsPage;