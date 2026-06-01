"use client";

import { useClock } from "./useClock";

interface LiveClockProps {
  activeCount: number;
  exitedCount: number;
  totalToday: number;
}

export default function LiveClock({ activeCount, exitedCount, totalToday }: LiveClockProps) {
  const now = useClock();

  const timeStr = now
    ? now.toLocaleTimeString("es-CO", { hour: "2-digit", minute: "2-digit", second: "2-digit" })
    : "--:--:--";

  const dateStr = now
    ? now.toLocaleDateString("es-CO", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "";

  const hhmm = timeStr.slice(0, 5);
  const ss = timeStr.slice(6, 8);

  return (
    <div className="bg-slate-900 text-white rounded-2xl p-5 text-center">
      {/* Time display */}
      <div className="mb-1 flex items-baseline justify-center gap-1.5">
        <span className="text-4xl font-bold tabular-nums tracking-tight text-white">
          {hhmm}
        </span>
        <span className="text-xl font-bold tabular-nums text-slate-400 leading-none pb-0.5">
          :{ss}
        </span>
      </div>

      <p className="text-slate-400 text-xs capitalize min-h-[1rem]">{dateStr}</p>

      {/* Stats grid */}
      <div className="mt-4 grid grid-cols-3 gap-2">
        <div className="bg-slate-800 rounded-xl p-3">
          <p className="text-xl font-bold text-emerald-400">{activeCount}</p>
          <p className="text-xs text-slate-400 mt-0.5">Adentro</p>
        </div>
        <div className="bg-slate-800 rounded-xl p-3">
          <p className="text-xl font-bold text-slate-300">{exitedCount}</p>
          <p className="text-xs text-slate-400 mt-0.5">Salieron</p>
        </div>
        <div className="bg-slate-800 rounded-xl p-3">
          <p className="text-xl font-bold text-sky-400">{totalToday}</p>
          <p className="text-xs text-slate-400 mt-0.5">Total</p>
        </div>
      </div>
    </div>
  );
}
