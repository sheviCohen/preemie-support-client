// משתמשים: התפקידים, המשתמש המחובר, התינוק, ורשימות האנשים

export type Role = "MOTHER" | "STAFF";
export type StaffRole = "NURSE" | "SOCIAL_WORKER" | "DEVELOPMENTAL_THERAPIST";

// המשתמש המחובר, כפי שהשרת מחזיר אותו
export interface Self
{
    id: number;
    email: string;
    role: Role;
    firstName: string;
    lastName: string;
    phone: string;
    city: string | null;
    avatar: string | null;
    staffRole: StaffRole | null;
    createdAt: string;
    baby: Baby | null; // לאיש צוות אין תינוק
}

// פרטים מקוצרים של משתמש: כותב מאמר, שולח הודעה וכו'
export interface UserSummary
{
    id: number;
    firstName: string;
    lastName: string;
    role: Role;
    staffRole: StaffRole | null;
    avatar: string | null;
}

export interface Baby
{
    id: number;
    name: string;
    birthDate: string;
    gestationalWeek: number;
    birthWeightGrams: number;
    notes: string | null;
}

// רשימות האנשים בצ'אט
export interface MotherListItem
{
    id: number;
    firstName: string;
    lastName: string;
    city: string | null;
    avatar: string | null;
}

export interface StaffListItem
{
    id: number;
    firstName: string;
    lastName: string;
    staffRole: StaffRole;
    avatar: string | null;
}

// תרגום לעברית
export const STAFF_ROLE_LABELS: Record<StaffRole, string> = {
    NURSE: "אחות",
    SOCIAL_WORKER: "עובדת סוציאלית",
    DEVELOPMENTAL_THERAPIST: "מטפלת התפתחותית",
};
