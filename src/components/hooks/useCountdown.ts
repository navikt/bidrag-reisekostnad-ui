import {useEffect} from "react";
import {useState} from "react";


export const useCountdown = (countfrom: number, onCountdownFinished: () => void) => {
  const [timeLeft, setTimeLeft] = useState<number | undefined>(countfrom);

  useEffect(() => {

    if (!timeLeft) return;

    if (timeLeft === 1) {
      onCountdownFinished();
    }

    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeLeft]);
}