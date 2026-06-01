"use client";

import { useState } from "react";
import { CheckCircle2, X, Search, Phone, Home, Loader2, Check } from "lucide-react";

const MOCK_PENDING_VISITS = [
  { id: "pv1", visitorName: "Roberto Álvarez", apartment: "502", phone: "312 445 7890", requestedBy: "Luz Marina Pérez", at: "Hace 5 min" },
  { id: "pv2", visitorName: "Mensajería Servientrega", apartment: "203", phone: "", requestedBy: "Andrés Morales", at: "Hace 12 min" },
  { id: "pv3", visitorName: "Técnico ETB", apartment: "105", phone: "300 123 9999", requestedBy: "Sofía Ruiz", at: "Hace 20 min" },
];

interface AuthorizeModalProps {
  onClose: () => void;
}

export default function AuthorizeModal({ onClose }: AuthorizeModalProps) {
  const [search, setSearch] = useState("");
  const [authorizing, setAuthorizing] = useState<string | null>(null);
  const [authorized, setAuthorized] = useState<Set<string>>(new Set());

  const filtered = MOCK_PENDING_VISITS.filter(
    (v) =>
      v.visitorName.toLowerCase().includes(search.toLowerCase()) ||
      v.apartment.includes(search) ||
      v.requestedBy.toLowerCase().includes(search.toLowerCase())
  );

  function handleAuthorize(id: string) {
    setAuthorizing(id);
    setTimeout(() => {
      setAuthorized((prev) => new Set([...prev, id]));
      setAuthorizing(null);
    }, 1000);
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-sky-600 to-sky-700 px-7 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Autorizar visita</h3>
              <p className="text-sky-200 text-xs mt-0.5">{MOCK_PENDING_VISITS.length} solicitudes pendientes</p>
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
          {/* Search */}
          <div className="relative mb-4">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar solicitud..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border-2 border-slate-200 rounded-xl text-sm focus:outline-none focus:border-sky-400 transition-colors"
            />
          </div>

          {/* List */}
          <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
            {filtered.length === 0 && (
              <div className="text-center py-10 text-slate-400">
                <CheckCircle2 className="w-8 h-8 mx-auto mb-2 opacity-30" />
                <p className="text-sm">Sin solicitudes pendientes</p>
              </div>
            )}
            {filtered.map((v) => {
              const isAuthorized = authorized.has(v.id);
              const isAuthorizing = authorizing === v.id;

              return (
                <div
                  key={v.id}
                  className={`rounded-2xl border-2 p-4 transition-all duration-300 ${
                    isAuthorized ? "border-emerald-200 bg-emerald-50" : "border-slate-100 bg-white"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm flex-shrink-0 ${
                      isAuthorized ? "bg-emerald-100 text-emerald-700" : "bg-sky-100 text-sky-700"
                    }`}>
                      {v.visitorName.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-slate-900 text-sm">{v.visitorName}</p>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="flex items-center gap-1 text-xs text-slate-500">
                          <Home className="w-3 h-3" /> Apto {v.apartment}
                        </span>
                        {v.phone && (
                          <span className="flex items-center gap-1 text-xs text-slate-400">
                            <Phone className="w-3 h-3" /> {v.phone}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Solicitado por <span className="font-semibold text-slate-600">{v.requestedBy}</span> · {v.at}
                      </p>
                    </div>
                    <button
                      onClick={() => !isAuthorized && handleAuthorize(v.id)}
                      disabled={isAuthorized || isAuthorizing}
                      className={`flex-shrink-0 text-xs font-bold px-3.5 py-2 rounded-xl transition-all duration-200 flex items-center gap-1.5 ${
                        isAuthorized
                          ? "bg-emerald-100 text-emerald-700 cursor-default"
                          : "bg-sky-600 hover:bg-sky-500 text-white"
                      }`}
                    >
                      {isAuthorizing ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      ) : isAuthorized ? (
                        <><Check className="w-3.5 h-3.5" /> OK</>
                      ) : (
                        "Autorizar"
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
