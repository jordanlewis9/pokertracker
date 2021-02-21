import { reduxForm, Field } from 'redux-form';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import * as actions from '../../actions';
import UserInputForm from '../utils/UserInputForm';


const Signup = (props) => {
  const { userExists, signUp, history, signIn, authUser, handleSubmit } = props;
  useEffect(() => {
    if(userExists){
      history.push('/');
    }
  }, [userExists, history]);
  const submitForm = (formProps) => {
    signUp(formProps, () => {
      signIn({ username: formProps.username, password: formProps.password }, () => {
        authUser();
        history.push('/');
      })
    })
  }
  return (
    <div className="user__form--container">
      <UserInputForm signup={true} handleSubmit={handleSubmit} submitForm={submitForm} />
    </div>
  )
}

function mapStateToProps(state) {
  return { userExists: state.auth.id }
}

export default compose(
  connect(mapStateToProps, actions),
  reduxForm({ form: 'signUp' })
)(Signup);