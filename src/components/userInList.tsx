
import type { UserSummary } from "../types";

interface UserInListProps
{
    user:Pick<UserSummary,"id"|"firstName"|"lastName"|"avatar">;
    subtitle?:string|null;
    isSelected:boolean;
    onClick?: ()=>void;
}

export default function UserInList({user,subtitle,isSelected,onClick}:UserInListProps) {
    return (
        <div>
            <button type="button" onClick={onClick}
    className={`group flex w-full items-center gap-3 rounded-2xl p-2.5 text-right transition ${isSelected ? "bg-linear-to-l from-teal-50 to-sky-50 shadow-sm ring-1 ring-teal-200" : "hover:bg-white hover:shadow-sm"}`}>
    {user.avatar
        ? <img src={user.avatar} alt="" className="h-10 w-10 rounded-full object-cover ring-2 ring-white" />
        : <div className="flex h-10 w-10 items-center justify-center rounded-full bg-linear-to-br from-rose-200 to-violet-200 font-bold text-violet-700 ring-2 ring-white transition group-hover:scale-105">
            {user.firstName[0]}
          </div>}
    <div className="flex flex-col">
        <span className="font-semibold text-slate-800">{user.firstName} {user.lastName}</span>
        {subtitle && <span className="text-xs text-slate-500">{subtitle}</span>}
    </div>
</button>


        </div>
    );
}
