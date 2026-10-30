import { Link } from "react-router";

// הלוגו של האתר: טביעת רגל זעירה שכף הרגל שלה היא לב, ולידה השם.
// עיצוב בלבד. לחיצה מחזירה לדף הבית.
export default function Logo() {
    return (
        <Link to="/" className="group flex shrink-0 items-center gap-2.5" aria-label="צעד קטן, לדף הבית">
            <svg viewBox="0 0 48 48" className="h-11 w-11 drop-shadow-[0_4px_10px_rgba(13,148,136,0.35)] transition duration-500 group-hover:-rotate-6" aria-hidden="true">
                <defs>
                    <linearGradient id="logo-grad" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0" stopColor="#2dd4bf" />
                        <stop offset="0.55" stopColor="#0ea5e9" />
                        <stop offset="1" stopColor="#8b5cf6" />
                    </linearGradient>
                </defs>
                <path
                    fill="url(#logo-grad)"
                    d="M24 44C14 36 8.5 29 8.5 21.5 8.5 16.3 12.4 13 16.8 13c3.1 0 5.6 1.6 7.2 4.2 1.6-2.6 4.1-4.2 7.2-4.2 4.4 0 8.3 3.3 8.3 8.5C39.5 29 34 36 24 44Z"
                />
                <g fill="url(#logo-grad)" className="origin-bottom transition duration-500 group-hover:-translate-y-0.5">
                    <circle cx="10.5" cy="9" r="2.4" />
                    <circle cx="16" cy="5.6" r="2.8" />
                    <circle cx="23.6" cy="4.2" r="3.3" />
                    <circle cx="31.4" cy="5.4" r="2.8" />
                    <circle cx="37.2" cy="8.8" r="2.4" />
                </g>
            </svg>
            <span className="flex flex-col leading-none">
                <span className="font-display text-2xl font-black tracking-tight text-slate-900">צעד קטן</span>
                <span className="mt-1 text-[11px] font-medium tracking-wide text-teal-700/80">ליווי להורים לפגים</span>
            </span>
        </Link>
    );
}
