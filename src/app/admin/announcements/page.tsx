'use client';

import { useState } from 'react';
import {
  Search, Plus, Pin, Bell, Eye, Calendar,
  Filter, Megaphone, MoreHorizontal, Send
} from 'lucide-react';
import { MOCK_ANNOUNCEMENTS } from '@/lib/mockData';
import { categoryConfig } from '@/app/admin/components/config';

type CategoryKey = keyof typeof categoryConfig;

export default function AnnouncementsView() {
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filtered = MOCK_ANNOUNCEMENTS.filter((a) => {
    const matchSearch = a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.body.toLowerCase().includes(search.toLowerCase());
    const matchCategory = categoryFilter === 'all' || a.category === categoryFilter;
    return matchSearch && matchCategory;
  });

  const pinnedCount = MOCK_ANNOUNCEMENTS.filter(a => a.is_pinned).length;
  const totalCount = MOCK_ANNOUNCEMENTS.length;

  const categories = ['all', 'general', 'financial', 'maintenance', 'security', 'event'] as const;

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm flex items-center gap-4">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-sky-500 to-sky-700 flex items-center justify-center">
            <Megaphone className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="text-2xl font-bold text-slate-900">{totalCount}</div>
            <div className="text-sm text-slate-500">Total comunicados</div>
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm flex items-center gap-4">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
            <Pin className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="text-2xl font-bold text-slate-900">{pinnedCount}</div>
            <div className="text-sm text-slate-500">Fijados</div>
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm flex items-center gap-4">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-teal-500 to-teal-700 flex items-center justify-center">
            <Send className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="text-2xl font-bold text-slate-900">248</div>
            <div className="text-sm text-slate-500">Residentes alcanzados</div>
          </div>
        </div>
      </div>

      {/* Main card */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-slate-50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-bold text-slate-900">Comunicados</h3>
            <p className="text-xs text-slate-400 mt-0.5">{filtered.length} comunicados encontrados</p>
          </div>
          <button className="inline-flex items-center gap-1.5 text-xs font-semibold text-white bg-sky-600 hover:bg-sky-700 px-4 py-2 rounded-lg transition-colors shadow-sm">
            <Plus className="w-3.5 h-3.5" /> Nuevo comunicado
          </button>
        </div>

        {/* Filters */}
        <div className="px-6 py-3 bg-slate-50/50 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar comunicados..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition-all"
            />
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <Filter className="w-4 h-4 text-slate-400" />
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`text-xs font-medium px-3 py-1.5 rounded-lg transition-colors ${
                  categoryFilter === cat
                    ? 'bg-sky-600 text-white shadow-sm'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                {cat === 'all' ? 'Todos' : categoryConfig[cat as CategoryKey]?.label || cat}
              </button>
            ))}
          </div>
        </div>

        {/* Announcements list */}
        <div className="divide-y divide-slate-50">
          {filtered.map((item) => {
            const c = categoryConfig[item.category as CategoryKey];
            const isExpanded = expandedId === item.id;
            return (
              <div
                key={item.id}
                className="px-6 py-5 hover:bg-slate-50/50 transition-colors cursor-pointer"
                onClick={() => setExpandedId(isExpanded ? null : item.id)}
              >
                <div className="flex items-start gap-3">
                  {item.is_pinned && (
                    <div className="w-1.5 min-h-8 bg-amber-400 rounded-full mt-0.5 flex-shrink-0"></div>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${c.bg} ${c.color}`}>{c.label}</span>
                      {item.is_pinned && <span className="text-xs text-amber-600 font-semibold">📌 Fijado</span>}
                    </div>
                    <h4 className="text-sm font-semibold text-slate-800 leading-snug mb-1">{item.title}</h4>
                    <p className={`text-sm text-slate-500 leading-relaxed ${isExpanded ? '' : 'line-clamp-2'}`}>
                      {item.body}
                    </p>
                    <div className="flex items-center gap-4 mt-3 text-xs text-slate-400">
                      <span className="inline-flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(item.published_at).toLocaleDateString('es-CO', { weekday: 'short', day: 'numeric', month: 'long', year: 'numeric' })}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Eye className="w-3 h-3" /> 248 lecturas
                      </span>
                    </div>
                  </div>
                  <button
                    className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all flex-shrink-0"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12">
            <Bell className="w-8 h-8 text-slate-300 mx-auto mb-3" />
            <p className="text-sm font-medium text-slate-500">No se encontraron comunicados</p>
            <p className="text-xs text-slate-400 mt-1">Intenta ajustar los filtros</p>
          </div>
        )}
      </div>
    </div>
  );
}
