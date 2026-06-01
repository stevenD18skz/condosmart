import { ChevronRight } from 'lucide-react';
import { MaintenanceRequest } from '@/types';
import { priorityConfig, statusConfig } from './config';

export default function MaintenanceTable({ items }: { items: MaintenanceRequest[] }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
      <div className="flex items-center justify-between px-6 py-5 border-b border-slate-50">
        <div>
          <h3 className="font-bold text-slate-900">Mantenimientos activos</h3>
          <p className="text-xs text-slate-400 mt-0.5">{items.filter(i => i.status !== 'resolved' && i.status !== 'closed').length} pendientes de atención</p>
        </div>
        <button className="text-xs font-semibold text-sky-600 hover:text-sky-700 flex items-center gap-1 transition-colors">
          Ver todos <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
      <div className="divide-y divide-slate-50">
        {items.slice(0, 5).map((item) => {
          const p = priorityConfig[item.priority];
          const s = statusConfig[item.status];
          return (
            <div key={item.id} className="px-6 py-4 hover:bg-slate-50/50 transition-colors group cursor-pointer">
              <div className="flex items-center gap-4">
                <div className={`w-2 h-2 rounded-full flex-shrink-0 ${p.dot}`}></div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className="text-sm font-semibold text-slate-800 truncate">{item.title}</p>
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full flex-shrink-0 ${p.bg} ${p.color}`}>{p.label}</span>
                  </div>
                  <p className="text-xs text-slate-400">{item.location} · {new Date(item.created_at).toLocaleDateString('es-CO', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
                </div>
                <span className={`text-xs font-medium px-2.5 py-1 rounded-full flex-shrink-0 ${s.bg} ${s.color}`}>{s.label}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
