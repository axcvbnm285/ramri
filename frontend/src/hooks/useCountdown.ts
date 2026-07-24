"use client";

import { useEffect, useState } from "react";

interface CountdownParts {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
}

function getParts(target: string): CountdownParts {
  const diff = new Date(target).getTime() - Date.now();

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true };
  }

  const totalSeconds = Math.floor(diff / 1000);

  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
    isExpired: false,
  };
}

const INITIAL: CountdownParts = { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: false };

export function useCountdown(target: string): CountdownParts {
  // Start neutral rather than computing from Date.now() during the initial
  // render — that value would differ between server and client render
  // (SSR happens at a different instant than hydration) and trigger a
  // hydration mismatch. The real value is filled in by the effect below,
  // which only ever runs client-side.
  const [parts, setParts] = useState<CountdownParts>(INITIAL);

  useEffect(() => {
    const tick = () => setParts(getParts(target));
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [target]);

  return parts;
}
