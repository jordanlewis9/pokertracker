import { Link } from 'react-router-dom';
import UserWidget from './UserWidget';

const Header = (props) => {

  const toggleMenu = (e) => {
    const navbar = document.querySelector('.nav__container');
    const navlink = document.querySelector('.nav__toggle-button');
    const handleWindowResize = (event) => {
      console.log("on")
      if(event.target.innerWidth > 800) {
        navlink.classList.remove('hide-nav__toggle');
        navbar.classList.remove('nav__container--active');
        window.removeEventListener('resize', handleWindowResize);
      }
    }
    if(window.innerWidth < 800) {
      if(navlink.classList.contains('hide-nav__toggle')){
        navlink.classList.remove('hide-nav__toggle');
        navbar.classList.remove('nav__container--active');
        window.removeEventListener('resize', handleWindowResize);
      } else {
        navlink.classList.add('hide-nav__toggle');
        navbar.classList.add('nav__container--active');
        window.addEventListener('resize', handleWindowResize);
        window.addEventListener('click', (ev) => {
          if (window.innerWidth < 800) {
            if (navbar.contains(ev.target) || navlink.contains(ev.target)) {
              return null;
            } else {
              if (navbar.classList.contains('nav__container--active') && navlink.classList.contains('hide-nav__toggle')) {
                navbar.classList.remove('nav__container--active');
                navlink.classList.remove('hide-nav__toggle');
                window.removeEventListener('resize', handleWindowResize);
              }
            }
          }
        })
      }
    }
  }

  return (
    <div className="header__container">
      <div className="nav__toggle-button">
        <button onClick={toggleMenu} className="nav__toggle--link">Menu <svg width="10" height="7" xmlns="http://www.w3.org/2000/svg"><path d="M1 .799l4 4 4-4" stroke="#ffffff" strokeWidth="2" fill="none" fillRule="evenodd"/></svg></button>
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