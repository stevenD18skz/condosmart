"use client";

import { useState } from "react";
import { AlertTriangle, Phone, X, CheckCircle2 } from "lucide-react";

const EMERGENCY_CONTACTS = [
  { name: "Policía Nacional", phone: "123", color: "from-blue-600 to-blue-700", light: "bg-blue-100 text-blue-700", icon: "🚓" },
  { name: "Bomberos", phone: "119", color: "from-red-600 to-red-700", light: "bg-red-100 text-red-700", icon: "🚒" },
  { name: "Ambulancia (SAMU)", phone: "125", color: "from-amber-500 to-amber-600", light: "bg-amber-100 text-amber-700", icon: "🚑" },
  { name: "Línea de Emergencias", phone: "123", color: "from-slate-600 to-slate-700", light: "bg-slate-100 text-slate-700", icon: "🆘" },
];

const ADMIN_CONTACTS = [
  { name: "Administración", phone: "300 123 4567", ext: "" },
  { name: "Vigilancia interna", phone: "300 765 4321", ext: "" },
  { name: "Mantenimiento 24h", phone: "301 987 6543", ext: "" },
];

interface EmergencyModalProps {
  onClose: () => void;
}

export default function EmergencyModal({ onClose }: EmergencyModalProps) {
  const [calling, setCalling] = useState<string | null>(null);
  const [notified, setNotified] = useState(false);

  function handleCall(name: string) {
    setCalling(name);
    setTimeout(() => {
      setCalling(null);
      setNotified(true);
      setTimeout(() => setNotified(false), 3000);
    }, 1200);
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-600 to-red-700 px-7 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Emergencia</h3>
              <p className="text-red-200 text-xs mt-0.5">Contactos de respuesta inmediata</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {notified && (
            <div className="mb-4 bg-emerald-50 border border-emerald-200 rounded-2xl px-4 py-3 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
              <p className="text-sm font-semibold text-emerald-700">Llamada iniciada correctamente</p>
            </div>
          )}

          {/* Emergency numbers */}
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
            Servicios de emergencia
          </p>
          <div className="grid grid-cols-2 gap-2.5 mb-6">
            {EMERGENCY_CONTACTS.map((c) => (
              <button
                key={c.name}
                onClick={() => handleCall(c.name)}
                disabled={!!calling}
                className={`relative bg-gradient-to-br ${c.color} text-white rounded-2xl p-4 text-left transition-all duration-200 hover:scale-[1.02] hover:shadow-lg active:scale-95 disabled:opacity-70`}
              >
                <span className="text-2xl block mb-2">{c.icon}</span>
                <p className="font-bold text-sm leading-tight">{c.name}</p>
                <div className="flex items-center gap-1 mt-1.5">
                  <Phone className="w-3.5 h-3.5 opacity-80" />
                  <span className="text-sm font-bold opacity-90">{c.phone}</span>
                </div>
                {calling === c.name && (
                  <div className="absolute inset-0 bg-black/20 rounded-2xl flex items-center justify-center">
                    <span className="text-xs font-bold bg-white/20 px-3 py-1 rounded-full animate-pulse">
                      Llamando...
                    </span>
                  </div>
                )}
              </button>
            ))}
          </div>

          {/* Internal contacts */}
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
            Contactos internos
          </p>
          <div className="space-y-2">
            {ADMIN_CONTACTS.map((c) => (
              <div
                key={c.name}
                className="flex items-center justify-between bg-slate-50 border border-slate-100 rounded-xl px-4 py-3"
              >
                <span className="text-sm font-semibold text-slate-700">{c.name}</span>
                <div className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  <span className="text-sm font-bold text-slate-600">{c.phone}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
