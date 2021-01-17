import { Link } from 'react-router-dom';

const UserNoInput = (props) => {
  return (
    <div>
      <p>You must log at least 1 session to show {props.page} on this page.</p>
      <br></br>
      <p>Click <Link to='/input-session'>here</Link> to log a session!</p>
    </div>
  )
}

export default UserNoInput;