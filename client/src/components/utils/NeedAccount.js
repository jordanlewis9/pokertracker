import { Link, useHistory } from 'react-router-dom';

const NeedAccount = () => {
  let history = useHistory();
  const thisUrl = history.location.pathname;

  return (
    <div className={`${thisUrl.includes('session') ? 'session-need-account--container' : ''}`}>
      <p>You must be logged in to use this feature!</p>
      <br></br>
      <p>Click <Link to='/signup'>here</Link> to sign up for an account, or click <Link to='signin'>here</Link> to sign in.</p>
    </div>
  )
}

export default NeedAccount;