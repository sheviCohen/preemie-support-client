import { useQuery } from "@tanstack/react-query";
import { api, HttpError } from "./client";
import type {MotherListItem,StaffListItem } from "../types";


export function useStaff()
{
    return useQuery<StaffListItem[],HttpError>({
        queryKey:["staff"],
        queryFn:()=>api.get("/staff").then((r) => r.data.staff)
    });
       
}

export function useMothers()
{
    return useQuery<MotherListItem[],HttpError>({
        queryKey:["mothers"],
        queryFn:()=>api.get("/mothers").then((r)=>r.data.mothers),
    });
}
