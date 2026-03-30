import { api } from "@/lib/api";
import { DollarSign, ShieldAlert, BellRing } from "lucide-react";

export default async function Budget() {
  const budget = await api.getBudget();

  const percentageUsed = Math.min(100, Math.round((budget.used / budget.monthly_limit) * 100));
  const isDanger = percentageUsed > (budget.alert_threshold * 100);

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out max-w-4xl">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 flex items-center gap-3">
          <DollarSign size={24} className="text-emerald-500 shrink-0" /> Budget
        </h1>
        <p className="text-sm font-medium text-slate-500 mt-1">
          Monitor your infrastructure spending.
        </p>
      </div>

      <div className="premium-card p-5 sm:p-8 group relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-5">
           <DollarSign size={200} />
        </div>
        <h2 className="font-semibold text-slate-800 flex items-center gap-2 relative z-10">
          Monthly Limit
        </h2>

         <div className="mt-6 flex flex-col md:flex-row md:items-end justify-between relative z-10 gap-6">
            <div>
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1">
                Current Usage
              </div>
              <div className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tighter">
                ${budget.used.toFixed(2)}
                <span className="text-xl font-medium text-slate-400 ml-1">
                  / ${budget.monthly_limit.toFixed(2)}
                </span>
              </div>
            </div>
            
            <div className="bg-slate-50 px-4 py-2 rounded-xl border border-slate-200">
               <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Billing cycle</div>
               <div className="text-sm font-semibold text-slate-800">Ends in 12 days</div>
            </div>
         </div>

        <div className="mt-8 relative z-10">
           <div className="flex justify-between text-xs font-semibold mb-2">
             <span className={isDanger ? 'text-red-500' : 'text-emerald-500'}>{percentageUsed}% Used</span>
             <span className="text-slate-400">{100 - percentageUsed}% Remaining</span>
           </div>
           
          <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden shadow-inner">
            <div 
              className={`h-full rounded-full shadow-[inset_0_-1px_2px_rgba(0,0,0,0.1)] transition-all duration-1000 ease-out ${
                isDanger 
                ? 'bg-gradient-to-r from-red-400 to-red-500' 
                : 'bg-gradient-to-r from-emerald-400 to-emerald-500'
              }`}
              style={{ width: `${percentageUsed}%` }}
            />
          </div>
        </div>
      </div>

      <div className="premium-card p-6 flex items-start gap-4">
        <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
          <BellRing size={24} />
        </div>
        <div>
          <h2 className="font-bold text-slate-800">Alert Thresholds</h2>
          <p className="text-sm text-slate-500 font-medium mt-1">
            We will notify you via email when your usage exceeds <span className="text-slate-900 font-bold">{budget.alert_threshold * 100}%</span> (${(budget.monthly_limit * budget.alert_threshold).toFixed(2)}) of your monthly limit.
          </p>
          <button className="mt-4 text-sm font-semibold text-blue-600 hover:text-blue-700 hover:underline">
            Manage alerts →
          </button>
        </div>
      </div>
    </div>
  );
}
