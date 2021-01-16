import { connect } from "react-redux";
import * as actions from '../../actions';

const SignOut = (props) => {
  const { username, signOut } = props;
  return (
    <div>
      <p>Welcome, {username}</p>
      <button onClick={signOut}>Sign Out</button>
    </div>
  )
}

export default connect(null, actions)(SignOut);