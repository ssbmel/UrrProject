"use client";

import { useUserData } from "@/hooks/useUserData";
import { userLogout } from "@/services/users/users.service";
import Link from "next/link";
import { useRouter } from "next/navigation";

const UserCard = () => {
  const { data: user } = useUserData();

  const router = useRouter();

  const logoutHandler = async () => {
    if (!confirm("로그아웃 하시겠습니까?")) {
      return;
    }
    const status = await userLogout();
    if (status !== 200) {
      alert("로그아웃에 실패했습니다. 다시 시도해주세요.");
      return;
    }
    router.push("/");
  };

  return (
    <div className="flex h-[125px] w-full gap-[12px] p-[16px] pt-[24px] pb-[24px]">
      <img
        className="w-[77px] rounded-[4px] object-cover bg-gray-300"
        src={
          user?.profile_url ||
          "https://gckottayam.webc.in/sites/default/files/360_F_410437733_hdq4Q3QOH9uwh0mcqAhRFzOKfrCR24Ta.jpg"
        }
        alt="샘플이미지"
      />
      <div className="w-[calc(100%-80px)] flex flex-col justify-between text-[12px]">
        <div>
          <div className="flex justify-between items-center">
            <p className="text-[20px] font-bold">{user?.nickname}</p>
            <p className="text-[20px]">
              <Link href={"/mypage/edit"}>⚙️</Link>
            </p>
          </div>
          <p className="text-gray-300">{user?.email}</p>
        </div>
        <p>
          <button onClick={logoutHandler}>로그아웃 &gt;</button>
        </p>
      </div>
    </div>
  );
};

export default UserCard;
