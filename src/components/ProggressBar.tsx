import { useEffect, useState } from 'react';

const ProggressBar = ({
  timer,
  onCancel,
}: {
  timer: number;
  onCancel: () => void;
}) => {
  const [remainingTime, setRemainingTime] = useState(timer);

  useEffect(() => {
    const interval = setInterval(() => {
      console.log('TIMER');
      setRemainingTime(prevTime => prevTime - 10);
    }, 10);

    return () => {
      clearInterval(interval);
    };
  }, []);

  if (remainingTime === 0) onCancel();

  return <progress value={remainingTime} max={timer} />;
};

export default ProggressBar;
