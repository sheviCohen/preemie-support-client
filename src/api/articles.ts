import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api, HttpError } from "./client";
import type { Article, CreateArticleRequest, UpdateArticleRequest } from "../types/types";


export const useArticles=()=>
{
    return useQuery<Article[],HttpError>
    ({
        queryKey:["articles"],
        queryFn: ()=>api.get("/articles").then((r)=>r.data.articles),
    })
}

export const useArticle=(id:number)=>
{
    return useQuery<Article,HttpError>
    ({
        queryKey:["article",id],
        queryFn:()=>api.get(`/articles/${id}`).then((r)=>r.data.article)
    })
}

export function useEditArticle() {
  const qc = useQueryClient();
  return useMutation<{article:Article}, HttpError,{ id:number,body:UpdateArticleRequest}>({
    mutationFn: ({id,body}) => api.put(`/articles/${id}`, body).then((r)=>r.data),
    onSuccess: (data,variables) => {
      qc.setQueryData(["article",variables.id], data.article);
      qc.invalidateQueries({queryKey:["articles"]});
    },
  });
}

export function useAddArticle()
{
    const qc=useQueryClient();
    return useMutation<{article:Article},HttpError,CreateArticleRequest>({
        mutationFn:(body)=>api.post("/articles",body).then((r)=>r.data),
        onSuccess:()=>{
            qc.invalidateQueries({queryKey:["articles"]})
        }
    })
}

export function useDeleteArticle()
{
    const qc=useQueryClient();
    return useMutation<void,HttpError,number>({
        mutationFn:(id)=>api.delete(`/articles/${id}`).then(()=>undefined),
        onSuccess:(_data,id)=>{
            qc.setQueryData<Article[]>(["articles"],(old)=>old?.filter((x)=>x.id!==id))
        }
    })
}