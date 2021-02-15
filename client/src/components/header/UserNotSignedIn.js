import { Link } from 'react-router-dom';

const UserNotSignedIn = () => {
  return (
    <div className="user-widget__container">
      <Link to='/signin'><button>Sign In</button></Link>
      <Link to='/signup'><button>Sign Up</button></Link>
    </div>
  )
}

export default UserNotSignedIn;