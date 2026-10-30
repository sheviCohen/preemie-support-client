import { Link } from "react-router-dom";
import type { Article } from "../types/types";
import { ARTICLE_CATEGORY_LABELS, STAFF_ROLE_LABELS } from "../types/types"
import { UserContext } from "../context/userContext";
import { useContext } from "react";
import { useDeleteArticle } from "../api/articles";
import { useNavigate } from "react-router-dom";

export default function ArticleInList({ article }: { article: Article }) {

    const me= useContext(UserContext);
    const navigate=useNavigate();
    const deleteArticle=useDeleteArticle();

    return (
        <div className="group relative flex animate-fade-up flex-col gap-2 overflow-hidden rounded-3xl border border-white/70 bg-white/80 p-6 shadow-lg shadow-slate-900/5 backdrop-blur-xl transition before:absolute before:inset-x-0 before:top-0 before:h-1 before:bg-linear-to-l before:from-teal-400 before:via-sky-400 before:to-violet-400 hover:-translate-y-1 hover:shadow-xl hover:shadow-teal-500/10">
            <span className="self-start rounded-full bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-700 ring-1 ring-teal-100">קטגוריה: {ARTICLE_CATEGORY_LABELS[article.category]}</span>
            <h1 className="mt-1 text-xl leading-snug font-bold text-slate-800 transition group-hover:text-teal-700">כותרת: {article.title}</h1>
            <h6 className="text-sm leading-6 text-slate-600">תקציר: {article.summary}</h6>
            <h6 className="mt-2 text-xs font-medium text-slate-500">שם איש הצוות שהוסיף את המאמר: {article.author.firstName}  {article.author.lastName}</h6>
            <span className="self-start rounded-full bg-linear-to-l from-violet-500 to-fuchsia-500 px-2.5 py-0.5 text-[11px] font-semibold text-white shadow-sm shadow-violet-500/30">תפקיד: {article.author.staffRole && STAFF_ROLE_LABELS[article.author.staffRole]}</span>
            <span className="text-xs text-slate-400"> תאריך הוספה: {new Date(article.createdAt).toLocaleDateString("he-IL")}</span>
            {
                article.kind == "external" &&
                <div className="mt-auto flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4">
                    <span className="text-xs text-slate-500">המקור: {article.sourceName}</span>
                    {article.sourceUrl && (
                        <a className="rounded-full bg-linear-to-l from-teal-500 to-sky-500 px-4 py-1.5 text-sm font-semibold text-white shadow-md shadow-teal-500/25 transition hover:scale-105 hover:shadow-lg" href={article.sourceUrl} target="_blank" rel="noopener noreferrer">לקריאה במקור</a>
                    )}

                </div>
            }
            {article.kind === "staff" && (
                <Link className="mt-auto self-end rounded-full bg-linear-to-l from-teal-500 to-sky-500 px-4 py-1.5 text-sm font-semibold text-white shadow-md shadow-teal-500/25 transition hover:scale-105 hover:shadow-lg" to={`/articles/${article.id}`}>לקריאת המאמר</Link>
            )}
            {
                me?.role === "STAFF" && me.id === article.author.id&&
                <div className="absolute top-4 left-4 flex gap-1.5">
                    <button  onClick={()=>navigate(`/articles/${article.id}/edit`)} className="flex items-center gap-1 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-teal-700 shadow-sm ring-1 ring-teal-200 transition before:content-['✎'] hover:-translate-y-0.5 hover:bg-teal-500 hover:text-white hover:shadow-md hover:shadow-teal-500/30 hover:ring-teal-500 active:translate-y-0">עריכה</button>
                    <button onClick={()=>confirm("האם אתה בטוח שאתה רוצה למחוק את המאמר?") &&deleteArticle.mutate(article.id)} className="flex items-center gap-1 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-rose-600 shadow-sm ring-1 ring-rose-200 transition before:content-['🗑'] hover:-translate-y-0.5 hover:bg-rose-500 hover:text-white hover:shadow-md hover:shadow-rose-500/30 hover:ring-rose-500 active:translate-y-0">מחיקה</button>
                </div>

            }

        </div>)
}



//  export interface Article
//  {
//     id:number;
//     kind: ArticleKind;
//     title:string;
//     summary:string;
//     category: ArticleCategory;
//     sourceName:string|null;
//     sourceUrl:string|null;
//     body?:string|null;
//     author:UserSummary;
//     createdAt:string;
//     updatedAt:string;
//     canEdit: boolean;
// }