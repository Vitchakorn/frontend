import React, {useState, useEffect} from 'react'
import { Button } from './Button.js';
import { Link, NavLink } from 'react-router-dom'
import './style/AdminNavbar2.css'
import { createTheme, ThemeProvider} from '@mui/material/styles';
import "@fontsource/open-sans"
import "@fontsource/roboto-condensed";
import "@fontsource/nunito"; 
import "@fontsource/nunito/600.css";

const styles = {
  fontFamily: 'Open Sans, sans-serif',
};

const styledRoboMono = {
  fontFamily: 'Roboto Condensed, sans-serif',
}

const styledNunito = {
  fontFamily: 'Nunito, sans-serif',
  fontWeight: 600,
}

function Navbar() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);
  
  

  const showButton = () => {
    if (window.innerWidth <= 1080) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener('resize', showButton);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  return (
    <>
      <nav className='admin-navbar'>
        <div className="admin-navbar-container">
          <div className="admin-home-menu">
            <Link to='/home' className='navbar-logo' style={styledRoboMono} onClick={closeMobileMenu}>
              BookCollec
              <i class="fa-solid fa-book"></i> 
            </Link>
          </div>
          
          <div className="menu-icon" onClick={handleClick}>
            <i className={click ? 'fa-solid fa-xmark' : 'fa-solid fa-bars'} />
          </div>
          <ul className={click ? 'nav-menu active' : 'nav-menu'}> 
            <li className='admin-nav-item' >
              <NavLink to="/report" className='admin-nav-links' style={styledNunito} onClick={closeMobileMenu} activeClassName='bar-active' exact>
                Reported
              </NavLink>
            </li>
            <li className='admin-nav-item'>
              <NavLink to="/createBook" className='admin-nav-links' style={styledNunito} onClick={closeMobileMenu} activeClassName='bar-active' exact>
                Create Book
              </NavLink>
            </li>
            <li className='admin-nav-item'>
              <NavLink to='/editBook' className='admin-nav-links' style={styledNunito} onClick={closeMobileMenu} activeClassName='bar-active' exact>
                Edit Books
              </NavLink>
            </li>

            {/* <li className='nav-item'>
              <NavLink to='/profile' className='nav-links' style={styledNunito} onClick={closeMobileMenu} activeClassName='bar-active' exact>
                Profile
              </NavLink>
            </li> */}
            
              <Link
                to='/sign-up'
                className='nav-links-mobile'
                onClick={handleLogout}
              >
                Logout
              </Link>
            

          </ul>
          {button && <Button buttonStyle='btn--outline' onClick={handleLogout}>Logout</Button>}
        </div>
      </nav>
    </>
  )
}

export default Navbar