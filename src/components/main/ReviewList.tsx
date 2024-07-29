import Image from "next/image";
import defaultImg from "../../../public/images/default.png";

function ReviewList() {
  return (
    <div className="w-full max-h-[400px] mx-auto p-2">
        <h2 className="font-bold mb-5 text-xl">후기</h2>

      <div className="w-full h-[300px] overflow-y-auto flex flex-col gap-y-4">
        <div className="flex gap-3">
          <Image src={defaultImg} alt="" width={130} />
          <div className="flex flex-col w-1/2">
            <p className="font-bold">[우르르]상품명</p>
            <p>너무 좋아요! 너무 좋아요! 너무 좋아요!</p>
            <p className="text-xs text-gray-400 mt-auto">닉네임 | 2024.07.22</p>
          </div>
        </div>
        <div className="flex gap-3">
          <Image src={defaultImg} alt="" width={130} />
          <div className="flex flex-col w-1/2">
            <p className="font-bold">[우르르]상품명</p>
            <p>너무 좋아요! 너무 좋아요! 너무 좋아요!</p>
            <p className="text-xs text-gray-400 mt-auto">닉네임 | 2024.07.22</p>
          </div>
        </div>
        <div className="flex gap-3">
          <Image src={defaultImg} alt="" width={130} />
          <div className="flex flex-col w-1/2">
            <p className="font-bold">[우르르]상품명</p>
            <p>너무 좋아요! 너무 좋아요! 너무 좋아요!</p>
            <p className="text-xs text-gray-400 mt-auto">닉네임 | 2024.07.22</p>
          </div>
        </div>
        <div className="flex gap-3">
          <Image src={defaultImg} alt="" width={130} />
          <div className="flex flex-col w-1/2">
            <p className="font-bold">[우르르]상품명</p>
            <p>너무 좋아요! 너무 좋아요! 너무 좋아요!</p>
            <p className="text-xs text-gray-400 mt-auto">닉네임 | 2024.07.22</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReviewList;
