"use client";

import { useState, useEffect } from "react";

/**
 * Returns the current Date, updating every second.
 * Returns `null` on the first server render to avoid hydration mismatches
 * caused by locale-formatted date/time strings differing between SSR and client.
 */
export function useClock(): Date | null {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  return now;
}
