import { connect } from "react-redux";
import * as actions from '../../actions';

const SignOutButton = (props) => {
  const { username, signOut } = props;
  const handleSignOut = () => {
    signOut();
    window.location.replace('/');
  }
  return (
    <div>
      <p>Welcome, {username}</p>
      <button onClick={handleSignOut}>Sign Out</button>
    </div>
  )
}

export default connect(null, actions)(SignOutButton);