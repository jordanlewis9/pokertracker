import { Link } from 'react-router-dom';
import Auth from './Auth';
import './headerStyle.css';

const Header = () => {
  return (
    <div className="header__container">
      <nav className="nav__container">
          <Link to="/" className="nav__link">Home</Link>
          <Link to="/input-session" className="nav__link">New Session</Link>
          <Link to="/sessions" className="nav__link">Sessions</Link>
          <Link to="/results" className="nav__link">Results</Link>
          <Link to="/graph" className="nav__link">Graph</Link>
      </nav>
      <Auth />
    </div>
  )
};

export default Header;