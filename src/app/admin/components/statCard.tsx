import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

export default function StatCard ({ title, value, subtitle, icon: Icon, trend, trendUp, color }: {
  title: string; value: string | number; subtitle: string; icon: React.ComponentType<any>;
  trend?: string; trendUp?: boolean; color: string;
}) {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-11 h-11 rounded-xl ${color} flex items-center justify-center`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
        {trend && (
          <div className={`flex items-center gap-1 text-xs font-medium ${trendUp ? 'text-emerald-600' : 'text-red-500'}`}>
            {trendUp ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
            {trend}
          </div>
        )}
      </div>
      <div className="text-3xl font-bold text-slate-900 mb-1">{value}</div>
      <div className="text-sm font-medium text-slate-700">{title}</div>
      <div className="text-xs text-slate-400 mt-0.5">{subtitle}</div>
    </div>
  );
}