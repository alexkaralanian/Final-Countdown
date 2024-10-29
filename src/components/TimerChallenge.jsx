import { useState, useRef } from 'react';
import ResultModal from './ResultModal';

export default function TimerChallenge({ title, targetTime }) {
  const [timerStarted, setTimerStarted] = useState(false);
  const [timerExpired, setTimerExpired] = useState(false);
  const timer = useRef();
  const dialog = useRef();

  // Each component instance will get its own timer ref that works independelty from toher refs of other comonent instances
  // This ref will not be reset or cleared when component re-executes
  // React stores the values and makes sure that refs dont get cleared, like state values
  // Unlike state values, updating refs doesn't trigger a component re-render.

  function handleStart() {
    timer.current = setTimeout(() => {
      setTimerExpired(true);
      dialog.current.showModal();
    }, targetTime * 1000);

    setTimerStarted(true);
  }

  function handleStop() {
    clearTimeout(timer.current);
  }

  return (
    <>
      <ResultModal targetTime={targetTime} result="lost" ref={dialog} />
      <section className="challenge">
        <h2>{title}</h2>
        <p className="challenge-time">
          {targetTime} second{targetTime > 1 ? 's' : ''}
        </p>
        <p>
          <button onClick={timerStarted ? handleStop : handleStart}>
            {timerStarted ? 'Stop' : 'Start'} Challenge
          </button>
        </p>
        <p className={timerStarted ? 'active' : undefined}>
          {timerStarted ? 'Time is running...' : 'Timer inactive'}
        </p>
      </section>
    </>
  );
}
