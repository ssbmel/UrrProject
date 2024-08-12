import IntroSection from "@/components/mypage/infInfo/IntroSection";
import SalesSection from "@/components/mypage/infInfo/SalesSection";
import { getProductDetailByUserId } from "@/services/products/detail/productDetail.service";
import { getUserFromUserId } from "@/services/users/account/account.service";

const page = async ({ params }: { params: { id: string } }) => {
  const userData = await getUserFromUserId(params.id);
  const infProductData = await getProductDetailByUserId(params.id);

  return (
    <>
      <IntroSection user={userData} />
      <hr className="border-[4px] bg-[#F4F4F4]" />
      <SalesSection products={infProductData} />
    </>
  );
};

export default page;
