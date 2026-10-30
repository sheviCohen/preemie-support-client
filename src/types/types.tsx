export interface RegisterRequest{
     firstName: string;
     lastName:string;
     phone:string;
     email:string;
     city?:string;
     password:string;
     baby:BabyInput;
}
 export interface CreateScheduleRequest
 {
    category:ScheduleCategory;
    type:	ScheduleType;
    title: string;
    startAt:string;
    ownerId:number;
    notes?:string;
    withWhom:string;
    recurrence: Recurrence;

}
export interface BabyInput
{
    name:string;
    birthDate:string;
    gestationalWeek:number //שבוע לידה
    birthWeightGrams:number //משקל לידה בגרמים עד 6000
    notes?:string;
}
export interface LoginRequest
{
    email:string;
    password: string;
}
 export interface UpdateScheduleRequest{
title?:string;
notes?:string;
withWhom?: string;
startAt?:string;
scope?: 'single' | 'series'
 }
 export interface OpenDirectRequest{
    userId:number;
 }
 export interface SendMessageRequest
 {
    content:string;
 }
 export interface ArticleFormValues {
    kind: ArticleKind;
    title: string;
    summary: string;
    category: ArticleCategory;
    body: string;
    sourceName: string;
    sourceUrl: string;
}

  export interface CreateArticleRequest
 {
    title:string;
    summary:string;
    category:ArticleCategory;
    sourceName?:string;
    sourceUrl?:string;
    body?:string;
 }
export interface UpdateProfileRequest
{
    firstName?:string; 
    lastName?:string;
     phone?:string; 
     email?:string;
    city?:string;
    baby?: Partial<BabyInput>;
}
 export interface Recurrence
 {
    every:number;
    unit:RecurrenceUnit;
    count: number;  // ??one of two
    until:string;  // ??one of two
 }

  export interface UpdateArticleRequest
 {
    title?:string;
    summary?:string;
    category?:ArticleCategory;
    sourceName?:string;
    sourceUrl?:string;
    body?:string;
 }

export interface Self
{
    id:number;
    email:string;
    role:Role;
    firstName:string;
    lastName:string;
    phone:string;
    city:string|null;
    avatar:string|null;
    staffRole:StaffRole|null;
    createdAt:string;
    baby:Baby|null;
}
export interface UserSummary
{
    id:number;
    firstName:string;
    lastName:string;
    role:Role;
    staffRole:StaffRole|null;
    avatar:string|null;

}
export interface Baby
{
    id:number;
    name:string;
    birthDate:string;
    gestationalWeek:number;
    birthWeightGrams:number;
    notes:string|null;
}
 export interface Article
 {
    id:number;
    kind: ArticleKind;
    title:string;
    summary:string;
    category: ArticleCategory;
    sourceName:string|null;
    sourceUrl:string|null;
    body?:string|null;
    author:UserSummary;
    createdAt:string;
    updatedAt:string;
    canEdit: boolean;
}

export interface MotherListItem
{
    id:number;
    firstName:string;
    lastName:string;
    city:string|null;
    avatar:string|null;
}
export interface StaffListItem
{
    id:number;
    firstName:string;
    lastName:string;
    staffRole:StaffRole;
    avatar:string|null;
}
export interface ScheduleItem
{
    id:number;
    category:ScheduleCategory;
    type:ScheduleType;
    title:string;
     notes:string|null;
     withWhom:string|null;
     startAt:string;
     seriesId:string|null;
     owner:UserSummary;
     staff:UserSummary|null;
     createdByRole:Role;
     canEdit:boolean;
}
export interface Message
{
    id:number;
    conversationId:number;
    content:string;
    createdAt:string;
    sender:UserSummary;
}
export interface Conversation
{
    id:number;
    type:ConversationType;
    title:string|null;
    withUser:	UserSummary|null;
    lastMessage:Message|null;
    unreadCount:number;
    hasUnread:boolean;
}
export interface Notification
{
    id :number;
    notification:NotificationType;
    title:string;
    body:string;
    count:number;
    link:string|null;
    conversationId:number|null;
    scheduleItemId:number|null;
    isRead:boolean;
    createdAt:string;
}




 export interface HealthFund
 {
    id:number;
    name:string;
    url:string;
 }

 export interface ApiError
 {
    code :string;
    message:string;
    details:any;
 }



 //like enums:
export interface Option{
  value: string;
  label: string;
};
export type Role= "MOTHER"|"STAFF";
export type StaffRole="NURSE"|"SOCIAL_WORKER"|"DEVELOPMENTAL_THERAPIST";
export type ScheduleCategory="APPOINTMENT"|"CARE_TASK";
export type ScheduleType="MEDICAL_CHECKUP"|"WELL_BABY_CLINIC"|"SPEECH_THERAPY"|"PHYSIOTHERAPY"|"SCHEDULED_CHAT"|"STAFF_MEETING"|"OTHER_APPOINTMENT"|"MEDICATION"|"VITAMINS"|"INHALATION"|"FEEDING"|"PHYSIO_EXERCISES"|"OTHER_CARE_TASK";
export type RecurrenceUnit="MONTH"|"DAY"|"WEEK";
export type ConversationType="DIRECT"|"GENERAL";
export type NotificationType="NEW_CHAT"|"NEW_MESSAGE"|"APPOINTMENT_REMINDER"|"CARE_TASK_REMINDER"|"APPOINTMENT_CREATED_BY_STAFF";
export type ArticleKind="external"|"staff";
export type ArticleCategory="FEEDING"|"DEVELOPMENT"|"SLEEP"|"EMOTIONAL_SUPPORT"|"TREATMENTS"|"RIGHTS"|"OTHER";


// מתרגמים:

export const STAFF_ROLE_LABELS: Record<StaffRole, string> = {
    NURSE: "אחות",
    SOCIAL_WORKER: "עובדת סוציאלית",
    DEVELOPMENTAL_THERAPIST: "מטפלת התפתחותית",
};

export const ARTICLE_CATEGORY_LABELS: Record<ArticleCategory, string> = {
    FEEDING: "האכלה",
    DEVELOPMENT: "התפתחות",
    SLEEP: "שינה",
    EMOTIONAL_SUPPORT: "רגשות ותמיכה לאמא",
    TREATMENTS: "טיפולים ומעקב",
    RIGHTS: "זכויות והטבות",
    OTHER: "אחר",
};
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




