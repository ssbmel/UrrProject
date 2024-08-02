import { CartItemsProps } from "@/components/products/detail/CountModal";

export const addCartItems = async ({ user_id, product_id, name, amount, quantity }: CartItemsProps) => {
  const response = await fetch("/api/auth/cart", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ user_id, product_id, name, amount, quantity })
  });
  const data = await response.json();

  return data;
};

export const userCartItems = async (id: string) => {
  const response = await fetch(`/api/auth/cart/${id}`);
  const data = await response.json();
  return data;
};
