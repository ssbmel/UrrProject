import { getInfluencerData } from "@/services/users/influencer/influencer.service";
import { useQuery } from "@tanstack/react-query";

export const useInfluencerData = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: () => getInfluencerData()
  });
};
