import { Home, Users, Wrench, Bell, BarChart3, Settings } from 'lucide-react';

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: Home },
  { id: 'visitors', label: 'Visitantes', icon: Users },
  { id: 'maintenance', label: 'Mantenimientos', icon: Wrench },
  { id: 'announcements', label: 'Comunicados', icon: Bell },
  { id: 'reports', label: 'Reportes', icon: BarChart3 },
  { id: 'settings', label: 'Configuración', icon: Settings },
];

const priorityConfig = {
  low: { label: 'Baja', color: 'text-slate-600', bg: 'bg-slate-100', dot: 'bg-slate-400' },
  medium: { label: 'Media', color: 'text-amber-700', bg: 'bg-amber-50', dot: 'bg-amber-400' },
  high: { label: 'Alta', color: 'text-orange-700', bg: 'bg-orange-50', dot: 'bg-orange-500' },
  critical: { label: 'Crítica', color: 'text-red-700', bg: 'bg-red-50', dot: 'bg-red-500' },
};

const statusConfig = {
  open: { label: 'Abierto', color: 'text-sky-700', bg: 'bg-sky-50' },
  in_progress: { label: 'En proceso', color: 'text-amber-700', bg: 'bg-amber-50' },
  resolved: { label: 'Resuelto', color: 'text-emerald-700', bg: 'bg-emerald-50' },
  closed: { label: 'Cerrado', color: 'text-slate-600', bg: 'bg-slate-100' },
};

const categoryConfig = {
  general: { label: 'General', color: 'text-slate-700', bg: 'bg-slate-100' },
  financial: { label: 'Financiero', color: 'text-emerald-700', bg: 'bg-emerald-50' },
  maintenance: { label: 'Mantenimiento', color: 'text-amber-700', bg: 'bg-amber-50' },
  security: { label: 'Seguridad', color: 'text-red-700', bg: 'bg-red-50' },
  event: { label: 'Evento', color: 'text-sky-700', bg: 'bg-sky-50' },
};


export { navItems, priorityConfig, statusConfig, categoryConfig };
