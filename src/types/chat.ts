import type { UserSummary } from "./user";

// צ'אט: שיחות והודעות

export type ConversationType = "DIRECT" | "GENERAL";

export interface Conversation
{
    id: number;
    type: ConversationType;
    title: string | null;
    withUser: UserSummary | null; // רק בשיחה פרטית
    lastMessage: Message | null;
    unreadCount: number;
    hasUnread: boolean;
}

export interface Message
{
    id: number;
    conversationId: number;
    content: string;
    createdAt: string;
    sender: UserSummary;
}

// פתיחת שיחה פרטית עם משתמש
export interface OpenDirectRequest
{
    userId: number;
}

export interface SendMessageRequest
{
    content: string;
}
