export async function refundPayment(paymentId: string) {
  const response = await fetch("/api/payment/refund", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ paymentId })
  });
  const data = await response.json();
  return data;
}
