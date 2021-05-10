import React from 'react';
import {
  useHistory
} from 'react-router-dom';
import { FiPlus } from 'react-icons/fi';

import Arweave from 'arweave';

import './CapsuleList.scss';

const CapsuleList = () => {
  const arweave = Arweave.init({
    host: 'arweave.net',
    port: 443,
    protocol: 'https',
  });

  const history = useHistory();

  const newTransaction = async () => {
    console.log('Trying tx create');
    const tx = await arweave.createTransaction({
      data: 'hello world',
    });
    tx.addTag('App-Name', 'capsule-v0');

    console.log(tx);

    console.log('Trying tx sign');
    await arweave.transactions.sign(tx);

    try {
      console.log('Trying tx post');
      const response = await arweave.transactions.post(tx);
      console.log(response.status);
    } catch (e) {
      console.log(e);
    }
  };
  
  const bury = () => {
    history.push('/me/bury'); 
  }

  return (
    <div className='top'>
      <h1>Capsule List</h1>
      <button onClick={bury}>
        <FiPlus size={30} />
      </button>
    </div>
  );
}

export default CapsuleList; 
