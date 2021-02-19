import { Field, reduxForm } from 'redux-form';
import { compose } from 'redux';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import DeleteSession from './DeleteSession';
import requireAuth from '../utils/requireAuth';
import SessionInputForm from '../utils/SessionInputForm';
import getInfo from '../utils/getInfoHook';
import * as actions from '../../actions';


const EditSession = (props) => {
  const { getSession, editSession, history, handleSubmit, resetState, user } = props;
  let { session_id } = useParams();
  // dig into reusing this hook with edit user useeffect hook
  useEffect(() => {
    getInfo(getSession(session_id, user.id), history);
  return () => {
    resetState();
  }
  }, [session_id, user.id]);

  const submitForm = (formProps) => {
    editSession(formProps, session_id, user.id, () => {
      history.push('/sessions');
    });
  };

  return (
    <div>
      <SessionInputForm submitForm={submitForm} handleSubmit={handleSubmit} />
      <DeleteSession history={history} user={user} />
    </div>
  )
}

function mapStateToProps(state){
  return { initialValues: state.editFormValues.editFormValues, user: state.auth };
}

export default compose(
  connect(mapStateToProps, actions),
  reduxForm({ form: 'editSession'})
)(requireAuth(EditSession));