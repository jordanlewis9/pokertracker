import { reduxForm, Field } from 'redux-form';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import * as actions from '../../actions';


const Signup = (props) => {
  const { userExists, signUp, history } = props;
  useEffect(() => {
    if(userExists){
      history.push('/');
    }
  }, [userExists]);
  const handleSignUp = (formProps) => {
    signUp(formProps, () => {
      history.push('/');
    })
  }
  return (
    <div>
      <form onSubmit={props.handleSubmit(handleSignUp)}>
        <label htmlFor="username">Username</label>
        <Field component="input" type="text" name="username" />
        <label htmlFor="first_name">First Name</label>
        <Field component="input" type="text" name="first_name" />
        <label htmlFor="last_name">Last Name</label>
        <Field component="input" type="text" name="last_name" />
        <label htmlFor="email">Email</label>
        <Field component="input" type="email" name="email" />
        <label htmlFor="password">Password</label>
        <Field component="input" type="password" name="password" />
        <button>Sign Up!</button>
      </form>
    </div>
  )
}

function mapStateToProps(state) {
  return { userExists: state.auth.auth.id }
}

export default compose(
  connect(mapStateToProps, actions),
  reduxForm({ form: 'signUp' })
)(Signup);