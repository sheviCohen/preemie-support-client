// הרשמה, התחברות ועריכת פרופיל: מה שנשלח לשרת

export interface LoginRequest
{
    email: string;
    password: string;
}

export interface RegisterRequest
{
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    city?: string;
    password: string;
    baby: BabyInput;
}

// פרטי התינוק שהאמא ממלאת בהרשמה ובעריכה
export interface BabyInput
{
    name: string;
    birthDate: string;
    gestationalWeek: number; // שבוע לידה
    birthWeightGrams: number; // משקל לידה בגרמים, עד 6000
    notes?: string;
}

// בעריכה כל השדות רשות: מה שלא נשלח לא משתנה
export interface UpdateProfileRequest
{
    firstName?: string;
    lastName?: string;
    phone?: string;
    email?: string;
    city?: string;
    baby?: Partial<BabyInput>;
}
