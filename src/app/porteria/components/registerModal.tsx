"use client";

import { useState } from "react";
import {
  User, Package, Briefcase, Users, CheckCircle2, X,
  Check, ChevronRight, Loader2, Car, FileText, Home,
  StickyNote, ChevronLeft,
} from "lucide-react";

export type VisitorType = "persona" | "delivery" | "proveedor" | "familiar";

interface RegisterModalProps {
  onClose: () => void;
  onConfirm: (data: {
    name: string;
    document: string;
    plate: string;
    apartment: string;
    notes: string;
    type: VisitorType;
  }) => void;
}

const VISITOR_TYPES: {
  id: VisitorType;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  bg: string;
  selectedBg: string;
}[] = [
  {
    id: "persona",
    label: "Persona",
    icon: User,
    color: "text-slate-600",
    bg: "border-slate-200 bg-white hover:border-slate-400 hover:bg-slate-50",
    selectedBg: "border-sky-500 bg-sky-50",
  },
  {
    id: "delivery",
    label: "Delivery",
    icon: Package,
    color: "text-amber-600",
    bg: "border-amber-200 bg-amber-50 hover:border-amber-400",
    selectedBg: "border-amber-500 bg-amber-100",
  },
  {
    id: "proveedor",
    label: "Proveedor",
    icon: Briefcase,
    color: "text-sky-600",
    bg: "border-sky-200 bg-sky-50 hover:border-sky-400",
    selectedBg: "border-sky-500 bg-sky-100",
  },
  {
    id: "familiar",
    label: "Familiar",
    icon: Users,
    color: "text-teal-600",
    bg: "border-teal-200 bg-teal-50 hover:border-teal-400",
    selectedBg: "border-teal-500 bg-teal-100",
  },
];

const QUICK_APTS = ["101", "202", "301", "401", "502", "601"];

export default function RegisterModal({ onClose, onConfirm }: RegisterModalProps) {
  const [step, setStep] = useState(1);
  const [visitorType, setVisitorType] = useState<VisitorType>("persona");
  const [name, setName] = useState("");
  const [doc, setDoc] = useState("");
  const [plate, setPlate] = useState("");
  const [apt, setApt] = useState("");
  const [aptInput, setAptInput] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const effectiveApt = apt || aptInput;
  const step1Valid = !!effectiveApt;
  const step2Valid = name.trim().length >= 2;

  function handleAptQuick(a: string) {
    setApt(a);
    setAptInput("");
  }

  function handleAptInput(v: string) {
    setAptInput(v);
    setApt("");
  }

  function handleSubmit() {
    if (!step2Valid) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => {
        onConfirm({
          name: name.trim(),
          document: doc.trim(),
          plate: plate.trim(),
          apartment: effectiveApt,
          notes: notes.trim(),
          type: visitorType,
        });
        onClose();
      }, 1600);
    }, 1000);
  }

  /* ── success state ── */
  if (success) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
        <div className="bg-white rounded-3xl p-10 shadow-2xl text-center max-w-sm w-full">
          <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-5 animate-scale-in">
            <CheckCircle2 className="w-10 h-10 text-emerald-500" />
          </div>
          <h3 className="text-2xl font-bold text-slate-900 mb-2">¡Ingreso registrado!</h3>
          <p className="text-slate-500">
            <span className="font-semibold text-slate-700">{name}</span> → Apto{" "}
            <span className="font-semibold text-slate-700">{effectiveApt}</span>
          </p>
          <div className="mt-4 flex justify-center gap-1">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"
                style={{ animationDelay: `${i * 150}ms` }}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-800 to-slate-900 px-7 py-5 flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-white">Registrar visitante</h3>
            <p className="text-slate-400 text-xs mt-0.5">Paso {step} de 2</p>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center text-slate-300 hover:text-white transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress bar */}
        <div className="h-1.5 bg-slate-100">
          <div
            className="h-full bg-gradient-to-r from-sky-500 to-emerald-500 transition-all duration-500 ease-out"
            style={{ width: step === 1 ? "50%" : "100%" }}
          />
        </div>

        <div className="p-7 max-h-[75vh] overflow-y-auto">
          {/* ── STEP 1: tipo + apartamento ── */}
          {step === 1 && (
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
                Tipo de visitante
              </p>
              <div className="grid grid-cols-2 gap-3 mb-7">
                {VISITOR_TYPES.map((t) => {
                  const selected = visitorType === t.id;
                  return (
                    <button
                      key={t.id}
                      onClick={() => setVisitorType(t.id)}
                      className={`flex items-center gap-3 border-2 rounded-2xl px-4 py-3.5 transition-all duration-150 ${
                        selected ? t.selectedBg : t.bg
                      }`}
                    >
                      <div className="w-9 h-9 rounded-xl bg-white shadow-sm flex items-center justify-center flex-shrink-0">
                        <t.icon className={`w-5 h-5 ${t.color}`} />
                      </div>
                      <span className="font-semibold text-sm text-slate-700">{t.label}</span>
                      {selected && <Check className="w-4 h-4 text-sky-500 ml-auto" />}
                    </button>
                  );
                })}
              </div>

              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-1.5">
                <Home className="w-3.5 h-3.5" /> Apartamento destino <span className="text-red-400">*</span>
              </p>
              <div className="flex flex-wrap gap-2 mb-3">
                {QUICK_APTS.map((a) => (
                  <button
                    key={a}
                    onClick={() => handleAptQuick(a)}
                    className={`py-2.5 px-4 rounded-xl text-sm font-bold border-2 transition-all ${
                      apt === a
                        ? "bg-slate-900 text-white border-slate-900"
                        : "border-slate-200 text-slate-600 hover:border-slate-400 hover:bg-slate-50"
                    }`}
                  >
                    {a}
                  </button>
                ))}
              </div>
              <input
                type="text"
                placeholder="Otro apartamento..."
                value={aptInput}
                onChange={(e) => handleAptInput(e.target.value)}
                className="w-full border-2 border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-sky-400 transition-colors placeholder-slate-300"
              />

              <button
                onClick={() => setStep(2)}
                disabled={!step1Valid}
                className="mt-6 w-full bg-slate-900 hover:bg-slate-800 disabled:bg-slate-100 disabled:text-slate-300 disabled:cursor-not-allowed text-white font-bold py-4 rounded-2xl transition-all text-sm flex items-center justify-center gap-2"
              >
                Continuar <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* ── STEP 2: datos personales ── */}
          {step === 2 && (
            <div>
              {/* Summary badge */}
              <div className="mb-6 bg-slate-50 border border-slate-100 rounded-2xl px-4 py-3 flex items-center gap-3">
                {(() => {
                  const t = VISITOR_TYPES.find((x) => x.id === visitorType)!;
                  return (
                    <div className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center">
                      <t.icon className={`w-4 h-4 ${t.color}`} />
                    </div>
                  );
                })()}
                <div>
                  <p className="text-xs text-slate-400">Destino</p>
                  <p className="font-bold text-slate-800 text-sm capitalize">
                    {VISITOR_TYPES.find((x) => x.id === visitorType)?.label} → Apto {effectiveApt}
                  </p>
                </div>
                <button
                  onClick={() => setStep(1)}
                  className="ml-auto text-xs text-sky-600 hover:text-sky-700 font-semibold"
                >
                  Cambiar
                </button>
              </div>

              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
                Datos del visitante
              </p>

              <div className="space-y-4 mb-6">
                {/* Nombre */}
                <div>
                  <label className="flex items-center gap-1.5 text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                    <User className="w-3.5 h-3.5" /> Nombre completo <span className="text-red-400">*</span>
                  </label>
                  <input
                    autoFocus
                    type="text"
                    placeholder="Nombre y apellido"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full border-2 border-slate-200 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-sky-400 transition-colors font-medium"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {/* Documento */}
                  <div>
                    <label className="flex items-center gap-1.5 text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                      <FileText className="w-3.5 h-3.5" /> Documento
                    </label>
                    <input
                      type="text"
                      placeholder="Cédula / Pasaporte"
                      value={doc}
                      onChange={(e) => setDoc(e.target.value)}
                      className="w-full border-2 border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-sky-400 transition-colors"
                    />
                  </div>
                  {/* Placa */}
                  <div>
                    <label className="flex items-center gap-1.5 text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                      <Car className="w-3.5 h-3.5" /> Placa
                    </label>
                    <input
                      type="text"
                      placeholder="ABC-123"
                      value={plate}
                      onChange={(e) => setPlate(e.target.value.toUpperCase())}
                      className="w-full border-2 border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-sky-400 transition-colors uppercase tracking-widest"
                    />
                  </div>
                </div>

                {/* Notas */}
                <div>
                  <label className="flex items-center gap-1.5 text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                    <StickyNote className="w-3.5 h-3.5" /> Observaciones
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Ej: Técnico de internet, trae herramientas..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full border-2 border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-sky-400 transition-colors resize-none"
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setStep(1)}
                  className="w-12 h-12 flex-shrink-0 border-2 border-slate-200 hover:border-slate-400 text-slate-600 rounded-2xl transition-colors flex items-center justify-center"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={!step2Valid || loading}
                  className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 disabled:from-slate-200 disabled:to-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed text-white font-bold py-3.5 rounded-2xl transition-all text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-900/20"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Registrando...
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      Confirmar ingreso
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}