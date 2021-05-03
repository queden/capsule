import React, {useState, useEffect} from 'react';
import './Me.scss'; 
import {useHistory, useLocation} from 'react-router-dom';

import useArConnect from 'use-arconnect';


interface LocationState {
  detail?: string,
}

const Me = () => {
  const history = useHistory();
  const location = useLocation(); 

  const state = location.state as LocationState;

  const [addr, setAddr] = useState(state ? state.detail : '');
  const arConnect = useArConnect(); 

  useEffect(() => {
    if (!arConnect) return;
    (async () => {
      try {
        if ((await arConnect.getPermissions()).includes('ACCESS_ADDRESS')) { 
          setAddr(await arConnect.getActiveAddress());
        } 
      } catch {} 
    })();
  }, [arConnect]);
  
  useEffect(() => {
    // If no address, user is not logged in.
    if (addr === '') 
      history.push('/');
  }, [addr]);

  const logOut = async () => {
    await arConnect.disconnect();
    history.push('/');
  }

  return (
    <>
      {(addr === '') 
        ? <p>Loading...</p>
        : <div className='header'>
            <h1>Capsule</h1> 
            <button onClick={async () => {await logOut();}} >Log out</button>
          </div>
      }
    </>
  );
}

export default Me;
