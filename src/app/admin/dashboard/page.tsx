"use client"

import { useState } from 'react';
import { Building2, Users, ShieldCheck, Wrench, Bell, LogOut, AlertTriangle, Calendar, Menu, X } from 'lucide-react';

import StatCard from '@/app/admin/components/statCard'
import VisitChart from '@/app/admin/components/visitChart'
import MaintenanceTable from '@/app/admin/components/maintenanceTable'
import RecentActivity from '@/app/admin/components/recentActivity'
import AnnouncementList from '@/app/admin/components/announcementList'

import { MOCK_MAINTENANCE, MOCK_ANNOUNCEMENTS } from '@/lib/mockData'

export default function AdminDashboardPage() {
    return (
        <div className="flex-1 flex flex-col min-w-0">
        {/* Page content */}
        <main className="flex-1 p-6 overflow-y-auto">
          {/* Alert banner */}
          <div className="mb-6 bg-amber-50 border border-amber-200 rounded-2xl px-5 py-4 flex items-center gap-4">
            <div className="w-9 h-9 rounded-xl bg-amber-100 flex items-center justify-center shrink-0">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-amber-800">Requiere atención inmediata</p>
              <p className="text-xs text-amber-600 mt-0.5">Fuga de agua en tubería principal — Piso 2 zona norte</p>
            </div>
            <button className="text-xs font-semibold text-amber-700 hover:text-amber-800 bg-amber-100 hover:bg-amber-200 px-3 py-1.5 rounded-lg transition-colors flex-shrink-0">
              Ver detalles
            </button>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
            <StatCard title="Residentes activos" value="248" subtitle="12 nuevos este mes" icon={Users} trend="+5%" trendUp={true} color="bg-gradient-to-br from-slate-700 to-slate-900" />
            <StatCard title="Visitantes hoy" value="37" subtitle="8 actualmente adentro" icon={ShieldCheck} trend="+12%" trendUp={true} color="bg-gradient-to-br from-sky-500 to-sky-700" />
            <StatCard title="Mantenimientos" value="5" subtitle="2 críticos pendientes" icon={Wrench} trend="-3%" trendUp={false} color="bg-gradient-to-br from-amber-500 to-orange-600" />
            <StatCard title="Reservas activas" value="24" subtitle="Para los próximos 7 días" icon={Calendar} trend="+8%" trendUp={true} color="bg-gradient-to-br from-teal-500 to-teal-700" />
          </div>

          {/* Charts row */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 mb-6">
            <div className="xl:col-span-2">
              <VisitChart />
            </div>
            <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
              <h3 className="font-bold text-slate-900 mb-1">Estado de mantenimientos</h3>
              <p className="text-xs text-slate-400 mb-6">Distribución actual</p>
              {[
                { label: 'Abiertos', count: 3, color: 'bg-sky-500', total: 5 },
                { label: 'En proceso', count: 2, color: 'bg-amber-400', total: 5 },
                { label: 'Resueltos', count: 1, color: 'bg-emerald-500', total: 5 },
              ].map((item) => (
                <div key={item.label} className="mb-4">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm text-slate-600">{item.label}</span>
                    <span className="text-sm font-bold text-slate-900">{item.count}</span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-700 ${item.color}`}
                      style={{ width: `${(item.count / item.total) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
              <div className="mt-6 pt-5 border-t border-slate-50">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400">Tiempo promedio resolución</span>
                  <span className="text-sm font-bold text-slate-900">2.3 días</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
            <div className="xl:col-span-2">
              <MaintenanceTable items={MOCK_MAINTENANCE} />
            </div>
            <div className="space-y-4">
              <RecentActivity />
              <AnnouncementList items={MOCK_ANNOUNCEMENTS} />
            </div>
          </div>
        </main>
      </div>
    )
}