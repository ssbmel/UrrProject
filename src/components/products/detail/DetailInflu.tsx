"use client";

import { useEffect, useState } from "react";
import { createClient } from "../../../../supabase/client";
import Image from "next/image";
import { Tables } from "../../../../types/supabase";

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
      <div className="w-full h-[64px] border-b border-[#EAECEC] py-[12px] px-[16px] flex items-center">
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
        <div className="text-[#4C4F52] text-[16px]">{influ?.nickname}</div>
      </div>
    </>
  );
};

export default DetailInflu;
