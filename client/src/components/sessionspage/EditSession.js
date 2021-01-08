import axios from 'axios';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import DeleteSession from './DeleteSession';
import * as actions from '../../actions';


const EditSession = (props) => {
  let { session_id } = useParams();
  useEffect(() => {
    props.getSession(session_id);
  }, [session_id]);
  console.log(props);
  return (
    <div>
      <DeleteSession history={props.history}/>
    </div>
  )
}

function mapStateToProps(state){
  return { form: state.editFormValues };
}

export default connect(mapStateToProps, actions)(EditSession);