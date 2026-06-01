import { WEEKLY_VISITS } from "@/lib/mockData";

export default function VisitChart() {
  const max = Math.max(...WEEKLY_VISITS.map(d => d.count));
  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-bold text-slate-900">Visitas esta semana</h3>
          <p className="text-xs text-slate-400 mt-0.5">Ingresos registrados por portería</p>
        </div>
        <span className="text-xs font-semibold text-sky-600 bg-sky-50 px-3 py-1 rounded-full">194 total</span>
      </div>
      <div className="flex items-end gap-3 h-36">
        {WEEKLY_VISITS.map((d) => {
          const height = Math.max(8, (d.count / max) * 100);
          const isToday = d.day === 'Dom';
          return (
            <div key={d.day} className="flex-1 flex flex-col items-center gap-2">
              <span className="text-xs font-bold text-slate-700">{d.count}</span>
              <div className="w-full rounded-t-lg transition-all duration-500 relative group cursor-pointer"
                style={{ height: `${height}%`, backgroundColor: isToday ? '#0EA5E9' : '#E2E8F0' }}>
                <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  {d.count} visitas
                </div>
              </div>
              <span className={`text-xs ${isToday ? 'font-bold text-sky-600' : 'text-slate-400'}`}>{d.day}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
