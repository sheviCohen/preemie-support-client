import { Link, useParams } from "react-router";
import { useArticle } from "../api/articles";
import { ARTICLE_CATEGORY_LABELS, STAFF_ROLE_LABELS } from "../types"


export default function FullArticle()
{
    const {id}=useParams()
    const { data: article, isPending, error } = useArticle(Number(id));
     if (isPending) return <p className="animate-pulse p-8 text-center text-slate-500">טוען...</p>;
    if (error) return <p className="mx-auto max-w-3xl rounded-2xl bg-rose-50 p-6 text-center text-rose-600">{error.message}</p>;



    return (
         <div className="glass-card mx-auto flex max-w-3xl flex-col gap-2 p-8 sm:p-12">
                    <Link className="mb-4 inline-flex items-center gap-1.5 self-start rounded-full px-3 py-1 text-sm font-medium text-teal-700 transition before:content-['→'] hover:bg-teal-50 hover:before:translate-x-0.5" to="/articles">חזרה למאמרים</Link>

       
            
                        <span className="self-start rounded-full bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-700 ring-1 ring-teal-100">קטגוריה: {ARTICLE_CATEGORY_LABELS[article.category]}</span>
                        <h1 className="gradient-text mt-3 text-3xl leading-tight font-extrabold sm:text-4xl">כותרת: {article.title}</h1>
                        <h6 className="mt-3 border-s-4 border-teal-200 ps-4 text-lg leading-8 font-normal text-slate-600">תקציר: {article.summary}</h6>
                        <h6 className="mt-6 border-t border-slate-100 pt-5 text-sm font-medium text-slate-500">שם איש הצוות שהוסיף את המאמר: {article.author.firstName}  {article.author.lastName}</h6>
                        <span className="self-start rounded-full bg-linear-to-l from-violet-500 to-fuchsia-500 px-2.5 py-0.5 text-[11px] font-semibold text-white shadow-sm shadow-violet-500/30">תפקיד: {article.author.staffRole && STAFF_ROLE_LABELS[article.author.staffRole]}</span>
                        <span className="text-xs text-slate-400"> תאריך הוספה: {new Date(article.createdAt).toLocaleDateString("he-IL")}</span>
                        {
                                       
                            article.kind === "staff" && <Link to="/articles">חזרה למאמרים</Link> && <p className="mt-8 text-[17px] leading-8 whitespace-pre-wrap text-slate-700">{article.body}</p>
                        }
                        
        </div>
    )
} 