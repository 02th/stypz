import { api } from "@/lib/api";
import { Activity, ArrowUpRight } from "lucide-react";

export default async function Services() {
  const services = await api.getServices();

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out max-w-6xl">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 flex items-center gap-3">
          <Activity size={24} className="text-pink-500 shrink-0" /> Infrastructure Services
        </h1>
        <p className="text-sm font-medium text-slate-500 mt-1">
          Explore and provision high-performance modules for your architecture.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service: any) => (
          <div
            key={service.id}
            className="group premium-card p-6 flex flex-col justify-between h-56 cursor-pointer border-t-[3px] hover:border-t-pink-500 overflow-hidden relative transition-all"
            style={{ borderTopColor: 'transparent' }} // Initially transparent, overwritten by group-hover class in Tailwind
          >
            <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-pink-100 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            
            <div className="relative z-10">
              <div className="w-12 h-12 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-center text-pink-500 mb-4 group-hover:scale-110 shadow-sm transition-transform duration-300">
                 {/* Placeholder generic icon, dynamically swap based on service ID in real app */}
                 <Activity size={24} />
              </div>
              <h2 className="font-bold text-lg text-slate-900">{service.name}</h2>
              <p className="text-sm font-medium text-slate-500 mt-2 leading-relaxed line-clamp-2 mix-blend-multiply">
                {service.description}
              </p>
            </div>
            
            <div className="mt-6 flex items-center justify-between relative z-10 border-t border-slate-100 pt-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 group-hover:text-pink-600 transition-colors">
                Available
              </span>
              <button className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-50 text-slate-400 group-hover:bg-pink-50 group-hover:text-pink-600 hover:scale-110 transition-all">
                <ArrowUpRight size={16} strokeWidth={2.5} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="premium-card p-6 sm:p-8 mt-8 sm:mt-12 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-3xl relative overflow-hidden">
         <div className="absolute right-0 top-0 w-1/2 h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-400/30 via-transparent to-transparent" />
         <div className="relative z-10 max-w-xl">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight mb-2">Need a custom enterprise solution?</h2>
            <p className="text-indigo-100 mb-6 font-medium">
               Our architecture team can design scalable, air-gapped Private Clouds tailored to your specific compliance and compute requirements.
            </p>
            <button className="bg-white text-blue-600 px-6 py-3 rounded-xl font-bold text-sm hover:shadow-xl hover:shadow-black/10 hover:-translate-y-0.5 transition-all">
               Contact Engineering
            </button>
         </div>
      </div>
    </div>
  );
}
