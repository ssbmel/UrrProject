import { Tables } from "./supabase";

export type Product = Tables<"products">;

export type User = Tables<"users">;

export type ChatChannel = Tables<"chat_channels">;

export type ChatSubscribe = Tables<"chat_subscribe">;

export type ChatMessage = Tables<"chat_messages">;