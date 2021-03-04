import { Redirect } from 'react-router-dom'

const errorPageCheck = (ChildComponent) => {
  const checkMessage = (props) => {
    if(!props.location.message && !props.location.state) {
      return <Redirect to="/" />
    } else {
      return <ChildComponent {...props} />
    }
  }
  return checkMessage;
}

export default errorPageCheck;