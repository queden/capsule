import Arweave from 'arweave';
import React, {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import useArConnect from 'use-arconnect';


const Home = () => {
  const history = useHistory();

  const arConnectPermissions = [
    'ACCESS_ADDRESS',
    'ACCESS_ALL_ADDRESSES',
    'SIGN_TRANSACTION',
  ];

  const [addr, setAddr] = useState('');
  const arConnect = useArConnect();
  
  const connectWallet = async () => {
    if (!arConnect) return window.open("https://arconnect.io");
    if (addr !== '') {
      await arConnect.disconnect();
      setAddr('');
    } else {
      try {
        await arConnect.connect(arConnectPermissions);
        setAddr(await arConnect.getActiveAddress());
        window.addEventListener('walletSwitch', (e: any) =>
          setAddr(e.detail.address)
        );
      } catch {
        // TODO: More user friendly notif, mabye toast?
        console.log('Unable to connect to ArConnect');  
      }
    }
  };

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
      state: { activeAddr: addr }
    }); 
  }, [addr]);

  return (
    <div>
      <button onClick={connectWallet}>Connect to ArConnect</button>
    </div>
  );
}

export default Home;
