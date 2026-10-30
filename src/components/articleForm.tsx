import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAddArticle, useEditArticle } from "../api/articles";
import { ARTICLE_CATEGORY_LABELS, type Article, type ArticleFormValues, type CreateArticleRequest } from "../types/types";

export default function ArticleForm({ article }: { article?: Article })
{
    const addArticle = useAddArticle();
    const editArticle = useEditArticle();
    const navigate = useNavigate();
    const { register, handleSubmit, watch, formState: { errors } } = useForm<ArticleFormValues>({
        defaultValues: article
            ? {
                kind: article.kind,
                title: article.title,
                summary: article.summary,
                category: article.category,
                body: article.body ?? "",
                sourceName: article.sourceName ?? "",
                sourceUrl: article.sourceUrl ?? ""
            }
            : { kind: "staff", title: "", summary: "", category: "OTHER", body: "", sourceName: "", sourceUrl: "" }
    });
    const kind = watch("kind");

    const saveArticle = (data: ArticleFormValues) =>
    {
        const body: CreateArticleRequest = data.kind === "staff"
            ? { title: data.title, summary: data.summary, category: data.category, body: data.body }
            : { title: data.title, summary: data.summary, category: data.category, sourceName: data.sourceName, sourceUrl: data.sourceUrl };

        if (article)
            editArticle.mutate({ id: article.id, body }, { onSuccess: () => navigate("/articles") });
        else
            addArticle.mutate(body, { onSuccess: () => navigate("/articles") });
    }

    const isSaving = addArticle.isPending || editArticle.isPending;
    const serverError = addArticle.error ?? editArticle.error;

    return (
        <form className="glass-card mx-auto flex max-w-3xl animate-fade-up flex-col gap-6 p-6 sm:p-10" onSubmit={handleSubmit(saveArticle)}>
            <div className="flex flex-col gap-2">
                <Link className="inline-flex items-center gap-1.5 self-start rounded-full px-3 py-1 text-sm font-medium text-teal-700 transition before:content-['→'] hover:bg-teal-50" to="/articles">חזרה למאמרים</Link>
                <h1 className="gradient-text text-3xl font-extrabold">{article ? "עריכת מאמר" : "הוספת מאמר"}</h1>
                <p className="text-sm text-slate-500">
                    {article
                        ? (article.kind === "staff" ? "מאמר צוות" : "מאמר חיצוני") + " · אפשר לעדכן את כל השדות חוץ מסוג המאמר"
                        : "בחרו את סוג המאמר ומלאו את הפרטים"}
                </p>
            </div>

            {!article && (
                <div className="grid gap-3 sm:grid-cols-2">
                    <label className="flex cursor-pointer items-start gap-3 rounded-2xl border-2 border-slate-200 bg-white/70 p-4 transition hover:border-teal-300 has-checked:border-teal-500 has-checked:bg-teal-50/70 has-checked:shadow-md has-checked:shadow-teal-500/10">
                        <input className="mt-1 accent-teal-600" type="radio" value="staff" {...register("kind")} />
                        <span className="flex flex-col gap-0.5">
                            <span className="font-bold text-slate-800 before:me-1.5 before:content-['📝']">מאמר צוות</span>
                            <span className="text-xs text-slate-500">מאמר שאת כותבת, עם תוכן מלא</span>
                        </span>
                    </label>
                    <label className="flex cursor-pointer items-start gap-3 rounded-2xl border-2 border-slate-200 bg-white/70 p-4 transition hover:border-sky-300 has-checked:border-sky-500 has-checked:bg-sky-50/70 has-checked:shadow-md has-checked:shadow-sky-500/10">
                        <input className="mt-1 accent-sky-600" type="radio" value="external" {...register("kind")} />
                        <span className="flex flex-col gap-0.5">
                            <span className="font-bold text-slate-800 before:me-1.5 before:content-['🔗']">מאמר חיצוני</span>
                            <span className="text-xs text-slate-500">קישור למאמר מאתר אחר</span>
                        </span>
                    </label>
                </div>
            )}

            <fieldset className="grid gap-4 rounded-2xl border border-slate-200/80 bg-white/60 p-5 pt-3 sm:grid-cols-[1fr_14rem]">
                <legend className="px-2 text-lg font-extrabold text-slate-800 before:me-2 before:content-['📰']">פרטי המאמר</legend>

                <div className="flex flex-col gap-1">
                    <label className="text-sm font-semibold text-slate-600" htmlFor="title">כותרת</label>
                    <input className="field" id="title" type="text"
                        {...register("title", {
                            required: "חובה להזין כותרת",
                            maxLength: { value: 200, message: "עד 200 תווים" }
                        })}
                    />
                    {errors.title && <p className="flex items-center gap-1 text-xs font-medium text-rose-600 before:content-['⚠']">{errors.title.message}</p>}
                </div>

                <div className="flex flex-col gap-1">
                    <label className="text-sm font-semibold text-slate-600" htmlFor="category">קטגוריה</label>
                    <select className="field cursor-pointer" id="category" {...register("category")}>
                        {Object.entries(ARTICLE_CATEGORY_LABELS).map(([value, label]) =>
                            <option key={value} value={value}>{label}</option>
                        )}
                    </select>
                </div>

                <div className="flex flex-col gap-1 sm:col-span-2">
                    <label className="text-sm font-semibold text-slate-600" htmlFor="summary">תקציר</label>
                    <textarea className="field min-h-24 resize-y" id="summary" rows={3}
                        {...register("summary", {
                            required: "חובה להזין תקציר",
                            maxLength: { value: 500, message: "עד 500 תווים" }
                        })}
                    />
                    {errors.summary && <p className="flex items-center gap-1 text-xs font-medium text-rose-600 before:content-['⚠']">{errors.summary.message}</p>}
                </div>
            </fieldset>

            {kind === "staff" && (
                <fieldset className="flex animate-fade-up flex-col gap-1 rounded-2xl border border-teal-200/80 bg-teal-50/40 p-5 pt-3">
                    <legend className="px-2 text-lg font-extrabold text-slate-800 before:me-2 before:content-['📝']">תוכן המאמר</legend>
                    <label className="sr-only" htmlFor="body">תוכן המאמר</label>
                    <textarea className="field min-h-72 resize-y leading-7" id="body" rows={12}
                        {...register("body", {
                            required: "חובה להזין את תוכן המאמר",
                            maxLength: { value: 20000, message: "עד 20000 תווים" }
                        })}
                    />
                    {errors.body && <p className="flex items-center gap-1 text-xs font-medium text-rose-600 before:content-['⚠']">{errors.body.message}</p>}
                </fieldset>
            )}

            {kind === "external" && (
                <fieldset className="grid animate-fade-up gap-4 rounded-2xl border border-sky-200/80 bg-sky-50/40 p-5 pt-3 sm:grid-cols-2">
                    <legend className="px-2 text-lg font-extrabold text-slate-800 before:me-2 before:content-['🔗']">המקור</legend>
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-semibold text-slate-600" htmlFor="sourceName">שם המקור</label>
                        <input className="field" id="sourceName" type="text"
                            {...register("sourceName", {
                                required: "חובה להזין את שם המקור",
                                maxLength: { value: 120, message: "עד 120 תווים" }
                            })}
                        />
                        {errors.sourceName && <p className="flex items-center gap-1 text-xs font-medium text-rose-600 before:content-['⚠']">{errors.sourceName.message}</p>}
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-semibold text-slate-600" htmlFor="sourceUrl">קישור</label>
                        <input className="field text-left" id="sourceUrl" type="url" dir="ltr" placeholder="https://"
                            {...register("sourceUrl", {
                                required: "חובה להזין קישור",
                                pattern: { value: /^https?:\/\//, message: "הקישור חייב להתחיל ב-http או https" }
                            })}
                        />
                        {errors.sourceUrl && <p className="flex items-center gap-1 text-xs font-medium text-rose-600 before:content-['⚠']">{errors.sourceUrl.message}</p>}
                    </div>
                </fieldset>
            )}

            {serverError && <p className="rounded-xl bg-rose-50 px-4 py-3 text-center text-sm font-medium text-rose-600 ring-1 ring-rose-200">{serverError.message}</p>}

            <button className="btn-primary py-3 text-lg" type="submit" disabled={isSaving}>
                {isSaving ? "שומר..." : article ? "שמירת השינויים" : "הוספת המאמר"}
            </button>
        </form>
    );
}
