import Link from "next/link";

export default function InfluencerSignUp() {
  const stSelectButton = "w-[166px] h-[88px] bg-[#D9D9D9] rounded-xl font-medium";
  return (
    <>
      <div className="p-5 h-[700px]">
        <div className="flex justify-between">
          <Link href={"/login"}>
            <p>뒤로가기</p>
          </Link>
          <p>X</p>
        </div>

        <div className="flex flex-col justify-center h-24">
          <h4 className="text-lg font-medium mb-1">어떤 회원으로 서비스를 이용하실건가요?</h4>
          <p className="text-sm text-[#575757]">인플루언서라면 유튜브, 인스타 계정을 통해 인증해야합니다.</p>
        </div>

        <div className="flex gap-4 mb-3">
          <button className="w-[166px] h-[88px] bg-[#1a82ff] rounded-xl font-medium text-white">인플루언서</button>
          <button className={stSelectButton}>일반</button>
        </div>

        <div className="flex">
          <Link href={"/signup"}>
            <button className="bg-[#D9D9D9] h-[47px] rounded-xl font-medium">다음</button>
          </Link>
        </div>
      </div>
    </>
  );
}
