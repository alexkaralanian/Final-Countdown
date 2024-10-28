import { useState } from 'react';

export default function Player() {
  const [playerName, setPlayerName] = useState('');
  const [submitted, setSubmitted] = useState(false);

  function handleChange(evt) {
    setSubmitted(false);
    setPlayerName(evt.target.value);
  }

  function handleClick() {
    setSubmitted(true);
  }

  return (
    <section id="player">
      <h2>Welcome {submitted && playerName ? playerName : 'Unknown Entity'}</h2>
      <p>
        <input onChange={handleChange} value={playerName} type="text" />
        <button onClick={handleClick}>Set Name</button>
      </p>
    </section>
  );
}
