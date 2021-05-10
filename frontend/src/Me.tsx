import React, {useState, useEffect} from 'react';
import {
  useHistory, 
  useLocation,
  Switch,
  Route,
  useRouteMatch
} from 'react-router-dom';

import './Me.scss'; 
import Header from './Header';
import CapsuleList from './CapsuleList';
import CapsuleForm from './CapsuleForm';

import useArConnect from 'use-arconnect';


interface LocationState {
  activeAddr?: string,
}

const Me = () => {
  const history = useHistory();

  const location = useLocation(); 
  const state = location.state as LocationState;

  const { path, url } = useRouteMatch();

  const [addr, setAddr] = useState(state ? state.activeAddr: '');
  const arConnect = useArConnect(); 

  // TODO: If user logs out, then back arrows to /me, 
  //       /me shows the capsule dashboard. Every other
  //       way redirects to home page.
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
        : <div>
            <Header />
            <div className='body'>
              <Switch>
                <Route path={`${path}/bury`}>
                  <CapsuleForm />
                </Route>
                <Route exact path={path}>
                  <CapsuleList /> 
                </Route>
              </Switch> 
            </div>
          </div>
      }
    </>
  );
}

export default Me;
