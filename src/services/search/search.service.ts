import { NextRequest } from "next/server";
export const SearchProductTitleList = async (searchWord: string) => {
  const response = await fetch("/api/search", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ searchWord })
  });
  const data = response.json();
  return data;
};
