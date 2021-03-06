import { reduxForm } from 'redux-form';
import { compose } from 'redux';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import DeleteModal from './DeleteModal';
import requireAuth from '../utils/requireAuth';
import SessionInputForm from '../utils/SessionInputForm';
import getInfo from '../utils/getInfoHook';
import * as actions from '../../actions';
import sessionErrorRemoval from '../utils/validation/sessionErrorRemoval';
import sessionValidation from '../utils/validation/sessionValidation';


const EditSession = (props) => {
  const { getSession, editSession, history, handleSubmit, resetState, user } = props;
  let { session_id } = useParams();
  const [errorArea, setErrorArea] = useState([]);
  const [deleteModal, setDeleteModal] = useState(false);

  useEffect(() => {
    getInfo(getSession(session_id, user.id), history);
  return () => {
    resetState();
  }
  }, [session_id, user.id, getSession, history, resetState]);

  const submitForm = (formProps) => {
    sessionErrorRemoval(errorArea);
    setErrorArea([]);
    const [isError, inputErrors] = sessionValidation(formProps);
    if(isError) {
      setErrorArea(inputErrors);
      return;
    }
    editSession(formProps, session_id, user.id, (error) => {
      if (error) {
        history.push('/error', error.data.message);
      } else {
        history.replace('/sessions');
      }
    });
  };

  return (
    <div className="edit-session__container">
      {deleteModal ? <DeleteModal history={history} user={user} session_id={session_id} deleteModal={deleteModal} setDeleteModal={setDeleteModal}/> : null}
      <SessionInputForm submitForm={submitForm} handleSubmit={handleSubmit} />
        <div className="delete__button--container">
          <button onClick={() => setDeleteModal(true)} className="session__button--delete">Delete</button>
        </div>
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