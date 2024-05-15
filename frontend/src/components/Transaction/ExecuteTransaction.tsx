// frontend/src/components/Transaction/ExecuteTransaction.tsx

import React, { useState } from 'react';

const ExecuteTransaction: React.FC = () => {
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Add code to handle transaction execution (e.g., call backend API)
    console.log('Form submitted:', { recipient, amount });
  };

  return (
    <div>
      <h2>Execute Transaction</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="recipient">Recipient Address:</label>
          <input type="text" id="recipient" value={recipient} onChange={(e) => setRecipient(e.target.value)} />
        </div>
        <div>
          <label htmlFor="amount">Amount:</label>
          <input type="number" id="amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
        </div>
        <button type="submit">Execute Transaction</button>
      </form>
    </div>
  );
};

export default ExecuteTransaction;
