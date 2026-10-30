import { useContext } from "react"
import { UserContext } from "../context/userContext"
import { STAFF_ROLE_LABELS } from "../types/types";
import { Link } from "react-router";

export default function Home() {

    const me = useContext(UserContext);

    return (
        <div className="mx-auto flex h-[calc(100dvh-9rem)] max-w-4xl flex-col gap-[2vh]">
            <div className="glass-card relative flex shrink-0 animate-fade-up flex-col items-center gap-[1.2vh] overflow-hidden px-6 py-[2.5vh] text-center before:absolute before:inset-x-0 before:top-0 before:h-1.5 before:bg-linear-to-l before:from-teal-400 before:via-sky-400 before:to-violet-400 after:pointer-events-none after:absolute after:-top-24 after:-left-24 after:size-64 after:rounded-full after:bg-linear-to-br after:from-teal-200/50 after:to-violet-200/40 after:blur-3xl sm:px-12">
                <span className="relative flex size-[clamp(2.75rem,9vh,5.5rem)] animate-pop items-center justify-center rounded-full bg-linear-to-br from-teal-400 via-sky-500 to-violet-500 text-[clamp(1.4rem,4.5vh,2.75rem)] shadow-xl ring-[0.6vh] shadow-sky-500/30 ring-white/80" aria-hidden="true">
                    {me?.role === "MOTHER" ? "👶" : "🩺"}
                </span>
                <h1 className="relative text-[clamp(1.4rem,4.5vh,3rem)] leading-tight font-extrabold tracking-tight text-slate-800">
                    שלום, <span className="gradient-text">{me?.firstName} {me?.lastName}</span>
                    <span className="ms-2 inline-block origin-bottom-right transition hover:rotate-12" aria-hidden="true">👋</span>
                </h1>
                {
                    me?.role === "MOTHER" &&
                    <h2 className="relative rounded-full bg-linear-to-l from-rose-50 via-pink-50 to-violet-50 px-5 py-[0.8vh] text-[clamp(0.85rem,2.2vh,1.25rem)] font-semibold text-violet-700 shadow-sm ring-1 ring-pink-100">אמא של {me.baby?.name} התינוק הכי מתוק בעולם! 💕</h2>
                }
                {
                    me?.role === "STAFF" && me.staffRole &&
                    <h2 className="relative rounded-full bg-linear-to-l from-teal-50 via-sky-50 to-violet-50 px-5 py-[0.8vh] text-[clamp(0.85rem,2.2vh,1.25rem)] font-semibold text-teal-700 shadow-sm ring-1 ring-teal-100">ה{STAFF_ROLE_LABELS[me.staffRole]} המסורה!! ✨</h2>
                }
            </div>

            <div className="flex min-h-0 flex-1 animate-fade-up flex-col gap-[2vh]">
                {me?.role === "MOTHER" && <p className="rounded-2xl border-s-4 border-pink-300 bg-white/70 px-5 py-[1.5vh] text-[clamp(0.8rem,2vh,1.1rem)] leading-relaxed text-slate-600 shadow-sm ring-1 ring-slate-100">ברוכה הבאה למערכת לליווי אמהות לפגים: מקום אחד שבו תוכלי לשאול את הצוות המטפל, להתייעץ עם אמהות אחרות, לקרוא מאמרים מקצועיים ולעקוב אחרי התורים והטיפולים של התינוק. אנחנו כאן איתך, בכל שלב בדרך. 💗</p>}
                {me?.role === "STAFF" && <p className="rounded-2xl border-s-4 border-teal-300 bg-white/70 px-5 py-[1.5vh] text-[clamp(0.8rem,2vh,1.1rem)] leading-relaxed text-slate-600 shadow-sm ring-1 ring-slate-100">ברוכה הבאה למערכת לליווי אמהות לפגים. כאן תוכלי ללוות את האמהות מקרוב: לענות על שאלות בצ'אט, לשתף מאמרים מקצועיים ולתת להן ידע ותמיכה בתקופה המאתגרת שאחרי הלידה. תודה על המסירות שלך! 🌱</p>}

                <h2 className="shrink-0 text-center text-[clamp(1rem,2.6vh,1.35rem)] font-extrabold text-slate-700">מה תרצי לעשות היום?</h2>

                <div className="grid min-h-0 flex-1 auto-rows-fr grid-cols-2 gap-[1.5vh]">
                <Link className="group flex items-center gap-[2vh] rounded-2xl bg-white/80 px-[2vh] py-[1.5vh] shadow-sm ring-1 ring-slate-200/70 transition hover:-translate-y-1 hover:shadow-lg hover:shadow-sky-500/10 hover:ring-sky-200" to={"/chats"}>
                    <span className="flex size-[clamp(2.25rem,6vh,3.5rem)] shrink-0 items-center justify-center rounded-xl bg-sky-50 text-[clamp(1.1rem,3vh,1.75rem)] transition group-hover:scale-110">💬</span>
                    <span className="flex min-w-0 flex-col gap-[0.4vh]">
                        <span className="text-[clamp(0.85rem,2.2vh,1.1rem)] font-bold text-slate-800 group-hover:text-sky-700">צ'אט</span>
                        <span className="hidden text-[clamp(0.7rem,1.8vh,0.9rem)] leading-snug text-slate-500 sm:block">צ'אט כללי לכל המשתמשים, ושיחות פרטיות עם אמהות ואנשי צוות.</span>
                    </span>
                </Link>
                <Link className="group flex items-center gap-[2vh] rounded-2xl bg-white/80 px-[2vh] py-[1.5vh] shadow-sm ring-1 ring-slate-200/70 transition hover:-translate-y-1 hover:shadow-lg hover:shadow-teal-500/10 hover:ring-teal-200" to={"/articles"}>
                    <span className="flex size-[clamp(2.25rem,6vh,3.5rem)] shrink-0 items-center justify-center rounded-xl bg-teal-50 text-[clamp(1.1rem,3vh,1.75rem)] transition group-hover:scale-110">📚</span>
                    <span className="flex min-w-0 flex-col gap-[0.4vh]">
                        <span className="text-[clamp(0.85rem,2.2vh,1.1rem)] font-bold text-slate-800 group-hover:text-teal-700">מאמרים</span>
                        <span className="hidden text-[clamp(0.7rem,1.8vh,0.9rem)] leading-snug text-slate-500 sm:block">מאמרים מקצועיים מהצוות, עם חיפוש וסינון לפי נושא.</span>
                    </span>
                </Link>
                <Link className="group flex items-center gap-[2vh] rounded-2xl bg-white/80 px-[2vh] py-[1.5vh] shadow-sm ring-1 ring-slate-200/70 transition hover:-translate-y-1 hover:shadow-lg hover:shadow-violet-500/10 hover:ring-violet-200" to={"/profile"}>
                    <span className="flex size-[clamp(2.25rem,6vh,3.5rem)] shrink-0 items-center justify-center rounded-xl bg-violet-50 text-[clamp(1.1rem,3vh,1.75rem)] transition group-hover:scale-110">👤</span>
                    <span className="flex min-w-0 flex-col gap-[0.4vh]">
                        <span className="text-[clamp(0.85rem,2.2vh,1.1rem)] font-bold text-slate-800 group-hover:text-violet-700">פרופיל</span>
                        <span className="hidden text-[clamp(0.7rem,1.8vh,0.9rem)] leading-snug text-slate-500 sm:block">צפייה בפרטים האישיים ועריכה שלהם.</span>
                    </span>
                </Link>
                {
                    me?.role === "MOTHER" && <Link className="group flex items-center gap-[2vh] rounded-2xl bg-white/80 px-[2vh] py-[1.5vh] shadow-sm ring-1 ring-slate-200/70 transition hover:-translate-y-1 hover:shadow-lg hover:shadow-pink-500/10 hover:ring-pink-200" to={"/calendar"}>
                        <span className="flex size-[clamp(2.25rem,6vh,3.5rem)] shrink-0 items-center justify-center rounded-xl bg-pink-50 text-[clamp(1.1rem,3vh,1.75rem)] transition group-hover:scale-110">📅</span>
                        <span className="flex min-w-0 flex-col gap-[0.4vh]">
                            <span className="text-[clamp(0.85rem,2.2vh,1.1rem)] font-bold text-slate-800 group-hover:text-pink-700">לוח זמנים</span>
                            <span className="hidden text-[clamp(0.7rem,1.8vh,0.9rem)] leading-snug text-slate-500 sm:block">התורים ומשימות הטיפול בתינוק, במקום אחד.</span>
                        </span>
                    </Link>
                }
                {
                    me?.role === "STAFF" && <Link className="group flex items-center gap-[2vh] rounded-2xl bg-white/80 px-[2vh] py-[1.5vh] shadow-sm ring-1 ring-slate-200/70 transition hover:-translate-y-1 hover:shadow-lg hover:shadow-amber-500/10 hover:ring-amber-200" to={"/articles/new"}>
                        <span className="flex size-[clamp(2.25rem,6vh,3.5rem)] shrink-0 items-center justify-center rounded-xl bg-amber-50 text-[clamp(1.1rem,3vh,1.75rem)] transition group-hover:scale-110">✍️</span>
                        <span className="flex min-w-0 flex-col gap-[0.4vh]">
                            <span className="text-[clamp(0.85rem,2.2vh,1.1rem)] font-bold text-slate-800 group-hover:text-amber-700">כתיבת מאמר</span>
                            <span className="hidden text-[clamp(0.7rem,1.8vh,0.9rem)] leading-snug text-slate-500 sm:block">הוספה של מאמרים חדשים, ועריכה ומחיקה של המאמרים שכתבת.</span>
                        </span>
                    </Link>
                }
                </div>
            </div>
        </div>
    )
}