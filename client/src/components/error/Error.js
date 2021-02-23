import { Link } from 'react-router-dom';
import errorPageCheck from '../utils/errorPageCheck';

const Error = (props) => {
  const message = props.history.location.state;
  return (
    <div className="error__container">
      <span className="error__headline">Error</span>
      <p>{message}. Click <Link to={`${props.pathurl}`}>here</Link> to return.</p>
    </div>
  )
}

export default errorPageCheck(Error);