import { User } from "../../../../types/common";

export const getInfluencerData = async () => {
  try {
    const response = await fetch("/api/auth/users/infuser/allinfuser");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    const user: User[] = await data.data;
    return user;
  } catch (error) {
    console.log("Failed to fetch influencer data:", error);
    return;
  }
};
