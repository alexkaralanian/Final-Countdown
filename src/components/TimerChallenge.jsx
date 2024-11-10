import { useState, useRef } from 'react';
import ResultModal from './ResultModal';

export default function TimerChallenge({ title, targetTime }) {
  const [timeRemaining, setTimeRemaining] = useState(targetTime * 1000);
  const timer = useRef();
  const dialog = useRef();

  // Each component instance will get its own timer ref that works independelty from toher refs of other comonent instances
  // This ref will not be reset or cleared when component re-executes
  // React stores the values and makes sure that refs dont get cleared, like state values
  // Unlike state values, updating refs doesn't trigger a component re-render.

  const timerIsActive = timeRemaining > 0 && timeRemaining < targetTime * 1000;

  function handleReset() {
    setTimeRemaining(targetTime * 1000);
  }

  if (timeRemaining <= 0) {
    clearInterval(timer.current);
    dialog.current.open();
  }

  function handleStart() {
    timer.current = setInterval(() => {
      setTimeRemaining((prevTimeRemaning) => prevTimeRemaning - 10);
    }, 10);
  }

  function handleStop() {
    dialog.current.open();
    clearInterval(timer.current);
  }

  return (
    <>
      <ResultModal
        targetTime={targetTime}
        ref={dialog}
        timeRemaining={timeRemaining}
        handleReset={handleReset}
      />
      <section className="challenge">
        <h2>{title}</h2>
        <p className="challenge-time">
          {targetTime} second{targetTime > 1 ? 's' : ''}
        </p>
        <p>
          <button onClick={timerIsActive ? handleStop : handleStart}>
            {timerIsActive ? 'Stop' : 'Start'} Challenge
          </button>
        </p>
        <p className={timerIsActive ? 'active' : undefined}>
          {timerIsActive ? 'Time is running...' : 'Timer inactive'}
        </p>
      </section>
    </>
  );
}
