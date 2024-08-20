import { createClient } from "../../../supabase/client";
import { OrderType } from "../../../types/common";

export const getOrderList = async (userId: string) => {
  const supabase = createClient();
  const { data, error } = await supabase.from("order").select("*").eq("userId", userId);
  if (error) {
    console.error("Error fetching order list in service.ts:", error);
  }
  return data;
};

export const getRangeOrderList = async (userId: string) => {
  const supabase = createClient();
  const { data, error } = await supabase.from("order").select("*").eq("userId", userId).range(0, 4);
  if (error) {
    console.error("Error fetching order list in service.ts:", error);
  }
  return data;
};

export const getInfiniteOrders = async (userId: string, pageParam: unknown): Promise<OrderType[]> => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("order")
    .select("*")
    .eq("userId", userId)
    .range(pageParam as number, (pageParam as number) + 4);
  if (error) {
    console.error("Error fetching order list in service.ts:", error);
  }
  if (data === null) {
    console.log("fetching error");
    return [];
  }
  return data;
};
