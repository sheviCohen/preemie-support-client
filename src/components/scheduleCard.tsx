import type { ScheduleItem } from "../types/types";
import { SCHEDULE_TYPE_LABELS } from "../types/types";

export default function ScheduleCard({ item }: { item: ScheduleItem }) {
    return (
        <div className={`w-44 shrink-0 animate-pop rounded-xl border-s-4 px-3 py-2 text-xs shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${item.category === "APPOINTMENT" ? "border-violet-400 bg-violet-50/90" : "border-teal-400 bg-teal-50/90"}`}>
            <span className="block font-bold text-slate-500 tabular-nums">{new Date(item.startAt).toLocaleTimeString("he-IL", { hour: "2-digit", minute: "2-digit" })}</span>
            <p className="mt-0.5 leading-snug font-extrabold text-slate-800">{item.title}</p>
            <span className="mt-1 inline-block rounded-full bg-white/90 px-2 py-0.5 text-[10px] font-medium text-slate-500">{SCHEDULE_TYPE_LABELS[item.type]}</span>
        </div>
    );
}
