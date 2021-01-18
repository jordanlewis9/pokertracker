import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import * as d3 from 'd3';
import axios from 'axios';

const Graph = (props) => {
  const { id } = props.user;
  const [sessions, setSessions] = useState(null);
  const [accumProfits, setAccumProfits] = useState(null);
  
  useEffect(() => {
    const fetchData = async (id) => {
      try {
        const response = await axios.get(`http://localhost:5000/api/sessions/allSessions?u_id=${id}`);
        setSessions(response.data);
      } catch(err) {
        console.log(err)
      }
    };
    if (id) {
      fetchData(id);
    }
  }, [id]);
  
  if (sessions && !accumProfits) {
    let accumArray = [sessions[0].profit];
    for(let i = 1; i < sessions.length; i++){
      accumArray.push(sessions[i].profit + accumArray[i - 1]);
    }
    setAccumProfits(accumArray);
  }

  console.log(accumProfits);

  return (
    <div>
      This is the graph inside of the graph page!
    </div>
  )
};

function mapStateToProps(state) {
  return { user: state.auth.auth }
}

export default connect(mapStateToProps)(Graph);