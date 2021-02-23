import { Redirect } from 'react-router-dom'

const requireAuth = (ChildComponent) => {
  const AuthRoute = (props) => {
      if(!localStorage.getItem('id') || !localStorage.getItem('token')){
        console.log("no match")
        return <Redirect to="/" />
      } else {
        return <ChildComponent {...props} />
      }
  }
  return AuthRoute;
};

export default requireAuth;