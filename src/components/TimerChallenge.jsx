import { useState } from 'react';

export default function TimerChallenge({ title, targetTime }) {
  const [timerStarted, setTimerStarted] = useState(false);
  const [timerExpired, setTimerExpired] = useState(false);

  // Each component instance will get its own timer ref that works independelty from toher refs of other comonent instances
  // This ref will not be reset or cleared when component re-executes
  // React stores the values and makes sure that refs dont get cleared, like state values
  // Unlike state values, updating refs doesn't trigger a component re-render.
  // Useful for values that dont directly impact UI but that we need to track over compponent lifecycle

  const timer = useRef();

  function handleStart() {
    setTimerStarted(true);

    timer.current = setTimeout(() => {
      setTimerExpired(true);
    }, targetTime * 1000);
  }

  function handleStop() {
    clearTimeout(timer.current);
  }

  return (
    <section className="challenge">
      <h2>{title}</h2>
      {timerExpired && <p>You Lost!</p>}
      <p className="challenge-time">
        {targetTime} second{targetTime > 1 ? 's' : ''}
      </p>
      <p>
        <button onClick={timerStarted ? handleStop : handleStart}>
          {timerStarted ? 'Stop' : 'Start'} Challenge
        </button>
      </p>
      <p className={timerStarted && 'active'}>
        {timerStarted ? 'Time is running...' : 'Timer inactive'}
      </p>
    </section>
  );
}
