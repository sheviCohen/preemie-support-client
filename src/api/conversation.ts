import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api, HttpError } from "./client";
import type { Conversation, Message, OpenDirectRequest, SendMessageRequest } from "../types";

export function useMessages(conversationId: number | undefined) {
    return useQuery<Message[], HttpError>({
        queryKey: ["messages", conversationId],
        queryFn: () => api.get(`/conversations/${conversationId}/messages`).then((r) => r.data.messages),
        enabled: conversationId !== undefined,
        refetchInterval: 1500
    });
}

export function useConversations() {
    return useQuery<Conversation[], HttpError>({
        queryKey: ["conversations"],
        queryFn: () => api.get(`/conversations`).then((r) => r.data.conversations),
        refetchInterval: 1500
    });
}
export function useSendMessage(conversationId: number | undefined) {
    const qc = useQueryClient();
    return useMutation<Message, HttpError, SendMessageRequest>({
        mutationFn: (body) => api.post(`/conversations/${conversationId}/messages`, body).then((r) => r.data),
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ["messages", conversationId] });
            qc.invalidateQueries({ queryKey: ["conversations"] });
        },

    })
}

export function useAddConversation() {
    const qc = useQueryClient();
    return useMutation<Conversation, HttpError, OpenDirectRequest>({
        mutationFn: (body) => api.post("/conversations/direct", body).then((r) => r.data.conversation),
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ["conversations"] });
        },

    })

}

export function useMarkRead()
{
     const qc = useQueryClient();
    return useMutation<void,HttpError,number>({
    mutationFn: (conversationId)=>api.post(`/conversations/${conversationId}/read`).then(()=>undefined),
    onSuccess:() => {
        qc.invalidateQueries({ queryKey: ["conversations"] });
    },

     })
}
