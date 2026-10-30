import UserInList from "./userInList";
import { useStaff,useMothers } from "../api/users";
import { STAFF_ROLE_LABELS } from "../types";

export default function UserList({selected,onSelect}:{selected:number|"general",onSelect:(value:"general"|number)=>void})
{
    const staff = useStaff();
    const mothers = useMothers();
    if (staff.isPending || mothers.isPending) return <p className="w-72 shrink-0 animate-pulse p-4 text-slate-500">טוען...</p>;
    if (staff.error || mothers.error) return <p className="w-72 shrink-0 p-4 text-rose-600">שגיאה בטעינת המשתמשים</p>;


    return(






    <div className="flex w-72 shrink-0 flex-col gap-1 overflow-y-auto border-l border-slate-200/70 bg-white/40 p-3">

                <button type="button" onClick={()=>onSelect("general")}
    className={`mb-2 flex w-full items-center gap-3 rounded-2xl p-3 text-right transition ${selected==="general" ? "bg-linear-to-l from-teal-50 to-sky-50 shadow-sm ring-1 ring-teal-200" : "hover:bg-white hover:shadow-sm"}`}>
    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-linear-to-br from-teal-400 to-sky-500 text-lg font-bold text-white shadow-md shadow-teal-500/30">#</div>
    <div className="flex flex-col">
        <span className="font-semibold text-slate-800">צ'אט כללי</span>
        <span className="text-sm text-slate-500">כל האמהות והצוות</span>
    </div>
    </button>
        {staff.data.map(s=>
        <UserInList key={s.id} user={s} subtitle={STAFF_ROLE_LABELS[s.staffRole]}
        isSelected={selected===s.id}
        onClick={()=>onSelect(s.id)}>
        </UserInList>
    )}

        {mothers.data.map(m=>
        <UserInList key={m.id} user={m} subtitle={"אמא"}
        isSelected={selected===m.id}
        onClick={()=>onSelect(m.id)}>
        </UserInList>
    )}
    </div>
    )
}