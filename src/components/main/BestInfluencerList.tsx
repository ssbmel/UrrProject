import Image from "next/image";
import defaultImg from "../../../public/images/default.png";

function BestInfluencerList() {
  return (
    <div className="w-full min-h-[300px] mx-auto p-2">
      <h2 className="font-bold mb-5 text-xl">현재 인기 인플루언서</h2>
      <div className="w-full h-[400px] overflow-y-auto">
        <div className="border rounded-md bg-gray-300 w-full min-h-[100px] mx-auto p-5 grid grid-rows-1 grid-flow-col mb-4">
          <Image src={defaultImg} alt="" width={100} />
          <div className="flex flex-col">
            <p className="flex-1">우르르</p>
            <p className="mt-auto">#OOOO</p>
          </div>
          <p>123k</p>
          <button className="self-center ml-auto">구독</button>
        </div>
        <div className="border rounded-md bg-gray-300 w-full min-h-[100px] mx-auto p-5 grid grid-rows-1 grid-flow-col mb-4">
          <Image src={defaultImg} alt="" width={100} />
          <div className="flex flex-col">
            <p className="flex-1">우르르</p>
            <p className="mt-auto">#OOOO</p>
          </div>
          <p>123k</p>
          <button className="self-center ml-auto">구독</button>
        </div>
        <div className="border rounded-md bg-gray-300 w-full min-h-[100px] mx-auto p-5 grid grid-rows-1 grid-flow-col mb-4">
          <Image src={defaultImg} alt="" width={100} />
          <div className="flex flex-col">
            <p className="flex-1">우르르</p>
            <p className="mt-auto">#OOOO</p>
          </div>
          <p>123k</p>
          <button className="self-center ml-auto">구독</button>
        </div>
        <div className="border rounded-md bg-gray-300 w-full min-h-[100px] mx-auto p-5 grid grid-rows-1 grid-flow-col mb-4">
          <Image src={defaultImg} alt="" width={100} />
          <div className="flex flex-col">
            <p className="flex-1">우르르</p>
            <p className="mt-auto">#OOOO</p>
          </div>
          <p>123k</p>
          <button className="self-center ml-auto">구독</button>
        </div>
      </div>
    </div>
  );
}

export default BestInfluencerList;
