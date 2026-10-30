import { useHealthFunds } from "../api/cleandar";

export default function HealthFund()
{
    const healthFunds=useHealthFunds();
    console.log(healthFunds);
    
    return(
        <div className="glass-card flex flex-col gap-3 p-5 lg:sticky lg:top-24">
            <h2 className="mb-1 flex items-center gap-2 text-xl font-extrabold text-slate-800 before:flex before:h-10 before:w-10 before:items-center before:justify-center before:rounded-2xl before:bg-linear-to-br before:from-teal-400 before:to-sky-500 before:text-lg before:shadow-md before:shadow-teal-500/30 before:content-['🏥']">קביעת תורים בקופ"ח:</h2>
        {
            healthFunds.data?.map((h)=>
            <div key={h.id} className="group flex items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white/80 px-4 py-3.5 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-teal-300 hover:bg-linear-to-l hover:from-teal-50 hover:to-sky-50 hover:shadow-lg hover:shadow-teal-500/10">
                <span className="font-semibold text-slate-800 transition group-hover:text-teal-700">{h.name}</span>
                <a className="flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-600 transition duration-200 after:transition after:content-['←'] hover:-translate-y-0.5 hover:bg-linear-to-l hover:from-teal-500 hover:to-sky-500 hover:text-white hover:shadow-md hover:shadow-teal-500/30 hover:after:-translate-x-1 focus-visible:ring-4 focus-visible:ring-teal-200 focus-visible:outline-none" href={h.url} target="_blank" rel="noopener noreferrer">לקביעת תור</a>
            </div>
        )}
        </div>
    )
}


