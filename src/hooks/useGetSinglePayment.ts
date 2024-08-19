import { useQuery } from "@tanstack/react-query";

export interface singlePaymentDataType {
  paymentId: string | null;
}

/** 결제내역 단건조회 */
const getSinglePaymentData = async ({ paymentId }: singlePaymentDataType) => {
  const response = await fetch(`https://api.portone.io/payments/${paymentId}`, {
    headers: {
      Authorization: `PortOne ${process.env.NEXT_PUBLIC_PORTONE_API_KEY}`
    }
  });
  const data = await response.json();
  return data;
};

const useGetSinglePayment = ({ paymentId }: singlePaymentDataType) => {
  return useQuery({
    queryKey: ["paymentData"],
    queryFn: () => getSinglePaymentData({ paymentId })
  });
};

export default useGetSinglePayment;
