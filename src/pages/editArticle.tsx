import { useParams } from "react-router-dom";
import ArticleForm from "../components/articleForm";
import { useArticle } from "../api/articles";

export default function EditProfile()
{

    const {id}=useParams();
    const { data: article, isPending, error } = useArticle(Number(id));
    if (isPending) return <p className="animate-pulse p-8 text-center text-slate-500">טוען...</p>;
    if (error) return <p className="mx-auto max-w-3xl rounded-2xl bg-rose-50 p-6 text-center text-rose-600">{error.message}</p>;
    return <div className="page-center"><ArticleForm article={article} /></div>;

}