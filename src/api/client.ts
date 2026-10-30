import axios, { AxiosError } from "axios";
import { tokenStorage } from "./token";
import type { ApiError } from "../types/types";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // כתובת השרת שלך
});

// מצרף את הטוקן לכל בקשה
api.interceptors.request.use((config) => {
  const token = tokenStorage.get();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// גוף השגיאה שהשרת מחזיר: { error: { code, message, details } }
type ErrorBody = { error: ApiError };

// שגיאה אחידה שכוללת את הסטטוס
export class HttpError extends Error {
  status: number;
  data?: ApiError;

  constructor(status: number, data?: ApiError) {
    super(data?.message ?? "שגיאת שרת");
    this.status = status;
    this.data = data;
  }
}

api.interceptors.response.use(
  (res) => res,
  (err: AxiosError<ErrorBody>) => {
    const status = err.response?.status ?? 0; // 0 = אין חיבור לשרת
    const data = err.response?.data?.error;
    // רק טוקן לא תקף מעביר להתחברות, לא סיסמה שגויה
    if (status === 401 && data?.code !== "INVALID_CREDENTIALS") {
      tokenStorage.clear();
      window.location.href = "/enterance";
    }
    return Promise.reject(new HttpError(status, data));
  }
);

