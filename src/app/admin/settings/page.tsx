'use client';

import { useState } from 'react';
import {
  Building2, Shield, Bell, Users, Clock, Globe,
  ChevronRight, ToggleLeft, ToggleRight, Save,
  Mail, Phone, MapPin, Camera, Palette, Lock
} from 'lucide-react';

interface SettingToggle {
  id: string;
  label: string;
  description: string;
  enabled: boolean;
}

const defaultNotifications: SettingToggle[] = [
  { id: 'email_visitors', label: 'Notificación de visitantes por email', description: 'Enviar correo al residente cuando un visitante es registrado', enabled: true },
  { id: 'push_maintenance', label: 'Alertas de mantenimiento', description: 'Notificaciones push para solicitudes de mantenimiento críticas', enabled: true },
  { id: 'sms_emergency', label: 'SMS de emergencia', description: 'Enviar SMS a todos los residentes en caso de emergencia', enabled: false },
  { id: 'weekly_report', label: 'Reporte semanal', description: 'Enviar resumen semanal de actividad al administrador', enabled: true },
  { id: 'announcement_push', label: 'Push de comunicados', description: 'Enviar notificación push cuando se publique un nuevo comunicado', enabled: true },
];

const defaultSecurity: SettingToggle[] = [
  { id: '2fa', label: 'Autenticación de dos factores', description: 'Requerir código de verificación adicional al iniciar sesión', enabled: true },
  { id: 'auto_deny', label: 'Auto-denegar visitas no autorizadas', description: 'Denegar automáticamente visitas sin preautorización después de 15 min', enabled: false },
  { id: 'photo_required', label: 'Foto obligatoria de visitante', description: 'Requerir foto del visitante al momento del registro', enabled: true },
  { id: 'vehicle_log', label: 'Registro de vehículos', description: 'Registrar placa de todos los vehículos que ingresen', enabled: true },
];

export default function SettingsView() {
  const [activeTab, setActiveTab] = useState('general');
  const [notifications, setNotifications] = useState(defaultNotifications);
  const [security, setSecurity] = useState(defaultSecurity);
  const [saved, setSaved] = useState(false);

  const toggleNotification = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, enabled: !n.enabled } : n));
    setSaved(false);
  };

  const toggleSecurity = (id: string) => {
    setSecurity(prev => prev.map(s => s.id === id ? { ...s, enabled: !s.enabled } : s));
    setSaved(false);
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const tabs = [
    { id: 'general', label: 'General', icon: Building2 },
    { id: 'notifications', label: 'Notificaciones', icon: Bell },
    { id: 'security', label: 'Seguridad', icon: Shield },
    { id: 'schedule', label: 'Horarios', icon: Clock },
  ];

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="flex border-b border-slate-100 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-4 text-sm font-medium transition-all border-b-2 whitespace-nowrap ${
                activeTab === tab.id
                  ? 'text-sky-600 border-sky-600 bg-sky-50/50'
                  : 'text-slate-500 border-transparent hover:text-slate-700 hover:bg-slate-50'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* General tab */}
      {activeTab === 'general' && (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* Condo info */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="px-6 py-5 border-b border-slate-50">
              <h3 className="font-bold text-slate-900">Información del conjunto</h3>
              <p className="text-xs text-slate-400 mt-0.5">Datos generales de la unidad residencial</p>
            </div>
            <div className="p-6 space-y-5">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">Nombre del conjunto</label>
                <input
                  type="text"
                  defaultValue="Torres del Parque"
                  className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent focus:bg-white transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">NIT</label>
                <input
                  type="text"
                  defaultValue="900.123.456-7"
                  className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent focus:bg-white transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">Dirección</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    defaultValue="Cra 5 # 36-35, Bogotá D.C."
                    className="w-full pl-9 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent focus:bg-white transition-all"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5">Ciudad</label>
                  <input
                    type="text"
                    defaultValue="Bogotá"
                    className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent focus:bg-white transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5">Estrato</label>
                  <input
                    type="text"
                    defaultValue="4"
                    className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent focus:bg-white transition-all"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5">Teléfono</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      defaultValue="(601) 345-6789"
                      className="w-full pl-9 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent focus:bg-white transition-all"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      defaultValue="admin@torresdelparque.co"
                      className="w-full pl-9 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent focus:bg-white transition-all"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Admin profile */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="px-6 py-5 border-b border-slate-50">
              <h3 className="font-bold text-slate-900">Perfil del administrador</h3>
              <p className="text-xs text-slate-400 mt-0.5">Tu información de cuenta</p>
            </div>
            <div className="p-6">
              <div className="flex items-center gap-5 mb-6">
                <div className="relative">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-slate-600 to-slate-800 flex items-center justify-center text-2xl font-bold text-white shadow-lg">
                    JM
                  </div>
                  <button className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-sky-600 flex items-center justify-center shadow-md hover:bg-sky-700 transition-colors">
                    <Camera className="w-3.5 h-3.5 text-white" />
                  </button>
                </div>
                <div>
                  <h4 className="text-lg font-bold text-slate-900">Juan Martínez</h4>
                  <p className="text-sm text-slate-500">Administrador principal</p>
                  <p className="text-xs text-slate-400 mt-1">Miembro desde Ene 2024</p>
                </div>
              </div>
              <div className="space-y-5">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5">Nombre completo</label>
                  <input
                    type="text"
                    defaultValue="Juan Martínez López"
                    className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent focus:bg-white transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5">Correo electrónico</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="email"
                      defaultValue="juan.martinez@torresdelparque.co"
                      className="w-full pl-9 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent focus:bg-white transition-all"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5">Teléfono</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="tel"
                      defaultValue="+57 310 456 7890"
                      className="w-full pl-9 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent focus:bg-white transition-all"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5">Cambiar contraseña</label>
                  <button className="inline-flex items-center gap-2 text-xs font-semibold text-sky-600 hover:text-sky-700 bg-sky-50 hover:bg-sky-100 px-4 py-2.5 rounded-xl transition-colors">
                    <Lock className="w-3.5 h-3.5" /> Actualizar contraseña
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Notifications tab */}
      {activeTab === 'notifications' && (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="px-6 py-5 border-b border-slate-50">
            <h3 className="font-bold text-slate-900">Preferencias de notificaciones</h3>
            <p className="text-xs text-slate-400 mt-0.5">Configura cómo y cuándo recibir notificaciones</p>
          </div>
          <div className="divide-y divide-slate-50">
            {notifications.map((n) => (
              <div key={n.id} className="px-6 py-5 flex items-center justify-between hover:bg-slate-50/50 transition-colors">
                <div className="flex-1 min-w-0 mr-4">
                  <p className="text-sm font-semibold text-slate-800">{n.label}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{n.description}</p>
                </div>
                <button
                  onClick={() => toggleNotification(n.id)}
                  className="flex-shrink-0 transition-colors"
                >
                  {n.enabled ? (
                    <ToggleRight className="w-10 h-10 text-sky-600" />
                  ) : (
                    <ToggleLeft className="w-10 h-10 text-slate-300" />
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Security tab */}
      {activeTab === 'security' && (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="px-6 py-5 border-b border-slate-50">
            <h3 className="font-bold text-slate-900">Configuración de seguridad</h3>
            <p className="text-xs text-slate-400 mt-0.5">Políticas de acceso y control de visitantes</p>
          </div>
          <div className="divide-y divide-slate-50">
            {security.map((s) => (
              <div key={s.id} className="px-6 py-5 flex items-center justify-between hover:bg-slate-50/50 transition-colors">
                <div className="flex-1 min-w-0 mr-4">
                  <p className="text-sm font-semibold text-slate-800">{s.label}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{s.description}</p>
                </div>
                <button
                  onClick={() => toggleSecurity(s.id)}
                  className="flex-shrink-0 transition-colors"
                >
                  {s.enabled ? (
                    <ToggleRight className="w-10 h-10 text-sky-600" />
                  ) : (
                    <ToggleLeft className="w-10 h-10 text-slate-300" />
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Schedule tab */}
      {activeTab === 'schedule' && (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="px-6 py-5 border-b border-slate-50">
            <h3 className="font-bold text-slate-900">Horarios de operación</h3>
            <p className="text-xs text-slate-400 mt-0.5">Horarios de portería y áreas comunes</p>
          </div>
          <div className="p-6 space-y-6">
            {/* Portería */}
            <div>
              <h4 className="text-sm font-semibold text-slate-800 mb-3 flex items-center gap-2">
                <Shield className="w-4 h-4 text-sky-500" /> Portería
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1.5">Turno diurno</label>
                  <div className="flex items-center gap-2">
                    <input type="time" defaultValue="06:00" className="flex-1 px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400" />
                    <span className="text-xs text-slate-400">a</span>
                    <input type="time" defaultValue="18:00" className="flex-1 px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1.5">Turno nocturno</label>
                  <div className="flex items-center gap-2">
                    <input type="time" defaultValue="18:00" className="flex-1 px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400" />
                    <span className="text-xs text-slate-400">a</span>
                    <input type="time" defaultValue="06:00" className="flex-1 px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400" />
                  </div>
                </div>
              </div>
            </div>

            <hr className="border-slate-100" />

            {/* Visitors */}
            <div>
              <h4 className="text-sm font-semibold text-slate-800 mb-3 flex items-center gap-2">
                <Users className="w-4 h-4 text-teal-500" /> Visitantes
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1.5">Horario de visitas (L-V)</label>
                  <div className="flex items-center gap-2">
                    <input type="time" defaultValue="08:00" className="flex-1 px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400" />
                    <span className="text-xs text-slate-400">a</span>
                    <input type="time" defaultValue="21:00" className="flex-1 px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1.5">Horario de visitas (S-D)</label>
                  <div className="flex items-center gap-2">
                    <input type="time" defaultValue="09:00" className="flex-1 px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400" />
                    <span className="text-xs text-slate-400">a</span>
                    <input type="time" defaultValue="20:00" className="flex-1 px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400" />
                  </div>
                </div>
              </div>
            </div>

            <hr className="border-slate-100" />

            {/* Delivery */}
            <div>
              <h4 className="text-sm font-semibold text-slate-800 mb-3 flex items-center gap-2">
                <Globe className="w-4 h-4 text-amber-500" /> Domicilios y proveedores
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1.5">Horario permitido</label>
                  <div className="flex items-center gap-2">
                    <input type="time" defaultValue="07:00" className="flex-1 px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400" />
                    <span className="text-xs text-slate-400">a</span>
                    <input type="time" defaultValue="22:00" className="flex-1 px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1.5">Tiempo máximo estadía</label>
                  <select className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400 cursor-pointer">
                    <option>15 minutos</option>
                    <option selected>30 minutos</option>
                    <option>45 minutos</option>
                    <option>1 hora</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Save button */}
      <div className="flex items-center justify-end gap-3">
        {saved && (
          <span className="text-sm font-medium text-emerald-600 animate-pulse">
            ✓ Cambios guardados
          </span>
        )}
        <button
          onClick={handleSave}
          className="inline-flex items-center gap-2 text-sm font-semibold text-white bg-sky-600 hover:bg-sky-700 px-6 py-2.5 rounded-xl transition-colors shadow-sm"
        >
          <Save className="w-4 h-4" /> Guardar cambios
        </button>
      </div>
    </div>
  );
}
