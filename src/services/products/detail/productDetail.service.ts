export default async function getProductDetail({ id }: { id: string }) {
  const response = await fetch(`/api/products/detail/${id}`, {
    headers: {
      "Content-Type": "application/json"
    }
  });
  const { data } = await response.json();

  return data;
}
