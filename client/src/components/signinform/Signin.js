import { useState } from 'react';
import { reduxForm, Field } from 'redux-form';
import { compose } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import signinValidation from '../utils/validation/signinValidation';
import signinErrorRemoval from '../utils/validation/signinErrorRemoval';


const Signin = (props) => {
  const [error, setError] = useState(null);
  const [errorAreas, setErrorAreas] = useState([]);

  const handleSignin = (formProps) => {
    signinErrorRemoval(errorAreas);
    setErrorAreas([]);
    const [isError, inputError] = signinValidation(formProps);
    if (isError) {
      setErrorAreas(inputError);
      return;
    }
    props.signIn(formProps, async (errorMsg) => {
      if (errorMsg){
        setError(errorMsg);
      } else {
        await props.authUser();
        props.history.push('/');
      }
    });
  }

  const renderError = () => {
    if (error) return `${error}`;
  }

  return (
    <div className="signin__form--container">
      <form onSubmit={props.handleSubmit(handleSignin)} className="signin__form">
        <div className="signin-form__input--container">
          <label htmlFor="username">Username</label>
          <Field component="input" id="username" type="text" name="username" className="user-form__input user-form__username"/>
        </div>
        <div className="signin-form__input--container">
          <label htmlFor="password">Password</label>
          <Field component="input" id="password" type="password" name="password" className="user-form__input user-form__password"/>
        </div>
        <p className="signin__error">{renderError()}</p>
        <button className="user-form__signin--button">Sign In</button>
      </form>
    </div>
  )
}

export default compose(
  connect(null, actions),
  reduxForm({ form: 'signin', initialValues: { username: '', password: '' } })
)(Signin);