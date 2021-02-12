import { Field, reduxForm } from 'redux-form';
import { compose } from 'redux';
import { useEffect } from 'react'
import { connect } from 'react-redux';
import requireAuth from '../utils/requireAuth';
import * as actions from '../../actions';

const EditUser = (props) => {
  const { user, getUser, history, resetState, handleSubmit, editUser } = props;
  useEffect(() => {
    async function fetchData() {
      try {
        await getUser(user.id);
      } catch (err){
        history.push('/error', err.response.data.message);
      }
    }
    fetchData();
    return () => {
      resetState();
    }
  }, [user.id, getUser, history, resetState])

  const submitForm = (formProps) => {
    editUser(formProps, user.id, (errorMsg) => {
      if (errorMsg) {
        history.push('/error', errorMsg.response.data.message);
      } else {
        history.push('/');
      }
    })
  }

  return (
    <div>
      <form onSubmit={handleSubmit(submitForm)}>
        <label htmlFor="email">Email</label>
        <Field name="email" component="input" type="email" />
        <label htmlFor="first_name">First Name</label>
        <Field name="first_name" component="input" type="text" />
        <label htmlFor="last_name">Last Name</label>
        <Field name="last_name" component="input" type="text" />
        <label htmlFor="password">Password</label>
        <Field name="password" component="input" type="password" />
        <button>Submit</button>
      </form>
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