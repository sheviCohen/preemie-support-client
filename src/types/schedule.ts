import type { Role, UserSummary } from "./user";

// לוח זמנים: תורים ומשימות טיפול, וקופות החולים שבצד המסך

export type ScheduleCategory = "APPOINTMENT" | "CARE_TASK";
export type ScheduleType = "MEDICAL_CHECKUP" | "WELL_BABY_CLINIC" | "SPEECH_THERAPY" | "PHYSIOTHERAPY" | "SCHEDULED_CHAT" | "STAFF_MEETING" | "OTHER_APPOINTMENT" | "MEDICATION" | "VITAMINS" | "INHALATION" | "FEEDING" | "PHYSIO_EXERCISES" | "OTHER_CARE_TASK";
export type RecurrenceUnit = "MONTH" | "DAY" | "WEEK";

// פריט בלו"ז כפי שהשרת מחזיר אותו
export interface ScheduleItem
{
    id: number;
    category: ScheduleCategory;
    type: ScheduleType;
    title: string;
    notes: string | null;
    withWhom: string | null;
    startAt: string;
    seriesId: string | null; // יש רק לפריט שהוא חלק מסדרה חוזרת
    owner: UserSummary;
    staff: UserSummary | null;
    createdByRole: Role;
    canEdit: boolean;
}

export interface CreateScheduleRequest
{
    category: ScheduleCategory;
    type: ScheduleType;
    title: string;
    startAt: string;
    ownerId: number;
    notes?: string;
    withWhom: string;
    recurrence: Recurrence;
}

export interface UpdateScheduleRequest
{
    title?: string;
    notes?: string;
    withWhom?: string;
    startAt?: string;
    scope?: "single" | "series";
}

// פריט חוזר: שולחים count או until, אחד מהם בלבד
export interface Recurrence
{
    every: number;
    unit: RecurrenceUnit;
    count: number;
    until: string;
}

export interface HealthFund
{
    id: number;
    name: string;
    url: string;
}

// תרגום לעברית
export const SCHEDULE_CATEGORY_LABELS: Record<ScheduleCategory, string> = {
    APPOINTMENT: "תור",
    CARE_TASK: "משימת טיפול",
};

export const SCHEDULE_TYPE_LABELS: Record<ScheduleType, string> = {
    MEDICAL_CHECKUP: "ביקורת רפואית",
    WELL_BABY_CLINIC: "טיפת חלב",
    SPEECH_THERAPY: "קלינאית תקשורת",
    PHYSIOTHERAPY: "פיזיותרפיה",
    SCHEDULED_CHAT: "צ'אט מתוזמן עם צוות",
    STAFF_MEETING: "פגישה עם צוות",
    OTHER_APPOINTMENT: "תור אחר",
    MEDICATION: "תרופה",
    VITAMINS: "ויטמינים",
    INHALATION: "אינהלציה",
    FEEDING: "האכלה",
    PHYSIO_EXERCISES: "תרגילי פיזיותרפיה",
    OTHER_CARE_TASK: "משימת טיפול אחרת",
};
