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

export default toggleMenu;