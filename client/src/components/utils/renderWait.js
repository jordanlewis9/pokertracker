import { Link } from 'react-router-dom';
import NeedAccount from'./NeedAccount';

const renderWait = (id, reduxId) => {
  if (id === null) {
    return (
      <NeedAccount />
    )
  } else if (id && reduxId === null) {
// edge case when user's token has expired. Will render for a small time
// when coming from an outside site
    return (
      <p>Please <Link to="/signin">sign in</Link> to view your stats.</p>
    )
  } else {
    return (
      <p>Loading...</p>
    )
  }
};

export default renderWait;