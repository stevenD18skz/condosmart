'use client';

import {
  Users, UserCheck, ShieldCheck, Calendar, TrendingUp, TrendingDown,
  Clock, Wrench, Download, ArrowUpRight, ArrowDownRight, BarChart3
} from 'lucide-react';
import { MOCK_VISIT_RECORDS, MOCK_MAINTENANCE, WEEKLY_VISITS } from '@/lib/mockData';

const monthlyVisits = [
  { month: 'Ene', total: 312, authorized: 290, denied: 22 },
  { month: 'Feb', total: 287, authorized: 268, denied: 19 },
  { month: 'Mar', total: 345, authorized: 330, denied: 15 },
  { month: 'Abr', total: 298, authorized: 276, denied: 22 },
  { month: 'May', total: 367, authorized: 349, denied: 18 },
  { month: 'Jun', total: 194, authorized: 185, denied: 9 },
];

const occupancyByBlock = [
  { block: 'Bloque A', total: 80, occupied: 76, percentage: 95 },
  { block: 'Bloque B', total: 80, occupied: 72, percentage: 90 },
  { block: 'Bloque C', total: 60, occupied: 54, percentage: 90 },
  { block: 'Bloque D', total: 40, occupied: 36, percentage: 90 },
];

const maintenanceCosts = [
  { category: 'Plomería', amount: 2340000, percentage: 35 },
  { category: 'Eléctrico', amount: 1560000, percentage: 23 },
  { category: 'Ascensores', amount: 1230000, percentage: 18 },
  { category: 'Áreas comunes', amount: 980000, percentage: 15 },
  { category: 'Otros', amount: 590000, percentage: 9 },
];

export default function ReportsView() {
  const maxMonthly = Math.max(...monthlyVisits.map(m => m.total));

  return (
    <div className="space-y-6">
      {/* Summary KPIs */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm">
          <div className="flex items-start justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-500 to-sky-700 flex items-center justify-center">
              <Users className="w-5 h-5 text-white" />
            </div>
            <div className="flex items-center gap-1 text-xs font-medium text-emerald-600">
              <ArrowUpRight className="w-3.5 h-3.5" /> +5.2%
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900">248</div>
          <div className="text-xs text-slate-500 mt-0.5">Residentes activos</div>
        </div>
        <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm">
          <div className="flex items-start justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-teal-700 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-white" />
            </div>
            <div className="flex items-center gap-1 text-xs font-medium text-emerald-600">
              <ArrowUpRight className="w-3.5 h-3.5" /> +12%
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900">1,803</div>
          <div className="text-xs text-slate-500 mt-0.5">Visitas este mes</div>
        </div>
        <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm">
          <div className="flex items-start justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
              <Wrench className="w-5 h-5 text-white" />
            </div>
            <div className="flex items-center gap-1 text-xs font-medium text-red-500">
              <ArrowDownRight className="w-3.5 h-3.5" /> -8%
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900">2.3 días</div>
          <div className="text-xs text-slate-500 mt-0.5">Tiempo prom. resolución</div>
        </div>
        <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm">
          <div className="flex items-start justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-violet-700 flex items-center justify-center">
              <Calendar className="w-5 h-5 text-white" />
            </div>
            <div className="flex items-center gap-1 text-xs font-medium text-emerald-600">
              <ArrowUpRight className="w-3.5 h-3.5" /> +18%
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900">92%</div>
          <div className="text-xs text-slate-500 mt-0.5">Ocupación áreas comunes</div>
        </div>
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        {/* Monthly visits chart */}
        <div className="xl:col-span-2 bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-bold text-slate-900">Visitas mensuales</h3>
              <p className="text-xs text-slate-400 mt-0.5">Comparativa últimos 6 meses</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-sky-500"></span>
                <span className="text-xs text-slate-500">Autorizadas</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-400"></span>
                <span className="text-xs text-slate-500">Denegadas</span>
              </div>
              <button className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg transition-colors">
                <Download className="w-3 h-3" /> PDF
              </button>
            </div>
          </div>
          <div className="flex items-end gap-4 h-44">
            {monthlyVisits.map((m) => {
              const barHeight = (m.total / maxMonthly) * 100;
              const authHeight = (m.authorized / m.total) * barHeight;
              const deniedHeight = (m.denied / m.total) * barHeight;
              return (
                <div key={m.month} className="flex-1 flex flex-col items-center gap-2">
                  <span className="text-xs font-bold text-slate-700">{m.total}</span>
                  <div className="w-full flex flex-col gap-0.5 items-center" style={{ height: `${barHeight}%` }}>
                    <div
                      className="w-full rounded-t-lg bg-sky-500 transition-all duration-500"
                      style={{ height: `${authHeight}%`, minHeight: '4px' }}
                    ></div>
                    <div
                      className="w-full rounded-b-lg bg-red-400 transition-all duration-500"
                      style={{ height: `${deniedHeight}%`, minHeight: '2px' }}
                    ></div>
                  </div>
                  <span className="text-xs text-slate-400">{m.month}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Occupancy */}
        <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
          <h3 className="font-bold text-slate-900 mb-1">Ocupación por bloque</h3>
          <p className="text-xs text-slate-400 mb-6">Apartamentos ocupados vs disponibles</p>
          {occupancyByBlock.map((b) => (
            <div key={b.block} className="mb-4">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-sm text-slate-600">{b.block}</span>
                <span className="text-sm font-bold text-slate-900">{b.percentage}%</span>
              </div>
              <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-sky-500 to-teal-500 transition-all duration-700"
                  style={{ width: `${b.percentage}%` }}
                ></div>
              </div>
              <p className="text-xs text-slate-400 mt-1">{b.occupied}/{b.total} ocupados</p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        {/* Maintenance costs */}
        <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-bold text-slate-900">Costos de mantenimiento</h3>
              <p className="text-xs text-slate-400 mt-0.5">Distribución por categoría — Junio 2026</p>
            </div>
            <span className="text-sm font-bold text-slate-900">$6.700.000</span>
          </div>
          <div className="space-y-3">
            {maintenanceCosts.map((c) => (
              <div key={c.category} className="flex items-center gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-slate-600">{c.category}</span>
                    <span className="text-sm font-semibold text-slate-800">${c.amount.toLocaleString('es-CO')}</span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-amber-400 to-orange-500 transition-all duration-700"
                      style={{ width: `${c.percentage}%` }}
                    ></div>
                  </div>
                </div>
                <span className="text-xs font-bold text-slate-500 w-8 text-right">{c.percentage}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Weekly visits heatmap */}
        <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-bold text-slate-900">Tráfico semanal de visitas</h3>
              <p className="text-xs text-slate-400 mt-0.5">Patrón de ingreso por día y hora</p>
            </div>
          </div>
          {/* Time-of-day heatmap */}
          <div className="space-y-2">
            {['6am-10am', '10am-2pm', '2pm-6pm', '6pm-10pm'].map((slot, si) => (
              <div key={slot} className="flex items-center gap-2">
                <span className="text-xs text-slate-400 w-20 text-right">{slot}</span>
                <div className="flex-1 grid grid-cols-7 gap-1.5">
                  {WEEKLY_VISITS.map((d, di) => {
                    const intensity = Math.random() * 0.8 + 0.2;
                    return (
                      <div
                        key={d.day}
                        className="h-8 rounded-lg cursor-pointer hover:ring-2 hover:ring-sky-400 hover:ring-offset-1 transition-all"
                        style={{ backgroundColor: `rgba(14, 165, 233, ${intensity})` }}
                        title={`${d.day} ${slot}: ${Math.round(intensity * d.count)} visitas`}
                      ></div>
                    );
                  })}
                </div>
              </div>
            ))}
            <div className="flex items-center gap-2 mt-2">
              <span className="text-xs text-slate-400 w-20"></span>
              <div className="flex-1 grid grid-cols-7 gap-1.5">
                {WEEKLY_VISITS.map((d) => (
                  <span key={d.day} className="text-xs text-slate-400 text-center">{d.day}</span>
                ))}
              </div>
            </div>
          </div>
          <div className="flex items-center justify-end gap-2 mt-4">
            <span className="text-xs text-slate-400">Menos</span>
            {[0.15, 0.35, 0.55, 0.75, 0.95].map((v) => (
              <div
                key={v}
                className="w-4 h-4 rounded"
                style={{ backgroundColor: `rgba(14, 165, 233, ${v})` }}
              ></div>
            ))}
            <span className="text-xs text-slate-400">Más</span>
          </div>
        </div>
      </div>
    </div>
  );
}
