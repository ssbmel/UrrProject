import Link from "next/link";

export default function BottomNav() {
  const liStyle = "flex justify-center w-16 h-7 text-sm whitespace-nowrap";

  return (
    <>
      <div className="bg-[#FAFAFF] h-[80px] w-full fixed bottom-0">
        <ul className="flex justify-between items-center pt-2">
          <Link href={"/"}>
            <li className={liStyle}>홈</li>
          </Link>
          <Link href={"/mypage/1"}>
            <li className={liStyle}>마이페이지</li>
          </Link>
          <Link href={"/products/list"}>
            <li className={liStyle}>스토어</li>
          </Link>
          <Link href={"/influencer"}>
            <li className={liStyle}>인플루언서</li>
          </Link>
          <li className={liStyle}>채팅</li>
        </ul>
      </div>
    </>
  );
}
