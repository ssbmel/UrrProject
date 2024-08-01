"use client";

import useGetProductReview from "@/hooks/useGetProductReview";
import Review from "./Review";

const ReviewList = ({ id }: { id: string }) => {
  // const testArray = [1, 2, 3, 4, 5];
  const { data } = useGetProductReview({ id });

  return (
    <div className="divide-y">
      {data?.map((value: any, index: number) => {
        return <Review key={index} props={value} />;
      })}
    </div>
  );
};

export default ReviewList;
