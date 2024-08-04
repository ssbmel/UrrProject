import { CartItemsProps } from "@/components/products/detail/CountModal";

export const addCartItems = async ({
  user_id,
  product_id,
  name,
  amount,
  quantity,
  main_img,
  nickname
}: CartItemsProps) => {
  const response = await fetch(`/api/auth/cart/${product_id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ user_id, product_id, name, amount, quantity, main_img, nickname })
  });
  const data = await response.json();

  return data;
};

export const userCartItems = async ({ id, userId }: { id: string; userId: string }) => {
  const response = await fetch(`/api/auth/cart/${id}/exist`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ user_id: userId })
  });
  const data = await response.json();
  return data;
};
