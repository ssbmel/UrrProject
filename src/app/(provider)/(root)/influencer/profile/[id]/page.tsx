import AnnounceSection from "@/components/mypage/infInfo/AnnounceSection";
import IntroSection from "@/components/mypage/infInfo/IntroSection";
import SalesSection from "@/components/mypage/infInfo/SalesSection";
import { getUserFromUserId } from "@/services/users/account/account.service";

const page = async ({ params }: { params: { id: string } }) => {
  const data = await getUserFromUserId(params.id);

  return (
    <>
      <IntroSection user={data} />
      <AnnounceSection user={data} />
      <hr className="border-[4px] bg-[#F4F4F4]" />
      <SalesSection user={data} />
    </>
  );
};

export default page;
