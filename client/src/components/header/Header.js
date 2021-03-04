import { Link } from 'react-router-dom';
import UserWidget from './UserWidget';
import toggleMenu from '../utils/toggleMenu';

const Header = (props) => {

  return (
    <div className="header__container">
      <div className="nav__toggle-button">
        <button onClick={toggleMenu} className="nav__toggle--link">Menu <svg className="header__arrow"><path d="M1 .799l4 4 4-4" stroke="#ffffff" strokeWidth="2" fill="none" fillRule="evenodd"/></svg></button>
      </div>
        <nav className="nav__container">
          <Link onClick={toggleMenu} to="/" className="nav__link">Home</Link>
          <Link onClick={toggleMenu} to="/input-session" className="nav__link">New Session</Link>
          <Link onClick={toggleMenu} to="/sessions" className="nav__link">Sessions</Link>
          <Link onClick={toggleMenu} to="/results" className="nav__link">Results</Link>
          <Link onClick={toggleMenu} to="/graph" className="nav__link">Graph</Link>
        </nav>
      <UserWidget />
    </div>
  )
};

export default Header;