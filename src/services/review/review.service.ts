import { createClient } from "../../../supabase/client";
import { Review } from "../../../types/common";

export const deleteReview = async (data: Review) => {
  const response = await fetch("/api/product_review", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  if (!response.ok) {
    console.error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
};

export const getRangeReviewList = async (userId: string) => {
  const supabase = createClient();
  const { data, error } = await supabase.from("product_review").select("*").eq("userId", userId).range(0, 4);
  if (error) {
    console.error("Error fetching review list in service.ts:", error);
  }
  return data;
};

export const getInfiniteReviews = async (userId: string, pageParam: unknown): Promise<Review[]> => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("product_review")
    .select("*")
    .eq("userId", userId)
    .range(pageParam as number, (pageParam as number) + 4);
  if (error) {
    console.error("Error fetching review list in service.ts:", error);
  }
  if (data === null) {
    console.log("fetching error");
    return [];
  }
  return data;
};
