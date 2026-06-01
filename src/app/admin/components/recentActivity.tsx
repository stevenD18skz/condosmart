import { MOCK_VISIT_RECORDS } from '@/lib/mockData';


export default function RecentActivity() {
  const active = MOCK_VISIT_RECORDS.filter(v => v.status === 'inside');
  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
      <div className="flex items-center justify-between px-6 py-5 border-b border-slate-50">
        <div>
          <h3 className="font-bold text-slate-900">Visitantes en el conjunto</h3>
          <p className="text-xs text-slate-400 mt-0.5">{active.length} personas actualmente adentro</p>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="text-xs font-medium text-emerald-600">En vivo</span>
        </div>
      </div>
      <div className="divide-y divide-slate-50">
        {MOCK_VISIT_RECORDS.slice(0, 5).map((v) => (
          <div key={v.id} className="px-6 py-3.5 hover:bg-slate-50/50 transition-colors">
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                v.status === 'inside' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'
              }`}>
                {v.visitor_name.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-slate-800 truncate">{v.visitor_name}</p>
                <p className="text-xs text-slate-400">Apto {v.apartment_destination} · {new Date(v.entry_at).toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' })}</p>
              </div>
              <span className={`text-xs font-medium px-2.5 py-1 rounded-full flex-shrink-0 ${
                v.status === 'inside' ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-600'
              }`}>
                {v.status === 'inside' ? 'Adentro' : 'Salió'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}