const Error = (props) => {
  const message = props.history.location.state;
  return (
    <div>
      {message}
    </div>
  )
}

export default Error;