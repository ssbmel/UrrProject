import { useQuery } from "@tanstack/react-query";

/** 상품 리뷰 전체 받아오기 */
const getProductReview = async ({ id }: { id: string }) => {
  const response = await fetch(`/api/products/detail/${id}/product-review`, {
    headers: {
      "Content-Type": "application/json"
    }
  });
  const { data } = await response.json();
  console.log(data);
  return data;
};

const useGetProductReview = ({ id }: { id: string }) => {
  return useQuery({
    queryKey: ["productReview", id],
    queryFn: () => getProductReview({ id })
  });
};

export default useGetProductReview;
