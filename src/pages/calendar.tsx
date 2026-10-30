import HealthFund from "../components/healtFund";
import { useSchedule } from "../api/cleandar";
import { getWeekStart, addDays } from "../utils/datesFunc";
import ScheduleCard from "../components/scheduleCard";


export default function Calendar()
{
    const weekStart = getWeekStart(new Date());
    const weekEnd = addDays(weekStart, 7);
    const days = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

    const schedule = useSchedule(weekStart.toISOString(), weekEnd.toISOString());

    if (schedule.isPending) return <p className="animate-pulse p-8 text-center text-lg text-slate-500">טוען...</p>;
    if(schedule.error) return <p className="mx-auto max-w-3xl rounded-2xl bg-rose-50 p-6 text-center text-rose-600">{schedule.error.message}</p>

    return( <div className="flex flex-col gap-[1.5vh] xl:h-[calc(100dvh-9rem)]">
    <div className="flex shrink-0 flex-col items-center gap-[0.6vh] text-center">
        <h1 className="gradient-text text-[clamp(1.6rem,4.5vh,2.5rem)] leading-tight font-extrabold tracking-tight">לוח הזמנים שלי</h1>
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
        <p className="text-[clamp(0.75rem,1.8vh,0.9rem)] font-medium text-slate-500">
            {weekStart.toLocaleDateString("he-IL", { day: "numeric", month: "numeric" })} – {addDays(weekStart, 6).toLocaleDateString("he-IL", { day: "numeric", month: "numeric", year: "numeric" })}
        </p>
        <div className="flex gap-2 text-[clamp(0.65rem,1.6vh,0.75rem)] font-semibold">
            <span className="flex items-center gap-1.5 rounded-full bg-violet-50 px-3 py-1 text-violet-700 ring-1 ring-violet-100 before:size-2.5 before:rounded-full before:bg-violet-400">תור</span>
            <span className="flex items-center gap-1.5 rounded-full bg-teal-50 px-3 py-1 text-teal-700 ring-1 ring-teal-100 before:size-2.5 before:rounded-full before:bg-teal-400">משימת טיפול</span>
        </div>
        </div>
    </div>

    <div className="grid grid-cols-1 gap-[1vh] sm:grid-cols-2 md:grid-cols-4 xl:min-h-0 xl:flex-1 xl:grid-cols-7">
        {days.map((day) => {
            const isToday = day.toDateString() === new Date().toDateString();
            const isShabbat = day.getDay() === 6;
            const items = schedule.data?.filter((item) => new Date(item.startAt).toDateString() === day.toDateString()) ?? [];

            return (
            <div key={day.toDateString()} className={`flex min-h-0 min-w-0 animate-fade-up flex-col overflow-hidden rounded-2xl border bg-white/75 shadow-sm backdrop-blur-xl transition hover:shadow-lg hover:shadow-teal-500/10 ${isToday ? "border-teal-300 ring-2 ring-teal-300/60" : "border-white/70"} ${isShabbat ? "bg-amber-50/60" : ""}`}>
                <h3 className={`flex shrink-0 flex-col items-center px-2 py-[1vh] text-center ${isToday ? "bg-linear-to-l from-teal-500 to-sky-500 text-white" : isShabbat ? "bg-amber-100/70 text-amber-900" : "bg-slate-50 text-slate-800"}`}>
                    <span className="text-[clamp(0.8rem,2vh,0.95rem)] font-extrabold">{day.toLocaleDateString("he-IL", { weekday: "long" })}</span>
                    <span className={`text-[clamp(0.65rem,1.6vh,0.75rem)] tabular-nums ${isToday ? "text-white/85" : "text-slate-500"}`}>{day.toLocaleDateString("he-IL", { day: "numeric", month: "numeric" })}{isToday && " · היום"}</span>
                </h3>

                <div className="flex min-h-0 flex-1 flex-col gap-[0.8vh] overflow-y-auto p-[0.8vh] [scrollbar-width:thin]">
                    {items.map((item) => <ScheduleCard key={item.id} item={item} />)}
                    {items.length === 0 && (
                        <p className="flex flex-1 items-center justify-center py-[2vh] text-[clamp(0.75rem,1.8vh,0.875rem)] text-slate-400">{isShabbat ? "שבת שלום 🕯️" : "יום פנוי ✨"}</p>
                    )}
                </div>
            </div>
            );
        })}
    </div>

    <div className="shrink-0">
        <HealthFund></HealthFund>
    </div>
    </div>)
}
