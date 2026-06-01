"use client";

import { useState } from "react";
import { Home, Hash, Car, Clock, LogIn, LogOut, MoreVertical, FileText } from "lucide-react";
import { VisitRecord } from "@/types";
import { timeAgo } from "@/app/utils/time";

const TYPE_COLORS: Record<string, { dot: string; badge: string }> = {
  persona:   { dot: "bg-slate-400",   badge: "text-slate-600 bg-slate-100" },
  delivery:  { dot: "bg-amber-400",   badge: "text-amber-700 bg-amber-50" },
  proveedor: { dot: "bg-sky-400",     badge: "text-sky-700 bg-sky-50" },
  familiar:  { dot: "bg-teal-400",    badge: "text-teal-700 bg-teal-50" },
};

interface VisitorCardProps {
  record: VisitRecord;
  onExit: (id: string) => void;
}

export default function VisitorCard({ record, onExit }: VisitorCardProps) {
  const [confirmingExit, setConfirmingExit] = useState(false);
  const [exiting, setExiting] = useState(false);
  const isInside = record.status === "inside";

  function handleExit() {
    if (!confirmingExit) {
      setConfirmingExit(true);
      setTimeout(() => setConfirmingExit(false), 3000);
      return;
    }
    setExiting(true);
    setTimeout(() => {
      onExit(record.id);
    }, 600);
  }

  const typeKey = (record as any).type as string | undefined;
  const typeStyle = typeKey ? TYPE_COLORS[typeKey] ?? TYPE_COLORS.persona : TYPE_COLORS.persona;

  return (
    <div
      className={`relative rounded-2xl p-4 border-2 transition-all duration-300 ${
        exiting
          ? "opacity-0 scale-95"
          : isInside
          ? "border-emerald-200 bg-emerald-50/40 shadow-sm shadow-emerald-100"
          : "border-slate-100 bg-white"
      }`}
    >
      <div className="flex items-start gap-3.5">
        {/* Avatar */}
        <div
          className={`w-11 h-11 rounded-2xl flex items-center justify-center text-base font-bold flex-shrink-0 ${
            isInside
              ? "bg-emerald-100 text-emerald-700"
              : "bg-slate-100 text-slate-500"
          }`}
        >
          {record.visitor_name.charAt(0).toUpperCase()}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <p className="font-bold text-slate-900 text-sm truncate">{record.visitor_name}</p>
            {isInside ? (
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-100 border border-emerald-200 px-2 py-0.5 rounded-full flex-shrink-0">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Adentro
              </span>
            ) : (
              <span className="text-xs font-semibold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full flex-shrink-0">
                Salió
              </span>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 mt-1.5">
            <span className="flex items-center gap-1 text-xs text-slate-500">
              <Home className="w-3 h-3" />
              Apto {record.apartment_destination}
            </span>
            <span className="text-slate-200">·</span>
            <span className="flex items-center gap-1 text-xs text-slate-400">
              <Clock className="w-3 h-3" />
              <LogIn className="w-3 h-3 text-emerald-500" />
              {timeAgo(record.entry_at)}
            </span>
            {record.exit_at && (
              <>
                <span className="text-slate-200">·</span>
                <span className="flex items-center gap-1 text-xs text-slate-400">
                  <LogOut className="w-3 h-3 text-red-400" />
                  {timeAgo(record.exit_at)}
                </span>
              </>
            )}
            {record.visitor_document && (
              <>
                <span className="text-slate-200">·</span>
                <span className="flex items-center gap-1 text-xs text-slate-400">
                  <Hash className="w-3 h-3" />
                  {record.visitor_document}
                </span>
              </>
            )}
            {record.visitor_vehicle && (
              <>
                <span className="text-slate-200">·</span>
                <span className="flex items-center gap-1 text-xs text-slate-400">
                  <Car className="w-3 h-3" />
                  {record.visitor_vehicle}
                </span>
              </>
            )}
          </div>

          {record.notes && (
            <p className="flex items-center gap-1 mt-1.5 text-xs text-slate-400 italic">
              <FileText className="w-3 h-3 flex-shrink-0" />
              {record.notes}
            </p>
          )}
        </div>

        {/* Exit button */}
        {isInside && (
          <button
            onClick={handleExit}
            className={`flex-shrink-0 text-xs font-bold px-3.5 py-2 rounded-xl transition-all duration-200 ${
              confirmingExit
                ? "bg-red-500 hover:bg-red-400 text-white shadow-lg shadow-red-200 scale-105"
                : "bg-slate-800 hover:bg-slate-700 text-white"
            }`}
          >
            {confirmingExit ? "¿Confirmar?" : "Salida"}
          </button>
        )}
      </div>
    </div>
  );
}