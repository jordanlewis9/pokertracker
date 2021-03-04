// Display all of the user's sessions

import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Session from './Session';
import UserNoInput from '../utils/UserNoInput';
import renderWait from '../utils/renderWait';

const SessionsPage = (props) => {
  const { id } = props.user;
  const [sessions, setSessions] = useState(null);
  const [formattedSessions, setFormattedSessions] = useState(null);
  const [page, setPage] = useState(1);
  
  useEffect(() => {
      const fetchData = async () => {
        const user = localStorage.getItem('token');
          try {
            const response = await axios.get(`https://poker-session-tracker.herokuapp.com/api/sessions/allSessions?u_id=${id}`, {
              headers: { 'Authorization': `Bearer ${user}`}
            });
            if (response.status === 200){
              setSessions(response.data);
            }
          } catch (err) {
            throw err;
          }
      };
      if(id){
        fetchData();
      }
  }, [id]);

  if (sessions && !formattedSessions) {
    if (sessions.length === 0) {
      return (
        <UserNoInput page="sessions" />
      )
    }
    const sessionsFormatted = sessions.map(session => {
      const { stake, limit_type, game, venue, played_date, time_length, profit, id } = session;
      return (
        <Session key={session.id} id={id} stake={stake} limit_type={limit_type} game={game} venue={venue} played_date={played_date}
        time_length={time_length} profit={profit} />
      )
    })
    setFormattedSessions(sessionsFormatted);
  }

  const renderSessions = (pageNum) => {
    const displayRangeMin = (pageNum * 10) - 10;
    const displayRangeMax = pageNum * 10;
    return formattedSessions.slice(displayRangeMin, displayRangeMax);
  }

  const pageChange = (e) => {
    if (e.target.classList.contains('increase')) {
      setPage(page + 1);
      window.scrollTo(0, 0);
    } else {
      setPage(page - 1);
      window.scrollTo(0, 0);
    }
  }

  const renderBackButton = () => {
    if (sessions) {
      const totalSessions = sessions.length;
      const maxPages = Math.ceil(totalSessions / 10);
      if (page >= maxPages) {
        return '';
      } else {
        return <button onClick={pageChange} className="session__arrow--button increase"><svg className="session__arrow--right increase" width="10" height="7" xmlns="http://www.w3.org/2000/svg"><path className="increase" d="M1 .799l4 4 4-4" stroke="#ffffff" strokeWidth="2" fill="none" fillRule="evenodd"/></svg></button>
      }
    }
  }

  const renderPagination = () => {
    if (sessions && formattedSessions){
      return (
        <div className="sessions__container--buttons">
        {page <= 1 ? '' : <button onClick={pageChange} className="session__arrow--button decrease"><svg className="session__arrow--left decrease" width="10" height="7" xmlns="http://www.w3.org/2000/svg"><path className="decrease" d="M1 .799l4 4 4-4" stroke="#ffffff" strokeWidth="2" fill="none" fillRule="evenodd"/></svg></button>}
        <p className="session__page">{page} of {Math.ceil(sessions.length / 10)} pages</p>
        {renderBackButton()}
      </div>
      )
    } else {
      return '';
    }
  }

  return (
    <div>
      <div className="sessions__container--list">
        {formattedSessions ? renderSessions(page) : renderWait(localStorage.getItem('id'), id)}
      </div>
      {renderPagination()}
    </div>
  )
};

function mapStateToProps(state) {
  return { user: state.auth };
}

export default connect(mapStateToProps)(SessionsPage);