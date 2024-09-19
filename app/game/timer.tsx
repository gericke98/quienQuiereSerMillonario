import React, { useState, useEffect } from "react";
import { FaClock } from "react-icons/fa";
import { useAudio } from "react-use";

type Props = {
  setIsFinal: React.Dispatch<React.SetStateAction<boolean>>;
  resetTimer: boolean;
};

const CountdownTimer = ({ setIsFinal, resetTimer }: Props) => {
  // Initial time in seconds (1 hour)
  const initialTime = 34;
  const [timeRemaining, setTimeRemaining] = useState(initialTime);

  useEffect(() => {
    // Reset the timer when `resetTimer` prop changes
    setTimeRemaining(initialTime);
  }, [resetTimer]);

  useEffect(() => {
    const timerInterval = setInterval(() => {
      setTimeRemaining((prevTime) => {
        if (prevTime === 0) {
          clearInterval(timerInterval);
          // Perform actions when the timer reaches zero
          setTimeout(() => {
            setIsFinal(true);
          }, 1500);
          return 0;
        } else {
          return prevTime - 1;
        }
      });
    }, 1000);

    // Cleanup the interval when the component unmounts
    return () => clearInterval(timerInterval);
  }, []); // The empty dependency array ensures the effect runs only once on mount

  // Convert seconds to hours, minutes, and seconds
  const seconds = timeRemaining % 60;

  return (
    <div className="w-full h-full text-center text-lg flex flex-row items-center justify-center gap-3">
      <FaClock />
      <p className="font-bold">Time left: {`${seconds} seconds`}</p>
    </div>
  );
};

export default CountdownTimer;
