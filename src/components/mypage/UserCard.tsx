"use client";

import { useUserData } from "@/hooks/useUserData";
import { userLogout } from "@/services/users/users.service";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import DefaultImage from "../../../public/images/default.png";
import RightArrowB from "../../../public/icon/rightArrowB.svg";
import SettingIcon from "../../../public/icon/settingIcon.svg";

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

  const commonUser = "absolute overflow-hidden border border-transparent p-[4px] object-cover";
  const adminUser = "absolute overflow-hidden border border-[#2267CE] p-[4px] object-cover";
  const infUser = "absolute overflow-hidden border border-transparent p-[4px] object-cover gradient-border";

  return (
    <div className="flex w-[375px] mx-auto gap-[12px] p-[16px] pb-[36px] xl:w-[1129px] xl:h-[201px] xl:mx-[auto] xl:shadow-md xl:p-[36px] xl:my-[48px] xl:rounded-[24px]">
      <div className="w-[80px] h-[80px] xl:w-[129px] xl:h-[129px] rounded-[16px] relative">
        <Image
          src={user?.profile_url || DefaultImage}
          alt="profile_image"
          sizes="80px"
          fill
          priority
          className={user?.role === "인플루언서" ? infUser : user?.role === "관리자" ? adminUser : commonUser}
        />
      </div>
      <div className="w-[calc(100%-80px)] xl:w-[calc(100%-129px)] flex flex-col justify-between text-[12px] xl:py-[7px]">
        <div>
          <div className="flex justify-between items-center">
            <p className="text-[20px] font-bold">{user?.nickname}</p>
            <p className="text-[20px] flex justify-center items-center">
              <Link href={"/mypage/edit"} className="flex justify-center items-center">
                <SettingIcon />
              </Link>
            </p>
          </div>
          <p className="text-gray-300">{user?.email}</p>
        </div>
        <p>
          <button className="flex items-center" onClick={logoutHandler}>
            <span>로그아웃</span>
            <span className="w-[20px] h-[20px] flex justify-center items-center">
              <RightArrowB />
            </span>
          </button>
        </p>
      </div>
    </div>
  );
};

export default UserCard;
