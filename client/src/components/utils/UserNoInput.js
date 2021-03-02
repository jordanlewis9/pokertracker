import { Link } from 'react-router-dom';

const UserNoInput = (props) => {
  const { page } = props;
  return (
    <div className={`${page === "sessions" ? "userNoInput--container" : ""}`}>
      <p>You must log at least 1 session to show {page} on this page.</p>
      <br></br>
      <p>Click <Link to='/input-session'>here</Link> to log a session!</p>
    </div>
  )
}

export default UserNoInput;