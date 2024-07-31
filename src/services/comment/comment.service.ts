export const updateComment = async ({ content, id }: { id: string; content: string | undefined }) => {
  const response = await fetch("/api/products/comment", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content, id })
  });
  return response.json();
};
