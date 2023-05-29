import { useState, useEffect } from 'react';

type UseTriggerTimerType = [boolean, () => void];

type Timer = ReturnType<typeof setTimeout>;

export function useTriggerTimer(time?: number): UseTriggerTimerType {
  const [status, setStatus] = useState<boolean>(false);

  const trigger = (): void => {
    if (typeof time === 'number') {
      setStatus(true);
    }
  };

  useEffect(() => {
    let timer: Timer;

    if (status && typeof time === 'number') {
      timer = setTimeout(() => {
        setStatus(false);
      }, time);
    }

    return (): void => clearTimeout(timer);
  }, [status, time]);

  return [status, trigger];
}
