


import { Eye, Plus } from 'lucide-react';
import { Announcement } from '@/types';
import { categoryConfig } from './config';



export default function AnnouncementList({ items }: { items: Announcement[] }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
      <div className="flex items-center justify-between px-6 py-5 border-b border-slate-50">
        <div>
          <h3 className="font-bold text-slate-900">Comunicados recientes</h3>
          <p className="text-xs text-slate-400 mt-0.5">{items.filter(i => i.is_pinned).length} fijados</p>
        </div>
        <button className="inline-flex items-center gap-1.5 text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-lg transition-colors">
          <Plus className="w-3.5 h-3.5" /> Nuevo
        </button>
      </div>
      <div className="divide-y divide-slate-50">
        {items.slice(0, 4).map((item) => {
          const c = categoryConfig[item.category];
          return (
            <div key={item.id} className="px-6 py-4 hover:bg-slate-50/50 transition-colors cursor-pointer">
              <div className="flex items-start gap-3">
                {item.is_pinned && (
                  <div className="w-1.5 h-full min-h-4 bg-amber-400 rounded-full mt-1 flex-shrink-0"></div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${c.bg} ${c.color}`}>{c.label}</span>
                    {item.is_pinned && <span className="text-xs text-amber-600 font-semibold">Fijado</span>}
                  </div>
                  <p className="text-sm font-semibold text-slate-800 leading-snug mb-0.5">{item.title}</p>
                  <p className="text-xs text-slate-400">{new Date(item.published_at).toLocaleDateString('es-CO', { day: 'numeric', month: 'long' })}</p>
                </div>
                <Eye className="w-4 h-4 text-slate-300 flex-shrink-0 mt-1" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}