import { Link } from 'react-router-dom';
import UserWidget from './UserWidget';
import './headerStyle.css';

const Header = () => {
  const renderNav = () => {
    if(window.innerWidth > 800) {
      return (
      <nav className="nav__container">
          <Link to="/" className="nav__link">Home</Link>
          <Link to="/input-session" className="nav__link">New Session</Link>
          <Link to="/sessions" className="nav__link">Sessions</Link>
          <Link to="/results" className="nav__link">Results</Link>
          <Link to="/graph" className="nav__link">Graph</Link>
      </nav>
      )
    } else {
      return (
        <nav className="nav__container">
          <button>Home</button>
          <div className="nav__container--mobile">
            <Link to="/" className="nav__link">Home</Link>
            <Link to="/input-session" className="nav__link">New Session</Link>
            <Link to="/sessions" className="nav__link">Sessions</Link>
            <Link to="/results" className="nav__link">Results</Link>
            <Link to="/graph" className="nav__link">Graph</Link>
          </div>
        </nav>
      )
    }
  }

  return (
    <div className="header__container">
      {renderNav()}
      <UserWidget />
    </div>
  )
};

export default Header;