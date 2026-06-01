import { useState } from "react";
import { User, Package, Briefcase, Users, CheckCircle2, X, Check, ChevronRight, Loader2 } from 'lucide-react';

export type VisitorType = 'persona' | 'delivery' | 'proveedor' | 'familiar';

export const visitorTypes: { id: VisitorType; label: string; icon: React.ComponentType<any>; color: string; bg: string }[] = [
  { id: 'persona', label: 'Persona', icon: User, color: 'text-slate-700', bg: 'bg-slate-100 border-slate-300 hover:border-slate-500' },
  { id: 'delivery', label: 'Delivery', icon: Package, color: 'text-amber-700', bg: 'bg-amber-50 border-amber-200 hover:border-amber-500' },
  { id: 'proveedor', label: 'Proveedor', icon: Briefcase, color: 'text-sky-700', bg: 'bg-sky-50 border-sky-200 hover:border-sky-500' },
  { id: 'familiar', label: 'Familiar', icon: Users, color: 'text-teal-700', bg: 'bg-teal-50 border-teal-200 hover:border-teal-500' },
];


export default function RegisterModal({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(1);
  const [visitorType, setVisitorType] = useState<VisitorType>('persona');
  const [name, setName] = useState('');
  const [doc, setDoc] = useState('');
  const [plate, setPlate] = useState('');
  const [apt, setApt] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  function handleSubmit() {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => onClose(), 1800);
    }, 1200);
  }

  if (success) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
        <div className="bg-white rounded-3xl p-10 shadow-2xl text-center max-w-sm w-full animate-bounce-in">
          <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-5">
            <CheckCircle2 className="w-10 h-10 text-emerald-500" />
          </div>
          <h3 className="text-2xl font-bold text-slate-900 mb-2">Ingreso registrado</h3>
          <p className="text-slate-500">{name || 'Visitante'} — Apto {apt}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-800 to-slate-900 px-7 py-6 flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-white">Registrar visitante</h3>
            <p className="text-slate-400 text-sm mt-0.5">Paso {step} de 2</p>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors p-1">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Progress */}
        <div className="h-1 bg-slate-100">
          <div className="h-full bg-sky-500 transition-all duration-500" style={{ width: step === 1 ? '50%' : '100%' }} />
        </div>

        <div className="p-7">
          {step === 1 ? (
            <div>
              <p className="text-sm font-semibold text-slate-600 mb-4">Tipo de visitante</p>
              <div className="grid grid-cols-2 gap-3 mb-7">
                {visitorTypes.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setVisitorType(t.id)}
                    className={`flex items-center gap-3 border-2 rounded-2xl px-4 py-4 transition-all duration-150 ${
                      visitorType === t.id
                        ? 'border-sky-500 bg-sky-50 shadow-sm'
                        : `${t.bg} border-2`
                    }`}
                  >
                    <div className={`w-9 h-9 rounded-xl bg-white shadow-sm flex items-center justify-center flex-shrink-0`}>
                      <t.icon className={`w-5 h-5 ${visitorType === t.id ? 'text-sky-600' : t.color}`} />
                    </div>
                    <span className={`font-semibold text-sm ${visitorType === t.id ? 'text-sky-700' : 'text-slate-700'}`}>{t.label}</span>
                    {visitorType === t.id && <Check className="w-4 h-4 text-sky-600 ml-auto" />}
                  </button>
                ))}
              </div>

              <div className="mb-5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">Apartamento destino *</label>
                <div className="flex gap-2">
                  {['101', '202', '301', '401', '502'].map((a) => (
                    <button key={a} onClick={() => setApt(a)} className={`flex-1 py-3 rounded-xl text-sm font-bold border-2 transition-all ${apt === a ? 'bg-slate-900 text-white border-slate-900' : 'border-slate-200 text-slate-600 hover:border-slate-400'}`}>{a}</button>
                  ))}
                </div>
                <input
                  type="text" placeholder="Otro apartamento..."
                  value={!['101', '202', '301', '401', '502'].includes(apt) ? apt : ''}
                  onChange={(e) => setApt(e.target.value)}
                  className="mt-2 w-full border-2 border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-sky-400 transition-colors"
                />
              </div>

              <button
                onClick={() => setStep(2)}
                disabled={!apt}
                className="w-full bg-slate-900 hover:bg-slate-800 disabled:bg-slate-200 disabled:text-slate-400 text-white font-bold py-4 rounded-2xl transition-colors text-sm flex items-center justify-center gap-2"
              >
                Continuar <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div>
              <p className="text-sm font-semibold text-slate-600 mb-4">Datos del visitante</p>
              <div className="space-y-4 mb-7">
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1.5">Nombre completo *</label>
                  <input
                    type="text" placeholder="Nombre y apellido"
                    value={name} onChange={(e) => setName(e.target.value)}
                    className="w-full border-2 border-slate-200 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-sky-400 transition-colors font-medium"
                    autoFocus
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1.5">Documento</label>
                    <input
                      type="text" placeholder="Cédula / Pasaporte"
                      value={doc} onChange={(e) => setDoc(e.target.value)}
                      className="w-full border-2 border-slate-200 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-sky-400 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1.5">Placa vehículo</label>
                    <input
                      type="text" placeholder="ABC-123"
                      value={plate} onChange={(e) => setPlate(e.target.value.toUpperCase())}
                      className="w-full border-2 border-slate-200 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-sky-400 transition-colors uppercase"
                    />
                  </div>
                </div>
              </div>

              {/* Summary */}
              <div className="bg-slate-50 rounded-2xl p-4 mb-6 border border-slate-100">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div><span className="text-slate-400">Tipo:</span> <span className="font-semibold text-slate-800 capitalize">{visitorType}</span></div>
                  <div><span className="text-slate-400">Apto:</span> <span className="font-semibold text-slate-800">{apt}</span></div>
                </div>
              </div>

              <div className="flex gap-3">
                <button onClick={() => setStep(1)} className="flex-1 border-2 border-slate-200 hover:border-slate-400 text-slate-700 font-bold py-4 rounded-2xl transition-colors text-sm">
                  Atrás
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={!name || loading}
                  className="flex-1 bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-200 disabled:text-slate-400 text-white font-bold py-4 rounded-2xl transition-colors text-sm flex items-center justify-center gap-2"
                >
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />}
                  {loading ? 'Registrando...' : 'Confirmar ingreso'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}