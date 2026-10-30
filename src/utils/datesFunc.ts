

// מחזירה את יום ראשון של השבוע שבו נמצא התאריך, בחצות
export function getWeekStart(date: Date): Date {
    const start = new Date(date);
    start.setDate(start.getDate() - start.getDay());
    start.setHours(0, 0, 0, 0);
    return start;
}

// מחזירה תאריך חדש, מספר ימים אחרי התאריך שקיבלה
export function addDays(date: Date, days: number): Date {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}
