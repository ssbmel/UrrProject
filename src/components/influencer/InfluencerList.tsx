import Image from "next/image";
import defaultImg from "../../../public/images/default.png";

function InfluencerList() {
  return (
    <div className="w-full h-svh p-5">
      <div className="w-full h-[20%] mb-5 p-2">
        <h1 className="font-bold text-lg">내가 구독한 인플루언서</h1>
        <div className="flex p-2 overflow-x-auto">
          <div className="w-[80px] text-center mt-2">
            <Image src={defaultImg} alt="" width={80} />
            <p className="my-2 text-sm">인플루언서</p>
          </div>
        </div>
      </div>
      <hr />
      <div className="w-full h-[80%] p-2 my-5">
        <h1 className="font-bold text-lg">전체 인플루언서</h1>
        <div className="p-2 grid grid-cols-3 gap-8">
          <div className="w-[100px] text-center mt-2 overflow-y-auto">
            <Image src={defaultImg} alt="" width={100} />
            <p className="my-2 text-sm">인플루언서</p>
          </div>
          <div className="w-[100px] text-center mt-2">
            <Image src={defaultImg} alt="" width={100} />
            <p className="my-2 text-sm">인플루언서</p>
          </div>
          <div className="w-[100px] text-center mt-2">
            <Image src={defaultImg} alt="" width={100} />
            <p className="my-2 text-sm">인플루언서</p>
          </div>
          <div className="w-[100px] text-center mt-2">
            <Image src={defaultImg} alt="" width={100} />
            <p className="my-2 text-sm">인플루언서</p>
          </div>
          <div className="w-[100px] text-center mt-2">
            <Image src={defaultImg} alt="" width={100} />
            <p className="my-2 text-sm">인플루언서</p>
          </div>
          <div className="w-[100px] text-center mt-2">
            <Image src={defaultImg} alt="" width={100} />
            <p className="my-2 text-sm">인플루언서</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InfluencerList;
