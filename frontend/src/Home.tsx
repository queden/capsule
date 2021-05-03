import Arweave from 'arweave';
import React, {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import useArConnect from 'use-arconnect';


const Home = () => {
  const history = useHistory();

  const [addr, setAddr] = useState('');
  const arConnect = useArConnect();

  const connectWallet = async () => {
    try {
      await arConnect.connect(['ACCESS_ADDRESS']);
    } catch {
      console.log("Connection failed");
    }
  }

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
    if (addr === '') return;
    // TODO: Pass address to Me component as state
    history.push({
      pathname: '/me',
      state: { detail: addr }
    }); 
  }, [addr]);

  return (
    <div>
      <button onClick={connectWallet}>Connect to ArConnect</button>
    </div>
  );
}

export default Home;
