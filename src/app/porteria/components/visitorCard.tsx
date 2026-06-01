import { Home, Hash } from "lucide-react";
import { VisitRecord } from "@/types";
import { timeAgo } from "@/app/utils/time";



export default function VisitorCard({ record }: { record: VisitRecord }) {
  const isInside = record.status === 'inside';
  return (
    <div className={`bg-white border-2 rounded-2xl p-4 transition-all duration-200 ${isInside ? 'border-emerald-200 shadow-emerald-50 shadow-md' : 'border-slate-100'}`}>
      <div className="flex items-center gap-4">
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-lg font-bold flex-shrink-0 ${isInside ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'}`}>
          {record.visitor_name.charAt(0)}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <p className="font-bold text-slate-900 text-base truncate">{record.visitor_name}</p>
            {isInside && (
              <span className="flex-shrink-0 inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                Adentro
              </span>
            )}
          </div>
          <div className="flex items-center gap-2 mt-1">
            <span className="flex items-center gap-1 text-xs text-slate-500">
              <Home className="w-3 h-3" /> Apto {record.apartment_destination}
            </span>
            <span className="text-slate-300">·</span>
            <span className="text-xs text-slate-400">{timeAgo(record.entry_at)}</span>
            {record.visitor_document && (
              <>
                <span className="text-slate-300">·</span>
                <span className="flex items-center gap-1 text-xs text-slate-400">
                  <Hash className="w-3 h-3" /> {record.visitor_document}
                </span>
              </>
            )}
          </div>
        </div>
        {isInside && (
          <button className="flex-shrink-0 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold px-3 py-2 rounded-xl transition-colors">
            Salida
          </button>
        )}
      </div>
    </div>
  );
}