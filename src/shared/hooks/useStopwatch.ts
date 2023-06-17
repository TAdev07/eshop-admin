import { useCallback, useEffect, useRef, useState } from 'react';

const MS_COUNT = 11;

export default function useStopwatch() {
  const [isRunning, setIsRunning] = useState(false);
  const [currentMs, setCurrentMs] = useState(0);
  const [currentSec, setCurrentSec] = useState(0);
  const [currentMin, setCurrentMin] = useState(0);
  const watch = useRef(null);

  useEffect(() => {
    if (currentMs >= 1000) {
      setCurrentSec((ms) => ms + 1);
      setCurrentMs(0);
    }
  }, [currentMs]);

  useEffect(() => {
    if (currentSec >= 60) {
      setCurrentMin((min) => min + 1);
      setCurrentSec(0);
    }
  }, [currentSec]);

  const run = useCallback(() => {
    setCurrentMs((ms) => ms + MS_COUNT);
  }, []);

  const start = useCallback(() => {
    if (!isRunning) {
      setIsRunning(true);
      watch.current = setInterval(() => run(), MS_COUNT);
    }
  }, [isRunning]);

  const restart = useCallback(() => {
    if (!isRunning) {
      setCurrentMs(0);
      setCurrentSec(0);
      setCurrentMin(0);
      setIsRunning(true);
      watch.current = setInterval(() => run(), MS_COUNT);
    }
  }, [isRunning]);

  const stop = useCallback(() => {
    setIsRunning(false);
    clearInterval(watch.current);
  }, []);

  const reset = useCallback(() => {
    setCurrentMs(0);
    setCurrentSec(0);
    setCurrentMin(0);
  }, []);

  useEffect(() => () => stop(), []);

  return {
    isRunning,
    currentMs,
    currentSec,
    currentMin,
    start,
    restart,
    stop,
    reset,
  };
}
