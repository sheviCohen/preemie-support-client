import { useHealthFunds } from "../api/cleandar";

export default function HealthFund()
{
    const healthFunds=useHealthFunds();

    return(
        <div className="glass-card grid items-center gap-[1vh] p-[1.5vh] sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-[auto_repeat(4,1fr)]">
            <h2 className="flex items-center gap-2 sm:col-span-2 lg:col-span-4 xl:col-span-1 xl:pe-2 text-[clamp(0.95rem,2.4vh,1.25rem)] font-extrabold text-slate-800 before:flex before:size-[clamp(2rem,4.5vh,2.5rem)] before:items-center before:justify-center before:rounded-2xl before:bg-linear-to-br before:from-teal-400 before:to-sky-500 before:text-lg before:shadow-md before:shadow-teal-500/30 before:content-['🏥']">קביעת תורים בקופ"ח:</h2>
        {healthFunds.isPending && <p className="animate-pulse p-8 text-center text-slate-500 sm:col-span-2 lg:col-span-4">טוען...</p>}
        {healthFunds.error && <p className="rounded-xl bg-rose-50 px-3 py-2 text-center text-sm text-rose-600 sm:col-span-2 lg:col-span-4">{healthFunds.error.message}</p>}
        {
            healthFunds.data?.map((h)=>
            <div key={h.id} className="group flex items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white/80 px-4 py-[1vh] shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-teal-300 hover:bg-linear-to-l hover:from-teal-50 hover:to-sky-50 hover:shadow-lg hover:shadow-teal-500/10">
                <span className="font-semibold text-slate-800 transition group-hover:text-teal-700">{h.name}</span>
                <a className="flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-600 transition duration-200 after:transition after:content-['←'] hover:-translate-y-0.5 hover:bg-linear-to-l hover:from-teal-500 hover:to-sky-500 hover:text-white hover:shadow-md hover:shadow-teal-500/30 hover:after:-translate-x-1 focus-visible:ring-4 focus-visible:ring-teal-200 focus-visible:outline-none" href={h.url} target="_blank" rel="noopener noreferrer">לקביעת תור</a>
            </div>
        )}
        </div>
    )
}


