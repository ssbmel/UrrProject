import Image from "next/image";
import defaultImg from "../../../public/images/default.png";

function BestInfluencerList() {
  return (
    <div className="w-full min-h-[150px] mx-auto p-2">
      <h2 className="font-bold mb-5 text-xl">현재 인기 인플루언서</h2>
      <div className="w-full overflow-y-auto scrollbar">
        <div className="border-2 border-[#0068E5] rounded-[12px] bg-[##FFFFFE] w-full min-h-[100px] mx-auto p-[10px] grid grid-rows-1 grid-flow-col mb-4">
          <Image src={defaultImg} alt="인플루언서이미지" width={100} />
          <div className="flex flex-col">
            <p className="text-[16px] font-medium flex-1">우르르</p>
            <p className="mt-auto font-light">#OOOO</p>
          </div>
          <p className="text-[16px] font-medium">123k</p>
          <button className="self-center ml-auto">〉</button>
        </div>
      </div>
    </div>
  );
}

export default BestInfluencerList;
