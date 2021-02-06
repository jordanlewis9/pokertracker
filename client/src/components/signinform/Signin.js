import { useState } from 'react';
import { reduxForm, Field } from 'redux-form';
import { compose } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../actions';


const Signin = (props) => {
  const [error, setError] = useState(null)
  const handleSignin = (formProps) => {
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
      return (
        <div>
          {error}
        </div>
      )
    }
  }
  console.log(props.error)
  return (
    <div>
      <form onSubmit={props.handleSubmit(handleSignin)}>
        <Field component="input" type="text" name="username" placeholder="Username" />
        <Field component="input" type="password" name="password" placeholder="Password" />
        <button>Sign In</button>
      </form>
      {renderError()}
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