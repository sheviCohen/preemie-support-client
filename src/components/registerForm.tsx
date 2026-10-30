import { useForm } from "react-hook-form";
import { useRegister } from "../api/auth";
import type { RegisterRequest } from "../types/types";
import { useNavigate } from "react-router";
export default function RegisterForm() {
    const registerUser = useRegister();
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm<RegisterRequest>();

    const onSubmit = (data: RegisterRequest) => {
        registerUser.mutate(data, { onSuccess: () => navigate("/", { replace: true }) });

    }

    return (
        <form className="flex animate-fade-up flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
            <fieldset className="flex flex-col gap-4 rounded-2xl border border-slate-200/80 bg-white/50 p-5">
                <legend className="gradient-text px-2 text-lg font-extrabold">פרטים אישיים</legend>
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
                        <p className="text-sm text-rose-600">{errors.firstName.message}</p>
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
                        <p className="text-sm text-rose-600">{errors.lastName.message}</p>
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
                                return /^[0-9+\-\s()]{7,20}$/.test(value) || "מספר פלאפון לא חוקי";
                            }
                        })}
                    />

                    {errors.phone && (
                        <p className="text-sm text-rose-600">{errors.phone.message}</p>
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
                        <p className="text-sm text-rose-600">{errors.email.message}</p>
                    )}
                </div>



                <div className="flex flex-col gap-1">
                    <label className="text-sm font-semibold text-slate-600" htmlFor="password">סיסמה</label>

                    <input className="field" id="password"
                        type="password"
                        {...register("password", {
                            required: "חובה להזין סיסמה",

                            minLength: {
                                value: 8,
                                message: "לפחות 8 תווים"
                            },

                            maxLength: {
                                value: 72,
                                message: "עד 72 תווים"
                            }
                        })}
                    />

                    {errors.password && (
                        <p className="text-sm text-rose-600">{errors.password.message}</p>
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
                        <p className="text-sm text-rose-600">{errors.city.message}</p>
                    )}
                </div>

            </fieldset>

            <fieldset className="flex flex-col gap-4 rounded-2xl border border-slate-200/80 bg-white/50 p-5">
                <legend className="gradient-text px-2 text-lg font-extrabold">פרטי התינוק</legend>

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
                        <p className="text-sm text-rose-600">{errors.baby.name.message}</p>
                    )}
                </div>


                <div className="flex flex-col gap-1">
                    <label className="text-sm font-semibold text-slate-600" htmlFor="birthDate">תאריך לידה</label>

                    <input className="field" id="birthDate"
                        type="date"
                        {...register("baby.birthDate", {
                            required: "חובה לבחור תאריך לידה ",

                            validate: (value) => {
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
                        <p className="text-sm text-rose-600">{errors.baby.birthDate.message}</p>
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
                        <p className="text-sm text-rose-600">{errors.baby.gestationalWeek.message}</p>
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
                        <p className="text-sm text-rose-600">{errors.baby.birthWeightGrams.message}</p>
                    )}
                </div>



                <div className="flex flex-col gap-1">
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
                        <p className="text-sm text-rose-600">{errors.baby.notes.message}</p>
                    )}
                </div>







            </fieldset>

            {registerUser.isPending && (
                <p className="animate-pulse text-center text-slate-500">שולח נתונים לשרת...</p>
            )}

            {registerUser.isError && (
                <p className="rounded-xl bg-rose-50 px-3 py-2 text-center text-rose-600">
                    {registerUser.error.message}
                </p>
            )}

            <button className="btn-primary" disabled={registerUser.isPending}>להרשמה</button>
        </form>
    )
}

