import { connect } from "react-redux";
import { useHistory } from 'react-router-dom';
import * as actions from '../../actions';

const SignOutButton = (props) => {
  const { username, signOut } = props;

  let history = useHistory();

  const handleSignOut = () => {
    signOut();
    history.push('/')
  }
  return (
    <div>
      <p>Welcome, {username}</p>
      <button onClick={handleSignOut}>Sign Out</button>
    </div>
  )
}

export default connect(null, actions)(SignOutButton);