"use client";

import Image from "next/image";
import defaultImg from "../../../public/images/default.png";
import emptyImg from "../../../public/bgImg/emptyImg.jpg";
import { InfSubscribe, User } from "../../../types/common";
import { MouseEvent, useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import EmptyHeartIcon from "../../../public/icon/emptyheart.svg";
import FullHeartIcon from "../../../public/icon/fullheart.svg";
import { useUserData } from "@/hooks/useUserData";
import Link from "next/link";
import { getInfluencerData } from "@/services/users/influencer/influencer.service";
import InfGuidModal from "./InfGuidModal";
import LoadingUrr from "../common/loading/LoadingUrr";
import swal from "sweetalert";
import { useRouter } from "next/navigation";

function AllInfluencers() {
  const { data: user, isLoading} = useUserData();
  const [subscribeIds, setSubscribeIds] = useState<string[]>([]);
  const [isFetching, setIsFetching] = useState(true); 
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      if(user) {
        await getSubscribeData();
        setIsFetching(false);
      }
    };
        
    fetchData();
  }, [user]);

  const getSubscribeData = async () => {
    try {
      const response = await fetch(`/api/subscribe?user_id=${user.id}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      const otherData = data.map((d: InfSubscribe) => d.infuser_id);
      setSubscribeIds(otherData.filter((d: InfSubscribe) => d !== user.id));
    } catch (error) {
      console.log("Failed to fetch subscription data:", error);
    }
  };

  const { data: infUser } = useQuery({
    queryKey: ["user"],
    queryFn: () => getInfluencerData()
  });

  const subscribeHandler = async (e: MouseEvent<HTMLButtonElement>, inf: User) => {
    e.stopPropagation();
    if (!user) {
      swal("로그인을 먼저 진행해주세요.").then(() => {
        router.push("/login");
      });
      return;
    }
    const newInfUser: InfSubscribe = {
      user_id: user.id,
      infuser_id: inf.id
    };
    setSubscribeIds((prev) => [...prev, inf.id]);
    await subscribedMutation(newInfUser);
    swal(`${inf.nickname}님을 구독하였습니다.`);
  };

  const subscribedInfUser = async (data: InfSubscribe) => {
    const response = await fetch("/api/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    await getSubscribeData();
    return response.json();
  };

  const { mutate: subscribedMutation } = useMutation<InfSubscribe, unknown, InfSubscribe>({
    mutationFn: (data) => subscribedInfUser(data)
  });

  const cancelSubscribeHandler = async (inf: User) => {
    setSubscribeIds((prev) => prev.filter((id) => id !== inf.id));
    await cancelSubscribedMutation({
      infuser_id: inf.id,
      user_id: user.id
    });
    swal("구독이 취소되었습니다.");
  };

  const cancelSubscribedInfUser = async (data: InfSubscribe) => {
    if (!data.user_id || !data.infuser_id) return;
    const response = await fetch("/api/subscribe", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    swal("구독이 취소되었습니다.");
    await getSubscribeData();
    return response.json();
  };

  const { mutate: cancelSubscribedMutation } = useMutation<InfSubscribe, unknown, InfSubscribe>({
    mutationFn: (data) => cancelSubscribedInfUser(data)
  });

  if (isLoading) {
    return <LoadingUrr />;
  }

  return (
    <div className="w-full xl:w-[1200px] bg-[#F4F4F4] mx-auto">
      <InfGuidModal />
      <div className="w-full h-[30%] p-4 bg-[#FFFFFE]">
        <h1 className="font-bold text-lg">내가 구독중인 인플루언서</h1>
        {!user ? (
          <div className="flex h-[200px]">
            <p className="text-[#4C4F52] text-[16px] my-5 xl:text-[18px] xl:mb-[52px] mx-auto mt-[80px]">
              로그인이 필요합니다.
            </p>
          </div>
        ) : !isFetching && subscribeIds.length === 0 ? (
          <div className="flex flex-col items-center mx-auto">
            <div className="relative w-[150px] h-[100px] my-3 xl:my-[26px]">
              <Image src={emptyImg} alt="empty" fill sizes="100px xl:w-[150px]" className="mx-auto my-5 object-cover" />
            </div>
            <p className="text-[#4C4F52] text-[16px] my-6 xl:text-[18px]">현재 구독중인 인플루언서가 없습니다.</p>
          </div>
        ) : (
          <div className="w-auto flex overflow-x-auto mt-5 gap-3 scrollbar-hide p-2">
            {infUser
              ?.filter((inf) => subscribeIds.includes(inf.id))
              .map((inf) => (
                <div className="grid text-center" key={inf.id}>
                  <div className="relative w-[90px] h-[90px] mb-2 xl:w-[140px] xl:h-[140px] xl:mt-[10px]">
                    <Link href={`influencer/profile/${inf.id}`}>
                      <div className="relative w-[90px] h-[90px] xl:w-[140px] xl:h-[140px]">
                        <Image
                          src={inf.profile_url || defaultImg}
                          alt="infProfile"
                          fill
                          sizes="90px xl:w-[140px]"
                          className="rounded-md object-cover gradient-border"
                        />
                      </div>
                    </Link>
                    <div className="absolute bottom-0.5 right-1">
                      {subscribeIds.includes(inf.id) ? (
                        <button onClick={() => cancelSubscribeHandler(inf)}>
                          <FullHeartIcon />
                        </button>
                      ) : (
                        <button onClick={(e) => subscribeHandler(e, inf)}>
                          <EmptyHeartIcon />
                        </button>
                      )}
                    </div>
                  </div>
                  <p className="text-[14px] mb-2 xl:text-[16px]">{inf.nickname}</p>
                </div>
              ))}
          </div>
        )}
      </div>
      <div className="w-full h-[70%] p-4 my-2 bg-[#FFFFFE]">
        <div className="flex items-center">
          <h1 className="font-bold text-lg mb-4 xl:mt-[52px]">인플루언서</h1>
          <p className="ml-auto text mt-1 xl:text-lg mb-4 xl:mt-[52px]">총 {infUser?.length}명</p>
        </div>
        <div className="w-full grid grid-cols-3 xl:grid-cols-5">
          {infUser?.map((inf) => (
            <div key={inf.id} className="flex flex-col items-center justify-center w-[106px] text-center mx-auto">
              <div className="relative w-[106px] h-[106px] mb-2 xl:w-[207px] xl:h-[207px]">
                <Link href={`influencer/profile/${inf.id}`} key={inf.id}>
                  <div className="relative w-[106px] h-[106px] xl:w-[207px] xl:h-[207px]">
                    <Image
                      src={inf.profile_url || defaultImg}
                      alt="infProfile"
                      fill
                      sizes="106px xl:w-[207px]"
                      className="rounded-md object-cover gradient-border"
                    />
                  </div>
                </Link>
                <div className="absolute bottom-0.5 right-2">
                  {inf.id !== user?.id &&
                    (subscribeIds.includes(inf.id) ? (
                      <button onClick={() => cancelSubscribeHandler(inf)}>
                        <FullHeartIcon />
                      </button>
                    ) : (
                      <button onClick={(e) => subscribeHandler(e, inf)}>
                        <EmptyHeartIcon />
                      </button>
                    ))}
                </div>
              </div>
              <p className="text-[#4C4F52] mb-6 xl:text-[20px] whitespace-nowrap">{inf.nickname}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AllInfluencers;
