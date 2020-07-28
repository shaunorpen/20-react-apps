import React from 'react';
import Frodo from '../img/frodo.png';
import { useAuth0 } from '../contexts/auth0Context';

export default function Dashboard() {
  const { user } = useAuth0();
  return (
    <div className='page dashboard'>
      <div>
        <img src={Frodo} alt='Frodo' />
        <h2>Welcome {user.nickname}</h2>
      </div>
    </div>
  );
}
