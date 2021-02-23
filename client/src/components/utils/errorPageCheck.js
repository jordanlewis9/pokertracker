import { Redirect } from 'react-router-dom'

const errorPageCheck = (ChildComponent) => {
  const checkMessage = (props) => {
    if(!props.message && !props.state) {
      return <Redirect to="/" />
    } else {
      return <ChildComponent {...props} />
    }
  }
  return checkMessage;
}

export default errorPageCheck;