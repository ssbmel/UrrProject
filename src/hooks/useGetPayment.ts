import { useQuery } from "@tanstack/react-query";

/** 결제 내역 리스트 전체 받아오기 */
const getPaymentData = async () => {
  const response = await fetch(`https://api.portone.io/payments`, {
    headers: {
      Authorization: `PortOne ${process.env.NEXT_PUBLIC_PORTONE_API_KEY}`
    }
  });
  const data = await response.json();
  return data;
};

const useGetPayment = () => {
  return useQuery({
    queryKey: ["paymentData"],
    queryFn: () => getPaymentData()
  });
};

export default useGetPayment;
