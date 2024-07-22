import Link from 'next/link';

export default function BottomNav() {
  const liStyle = 'flex items-center';

  return (
    <>
      <div className="bg-[#FAFAFF] px-3 h-[80px] w-full fixed bottom-0">
        <ul className="flex justify-between items-center pt-2">
          <li className={liStyle}>홈</li>
          <Link href={'/login'}>
            <li className={liStyle}>마이페이지</li>
          </Link>
          <li className={liStyle}>스토어</li>
          <li className={liStyle}>인플루언서</li>
          <li className={liStyle}>채팅</li>
        </ul>
      </div>
    </>
  );
}
