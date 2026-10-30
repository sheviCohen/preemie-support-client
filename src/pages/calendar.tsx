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

    return( <><h1 className="gradient-text text-center text-4xl font-extrabold tracking-tight lg:pe-[19.5rem]">לוח הזמנים שלי</h1>

    <div className="mt-6 grid items-start gap-6 lg:grid-cols-[1fr_18rem]">
        <div className="flex min-w-0 flex-col gap-2.5">
        {days.map((day) =>
            <div key={day.toDateString()} className={`flex min-h-24 min-w-0 animate-fade-up items-stretch gap-2.5 overflow-x-auto rounded-2xl border bg-white/75 p-2 shadow-sm backdrop-blur-xl transition after:self-center after:px-2 after:text-sm after:text-slate-400 hover:shadow-lg hover:shadow-teal-500/10 [&:not(:has(>div))]:after:content-['יום_פנוי'] ${day.toDateString() === new Date().toDateString() ? "border-teal-300 ring-2 ring-teal-300/60" : "border-white/70"}`}>
                <h3 className={`sticky right-0 z-10 flex w-24 shrink-0 items-center justify-center rounded-xl px-2 text-center text-sm leading-snug font-extrabold ${day.toDateString() === new Date().toDateString() ? "bg-linear-to-l from-teal-500 to-sky-500 text-white shadow-md shadow-teal-500/30" : "bg-slate-50 text-slate-800 ring-1 ring-slate-100"}`}>{day.toLocaleDateString("he-IL", { weekday: "short", day: "numeric", month: "numeric" })}</h3>
                {schedule.data
                    ?.filter((item) => new Date(item.startAt).toDateString() === day.toDateString())
                    .map((item) => <ScheduleCard key={item.id} item={item} />)}
            </div>
        )}
    </div>

    <HealthFund></HealthFund>
    </div>
    </>)
}