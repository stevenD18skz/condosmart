"use client";

import { useState } from 'react';
import {
  ShieldCheck, UserPlus,
  CheckCircle2, LogOut, Search, AlertTriangle, Phone
} from 'lucide-react';
import { MOCK_VISIT_RECORDS } from '@/lib/mockData';

import RegisterModal from './components/registerModal';
import VisitorCard from './components/visitorCard';
import { timeAgo } from "@/app/utils/time";

interface PorteriaDashboardProps {
  onBack: () => void;
}

export default function PorteriaDashboard({ onBack }: PorteriaDashboardProps) {
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<'all' | 'inside' | 'exited'>('all');

  const now = new Date();
  const activeVisitors = MOCK_VISIT_RECORDS.filter(v => v.status === 'inside').length;

  const filteredRecords = MOCK_VISIT_RECORDS.filter(v => {
    const matchSearch = searchQuery
      ? v.visitor_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.apartment_destination.includes(searchQuery) ||
        v.visitor_document.includes(searchQuery)
      : true;
    const matchFilter = filter === 'all' ? true : filter === 'inside' ? v.status === 'inside' : v.status === 'exited';
    return matchSearch && matchFilter;
  });

  return (
    <div className="min-h-screen bg-slate-100">
      {showModal && <RegisterModal onClose={() => setShowModal(false)} />}

      {/* Header */}
      <header className="bg-slate-900 text-white px-6 py-4 sticky top-0 z-10 shadow-xl">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-sky-500 flex items-center justify-center shadow-lg">
              <ShieldCheck className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold leading-none">Control de Acceso</h1>
              <p className="text-slate-400 text-xs mt-0.5">
                {now.toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' })} · {now.toLocaleDateString('es-CO', { weekday: 'long', day: 'numeric', month: 'long' })}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {/* Live counter */}
            <div className="flex items-center gap-2 bg-emerald-500/20 border border-emerald-500/30 rounded-xl px-4 py-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-emerald-300 text-sm font-bold">{activeVisitors} adentro</span>
            </div>
            <button onClick={onBack} className="text-slate-400 hover:text-white transition-colors p-2 rounded-xl hover:bg-slate-800">
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6">
        {/* Quick actions */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <button
            onClick={() => setShowModal(true)}
            className="col-span-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-2xl p-6 flex items-center gap-5 shadow-lg shadow-emerald-900/20 transition-all duration-200 hover:shadow-xl hover:-translate-y-0.5 group"
          >
            <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
              <UserPlus className="w-8 h-8 text-white" />
            </div>
            <div>
              <p className="text-xl font-bold">Registrar ingreso</p>
              <p className="text-emerald-200 text-sm mt-0.5">Nuevo visitante — 2 pasos</p>
            </div>
          </button>

          {[
            { label: 'Autorizar visita', icon: CheckCircle2, color: 'from-sky-600 to-sky-700', light: 'bg-sky-500/20 text-sky-300' },
            { label: 'Emergencia', icon: AlertTriangle, color: 'from-red-600 to-red-700', light: 'bg-red-500/20 text-red-300' },
          ].map((action) => (
            <button
              key={action.label}
              className={`bg-gradient-to-br ${action.color} text-white rounded-2xl p-5 flex flex-col items-center justify-center gap-3 shadow-lg transition-all duration-200 hover:shadow-xl hover:-translate-y-0.5 group`}
            >
              <div className={`w-12 h-12 rounded-2xl ${action.light} flex items-center justify-center group-hover:scale-105 transition-transform`}>
                <action.icon className="w-7 h-7" />
              </div>
              <span className="text-sm font-bold text-center leading-tight">{action.label}</span>
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Visitor log */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
              <div className="px-6 py-5 border-b border-slate-50">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-bold text-slate-900 text-lg">Registro de hoy</h2>
                  <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-full">
                    {MOCK_VISIT_RECORDS.length} registros
                  </span>
                </div>
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Buscar por nombre, apartamento, documento..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border-2 border-slate-200 rounded-xl text-sm focus:outline-none focus:border-sky-400 transition-colors"
                  />
                </div>
                {/* Filters */}
                <div className="flex gap-2 mt-3">
                  {([['all', 'Todos'], ['inside', 'Adentro'], ['exited', 'Salieron']] as const).map(([id, label]) => (
                    <button
                      key={id}
                      onClick={() => setFilter(id)}
                      className={`text-xs font-semibold px-4 py-2 rounded-lg transition-colors ${filter === id ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                    >
                      {label}
                      {id === 'inside' && (
                        <span className="ml-1.5 bg-emerald-500 text-white text-xs rounded-full w-4 h-4 inline-flex items-center justify-center">{activeVisitors}</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-4 space-y-3 max-h-[480px] overflow-y-auto">
                {filteredRecords.length === 0 ? (
                  <div className="text-center py-12 text-slate-400">
                    <Search className="w-8 h-8 mx-auto mb-2 opacity-30" />
                    <p className="text-sm">Sin resultados para "{searchQuery}"</p>
                  </div>
                ) : (
                  filteredRecords.map((r) => <VisitorCard key={r.id} record={r} />)
                )}
              </div>
            </div>
          </div>

          {/* Right panel */}
          <div className="space-y-4">
            {/* Clock */}
            <div className="bg-slate-900 text-white rounded-2xl p-6 text-center">
              <p className="text-4xl font-bold tabular-nums tracking-tight mb-1">
                {now.toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
              </p>
              <p className="text-slate-400 text-sm capitalize">
                {now.toLocaleDateString('es-CO', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
              </p>
              <div className="mt-4 grid grid-cols-2 gap-2">
                <div className="bg-slate-800 rounded-xl p-3">
                  <p className="text-2xl font-bold text-emerald-400">{activeVisitors}</p>
                  <p className="text-xs text-slate-400">Adentro</p>
                </div>
                <div className="bg-slate-800 rounded-xl p-3">
                  <p className="text-2xl font-bold text-sky-400">{MOCK_VISIT_RECORDS.length}</p>
                  <p className="text-xs text-slate-400">Total hoy</p>
                </div>
              </div>
            </div>

            {/* Emergency contacts */}
            <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm">
              <h3 className="font-bold text-slate-900 mb-4 text-sm">Contactos de emergencia</h3>
              <div className="space-y-3">
                {[
                  { name: 'Administración', phone: '300 123 4567', color: 'bg-slate-100 text-slate-700' },
                  { name: 'Policía Nacional', phone: '123', color: 'bg-sky-50 text-sky-700' },
                  { name: 'Bomberos', phone: '119', color: 'bg-red-50 text-red-700' },
                  { name: 'Ambulancia', phone: '125', color: 'bg-amber-50 text-amber-700' },
                ].map((c) => (
                  <div key={c.name} className={`flex items-center justify-between rounded-xl px-3.5 py-3 ${c.color}`}>
                    <span className="text-sm font-semibold">{c.name}</span>
                    <div className="flex items-center gap-1.5 text-sm font-bold">
                      <Phone className="w-3.5 h-3.5" />
                      {c.phone}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Last registered */}
            <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm">
              <h3 className="font-bold text-slate-900 mb-3 text-sm">Último ingreso</h3>
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-lg flex-shrink-0">
                  {MOCK_VISIT_RECORDS[0].visitor_name.charAt(0)}
                </div>
                <div>
                  <p className="font-bold text-slate-900">{MOCK_VISIT_RECORDS[0].visitor_name}</p>
                  <p className="text-xs text-slate-400">Apto {MOCK_VISIT_RECORDS[0].apartment_destination} · {timeAgo(MOCK_VISIT_RECORDS[0].entry_at)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
