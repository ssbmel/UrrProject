import Image from "next/image";
import defaultImg from "../../../public/images/default.png";

function SubInfluencer() {
  return (
    <div className="w-full h-[200px] mx-auto p-2">
      <div className="flex mb-5">
        <h2 className="font-bold text-xl">내가 구독한 인플루언서</h2>
      </div>
      <div className="flex p-2 overflow-x-auto flex-nowrap scrollbar">
        <div className="flex flex-col justify-center flex-shrink-0 w-[100px] text-center">
          <Image src={defaultImg} alt="Influencer" width={100} height={100} />
          <p>우르르</p>
        </div>
      </div>
    </div>
  );
}

export default SubInfluencer;
