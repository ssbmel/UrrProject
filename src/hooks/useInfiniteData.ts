import { useInfiniteQuery } from "@tanstack/react-query";
import { OrderType, Review } from "../../types/common";
import { getInfiniteOrders } from "@/services/order/order.service";
import { getInfiniteReviews } from "@/services/review/review.service";

export const useLoadOrders = (userId: string) => {
  return useInfiniteQuery<OrderType[], Error>({
    queryKey: ["orders", userId],
    queryFn: ({ pageParam }) => getInfiniteOrders(userId, pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < 5) return undefined;
      return allPages.length * 5;
    }
  });
};

export const useLoadReviews = (userId: string) => {
  return useInfiniteQuery<Review[], Error>({
    queryKey: ["reviews", userId],
    queryFn: ({ pageParam }) => getInfiniteReviews(userId, pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < 5) return undefined;
      return allPages.length * 5;
    }
  });
};
