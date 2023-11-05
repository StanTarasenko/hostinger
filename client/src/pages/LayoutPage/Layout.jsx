// Modules
import React, { useState, useEffect } from 'react';
import { Outlet, Link } from 'react-router-dom';

// Constants
import links from '../../constants/links';

// Components
import LangToggle from '../../components/LangToggle/LangToggle';

// Helpers
import parseJwt from '../../helpers/jwtDecoder';

// Styles
import './styles.scss';

const Layout = () => {
  const currentToken = localStorage.getItem('accesstoken');
  const [isAdmin, setIsAdmin] = useState(false);

const handlerSignOut = () => {
  setIsAdmin(false);
  localStorage.clear();
  window.location.reload();
};

useEffect(() => {
  let jwt = parseJwt(currentToken);
  if (jwt && jwt.role === 'admin') {
    setIsAdmin(true);
  } else {
    setIsAdmin(false);
  }
}, [currentToken]);

  return (
    <>
      <div className='container'>
        <div className='links'>
          {links.map((link) => 
            <div key={link.id}>
              {link.status === 'public' &&
              <Link to={link.path} className='layoutLink'>
                {link.title}
              </Link>}
              {link.status === 'private' && isAdmin &&
              <Link to={link.path} className='layoutLink'>
                {link.title}
              </Link>}
            </div>
          )}
        </div>
        <div className='login'>
          <LangToggle />
          {currentToken === null 
          ? <Link to='/login' className='layoutLink'>
              Sign In
            </Link> 
          : <button 
              type='button' 
              onClick={handlerSignOut}
            >
              Sign Out
            </button>
          }
        </div>
      </div>

      <div>
        <Outlet />   
      </div>
    </>
  )
};

export default Layout;
