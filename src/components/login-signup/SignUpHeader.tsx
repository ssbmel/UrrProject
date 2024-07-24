import Link from 'next/link';

export default function SignUpHeader() {
  return (
    <>
      <div className="flex justify-between">
        <Link href={'/login'}>
          <p>뒤로가기</p>
        </Link>
        <p>X</p>
      </div>
    </>
  );
}
