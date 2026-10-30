import { Link } from "react-router";

export default function NotFound()
{
    return (
        <div className="page-center items-center px-4 text-center">
            <div className="glass-card relative flex w-full max-w-lg animate-fade-up flex-col items-center gap-[2vh] overflow-hidden px-6 py-[5vh] before:absolute before:inset-x-0 before:top-0 before:h-1.5 before:bg-linear-to-l before:from-teal-400 before:via-sky-400 before:to-violet-400">
                <span className="flex size-[clamp(4rem,12vh,6.5rem)] animate-pop items-center justify-center rounded-full bg-linear-to-br from-teal-100 via-sky-100 to-violet-100 text-[clamp(2rem,6vh,3.5rem)] shadow-inner ring-8 ring-white/80" aria-hidden="true">🍼</span>
                <h1 className="gradient-text text-[clamp(3.5rem,13vh,7rem)] leading-none font-black tracking-tight">404</h1>
                <h2 className="text-[clamp(1.1rem,3vh,1.6rem)] font-extrabold text-slate-800">אופס, העמוד לא נמצא</h2>
                <p className="max-w-sm text-[clamp(0.9rem,2vh,1.05rem)] leading-relaxed text-slate-500">ייתכן שהקישור שגוי, או שהעמוד הוסר. אפשר לחזור לדף הבית ולהמשיך משם.</p>
                <Link className="btn-primary mt-[1vh] px-10 py-3 text-lg" to="/">חזרה לדף הבית</Link>
            </div>
        </div>
    );
}
