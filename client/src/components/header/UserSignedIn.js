import { connect } from "react-redux";
import { useHistory, Link } from 'react-router-dom';
import * as actions from '../../actions';

const UserSignedIn = (props) => {
  const { username, signOut } = props;

  let history = useHistory();

  const handleSignOut = () => {
    signOut();
    history.push('/')
  }
  return (
    <div className="user-widget__container">
      <p className="user-widget__greeting">Welcome, {username}</p>
      <div className="user-widget__options--container">
        <Link to="/user" className="user-widget__edit">Edit Profile</Link>
        <button onClick={handleSignOut} className="user-widget__sign-out">Sign Out</button>
      </div>
    </div>
  )
}

export default connect(null, actions)(UserSignedIn);