import { useQuery } from "@tanstack/react-query";

/** 상품 디테일 정보 받아오기 */
const getProductDetail = async ({ id }: { id: string }) => {
  const response = await fetch(`/api/products/detail/${id}`, {
    headers: {
      "Content-Type": "application/json"
    }
  });
  const { data } = await response.json();
  return data;
};

const useGetProductDetail = ({ id }: { id: string }) => {
  return useQuery({
    queryKey: ["productDetail", id],
    queryFn: () => getProductDetail({ id })
  });
};

export default useGetProductDetail;
