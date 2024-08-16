export async function getProductDetail({ id }: { id: string }) {
  const response = await fetch(`/api/products/detail/${id}`, {
    headers: {
      "Content-Type": "application/json"
    }
  });
  const { data } = await response.json();
  return data;
}

export async function getProductDetailByUserId(id: string) {
  const res = await fetch(`/api/products/detail/influencer/${id}`);
  if (!res.ok) {
    console.log(`ERROR STATUS : ${res.status}`);
    return;
  }
  const data = await res.json();
  return data;
}
