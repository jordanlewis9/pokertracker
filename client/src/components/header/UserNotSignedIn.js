import { Link } from 'react-router-dom';

const UserNotSignedIn = () => {
  return (
    <div className="user-widget__container notsignedin">
      <div><Link to='/signup' className="user-widget__button--wrapper user-widget__button--signup">Sign Up</Link></div>
      <div><Link to='/signin' className="user-widget__button--wrapper user-widget__button--signin">Sign In</Link></div>
    </div>
  )
}

export default UserNotSignedIn;