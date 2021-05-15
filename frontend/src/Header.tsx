import React from 'react';
import { useHistory } from 'react-router-dom';
import useArConnect from 'use-arconnect';

import './Header.scss';

interface Props {
  logOut: () => void,
}

const Header = (props: Props) => {
  const history = useHistory();
  const arConnect = useArConnect();

  return (
    <div className='header'>
      <h1>Capsule</h1> 
      <button onClick={props.logOut}>Log out</button>
    </div>
  );
}

export default Header;
