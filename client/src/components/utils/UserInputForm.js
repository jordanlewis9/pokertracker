import { Field } from 'redux-form';
import { Fragment } from 'react';

const UserInputForm = (props) => {
  const renderUsernameInput = () => {
    if (props.signup) {
      return (
          <div className="user__input--container">
            <label htmlFor="username">Username</label>
            <Field component="input" id="username" type="text" name="username" autoComplete="off" className="user-form__input user-form__username"/>
          </div>
      )
    } 
  }

  return (
    <Fragment>
      <form onSubmit={props.handleSubmit(props.submitForm)} className="user-input__form--container">
        {renderUsernameInput()}
        <div className="user__input--container">
          <label htmlFor="first_name">First Name</label>
          <Field component="input" id="first_name" type="text" name="first_name" autoComplete="off" className="user-form__input user-form__first_name"/>
        </div>
        <div className="user__input--container">
          <label htmlFor="last_name">Last Name</label>
          <Field component="input" id="last_name" type="text" name="last_name" autoComplete="off" className="user-form__input user-form__last_name"/>
        </div>
        <div className="user__input--container">
          <label htmlFor="email">Email</label>
          <Field component="input" id="email" type="email" name="email" autoComplete="off" className="user-form__input user-form__email"/>
        </div>
        <div className="user__input--container">
          <label htmlFor="password">Password</label>
          <Field component="input" id="password" type="password" name="password" autoComplete="off" className="user-form__input user-form__password"/>
        </div>
        <button className="user__input--button">{props.signup ? "Sign Up" : "Edit"}</button>
      </form>
    </Fragment>
  )
}

export default UserInputForm;