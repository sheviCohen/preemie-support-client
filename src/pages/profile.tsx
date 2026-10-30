
import ProfileBaby  from "../components/profileBaby"
import { useContext } from "react";
import { UserContext } from "../context/userContext";
import { useState } from "react";
import EditProfile from "../components/editProfile";
import { STAFF_ROLE_LABELS } from "../types";

export default function ProfileMother()
{
    const me=useContext(UserContext)
    const [edit,setEdit]=useState(false);

    if(!me) return null;
    return<div className="page-center">
   { !edit&&<div className="glass-card mx-auto flex max-w-xl animate-fade-up flex-col gap-2 p-8">
        <h1 className="gradient-text text-2xl font-extrabold">שם פרטי: {me.firstName}</h1>
        <h1 className="gradient-text text-2xl font-extrabold">שם משפחה: {me.lastName}</h1>
        {
            me.staffRole&& <p className="mt-1 self-start rounded-full bg-linear-to-l from-violet-500 to-fuchsia-500 px-4 py-1 text-sm font-semibold text-white shadow-md shadow-violet-500/30 before:me-1.5 before:content-['🩺']">{STAFF_ROLE_LABELS[me.staffRole]}</p>
        }
        <h3 className="mt-2 rounded-xl bg-slate-50/80 px-4 py-2 text-slate-600">פלאפון: {me.phone}</h3>
        <h3 className="rounded-xl bg-slate-50/80 px-4 py-2 text-slate-600">כתובת מייל: {me.email}</h3>
        {me.city&&<h3 className="rounded-xl bg-slate-50/80 px-4 py-2 text-slate-600">עיר מגורים: {me.city}</h3>}
        {me.baby&& <ProfileBaby {...me.baby}/>}
        <button onClick={()=>setEdit(true)} className="btn-primary mt-4 self-center px-10">לעריכה</button>
    </div>}

    {
        edit&&<EditProfile user={me} setEdit={()=>setEdit(false)} ></EditProfile>
    }
    </div>
}

