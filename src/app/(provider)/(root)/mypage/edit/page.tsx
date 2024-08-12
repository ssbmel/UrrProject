"use client";

import LoadingUrr from "@/components/common/loading/LoadingUrr";
import InfoOnEdit from "@/components/mypage/edit/InfoOnEdit";
import { useUserData } from "@/hooks/useUserData";

const EditProfileInfoPage = () => {
  const data = useUserData();

  if (data.isPending) {
    return <LoadingUrr />;
  }

  const { data: user } = data;

  return (
    <>
      <InfoOnEdit user={user} />
    </>
  );
};

export default EditProfileInfoPage;
