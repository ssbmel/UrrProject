import Button from "@/components/common/button/Button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="grid text-center">
      <h1 className="text-[50px]">404, 찾을 수 없는 페이지입니다.</h1>
      <Link href="/">
        <Button>메인으로 이동하기</Button>
      </Link>
    </div>
  );
}
