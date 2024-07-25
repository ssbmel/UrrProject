import Link from 'next/link';

export default function SignUpHeader() {
  return (
    <>
      <div className="flex justify-between">
        <Link href={'/login'}>
          <p>↩️</p>
        </Link>
        <p className="font-medium text-lg">회원가입</p>
        <Link href={'/'}>
          <p>❌</p>
        </Link>
      </div>
    </>
  );
}
