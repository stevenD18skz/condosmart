'use client';

import { useState } from 'react';
import {
  Search, Filter, Plus, Download, UserCheck, UserX,
  Clock, Eye, ChevronDown, MoreHorizontal, ArrowUpDown
} from 'lucide-react';
import { MOCK_VISIT_RECORDS } from '@/lib/mockData';

const typeLabels: Record<string, { label: string; bg: string; color: string }> = {
  inside: { label: 'Adentro', bg: 'bg-emerald-50', color: 'text-emerald-700' },
  exited: { label: 'Salió', bg: 'bg-slate-100', color: 'text-slate-600' },
  pending: { label: 'Pendiente', bg: 'bg-amber-50', color: 'text-amber-700' },
  authorized: { label: 'Autorizado', bg: 'bg-sky-50', color: 'text-sky-700' },
  denied: { label: 'Denegado', bg: 'bg-red-50', color: 'text-red-700' },
};

export default function VisitorsView() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filtered = MOCK_VISIT_RECORDS.filter((v) => {
    const matchSearch = v.visitor_name.toLowerCase().includes(search.toLowerCase()) ||
      v.apartment_destination.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'all' || v.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const insideCount = MOCK_VISIT_RECORDS.filter(v => v.status === 'inside').length;
  const exitedCount = MOCK_VISIT_RECORDS.filter(v => v.status === 'exited').length;
  const totalToday = MOCK_VISIT_RECORDS.length;

  return (
    <div className="space-y-6">
      {/* Stats row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm flex items-center gap-4">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-sky-500 to-sky-700 flex items-center justify-center">
            <Eye className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="text-2xl font-bold text-slate-900">{totalToday}</div>
            <div className="text-sm text-slate-500">Visitas hoy</div>
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm flex items-center gap-4">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center">
            <UserCheck className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="text-2xl font-bold text-slate-900">{insideCount}</div>
            <div className="text-sm text-slate-500">Actualmente adentro</div>
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm flex items-center gap-4">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-slate-500 to-slate-700 flex items-center justify-center">
            <UserX className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="text-2xl font-bold text-slate-900">{exitedCount}</div>
            <div className="text-sm text-slate-500">Ya salieron</div>
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-slate-50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-bold text-slate-900">Registro de visitantes</h3>
            <p className="text-xs text-slate-400 mt-0.5">{filtered.length} registros encontrados</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="inline-flex items-center gap-1.5 text-xs font-semibold text-white bg-sky-600 hover:bg-sky-700 px-4 py-2 rounded-lg transition-colors shadow-sm">
              <Plus className="w-3.5 h-3.5" /> Registrar visita
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
              placeholder="Buscar por nombre o apartamento..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition-all"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-400" />
            {['all', 'inside', 'exited', 'pending'].map((s) => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`text-xs font-medium px-3 py-1.5 rounded-lg transition-colors ${
                  statusFilter === s
                    ? 'bg-sky-600 text-white shadow-sm'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                {s === 'all' ? 'Todos' : typeLabels[s]?.label || s}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="text-left px-6 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  <span className="inline-flex items-center gap-1 cursor-pointer hover:text-slate-700 transition-colors">
                    Visitante <ArrowUpDown className="w-3 h-3" />
                  </span>
                </th>
                <th className="text-left px-6 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Destino</th>
                <th className="text-left px-6 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Vehículo</th>
                <th className="text-left px-6 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Ingreso</th>
                <th className="text-left px-6 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Salida</th>
                <th className="text-left px-6 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Estado</th>
                <th className="text-right px-6 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filtered.map((v) => {
                const s = typeLabels[v.status] || typeLabels.pending;
                return (
                  <tr key={v.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                          v.status === 'inside' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'
                        }`}>
                          {v.visitor_name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-slate-800">{v.visitor_name}</p>
                          <p className="text-xs text-slate-400">{v.visitor_document || 'Sin documento'}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-slate-700 font-medium">Apto {v.apartment_destination}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-slate-500">{v.visitor_vehicle || '—'}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5 text-sm text-slate-600">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        {new Date(v.entry_at).toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-slate-500">
                        {v.exit_at
                          ? new Date(v.exit_at).toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' })
                          : '—'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${s.bg} ${s.color}`}>
                        {s.label}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg opacity-0 group-hover:opacity-100 transition-all">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12">
            <Search className="w-8 h-8 text-slate-300 mx-auto mb-3" />
            <p className="text-sm font-medium text-slate-500">No se encontraron visitantes</p>
            <p className="text-xs text-slate-400 mt-1">Intenta ajustar los filtros de búsqueda</p>
          </div>
        )}
      </div>
    </div>
  );
}
