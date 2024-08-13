"use client";

import { useEffect, useState } from "react";
import { createClient } from "../../../../supabase/client";
import Image from "next/image";
import { Tables } from "../../../../types/supabase";
import more from "../../../../public/icon/more.png";
import Link from "next/link";

const DetailInflu = ({ userId }: { userId: string }) => {
  const supabase = createClient();
  const [influ, setInflu] = useState<User>();

  type User = Tables<"users">;

  useEffect(() => {
    const getUserInflu = async () => {
      if (userId) {
        const { data } = await supabase.from("users").select("*").eq("id", userId).single();
        setInflu(data as User);
      }
    };

    getUserInflu();
  }, [userId]);

  return (
    <>
      <div className="w-full h-[64px] py-[12px] px-[16px] xl:px-0 flex items-center justify-between">
        <div className="flex items-center">
          <div className="relative w-[40px] h-[40px] m-2">
            {influ?.profile_url && (
              <Image
                src={influ?.profile_url}
                alt="프로필이미지"
                fill
                sizes="40px"
                className=" object-cover rounded-full"
              />
            )}
          </div>
          <div className="text-[#4C4F52] text-[16px] xl:text-[18px] ml-2 xl:ml-4">{influ?.nickname}</div>
        </div>
        <Link href={`/influencer/profile/${userId}`}>
          <div className="relative w-[60px] h-[20px] lg:hidden">
            <Image src={more} alt="더보기" fill sizes="60px" className="object-cover" />
          </div>
        </Link>
      </div>
    </>
  );
};

export default DetailInflu;
