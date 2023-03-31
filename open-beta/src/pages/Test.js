import './site.css';
import { useState } from 'react';

const Test = () => {

  const [wallet, setWallet] = useState('');
  const [space, setSpace] = useState('');

  const posted = (e) => {
    e.preventDefault();

    console.log('wallet', wallet);
    console.log('space', space);
  }

  return (
    <div class="login">
      <h1>HearifyAI Open Beta Testing</h1>
      <form onSubmit={posted}>
        <input onChange={e => setWallet(e.target.value)} type="text" name="u" placeholder="Wallet Address" required="required" />
        <input onChange={e => setSpace(e.target.value)} type="text" name="p" placeholder="Twitter Spaces ID" required="required" />
        <button onClick={posted} type="submit" class="btn btn-primary btn-block btn-large">TEST</button>
      </form>
    </div>
  );
}

export default Test;
