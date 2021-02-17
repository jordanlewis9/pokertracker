import { Link } from 'react-router-dom';

const Session = (props) => {
  return (
    <div className="session__container">
      <h2 className="session__game">{props.stake.replace("_", "/")} {props.limit_type} {props.game.replace("_", "/")}</h2>
      <p className="session__venue">{props.venue}</p>
      <p className="session__date">{props.played_date} for {props.time_length} hours</p>
      <h2 className="session__profit">{props.profit}</h2>
      <Link to={`/sessions/edit/${props.id}`} className="session__edit--link">Edit</Link>
    </div>
  )
}

export default Session;