"use client";
import { useSyncExternalStore } from "react";

const format = () =>
  new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Manila",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date());

const subscribe = (tick: () => void) => {
  const id = setInterval(tick, 30_000);
  return () => clearInterval(id);
};

// Server snapshot is a placeholder so the clock never causes a hydration mismatch
const LocalTime = () => {
  const time = useSyncExternalStore(subscribe, format, () => "--:--");
  return <span>{time}</span>;
};

export default LocalTime;
