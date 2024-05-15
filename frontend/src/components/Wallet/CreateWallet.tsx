// frontend/src/components/Wallet/CreateWallet.tsx

import React, { useState } from 'react';

const CreateWallet: React.FC = () => {
  const [address, setAddress] = useState('');
  const [balance, setBalance] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Add code to handle wallet creation submission (e.g., call backend API)
    console.log('Form submitted:', { address, balance });
  };

  return (
    <div>
      <h2>Create Wallet</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="address">Wallet Address:</label>
          <input type="text" id="address" value={address} onChange={(e) => setAddress(e.target.value)} />
        </div>
        <div>
          <label htmlFor="balance">Balance:</label>
          <input type="number" id="balance" value={balance} onChange={(e) => setBalance(e.target.value)} />
        </div>
        <button type="submit">Create Wallet</button>
      </form>
    </div>
  );
};

export default CreateWallet;
