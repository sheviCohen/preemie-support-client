import type { ScheduleItem } from "../types";
import { SCHEDULE_TYPE_LABELS } from "../types";

export default function ScheduleCard({ item }: { item: ScheduleItem }) {
    return (
        <div className={`animate-pop shrink-0 rounded-xl border-s-4 px-2.5 py-[0.7vh] text-[clamp(0.65rem,1.55vh,0.75rem)] shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${item.category === "APPOINTMENT" ? "border-violet-400 bg-violet-50/90" : "border-teal-400 bg-teal-50/90"}`}>
            <span className={`block font-bold tabular-nums ${item.category === "APPOINTMENT" ? "text-violet-600" : "text-teal-600"}`}>{new Date(item.startAt).toLocaleTimeString("he-IL", { hour: "2-digit", minute: "2-digit" })}</span>
            <p className="mt-0.5 leading-snug font-extrabold break-words text-slate-800">{item.title}</p>
            <span className="mt-[0.4vh] inline-block rounded-full bg-white/90 px-2 py-px text-[clamp(0.55rem,1.3vh,0.65rem)] font-medium text-slate-500">{SCHEDULE_TYPE_LABELS[item.type]}</span>
        </div>
    );
}
