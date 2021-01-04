const Session = (props) => {
  return (
    <div>
      <h2>{props.stake.replace("_", "/")} {props.limit_type} {props.game}</h2>
      <h2>{props.venue}</h2>
      <h6>{props.played_date} for {props.time_length} hours</h6>
      <h4>{props.profit}</h4>
    </div>
  )
}

export default Session;