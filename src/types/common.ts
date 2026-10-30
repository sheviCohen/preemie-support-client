// טיפוסים כלליים, שלא שייכים לנושא אחד

// שגיאה כפי שהשרת מחזיר אותה
export interface ApiError
{
    code: string;
    message: string;
    details: any;
}

// אפשרות ברשימה נפתחת
export interface Option
{
    value: string;
    label: string;
}
