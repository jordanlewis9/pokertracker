import { reduxForm, Field } from 'redux-form';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import * as actions from '../../actions';
import UserInputForm from '../utils/UserInputForm';
import userValidation from '../utils/validation/userValidation';
import userErrorRemoval from '../utils/validation/userErrorRemoval';
import errorElement from '../utils/errorElement';


const Signup = (props) => {
  const { userExists, signUp, history, signIn, authUser, handleSubmit } = props;
  const [errorAreas, setErrorAreas] = useState([]);

  useEffect(() => {
    if(userExists){
      history.push('/');
    }
  }, [userExists, history]);

  const submitForm = (formProps) => {
    userErrorRemoval(errorAreas);
    setErrorAreas([]);
    const [isError, inputErrors] = userValidation(formProps);
    if (isError) {
      setErrorAreas(inputErrors);
      return;
    }
    signUp(formProps, (error) => {
      if (error) {
        console.log(error);
        if (error.status === 500) {
          history.push('/error', error.data.message);
        } else {
          if (error.data.message.includes("username")) {
            const usernameContainer = document.querySelector('.user-form__username').closest('.user__input--container');
            usernameContainer.insertAdjacentElement('beforeend', errorElement('username', error.data.message));
            setErrorAreas(["username"]);
          } else {
            const emailContainer = document.querySelector('.user-form__email').closest('.user__input--container');
            emailContainer.insertAdjacentElement('beforeend', errorElement('email', error.data.message));
            setErrorAreas(["email"]);
          }
        }
      } else {
        signIn({ username: formProps.username, password: formProps.password }, () => {
          authUser();
          history.push('/');
        })
      }
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
  reduxForm({ form: 'signUp', initialValues: { username: "", first_name: "", last_name: "", email: "", password: ""} })
)(Signup);