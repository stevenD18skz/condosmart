"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ShieldCheck, UserPlus, CheckCircle2, AlertTriangle,
  Search, LogOut, Phone, ArrowLeft, Activity,
  TrendingUp, Users, Clock,
} from "lucide-react";

import { useClock } from "./components/useClock";
import { usePorteriaStore } from "./components/usePorteriaStore";
import RegisterModal from "./components/registerModal";
import VisitorCard from "./components/visitorCard";
import EmergencyModal from "./components/emergencyModal";
import AuthorizeModal from "./components/authorizeModal";
import LiveClock from "./components/liveClock";
import { WEEKLY_VISITS } from "@/lib/mockData";

type ModalType = "register" | "emergency" | "authorize" | null;

const EMERGENCY_CONTACTS_SIDEBAR = [
  { name: "Administración", phone: "300 123 4567", color: "bg-slate-100 text-slate-700" },
  { name: "Policía Nacional", phone: "123", color: "bg-sky-50 text-sky-700" },
  { name: "Bomberos", phone: "119", color: "bg-red-50 text-red-700" },
  { name: "Ambulancia", phone: "125", color: "bg-amber-50 text-amber-700" },
];

const maxCount = Math.max(...WEEKLY_VISITS.map((d) => d.count));

export default function PorteriaPage() {
  const now = useClock();
  const [activeModal, setActiveModal] = useState<ModalType>(null);

  const {
    filteredRecords,
    searchQuery,
    setSearchQuery,
    filter,
    setFilter,
    activeCount,
    exitedCount,
    totalToday,
    registerEntry,
    registerExit,
    lastRecord,
  } = usePorteriaStore();

  return (
    <div className="min-h-screen bg-slate-100">

      {/* ─── Modals ─── */}
      {activeModal === "register" && (
        <RegisterModal
          onClose={() => setActiveModal(null)}
          onConfirm={(data) => {
            registerEntry(data);
            setActiveModal(null);
          }}
        />
      )}
      {activeModal === "emergency" && (
        <EmergencyModal onClose={() => setActiveModal(null)} />
      )}
      {activeModal === "authorize" && (
        <AuthorizeModal onClose={() => setActiveModal(null)} />
      )}

      {/* ─── Header ─── */}
      <header className="bg-slate-900 text-white px-5 py-3.5 sticky top-0 z-10 shadow-2xl border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-sky-500 to-sky-600 flex items-center justify-center shadow-lg flex-shrink-0">
              <ShieldCheck className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-base font-bold leading-none">Control de Acceso</h1>
              <p className="text-slate-400 text-xs mt-0.5 capitalize">
                {now
                  ? now.toLocaleDateString("es-CO", { weekday: "long", day: "numeric", month: "long" })
                  : ""}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Live indicator */}
            <div className="hidden sm:flex items-center gap-2 bg-emerald-500/15 border border-emerald-500/25 rounded-xl px-3.5 py-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-emerald-300 text-sm font-bold">{activeCount} adentro</span>
            </div>

            {/* Clock in header */}
            <div className="hidden md:block text-right min-w-[60px]">
              <p className="text-lg font-bold tabular-nums leading-none">
                {now
                  ? now.toLocaleTimeString("es-CO", { hour: "2-digit", minute: "2-digit" })
                  : "--:--"}
              </p>
              <p className="text-slate-500 text-xs">
                {now
                  ? now.toLocaleTimeString("es-CO", { second: "2-digit" }) + "s"
                  : ""}
              </p>
            </div>

            <Link
              href="/"
              className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors px-3 py-2 rounded-xl hover:bg-slate-800 text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Salir</span>
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-5">
        {/* ─── Quick Actions ─── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
          {/* Register — spans 2 cols on large */}
          <button
            id="btn-register-entry"
            onClick={() => setActiveModal("register")}
            className="col-span-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-2xl p-5 flex items-center gap-4 shadow-lg shadow-emerald-900/20 transition-all duration-200 hover:shadow-xl hover:-translate-y-0.5 group"
          >
            <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-200">
              <UserPlus className="w-7 h-7 text-white" />
            </div>
            <div className="text-left">
              <p className="text-lg font-bold">Registrar ingreso</p>
              <p className="text-emerald-200 text-sm">Nuevo visitante · 2 pasos</p>
            </div>
          </button>

          {/* Authorize */}
          <button
            id="btn-authorize-visit"
            onClick={() => setActiveModal("authorize")}
            className="bg-gradient-to-br from-sky-600 to-sky-700 hover:from-sky-500 hover:to-sky-600 text-white rounded-2xl p-4 flex flex-col items-center justify-center gap-2.5 shadow-lg transition-all duration-200 hover:shadow-xl hover:-translate-y-0.5 group"
          >
            <div className="w-10 h-10 rounded-2xl bg-sky-500/30 flex items-center justify-center group-hover:scale-110 transition-transform">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <span className="text-sm font-bold">Autorizar visita</span>
          </button>

          {/* Emergency */}
          <button
            id="btn-emergency"
            onClick={() => setActiveModal("emergency")}
            className="bg-gradient-to-br from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white rounded-2xl p-4 flex flex-col items-center justify-center gap-2.5 shadow-lg transition-all duration-200 hover:shadow-xl hover:-translate-y-0.5 group"
          >
            <div className="w-10 h-10 rounded-2xl bg-red-500/30 flex items-center justify-center group-hover:scale-110 transition-transform">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <span className="text-sm font-bold">Emergencia</span>
          </button>
        </div>

        {/* ─── Main grid ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

          {/* ── Left: Visitor Log (2 cols) ── */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
              {/* Log header */}
              <div className="px-5 py-4 border-b border-slate-50">
                <div className="flex items-center justify-between mb-3.5">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center">
                      <Activity className="w-4 h-4 text-slate-600" />
                    </div>
                    <h2 className="font-bold text-slate-900">Registro de hoy</h2>
                  </div>
                  <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-full">
                    {totalToday} registros
                  </span>
                </div>

                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    id="visitor-search"
                    type="text"
                    placeholder="Buscar por nombre, apartamento, documento, placa..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border-2 border-slate-200 rounded-xl text-sm focus:outline-none focus:border-sky-400 transition-colors placeholder-slate-300"
                  />
                </div>

                {/* Filters */}
                <div className="flex gap-2 mt-3">
                  {([
                    ["all", "Todos", totalToday],
                    ["inside", "Adentro", activeCount],
                    ["exited", "Salieron", exitedCount],
                  ] as const).map(([id, label, count]) => (
                    <button
                      key={id}
                      onClick={() => setFilter(id)}
                      className={`flex items-center gap-1.5 text-xs font-semibold px-3.5 py-2 rounded-lg transition-colors ${
                        filter === id
                          ? "bg-slate-900 text-white"
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                      }`}
                    >
                      {label}
                      <span
                        className={`text-xs rounded-full w-5 h-5 inline-flex items-center justify-center font-bold ${
                          filter === id
                            ? "bg-white/20 text-white"
                            : id === "inside"
                            ? "bg-emerald-500 text-white"
                            : "bg-slate-200 text-slate-600"
                        }`}
                      >
                        {count}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Records */}
              <div className="p-4 space-y-2.5 max-h-[520px] overflow-y-auto">
                {filteredRecords.length === 0 ? (
                  <div className="text-center py-14 text-slate-400">
                    <Search className="w-8 h-8 mx-auto mb-2.5 opacity-25" />
                    <p className="text-sm font-medium">Sin resultados</p>
                    {searchQuery && (
                      <p className="text-xs mt-1 text-slate-300">
                        para &quot;{searchQuery}&quot;
                      </p>
                    )}
                  </div>
                ) : (
                  filteredRecords.map((r) => (
                    <VisitorCard key={r.id} record={r} onExit={registerExit} />
                  ))
                )}
              </div>
            </div>
          </div>

          {/* ── Right sidebar ── */}
          <div className="space-y-4">

            {/* Live Clock */}
            <LiveClock
              activeCount={activeCount}
              exitedCount={exitedCount}
              totalToday={totalToday}
            />

            {/* Weekly bar chart */}
            <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-7 h-7 rounded-lg bg-sky-100 flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-sky-600" />
                </div>
                <h3 className="font-bold text-slate-900 text-sm">Visitas — esta semana</h3>
              </div>
              <div className="flex items-end gap-1.5 h-16">
                {WEEKLY_VISITS.map((d, i) => {
                  const isToday = i === new Date().getDay() - 1;
                  const pct = (d.count / maxCount) * 100;
                  return (
                    <div key={d.day} className="flex-1 flex flex-col items-center gap-1">
                      <div className="w-full rounded-t-md relative" style={{ height: "48px" }}>
                        <div
                          className={`absolute bottom-0 w-full rounded-t-md transition-all duration-700 ${
                            isToday
                              ? "bg-gradient-to-t from-sky-600 to-sky-400"
                              : "bg-slate-200"
                          }`}
                          style={{ height: `${pct}%` }}
                        />
                      </div>
                      <span className={`text-xs font-semibold ${isToday ? "text-sky-600" : "text-slate-400"}`}>
                        {d.day}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Last entry */}
            {lastRecord && (
              <div className="bg-white rounded-2xl border border-slate-100 p-4 shadow-sm">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-7 h-7 rounded-lg bg-emerald-100 flex items-center justify-center">
                    <Clock className="w-4 h-4 text-emerald-600" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm">Último ingreso</h3>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold flex-shrink-0">
                    {lastRecord.visitor_name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 text-sm">{lastRecord.visitor_name}</p>
                    <p className="text-xs text-slate-400">
                      Apto {lastRecord.apartment_destination} ·{" "}
                      {new Date(lastRecord.entry_at).toLocaleTimeString("es-CO", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                  <span
                    className={`ml-auto text-xs font-semibold px-2.5 py-1 rounded-full flex-shrink-0 ${
                      lastRecord.status === "inside"
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {lastRecord.status === "inside" ? "Adentro" : "Salió"}
                  </span>
                </div>
              </div>
            )}

            {/* Emergency contacts */}
            <div className="bg-white rounded-2xl border border-slate-100 p-4 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 rounded-lg bg-red-100 flex items-center justify-center">
                  <Phone className="w-4 h-4 text-red-600" />
                </div>
                <h3 className="font-bold text-slate-900 text-sm">Contactos rápidos</h3>
              </div>
              <div className="space-y-2">
                {EMERGENCY_CONTACTS_SIDEBAR.map((c) => (
                  <div
                    key={c.name}
                    className={`flex items-center justify-between rounded-xl px-3.5 py-2.5 ${c.color}`}
                  >
                    <span className="text-sm font-semibold">{c.name}</span>
                    <div className="flex items-center gap-1.5 text-sm font-bold">
                      <Phone className="w-3.5 h-3.5" />
                      {c.phone}
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setActiveModal("emergency")}
                className="mt-3 w-full bg-red-600 hover:bg-red-500 text-white text-xs font-bold py-2.5 rounded-xl transition-colors flex items-center justify-center gap-1.5"
              >
                <AlertTriangle className="w-3.5 h-3.5" />
                Ver todos los contactos
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
