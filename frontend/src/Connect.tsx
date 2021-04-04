import Arweave from 'arweave';
import React, {useState, useEffect} from 'react';
import useArConnect from 'use-arconnect';


const Connect = () => {
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

  return (
    <div>
      { addr !== '' && (<p>{addr}</p>)}
      <button onClick={connectWallet}>Connect to ArConnect</button>
    </div>
  );
}

export default Connect;
