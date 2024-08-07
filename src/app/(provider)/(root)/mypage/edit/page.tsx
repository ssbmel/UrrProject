"use client";

import InfoOnEdit from "@/components/mypage/edit/InfoOnEdit";
import { useUserData } from "@/hooks/useUserData";

const EditProfileInfoPage = () => {
  const data = useUserData();

  if (data.isPending) {
    /* loading 공통 컴포넌트 필요 */
    return <div>로딩중</div>;
  }

  const { data: user } = data;

  return (
    <>
      <InfoOnEdit user={user} />
    </>
  );
};

export default EditProfileInfoPage;
