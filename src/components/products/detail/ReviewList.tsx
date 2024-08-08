"use client";

import useGetProductReview from "@/hooks/useGetProductReview";
import Review from "./Review";

const ReviewList = ({ id }: { id: string }) => {
  const { data } = useGetProductReview({ id });

  return (
    <div className="divide-y">
      {data && data.length > 0 ? (
        data.map((value: any, index: number) => {
          return <Review key={index} props={value} />;
        })
      ) : (
        <div className="flex justify-center items-center">
          <p className="p-8">아직 상품 후기가 없습니다</p>
        </div>
      )}
    </div>
  );
};

export default ReviewList;
