import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth0 } from '../contexts/auth0Context';

export default function SiteHeader() {
  const { isAuthenticated, login, logout, user } = useAuth0();
  return (
    <div className='site-header'>
      {/* stuff on the left */}
      <div>
        <Link to='/'>Home</Link>
        <Link to='/dashboard'>Dashboard</Link>
      </div>

      {/* stuff on the right */}
      <div>
        {!isAuthenticated && <button onClick={login}>Login</button>}
        {isAuthenticated && user && (
          <>
            <button>{user.email}</button>
            <button onClick={logout}>Logout</button>
          </>
        )}
      </div>
    </div>
  );
}
