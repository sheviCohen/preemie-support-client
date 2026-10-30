import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router";
import { useConversations } from "../api/conversation";

export default function NewMessagesToast()
{
    const conversations = useConversations();
    const location = useLocation();
    const [show, setShow] = useState(false);
    const lastTotal = useRef(0);

    const total = conversations.data?.reduce((sum, c) => sum + c.unreadCount, 0) ?? 0;

    useEffect(() => {
        if (total > lastTotal.current && location.pathname !== "/chats") setShow(true);
        if (total === 0) setShow(false);
        lastTotal.current = total;
    }, [total, location.pathname]);

    if (!show) return null;

    return (
        <div className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center px-4">
        <div className="pointer-events-auto flex animate-pop items-center gap-2 rounded-2xl bg-white/95 p-3 ps-4 shadow-2xl ring-1 shadow-teal-900/25 ring-teal-100 backdrop-blur-xl" role="status">
            <Link className="group flex items-center gap-3 rounded-xl px-2 py-1.5 transition hover:bg-teal-50" to="/chats" onClick={() => setShow(false)}>
                <span className="relative flex size-11 items-center justify-center rounded-full bg-linear-to-br from-teal-400 to-sky-500 text-xl shadow-md shadow-teal-500/30">
                    💬
                    <span className="absolute -top-1 -right-1 flex size-5 animate-ping rounded-full bg-rose-400 opacity-60"></span>
                    <span className="absolute -top-1 -right-1 flex size-5 items-center justify-center rounded-full bg-rose-500 text-[11px] font-bold text-white ring-2 ring-white">{total}</span>
                </span>
                <span className="flex flex-col">
                    <span className="font-bold text-slate-800 group-hover:text-teal-700">יש לך {total} הודעות חדשות</span>
                    <span className="text-xs text-slate-500">לחצי כדי לעבור לצ'אט ←</span>
                </span>
            </Link>
            <button className="flex size-8 items-center justify-center rounded-full text-slate-400 transition hover:bg-slate-100 hover:text-slate-700" onClick={() => setShow(false)} aria-label="סגירה">✕</button>
        </div>
        </div>
    );
}
