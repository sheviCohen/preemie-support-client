import type { UserSummary } from "./user";

// מאמרים

export type ArticleKind = "external" | "staff";
export type ArticleCategory = "FEEDING" | "DEVELOPMENT" | "SLEEP" | "EMOTIONAL_SUPPORT" | "TREATMENTS" | "RIGHTS" | "OTHER";

// מאמר כפי שהשרת מחזיר אותו
export interface Article
{
    id: number;
    kind: ArticleKind;
    title: string;
    summary: string;
    category: ArticleCategory;
    sourceName: string | null; // רק במאמר חיצוני
    sourceUrl: string | null; // רק במאמר חיצוני
    body?: string | null; // רק במאמר צוות, ורק בבקשה למאמר בודד
    author: UserSummary;
    createdAt: string;
    updatedAt: string;
    canEdit: boolean;
}

// הוספה: שולחים תוכן (מאמר צוות) או מקור וקישור (מאמר חיצוני), לא את שניהם
export interface CreateArticleRequest
{
    title: string;
    summary: string;
    category: ArticleCategory;
    sourceName?: string;
    sourceUrl?: string;
    body?: string;
}

// עריכה: כל השדות רשות
export interface UpdateArticleRequest
{
    title?: string;
    summary?: string;
    category?: ArticleCategory;
    sourceName?: string;
    sourceUrl?: string;
    body?: string;
}

// הערכים שבטופס המאמר: כל השדות קיימים תמיד, וגם סוג המאמר
export interface ArticleFormValues
{
    kind: ArticleKind;
    title: string;
    summary: string;
    category: ArticleCategory;
    body: string;
    sourceName: string;
    sourceUrl: string;
}

// תרגום לעברית
export const ARTICLE_CATEGORY_LABELS: Record<ArticleCategory, string> = {
    FEEDING: "האכלה",
    DEVELOPMENT: "התפתחות",
    SLEEP: "שינה",
    EMOTIONAL_SUPPORT: "רגשות ותמיכה לאמא",
    TREATMENTS: "טיפולים ומעקב",
    RIGHTS: "זכויות והטבות",
    OTHER: "אחר",
};
