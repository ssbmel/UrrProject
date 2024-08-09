"use client";

import { useUserData } from "@/hooks/useUserData";
import { userLogout } from "@/services/users/users.service";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import DefaultImage from "../../../public/images/default.png";

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
    location.reload();
    return;
  };

  const commonUser = "absolute rounded-[16px] overflow-hidden border border-transparent p-[4px] object-cover";
  const adminUser = "absolute rounded-[16px] overflow-hidden border border-[#2267CE] p-[4px] object-cover";
  const infUser =
    "absolute rounded-[16px] overflow-hidden border border-transparent p-[4px] object-cover gradient-border";

  return (
    <div className="flex w-full gap-[12px] pb-[16px] pt-[4px] px-[24px]">
      <div className="w-[80px] h-[80px] rounded-[16px] relative">
        <Image
          src={user?.profile_url || DefaultImage}
          alt="profile_image"
          sizes="80px"
          fill
          priority
          className={user?.role === "인플루언서" ? infUser : user?.role === "관리자" ? adminUser : commonUser}
        />
      </div>
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
