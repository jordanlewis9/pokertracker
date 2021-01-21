import { Link } from 'react-router-dom';

const NeedAccount = () => {
  return (
    <div>
      <p>You must be logged in to use this feature!</p>
      <br></br>
      <p>Click <Link to='/signup'>here</Link> to sign up for an account.</p>
    </div>
  )
}

export default NeedAccount;