"use client"

import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  Building2, Bell, LogOut, Menu, X 
} from 'lucide-react';
import { navItems } from './components/config';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar - Fijo a la izquierda */}
      <aside className={`fixed inset-y-0 left-0 z-30 w-64 bg-slate-900 flex flex-col transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        {/* Logo */}
        <div className="px-5 py-6 flex items-center gap-3 border-b border-slate-700/50">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-sky-500 to-teal-500 flex items-center justify-center">
            <Building2 className="w-5 h-5 text-white" />
          </div>
          <div className="text-white font-bold text-sm">CondoSmart</div>
          <button onClick={() => setSidebarOpen(false)} className="ml-auto text-slate-400 lg:hidden">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navegación */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <Link 
              key={item.id} 
              href={item.href} 
              onClick={() => setSidebarOpen(false)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                pathname === item.href ? 'bg-sky-500/20 text-sky-400' : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <item.icon className="w-[18px] h-[18px]" />
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-slate-700/50">
          <button onClick={() => router.push('/')} className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:text-white">
            <LogOut className="w-[18px] h-[18px]" />
            Cambiar perfil
          </button>
        </div>
      </aside>

      {/* Área Principal */}
      <main className="flex-1 lg:ml-64 flex flex-col min-w-0">
        {/* Top Bar */}
        <header className="bg-slate-900 border-b border-slate-100 px-6 py-4 flex items-center justify-between sticky top-0 z-10 ">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-slate-500">
              <Menu className="w-5 h-5" />
            </button>
            <div>
              <h2 className="text-lg font-bold text-white">Dashboard</h2>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
             <button className="relative p-2 text-slate-400 hover:bg-slate-50 rounded-xl">
               <Bell className="w-5 h-5" />
               <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500"></span>
             </button>
             <div className="w-8 h-8 rounded-full bg-slate-800 text-[10px] flex items-center justify-center text-white">JM</div>
          </div>
        </header>

        {/* Contenido Dinámico */}
        <div className="p-6">
          {children}
        </div>
      </main>

      {/* Overlay para móviles */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-20 bg-black/50 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}
    </div>
  );
}