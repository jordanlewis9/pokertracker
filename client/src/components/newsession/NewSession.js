import { reduxForm, Field } from 'redux-form';
import { compose } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import NeedAccount from '../utils/NeedAccount';
import SessionInputForm from '../utils/SessionInputForm';

const NewSession = (props) => {
  const { id } = props.user;
  const submitForm = (formProps) => {
    props.newSession(formProps, id, () => {
      props.history.push('/sessions');
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
  reduxForm({ form: 'newSession', initialValues: { limit_type: 'No Limit', game: 'Hold Em'}})
)(NewSession);