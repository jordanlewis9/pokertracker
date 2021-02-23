import { Field } from 'redux-form';

const SessionInputForm = (props) => {
  const {handleSubmit, submitForm} = props;
  return (
    <form onSubmit={handleSubmit(submitForm)}>
      <div className="session__form--container">
      <div className="session__input--container session__stake--container">
        <label htmlFor="stake">Stake</label>
        <Field name="stake" id="stake" component="select" className="session__input--select session__form--stake">
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
      </div>
      <div className="session__input--container session__limit_type--container">
        <label htmlFor="limit_type">Limit</label>
        <Field name="limit_type" id="limit_type" component="select" className="session__input--select session__form--limit">
          <option value="No Limit">No Limit</option>
          <option value="Pot Limit">Pot Limit</option>
          <option value="Fixed Limit">Fixed Limit</option>
          <option value="Mixed Limit">Mixed Limit</option>
        </Field>
      </div>
      <div className="session__input--container session__game--container">
        <label htmlFor="game">Game</label>
        <Field name="game" id="game" component="select" className="session__input--select session__form--game">
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
      </div>
      <div className="session__input--container session__venue--container">
        <label htmlFor="venue">Venue</label>
        <Field name="venue" id="venue" component="input" type="text" className="session__input--text session__form--venue"/>
      </div>
      <div className="session__input--container session__buyin--container">
        <label htmlFor="buyin">Buy-In</label>
        <Field name="buyin" id="buyin" component="input" type="text" className="session__input--text session__form--buyin" autoComplete="off"/>
      </div>
      <div className="session__input--container session__cashout--container">
        <label htmlFor="cashout">Cash-Out</label>
        <Field name="cashout" id="cashout" component="input" type="text" className="session__input--text session__form--cashout" autoComplete="off"/>
      </div>
      <div className="session__input--container session__date_play--container">
        <label htmlFor="date_play">Date</label>
        <Field name="date_play" id="date_play" component="input" type="date" className="session__form--date" required pattern="\d{2}\\\d{2}\\\d{4}" />
      </div>
      <div className="session__input--container session__time_length--container">
        <label htmlFor="time_length">Time Length</label>
        <Field name="time_length" id="time_length" component="input" type="text" placeholder="hh:mm" className="session__input--text session__form--timelength" autoComplete="off"/>
      </div>
    <button className="session__form--submit">Submit</button>
    </div>
  </form>
  )
}

export default SessionInputForm;