// Display all of the user's sessions

import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Session from './Session';

const SessionsPage = (props) => {
  const { id } = props.user;
  const [sessions, setSessions] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/sessions/${id}`);
        if (response.status === 200){
          setSessions(response.data);
        }
      } catch (err) {
        throw err;
      }
    };
    fetchData();
  }, [id])
  console.log(sessions);
  const renderSessions = sessions.map(session => {
    const { stake, limit_type, game, venue, played_date, time_length, profit, id } = session;
    return (
      <Session key={session.id} id={id} stake={stake} limit_type={limit_type} game={game} venue={venue} played_date={played_date}
      time_length={time_length} profit={profit} />
    )
  })
  return (
    <div>
      {renderSessions ?? 'Loading...'}
    </div>
  )
};

function mapStateToProps(state) {
  return { user: state.auth.auth };
}

export default connect(mapStateToProps)(SessionsPage);