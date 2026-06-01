'use client';

import { useState } from 'react';
import {
  Search, Plus, Download, Wrench, AlertTriangle, CheckCircle2,
  Clock, MoreHorizontal, ArrowUpDown, MapPin, Filter
} from 'lucide-react';
import { MOCK_MAINTENANCE } from '@/lib/mockData';
import { priorityConfig, statusConfig } from '@/app/admin/components/config';

type PriorityKey = keyof typeof priorityConfig;
type StatusKey = keyof typeof statusConfig;

export default function MaintenanceView() {
  const [search, setSearch] = useState('');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filtered = MOCK_MAINTENANCE.filter((m) => {
    const matchSearch = m.title.toLowerCase().includes(search.toLowerCase()) ||
      m.location.toLowerCase().includes(search.toLowerCase());
    const matchPriority = priorityFilter === 'all' || m.priority === priorityFilter;
    const matchStatus = statusFilter === 'all' || m.status === statusFilter;
    return matchSearch && matchPriority && matchStatus;
  });

  const openCount = MOCK_MAINTENANCE.filter(m => m.status === 'open').length;
  const inProgressCount = MOCK_MAINTENANCE.filter(m => m.status === 'in_progress').length;
  const resolvedCount = MOCK_MAINTENANCE.filter(m => m.status === 'resolved').length;
  const criticalCount = MOCK_MAINTENANCE.filter(m => m.priority === 'critical' || m.priority === 'high').length;

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm flex items-center gap-4">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-sky-500 to-sky-700 flex items-center justify-center">
            <Wrench className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="text-2xl font-bold text-slate-900">{openCount}</div>
            <div className="text-sm text-slate-500">Abiertos</div>
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm flex items-center gap-4">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
            <Clock className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="text-2xl font-bold text-slate-900">{inProgressCount}</div>
            <div className="text-sm text-slate-500">En proceso</div>
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm flex items-center gap-4">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center">
            <CheckCircle2 className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="text-2xl font-bold text-slate-900">{resolvedCount}</div>
            <div className="text-sm text-slate-500">Resueltos</div>
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm flex items-center gap-4">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center">
            <AlertTriangle className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="text-2xl font-bold text-slate-900">{criticalCount}</div>
            <div className="text-sm text-slate-500">Alta prioridad</div>
          </div>
        </div>
      </div>

      {/* Table card */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-slate-50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-bold text-slate-900">Solicitudes de mantenimiento</h3>
            <p className="text-xs text-slate-400 mt-0.5">{filtered.length} solicitudes</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="inline-flex items-center gap-1.5 text-xs font-semibold text-white bg-sky-600 hover:bg-sky-700 px-4 py-2 rounded-lg transition-colors shadow-sm">
              <Plus className="w-3.5 h-3.5" /> Nueva solicitud
            </button>
            <button className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 px-3 py-2 rounded-lg transition-colors">
              <Download className="w-3.5 h-3.5" /> Exportar
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="px-6 py-3 bg-slate-50/50 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar por título o ubicación..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition-all"
            />
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <Filter className="w-4 h-4 text-slate-400" />
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="text-xs font-medium px-3 py-1.5 rounded-lg bg-white text-slate-600 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-400 cursor-pointer"
            >
              <option value="all">Todas las prioridades</option>
              <option value="critical">Crítica</option>
              <option value="high">Alta</option>
              <option value="medium">Media</option>
              <option value="low">Baja</option>
            </select>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="text-xs font-medium px-3 py-1.5 rounded-lg bg-white text-slate-600 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-400 cursor-pointer"
            >
              <option value="all">Todos los estados</option>
              <option value="open">Abierto</option>
              <option value="in_progress">En proceso</option>
              <option value="resolved">Resuelto</option>
              <option value="closed">Cerrado</option>
            </select>
          </div>
        </div>

        {/* List */}
        <div className="divide-y divide-slate-50">
          {filtered.map((item) => {
            const p = priorityConfig[item.priority as PriorityKey];
            const s = statusConfig[item.status as StatusKey];
            return (
              <div key={item.id} className="px-6 py-5 hover:bg-slate-50/50 transition-colors group cursor-pointer">
                <div className="flex items-start gap-4">
                  <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 mt-1.5 ${p.dot}`}></div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-sm font-semibold text-slate-800">{item.title}</p>
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full flex-shrink-0 ${p.bg} ${p.color}`}>{p.label}</span>
                    </div>
                    <p className="text-xs text-slate-500 mb-2 line-clamp-1">{item.description}</p>
                    <div className="flex items-center gap-4 text-xs text-slate-400">
                      <span className="inline-flex items-center gap-1">
                        <MapPin className="w-3 h-3" /> {item.location}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {new Date(item.created_at).toLocaleDateString('es-CO', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${s.bg} ${s.color}`}>{s.label}</span>
                    <button className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg opacity-0 group-hover:opacity-100 transition-all">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12">
            <Wrench className="w-8 h-8 text-slate-300 mx-auto mb-3" />
            <p className="text-sm font-medium text-slate-500">No se encontraron solicitudes</p>
            <p className="text-xs text-slate-400 mt-1">Intenta ajustar los filtros de búsqueda</p>
          </div>
        )}
      </div>
    </div>
  );
}
