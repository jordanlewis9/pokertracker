import { useState } from 'react';
import { reduxForm, Field } from 'redux-form';
import { compose } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../actions';


const Signin = (props) => {
  const [error, setError] = useState(null)
  const handleSignin = (formProps) => {
    console.log(Date.now())
      props.signIn(formProps, (errorMsg) => {
        if (errorMsg){
          props.handleError(errorMsg);
          setError(errorMsg);
        } else {
          props.authUser();
          props.history.push('/');
        }
    });
  }
  const renderError = () => {
    if (error) {
      console.log(Date.now())
      return (
        <div>
          {error}
        </div>
      )
    }
  }
  return (
    <div className="signin__form--container">
      <form onSubmit={props.handleSubmit(handleSignin)} className="signin__form">
        <div className="signin-form__input--container">
          <label htmlFor="username">Username</label>
          <Field component="input" type="text" name="username" className="user-form__input"/>
        </div>
        <div className="signin-form__input--container">
          <label htmlFor="password">Password</label>
          <Field component="input" type="password" name="password" className="user-form__input"/>
        </div>
        <p className="signin__error">{renderError()}</p>
        <button className="user-form__signin--button">Sign In</button>
      </form>
    </div>
  )
}

function mapStateToProps(state) {
  return { error: state.error.error }
}

export default compose(
  connect(mapStateToProps, actions),
  reduxForm({ form: 'signin' })
)(Signin);