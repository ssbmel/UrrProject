import Image from "next/image";
import defaultImg from "../../../public/images/default.png";
import emptyImg from "../../../public/bgImg/emptyImg.png";

function InfluencerList() {
  return (
    <div className="w-full h-svh p-5">
      <div className="w-full h-[25%] mb-5 p-2">
        <h1 className="font-bold text-lg">내가 구독중인 인플루언서</h1>
        <div className="flex p-2 overflow-x-auto">
          {/* <div className="w-[80px] text-center mt-2">
            <Image src={defaultImg} alt="" width={80} className="gradient-border"/>
            <p className="my-2 text-sm">인플루언서</p>
          </div> */}
          <div className="grid mx-auto">
            <Image src={emptyImg} alt="empty" width={130} className="mx-auto my-5"></Image>
            <p className="text-[#4C4F52] text-[16px] mx-auto">현재 구독중인 인플루언서가 없습니다.</p>
          </div>
        </div>
      </div>
      <hr />
      <div className="w-full h-[75%] p-2 my-5">
        <h1 className="font-bold text-lg">전체 인플루언서</h1>
        <div className="w-full grid grid-cols-3 gap-3">
          <div className="w-[120px] text-center mt-2 overflow-y-auto">
            <Image src={defaultImg} alt="" width={120} className="gradient-border" />
            <p className="my-2 text-sm">인플루언서</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InfluencerList;
