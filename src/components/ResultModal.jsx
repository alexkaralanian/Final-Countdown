import { forwardRef, useImperativeHandle, useRef } from 'react';

const ResultModal = forwardRef(function ResultModal(
  { targetTime, timeRemaining, handleReset },
  ref
) {
  const dialog = useRef();

  const userLost = timeRemaining <= 0;
  const formattedTimeRemaining = (timeRemaining / 1000).toFixed(2);
  const score = Math.round((1 - timeRemaining / (targetTime * 1000)) * 100);

  // exposes methods that can be called in referring component
  useImperativeHandle(ref, () => {
    return {
      open() {
        dialog.current.showModal();
      },
    };
  });

  return (
    <dialog ref={dialog} className="result-modal" onClose={handleReset}>
      {userLost && <h2>You lost</h2>}
      {!userLost && <strong>Your Score: {score}</strong>}
      <p>
        The target time was{' '}
        <strong>
          <h2>{targetTime} seconds</h2>
        </strong>
      </p>
      <p>
        You stopped the timer with{' '}
        <strong>{formattedTimeRemaining} seconds left</strong>
      </p>
      <form onSubmit={handleReset} method="dialog">
        <button>Close</button>
      </form>
    </dialog>
  );
});

export default ResultModal;
