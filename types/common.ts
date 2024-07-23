import { Tables } from "./supabase";

export type Product = Tables<"products">;

export type User = Tables<"users">;