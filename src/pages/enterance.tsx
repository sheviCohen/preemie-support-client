import { useState } from "react";
import LoginForm from "../components/loginForm";
import RegisterForm from "../components/registerForm";
import Logo from "../components/logo";

export default function Enterance() {
    const [login, setlogin] = useState(true);




    return (
        <div className="flex min-h-dvh items-center px-4 py-[4vh]">
        <div className="glass-card relative mx-auto w-full max-w-md animate-fade-up overflow-hidden p-8 transition-shadow duration-500 before:absolute before:inset-x-0 before:top-0 before:h-1.5 before:animate-shimmer before:bg-linear-to-l before:from-teal-400 before:via-violet-400 before:to-teal-400 before:bg-size-[200%_100%] hover:shadow-2xl hover:shadow-teal-500/15">
            <div className="mb-8 flex animate-pop justify-center [animation-delay:150ms]"><Logo /></div>
            <div className={`relative mb-8 flex rounded-full bg-linear-to-l from-teal-50 via-sky-50 to-violet-50 p-1 ring-1 ring-slate-200/70 before:absolute before:inset-y-1 before:right-1 before:w-[calc(50%-0.25rem)] before:rounded-full before:bg-linear-to-l before:from-teal-500 before:to-sky-500 before:shadow-lg before:shadow-teal-500/30 before:transition-transform before:duration-300 before:ease-[cubic-bezier(0.65,0,0.35,1)] ${login ? "before:-translate-x-full" : "before:translate-x-0"}`}>
                <button className={login?"relative z-10 flex-1 rounded-full py-2.5 font-medium text-slate-500 transition duration-300 active:scale-95 hover:text-teal-700":"relative z-10 flex-1 rounded-full py-2.5 font-bold text-white transition duration-300 active:scale-95"} type="button" onClick={()=>setlogin(false)}>הרשמה</button>
                <button  className={login?"relative z-10 flex-1 rounded-full py-2.5 font-bold text-white transition duration-300 active:scale-95":"relative z-10 flex-1 rounded-full py-2.5 font-medium text-slate-500 transition duration-300 active:scale-95 hover:text-teal-700"}type="button" onClick={()=>setlogin(true)}>התחברות</button>

            </div>

            {login && <LoginForm></LoginForm>}
            {!login && <RegisterForm></RegisterForm>}
        </div>
        </div>
    )
}