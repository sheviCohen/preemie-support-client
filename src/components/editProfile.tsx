import { useEditProfile } from "../api/auth"
import { useForm } from "react-hook-form";
import type { Self, UpdateProfileRequest } from "../types/types"

export default function EditProfile({ user, setEdit }: { user: Self, setEdit: () => void }) {
    const editProfile = useEditProfile();
    const saveChanges = (data: UpdateProfileRequest) => {
        editProfile.mutate(data, { onSuccess: () => setEdit() });
    }
    const { register, handleSubmit, formState: { errors } } = useForm<UpdateProfileRequest>({
        defaultValues: {
            ...user, city: user.city ?? "", baby:user.baby? {
                ...user.baby,
                birthDate: user.baby.birthDate.slice(0, 10),
                notes: user.baby.notes ?? ""
            }: undefined
        }
    });


    return (<form className="glass-card mx-auto flex max-w-2xl animate-fade-up flex-col gap-6 p-6 sm:p-8" onSubmit={handleSubmit(saveChanges)}>
        <fieldset className="grid gap-4 rounded-2xl border border-slate-200/80 bg-white/60 p-5 pt-3 sm:grid-cols-2">
            <legend className="flex items-center gap-2 px-2 text-lg font-extrabold text-slate-800 before:content-['👤']">פרטים אישיים</legend>
            <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-slate-600" htmlFor="firstName">שם פרטי</label>

                <input className="field" id="firstName"
                    type="text"
                    {...register("firstName", {
                        required: "חובה להזין שם פרטי",

                        minLength: {
                            value: 2,
                            message: "לפחות 2 תווים"
                        },

                        maxLength: {
                            value: 50,
                            message: "עד 50 תווים"
                        }
                    })}
                />

                {errors.firstName && (
                    <p className="flex items-center gap-1 text-xs font-medium text-rose-600 before:content-['⚠']">{errors.firstName.message}</p>
                )}
            </div>



            <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-slate-600" htmlFor="lastName">שם משפחה</label>

                <input className="field" id="lastName"
                    type="text"
                    {...register("lastName", {
                        required: "חובה להזין שם משפחה",

                        minLength: {
                            value: 2,
                            message: "לפחות 2 תווים"
                        },

                        maxLength: {
                            value: 50,
                            message: "עד 50 תווים"
                        }
                    })}
                />

                {errors.lastName && (
                    <p className="flex items-center gap-1 text-xs font-medium text-rose-600 before:content-['⚠']">{errors.lastName.message}</p>
                )}
            </div>




            <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-slate-600" htmlFor="phone">פלאפון</label>

                <input className="field" id="phone"
                    type="tel"
                    {...register("phone", {
                        required: "חובה להזין מספר פלאפון",

                        minLength: {
                            value: 7,
                            message: "מספר פלאפון תקין באורך 7 תווים לפחות"
                        },

                        maxLength: {
                            value: 20,
                            message: "עד 20 תווים"
                        },
                        validate: (value) => {
                            if (!value) return true;
                            return /^[0-9+\-\s()]{7,20}$/.test(value) || "מספר פלאפון לא חוקי";
                        }
                    })}
                />

                {errors.phone && (
                    <p className="flex items-center gap-1 text-xs font-medium text-rose-600 before:content-['⚠']">{errors.phone.message}</p>
                )}
            </div>



            <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-slate-600" htmlFor="email">אימייל</label>

                <input className="field" id="email"
                    type="email"
                    {...register("email", {
                        required: "חובה להזין אימייל",

                        maxLength: {
                            value: 254,
                            message: "כתובת האימייל ארוכה מדי"
                        }
                    })}
                />

                {errors.email && (
                    <p className="flex items-center gap-1 text-xs font-medium text-rose-600 before:content-['⚠']">{errors.email.message}</p>
                )}
            </div>





            <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-slate-600" htmlFor="city">עיר (לא חובה)</label>

                <input className="field" id="city"
                    type="text"
                    {...register("city", {
                        maxLength: {
                            value: 60,
                            message: "עד 60 תווים"
                        }
                    })}
                />

                {errors.city && (
                    <p className="flex items-center gap-1 text-xs font-medium text-rose-600 before:content-['⚠']">{errors.city.message}</p>
                )}
            </div>

        </fieldset>
        { user.role === "MOTHER" &&

        <fieldset className="grid gap-4 rounded-2xl border border-slate-200/80 bg-white/60 p-5 pt-3 sm:grid-cols-2">
            <legend className="flex items-center gap-2 px-2 text-lg font-extrabold text-slate-800 before:content-['👶']">פרטי התינוק</legend>

            <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-slate-600" htmlFor="babyName">שם התינוק</label>

                <input className="field" id="babyName"
                    type="text"
                    {...register("baby.name", {
                        required: "חובה להזין את שם התינוק",

                        maxLength: {
                            value: 60,
                            message: "עד 60 תווים"
                        }
                    })}
                />

                {errors.baby?.name && (
                    <p className="flex items-center gap-1 text-xs font-medium text-rose-600 before:content-['⚠']">{errors.baby.name.message}</p>
                )}
            </div>


            <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-slate-600" htmlFor="birthDate">תאריך לידה</label>

                <input className="field" id="birthDate"
                    type="date"
                    {...register("baby.birthDate", {
                        required: "חובה לבחור תאריך לידה ",

                        validate: (value) => {
                            if (!value) return true;
                            const today = new Date();

                            const year = today.getFullYear();
                            const month = String(today.getMonth() + 1).padStart(2, "0");
                            const day = String(today.getDate()).padStart(2, "0");

                            const todayString = `${year}-${month}-${day}`;

                            return value <= todayString ||
                                "תאריך הלידה לא יכול להיות בעתיד";
                        }
                    })}
                />

                {errors.baby?.birthDate && (
                    <p className="flex items-center gap-1 text-xs font-medium text-rose-600 before:content-['⚠']">{errors.baby.birthDate.message}</p>
                )}
            </div>




            <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-slate-600" htmlFor="gestationalWeek">שבוע לידה</label>

                <input className="field" id="gestationalWeek"
                    type="number"
                    {...register("baby.gestationalWeek", {
                        required: "חובה להזין את שבוע הלידה",

                        valueAsNumber: true,

                        min: {
                            value: 22,
                            message: "השבוע חייב להיות גדול מ- 22"
                        },

                        max: {
                            value: 37,
                            message: "השבוע חייב להיות קטן מ- 37"
                        }
                    })}
                />

                {errors.baby?.gestationalWeek && (
                    <p className="flex items-center gap-1 text-xs font-medium text-rose-600 before:content-['⚠']">{errors.baby.gestationalWeek.message}</p>
                )}
            </div>


            <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-slate-600" htmlFor="birthWeightGrams">משקל לידה בגרמים</label>

                <input className="field" id="birthWeightGrams"
                    type="number"
                    {...register("baby.birthWeightGrams", {
                        required: "חובה להזין את משקל הלידה בגרמים",

                        valueAsNumber: true,

                        min: {
                            value: 200,
                            message: "משקל הלידה בגרמים לא יכול להיות קטן מ- 200"
                        },

                        max: {
                            value: 6000,
                            message: "משקל הלידה בגרמים לא יכול לעלות על 6000 גרם."
                        }
                    })}
                />

                {errors.baby?.birthWeightGrams && (
                    <p className="flex items-center gap-1 text-xs font-medium text-rose-600 before:content-['⚠']">{errors.baby.birthWeightGrams.message}</p>
                )}
            </div>



            <div className="flex flex-col gap-1 sm:col-span-2">
                <label className="text-sm font-semibold text-slate-600" htmlFor="babyNotes">הערות (לא חובה)</label>

                <textarea className="field" id="babyNotes"
                    rows={4}
                    placeholder="למשל: היה בפגייה שבועיים, מקבל ויטמין D"
                    {...register("baby.notes", {
                        maxLength: {
                            value: 1000,
                            message: "עד 1000 תווים"
                        }
                    })}
                />

                {errors.baby?.notes && (
                    <p className="flex items-center gap-1 text-xs font-medium text-rose-600 before:content-['⚠']">{errors.baby.notes.message}</p>
                )}
            </div>







        </fieldset>
}
        {editProfile.isPending && (
            <p className="animate-pulse text-center text-slate-500">שולח נתונים לשרת...</p>
        )}

        {editProfile.isError && (
            <p className="rounded-xl bg-rose-50 px-3 py-2 text-center text-rose-600">
                {editProfile.error.message}
            </p>
        )}

        <button className="btn-primary self-center px-10 py-3 text-lg" disabled={editProfile.isPending}>לשמירת הנתונים</button>
    </form>)
}