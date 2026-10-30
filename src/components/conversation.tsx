
import { useEffect, useRef, useState } from "react";

import { useAddConversation, useConversations, useMessages, useSendMessage, useMarkRead } from "../api/conversation";
import Message from "./message";



export default function ({ selected }: { selected: number | "general", onSelect: (value: "general" | number) => void }) {
    const conversations = useConversations();
    const addConversation = useAddConversation()
    const currentConversation = conversations.data?.find((c => selected === "general" ? c.type === "GENERAL" : selected === c.withUser?.id)) ?? (addConversation.data?.withUser?.id === selected ? addConversation.data : undefined);

    const messages = useMessages(currentConversation?.id);
    const { mutate: markRead } = useMarkRead();

    useEffect(() => {
        if (currentConversation) markRead(currentConversation.id);
    }, [currentConversation?.id, messages.data?.length, markRead]);

    const [text, setText] = useState("");
    const sendMessage = useSendMessage(currentConversation?.id);

    const listRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const list = listRef.current;
        if (list) list.scrollTo({ top: list.scrollHeight, behavior: "smooth" });
    }, [messages.data]);

    if (conversations.isPending) {
        return <p className="flex flex-1 animate-pulse items-center justify-center text-lg text-slate-500">טוען...</p>
    }
    if (conversations.error) return <p className="mx-auto max-w-3xl rounded-2xl bg-rose-50 p-6 text-center text-rose-600">{conversations.error.message}</p>
    if (currentConversation == undefined) {
        return <div className="flex flex-1 animate-fade-up flex-col items-center justify-center gap-6 bg-linear-to-b from-white/40 to-teal-50/40 p-10 text-center before:flex before:h-32 before:w-32 before:items-center before:justify-center before:rounded-full before:bg-linear-to-br before:from-teal-100 before:via-sky-100 before:to-violet-100 before:text-6xl before:shadow-xl before:shadow-teal-500/10 before:ring-8 before:ring-white/70 before:content-['💬']">
            <span className="gradient-text text-3xl font-extrabold tracking-tight">אין התכתבות פעילה...</span>

            <button disabled={addConversation.isPending} onClick={() => { if (selected != "general") addConversation.mutate({ userId: selected }) }} className="disabled:pointer-events-none disabled:opacity-60rounded-full bg-linear-to-l from-emerald-500 to-teal-500 px-10 py-4 text-lg font-bold text-white shadow-xl shadow-emerald-500/30 transition hover:-translate-y-1 hover:shadow-2xl hover:shadow-emerald-500/40 active:translate-y-0 active:scale-95">+ להתחלת התכתבות</button>
            {addConversation.isError && <p className="rounded-xl bg-rose-50 px-3 py-2 text-center text-sm text-rose-600">{addConversation.error.message}</p>}
        </div>
    }

    return (

        <div ref={listRef} className="flex flex-1 flex-col gap-2 overflow-y-auto [background-image:radial-gradient(rgb(148_163_184_/_0.18)_1px,transparent_1px)] bg-size-[18px_18px] px-6 pt-5">
            {messages.isPending && <p className="animate-pulse p-8 text-center text-slate-500">טוען...</p>}
            {messages.error && <p className="mx-auto max-w-3xl rounded-2xl bg-rose-50 p-6 text-center text-rose-600">{messages.error.message}</p>}
            {messages.data?.map((m) => <Message key={m.id} message={m} ></Message>
            )}


            <div className="sticky bottom-0 -mx-6 mt-auto flex flex-wrap items-end gap-2 border-t border-white/70 bg-white/80 px-4 py-3 backdrop-blur-xl">
                {sendMessage.isError && <p className="w-full rounded-xl bg-rose-50 px-3 py-2 text-center text-sm text-rose-600">{sendMessage.error.message}</p>}
                <textarea className="h-11 max-h-32 flex-1 resize-none rounded-3xl border border-slate-200 bg-white/90 px-5 py-2.5 text-sm leading-6 shadow-inner shadow-slate-900/5 transition focus:border-teal-300 focus:bg-white focus:ring-4 focus:ring-teal-100 focus:outline-none" value={text} onChange={(e) => setText(e.target.value)} name="newMessage" id="newMessage" placeholder="כתיבת הודעה..." rows={4}></textarea>
                <button className="h-11 shrink-0 rounded-full bg-linear-to-l from-teal-500 to-sky-500 px-6 text-sm font-semibold text-white shadow-lg shadow-teal-500/30 transition hover:scale-105 hover:shadow-xl active:scale-95 disabled:pointer-events-none disabled:opacity-50" disabled={sendMessage.isPending} onClick={() => sendMessage.mutate({ content: text }, { onSuccess: () => setText("") })}>לשליחת התגובה</button>
            </div>
        </div>
    )
}