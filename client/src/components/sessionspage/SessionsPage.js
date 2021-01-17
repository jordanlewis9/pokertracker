// Display all of the user's sessions

import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Session from './Session';
import UserNoInput from '../utils/UserNoInput';
import NeedAccount from '../utils/NeedAccount';

const SessionsPage = (props) => {
  const { id } = props.user;
  const [sessions, setSessions] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
        try {
          console.log(`http://localhost:5000/api/sessions/allSessions?u_id=${id}`)
          const response = await axios.get(`http://localhost:5000/api/sessions/allSessions?u_id=${id}`);
          if (response.status === 200){
            setSessions(response.data);
          }
        } catch (err) {
          throw err;
        }
    };
    if (id) {
      fetchData();
    }
  }, [id])

  const renderWait = () => {
    if(id === null){
      return (
        <NeedAccount />
      )
    } else {
      return (
        <p>Loading...</p>
      )
    }
  }
  
  const renderSessions = () => {
    if (sessions.length === 0) {
      return (
        <UserNoInput page="sessions" />
      )
    }
    const sessionsRendered = sessions.map(session => {
      const { stake, limit_type, game, venue, played_date, time_length, profit, id } = session;
      return (
        <Session key={session.id} id={id} stake={stake} limit_type={limit_type} game={game} venue={venue} played_date={played_date}
        time_length={time_length} profit={profit} />
      )
    })
    return sessionsRendered;
  }
  return (
    <div>
      {sessions ? renderSessions() : renderWait()}
    </div>
  )
};

function mapStateToProps(state) {
  return { user: state.auth.auth };
}

export default connect(mapStateToProps)(SessionsPage);