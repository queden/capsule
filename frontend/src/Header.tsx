import React from 'react';
import { useHistory } from 'react-router-dom';
import useArConnect from 'use-arconnect';

import './Header.scss';

const Header = () => {
  const history = useHistory();
  const arConnect = useArConnect();

  const logOut = async () => {
    await arConnect.disconnect();
    history.push('/');
  }

  return (
    <div className='header'>
      <h1>Capsule</h1> 
      <button onClick={logOut}>Log out</button>
    </div>
  );
}

export default Header;
