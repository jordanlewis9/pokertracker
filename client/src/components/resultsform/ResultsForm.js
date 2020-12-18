import { reduxForm, Field, formValueSelector } from 'redux-form';
import { compose } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../actions';

const ResultsForm = (props) => {
  const onSubmit = (formProps) => {
    props.newSession(formProps)
  }
  console.log(props.stake, props.venue)
  return (
    <div>
      <form onSubmit={props.handleSubmit(onSubmit)}>
        <Field name="stake" component="input" type="number" />
        <Field name="venue" component="input" type="text" />
        <button>Submit</button>
      </form>
    </div>
  )
};

function mapStateToProps(state) {
  const selector = formValueSelector('newSession');
  const { stake, venue } = selector(state, 'stake', 'venue')
  return { stake, venue }
};

export default compose(
  connect(mapStateToProps, actions),
  reduxForm({ form: 'newSession'})
)(ResultsForm);