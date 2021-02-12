import { Field, reduxForm } from 'redux-form';
import { compose } from 'redux';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import DeleteSession from './DeleteSession';
import requireAuth from '../utils/requireAuth';
import * as actions from '../../actions';


const EditSession = (props) => {
  const { getSession, editSession, history, handleSubmit, resetState, user } = props;
  let { session_id } = useParams();
  useEffect(() => {
    async function fetchData() {
      try {
        await getSession(session_id, user.id);
      } catch (err){
        if(err.response.status === 403){
          history.push(`/error`, err.response.data.message);
        }
      }
    }
  fetchData();
  return () => {
    resetState();
  }
  }, [session_id, getSession, resetState, user.id, history]);

  const submitForm = (formProps) => {
    editSession(formProps, session_id, user.id, () => {
      history.push('/sessions');
    });
  };

  return (
    <div>
      <div>
        <form onSubmit={handleSubmit(submitForm)}>
          <label htmlFor="stake">Stake</label>
          <Field name="stake" component="select">
            <option></option>
            <option value="0.01_0.02">0.01/0.02</option>
            <option value="0.02_0.05">0.02/0.05</option>
            <option value="0.05_0.10">0.05/0.10</option>
            <option value="0.10_0.25">0.10/0.25</option>
            <option value="0.25_0.50">0.25/0.50</option>
            <option value="0.50_1.00">0.50/1</option>
            <option value="1_2">1/2</option>
            <option value="2_5">2/5</option>
            <option value="5_10">5/10</option>
            <option value="10_20">10/20</option>
            <option value="10_25">10/25</option>
            <option value="25_50">25/50</option>
            <option value="50_100">50/100</option>
          </Field>
          <label htmlFor="limit_type">Limit</label>
          <Field name="limit_type" component="select">
            <option value="No Limit">No Limit</option>
            <option value="Pot Limit">Pot Limit</option>
            <option value="Fixed Limit">Fixed Limit</option>
            <option value="Mixed Limit">Mixed Limit</option>
          </Field>
          <label htmlFor="game">Game</label>
          <Field name="game" component="select">
            <option value="Hold Em">Hold Em</option>
            <option value="Omaha Hi">Omaha Hi</option>
            <option value="Omaha Hi_Lo">Omaha Hi/Lo</option>
            <option value="Stud Hi">Stud Hi</option>
            <option value="Razz">Razz</option>
            <option value="Stud Hi_Lo">Stud Hi/Lo</option>
            <option value="2-7 Triple Draw">2-7 Triple Draw</option>
            <option value="2-7 Single Draw">2-7 Single Draw</option>
            <option value="Badugi">Badugi</option>
            <option value="Short Deck">Short Deck</option>
          </Field>
          <label htmlFor="venue">Venue</label>
          <Field name="venue" component="input" type="text" />
          <label htmlFor="buyin">Buy-In</label>
          <Field name="buyin" component="input" type="text" />
          <label htmlFor="cashout">Cash-Out</label>
          <Field name="cashout" component="input" type="text" />
          <label htmlFor="date_play">Date</label>
          <Field name="date_play" component="input" type="date" />
          <label htmlFor="time_length">Time Length</label>
          <Field name="time_length" component="input" type="text" placeholder="hh:mm" />
          <button>Submit</button>
        </form>
      </div>
      <DeleteSession history={history} user={user} />
    </div>
  )
}

function mapStateToProps(state){
  return { initialValues: state.editFormValues.editFormValues, user: state.auth };
}

export default compose(
  connect(mapStateToProps, actions),
  reduxForm({ form: 'editSession'})
)(requireAuth(EditSession));