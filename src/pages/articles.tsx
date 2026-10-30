import { useNavigate } from "react-router";
import { useArticles } from "../api/articles"
import ArticleInList from "../components/articleInList";
import { useContext, useState } from "react";
import { UserContext } from "../context/userContext";
import { ARTICLE_CATEGORY_LABELS, type ArticleCategory } from "../types/types";


export default function Articles() {


    const articles = useArticles();
    const navigate = useNavigate();
    const me = useContext(UserContext);
    const [textSearch, setTextSearch] = useState("");
    const [categorySearch, setCategorySearch] = useState<ArticleCategory | "">("");

    if (articles.isPending) return <p className="animate-pulse p-8 text-center text-slate-500">טוען...</p>;
    if (articles.error) return <p className="mx-auto max-w-3xl rounded-2xl bg-rose-50 p-6 text-center text-rose-600">{articles.error.message}</p>;

    const filteredArticles = articles.data.filter((a) => (a.category === categorySearch || categorySearch === "") && (a.title.includes(textSearch.trim()) || a.summary.includes(textSearch.trim())))
    const optionLabelKey=Object.entries(ARTICLE_CATEGORY_LABELS)
    return (
        <div className="flex flex-col gap-8">
            {
                me?.role === "STAFF" &&
                <div className="flex justify-center pt-2">
                    <button className="group relative flex animate-fade-up items-center gap-3 overflow-hidden rounded-full bg-linear-to-l from-teal-600 via-teal-500 to-sky-500 px-10 py-4 text-xl font-extrabold text-white shadow-xl shadow-teal-600/30 ring-4 ring-white/70 transition before:absolute before:inset-y-0 before:-right-1/2 before:w-1/3 before:skew-x-[-20deg] before:bg-white/30 before:opacity-0 before:transition-all before:duration-700 hover:-translate-y-1 hover:scale-105 hover:shadow-2xl hover:shadow-teal-600/40 hover:before:right-[120%] hover:before:opacity-100 active:translate-y-0 active:scale-100 sm:px-14 sm:py-5 sm:text-2xl" onClick={() => navigate("/articles/new")}>
                        <span className="flex size-9 items-center justify-center rounded-full bg-white/25 text-2xl leading-none transition duration-300 group-hover:rotate-90 sm:size-10">+</span>
                        להוספת מאמר
                    </button>
                </div>
            }

            <div className="glass-card relative flex animate-fade-up flex-col gap-4 overflow-hidden p-5 before:absolute before:inset-x-0 before:top-0 before:h-1 before:bg-linear-to-l before:from-teal-400 before:via-sky-400 before:to-violet-400 sm:flex-row sm:items-end sm:p-6">
                <div className="flex size-14 shrink-0 animate-pop items-center justify-center self-center rounded-2xl bg-linear-to-br from-teal-400 via-sky-500 to-violet-500 text-white shadow-lg ring-4 shadow-sky-500/40 ring-white/80 transition hover:rotate-6 hover:scale-110 sm:self-end">
                    <svg className="size-7 drop-shadow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <circle cx="11" cy="11" r="7" />
                        <path d="m20 20-3.5-3.5" />
                        <path d="M8.5 8.5a3.5 3.5 0 0 1 2.5-1" className="opacity-70" />
                    </svg>
                </div>
                <div className="flex flex-1 flex-col gap-1">
                <label className="text-sm font-semibold text-slate-600" htmlFor="text">חיפוש טקסט</label>
            <input className="field" type="search" placeholder="חפשי בכותרת או בתקציר..." id="text" name="text" value={textSearch} onChange={(e)=>setTextSearch(e.target.value)}/>
                </div>
                <div className="flex flex-col gap-1 sm:w-60">
            <label className="text-sm font-semibold text-slate-600" htmlFor="category">קטגוריה לחיפוש</label>
            <select className="field cursor-pointer" value={categorySearch} onChange={(e)=>setCategorySearch(e.target.value as ArticleCategory | "")} name="category" id="category">
                <option value="">כל הקטגוריות</option>
                {optionLabelKey.map((o)=><option key={o[0]} value={o[0]}>{o[1]}</option>)}
            </select>
                </div>
            </div>

            {filteredArticles.length === 0 && <p className="animate-fade-up rounded-2xl bg-white/70 p-8 text-center font-medium text-slate-500 ring-1 ring-slate-200 before:mb-2 before:block before:text-3xl before:content-['🔍']">לא נמצאו מאמרים מתאימים...</p>}
            <div className="grid gap-5 sm:grid-cols-2">
                {
                    filteredArticles.map((a) => <ArticleInList key={a.id} article={a}></ArticleInList>)
                }
            </div>

        </div>
    )
}