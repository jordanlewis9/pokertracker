import { reduxForm, Field, formValueSelector } from 'redux-form';
import { compose } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../actions';

const ResultsForm = (props) => {
  const onSubmit = (formProps) => {
    props.newSession(formProps)
  }
  console.log(props.stake, props.venue, props.limit, props.buyin, props.game)
  return (
    <div>
      <form onSubmit={props.handleSubmit(onSubmit)}>
        <label htmlFor="stake">Stake</label>
        <Field name="stake" component="select">
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
        <label htmlFor="limit">Limit</label>
        <Field name="limit" component="select">
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
        <label htmlFor="timeLength">Time Length</label>
        <Field name="timeLength" component="input" type="text" placeholder="hh:mm" />
        <button>Submit</button>
      </form>
    </div>
  )
};

function mapStateToProps(state) {
  const selector = formValueSelector('newSession');
  const { stake, venue, limit, buyin, game } = selector(state, 'stake', 'venue', 'limit', 'buyin', 'game')
  return { stake, venue, limit, buyin, game }
};

export default compose(
  connect(mapStateToProps, actions),
  reduxForm({ form: 'newSession', initialValues: { limit: 'No Limit', game: 'Hold Em'}})
)(ResultsForm);