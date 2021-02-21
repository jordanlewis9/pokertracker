import { Field, reduxForm } from 'redux-form';
import { compose } from 'redux';
import { useEffect } from 'react'
import { connect } from 'react-redux';
import requireAuth from '../utils/requireAuth';
import * as actions from '../../actions';
import getInfo from '../utils/getInfoHook';
import UserInputForm from '../utils/UserInputForm';

const EditUser = (props) => {
  const { user, getUser, history, resetState, handleSubmit, editUser } = props;
    // dig into reusing this hook with edit session useeffect hook
  useEffect(() => {
    getInfo(getUser(user.id), history);
    return(() => {
      resetState();
    })
  }, [user.id])

  const submitForm = (formProps) => {
    editUser(formProps, user.id, (errorMsg) => {
      if (errorMsg) {
        history.push('/error', errorMsg);
      } else {
        history.push('/');
      }
    })
  }
  console.log(props.initialValues || null);

  return (
    <div className="user__form--container">
      <UserInputForm handleSubmit={handleSubmit} submitForm={submitForm} edit={true} />
    </div>
  )
}

// Redux form NOT POPULATING EDIT USER!
function mapStateToProps(state){
  return { initialValues: state.editUserValues.editUserValues, user: state.auth }
}

export default compose(
  connect(mapStateToProps, actions),
  reduxForm({ form: 'editUser' })
)(requireAuth(EditUser));