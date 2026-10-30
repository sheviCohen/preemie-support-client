import { UserContext } from "../context/userContext";
import type { Message} from "../types";
import { STAFF_ROLE_LABELS } from "../types";
import { useContext } from "react";


export default function Message({message}:{message:Message})
{
    const me= useContext(UserContext);
    const isMine = message.sender.id === me?.id;


    return (
       <div className={`min-w-0 max-w-[80%] animate-pop rounded-2xl px-4 py-2 ${isMine ? "self-start rounded-tr-sm bg-linear-to-l from-teal-50 to-sky-50 font-semibold text-slate-800 shadow-sm ring-1 ring-teal-100" : "self-end rounded-tl-sm bg-white font-normal text-slate-800 shadow-sm ring-1 ring-slate-100"}`}>
            <h6 className="inline text-xs font-bold opacity-90">{isMine?"אני":message.sender.firstName}{message.sender.staffRole&&message.sender.role==="STAFF"&& <span className="ms-1.5 inline-block rounded-full bg-linear-to-l from-violet-500 to-fuchsia-500 px-2 py-0.5 align-middle text-[10px] leading-none font-semibold text-white shadow-sm shadow-violet-500/30"> {STAFF_ROLE_LABELS[message.sender.staffRole]} </span>}</h6>
            <h6 className="ms-2 inline text-[11px] font-normal opacity-70">{new Date(message.createdAt).toLocaleString("he-IL")}</h6>
            <p className="mt-0.5 whitespace-pre-wrap wrap-anywhere text-sm leading-6">{message.content}</p>
        </div>
       
    )

}
