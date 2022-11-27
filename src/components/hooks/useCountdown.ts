import {useEffect} from "react";
import {useState} from "react";

export const useCountdown = (_timeLeft: number) => {
  const [timeLeft, setTimeLeft] = useState<number | undefined>(_timeLeft);


  useEffect(()=>{
    setTimeLeft(_timeLeft)
  }, [_timeLeft])

  useEffect(() => {

    if (!timeLeft) return;

    const intervalId = setInterval(() => {
      setTimeLeft(Math.max(0, timeLeft - 1));
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeLeft]);

  return timeLeft === 0
}