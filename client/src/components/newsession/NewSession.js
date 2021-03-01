import { reduxForm } from 'redux-form';
import { useState } from 'react'
import { compose } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import NeedAccount from '../utils/NeedAccount';
import SessionInputForm from '../utils/SessionInputForm';
import sessionErrorRemoval from '../utils/validation/sessionErrorRemoval';
import sessionValidation from '../utils/validation/sessionValidation';

const NewSession = (props) => {
  const { id } = props.user;
  const [errorArea, setErrorArea] = useState([]);

  const submitForm = (formProps) => {
    console.log('submitted');
    console.log(formProps);
    sessionErrorRemoval(errorArea);
    setErrorArea([]);
    const [isError, inputErrors] = sessionValidation(formProps);
    if(isError) {
      setErrorArea(inputErrors);
      return;
    }
    props.newSession(formProps, id, (error) => {
      if (error) {
        props.history.push('/error', error.data.message);
      } else {
        props.history.replace('/sessions');
      }
    });
  }

  const renderForm = () => {
    if (!localStorage.getItem('id') || !id) {
      return (
        <NeedAccount />
      )
    } else {
      return (
        <div>
          <SessionInputForm handleSubmit={props.handleSubmit} submitForm={submitForm} />
        </div>
      )
    }
  }

  return (
    <div>
      {renderForm()}
    </div>
  )

};

function mapStateToProps(state) {
  return { user: state.auth };
};

export default compose(
  connect(mapStateToProps, actions),
  reduxForm({ form: 'newSession', initialValues: { limit_type: 'No Limit', game: 'Hold Em', stake: '', venue: '', buyin: '', cashout: '', time_length: '', date_play: ''}})
)(NewSession);