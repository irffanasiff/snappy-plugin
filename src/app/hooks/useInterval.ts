import { useEffect, useRef, useState } from 'react';

export function useInterval(callback, delay: number) {
  const savedCallback = useRef<HTMLHeadingElement>(null);

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    let id = setInterval(() => {
      savedCallback.current();
    }, delay);
    return () => clearInterval(id);
  }, [delay]);
}
