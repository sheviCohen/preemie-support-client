import { useQuery } from "@tanstack/react-query";
import type { HealthFund, ScheduleItem } from "../types";
import { api, type HttpError } from "./client";


export function useHealthFunds() {
  return useQuery<HealthFund[], HttpError>({
    queryKey: ["healthFunds"],
    queryFn: () => api.get("/health-funds").then((r) => r.data.healthFunds),
  });
}

export function useSchedule(from: string, to: string) {
  return useQuery<ScheduleItem[], HttpError>({
    queryKey: ["schedule", from, to],
    queryFn: () => api.get("/schedule", { params: { from, to } }).then((r) => r.data.items),
  });
}
