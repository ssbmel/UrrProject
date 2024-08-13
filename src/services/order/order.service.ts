import { createClient } from "../../../supabase/client";

export const getOrderList = async (userId: string) => {
  const supabase = createClient();
  const { data, error } = await supabase.from("order").select("*").eq("userId", userId);
  if (error) {
    console.error("Error fetching order list in service.ts:", error);
  }
  console.log(data);
  return data;
};
