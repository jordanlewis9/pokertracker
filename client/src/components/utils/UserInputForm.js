import { Field } from 'redux-form';
import { Fragment } from 'react';

const UserInputForm = (props) => {
  const renderForm = () => {
    if (props.signup) {
      return (
        <form onSubmit={props.handleSubmit(props.submitForm)}>
          <div className="user__input--container">
            <label htmlFor="username">Username</label>
            <Field component="input" type="text" name="username" autoComplete="off"/>
          </div>
          <div className="user__input--container">
            <label htmlFor="first_name">First Name</label>
            <Field component="input" type="text" name="first_name" autoComplete="off"/>
          </div>
          <div className="user__input--container">
            <label htmlFor="last_name">Last Name</label>
            <Field component="input" type="text" name="last_name" autoComplete="off"/>
          </div>
          <div className="user__input--container">
            <label htmlFor="email">Email</label>
            <Field component="input" type="email" name="email" autoComplete="off"/>
          </div>
          <div className="user__input--container">
            <label htmlFor="password">Password</label>
            <Field component="input" type="password" name="password" autoComplete="off"/>
          </div>
          <button>Sign Up</button>
      </form>
      )
    } else if (props.edit) {
      return (
        <form onSubmit={props.handleSubmit(props.submitForm)}>
          <div className="user__input--container">
            <label htmlFor="first_name">First Name</label>
            <Field component="input" type="text" name="first_name" autoComplete="off"/>
          </div>
          <div className="user__input--container">
            <label htmlFor="last_name">Last Name</label>
            <Field component="input" type="text" name="last_name" autoComplete="off"/>
          </div>
          <div className="user__input--container">
            <label htmlFor="email">Email</label>
            <Field component="input" type="email" name="email" autoComplete="off"/>
          </div>
          <div className="user__input--container">
            <label htmlFor="password">Password</label>
            <Field component="input" type="password" name="password" autoComplete="off"/>
          </div>
          <button>Edit</button>
      </form>
      )
    }
  }

  return (
    <Fragment>
      {renderForm()}
    </Fragment>
  )
}

export default UserInputForm;