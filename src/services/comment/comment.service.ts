export const updateComment = async ({ content, id }: { id: string; content: string | undefined }) => {
  const response = await fetch("/api/products/comment", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content, id })
  });
  return response.json();
};

export const deleteComment = async (id: string) => {
  const response = await fetch("/api/products/comment", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(id)
  });
  return response.json();
};
