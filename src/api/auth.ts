import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api, HttpError } from "./client";
import { tokenStorage } from "./token";
import type { LoginRequest, Self,RegisterRequest, UpdateProfileRequest } from "../types/types";

// התחברות: שולח אימייל וסיסמה, ושומר את הטוקן שחוזר
export function useLogin() {
  const qc = useQueryClient();
  return useMutation<{ token: string; user: Self }, HttpError, LoginRequest>({
    mutationFn: (body) => api.post("/auth/login", body).then((r) => r.data),
    onSuccess: (data) => {
      tokenStorage.set(data.token);
      qc.setQueryData(["me"], data.user);
    },
  });
}

export function useRegister() {
  const qc = useQueryClient();
  return useMutation<{ token: string; user: Self }, HttpError, RegisterRequest>({
    mutationFn: (body) => api.post("/auth/register", body).then((r) => r.data),
    onSuccess: (data) => {
      tokenStorage.set(data.token);
      qc.setQueryData(["me"], data.user);
    },
  });
}


export function useEditProfile() {
  const qc = useQueryClient();
  return useMutation<{ user: Self }, HttpError, UpdateProfileRequest>({
    mutationFn: (body) => api.put("/profile", body).then((r) => r.data),
    onSuccess: (data) => {
      qc.setQueryData(["me"], data.user);
    },
  });
}

// המשתמש המחובר. השרת מחזיר { user: {...} }
export function useMe() {
  return useQuery<Self, HttpError>({
    queryKey: ["me"],
    queryFn: () => api.get("/auth/me").then((r) => r.data.user),
    enabled: !!tokenStorage.get(), // בלי טוקן לא שולחים את הבקשה
    staleTime: Infinity,
  });
}

// התנתקות: מוחק את הטוקן ואת כל הנתונים שנשמרו
export function useLogout() {
  const qc = useQueryClient();
  return () => {
    tokenStorage.clear();
    qc.clear();
  };
}
