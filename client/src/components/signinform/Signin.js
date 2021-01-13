import { reduxForm, Field } from 'redux-form';
import { compose } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../actions';


const Signin = (props) => {
  const handleSignin = (formProps) => {
    props.signIn(formProps);
  }
  return (
    <div>
      <form onSubmit={props.handleSubmit(handleSignin)}>
        <Field component="input" type="text" name="username" placeholder="Username" />
        <Field component="input" type="password" name="password" placeholder="Password" />
        <button>Sign In</button>
      </form>
    </div>
  )
}

export default compose(
  connect(null, actions),
  reduxForm({ form: 'signin' })
)(Signin);