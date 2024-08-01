"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import logo from "../../../../public/logo/title_logo.png";
import backIcon from "../../../../public/icon/backIcon.png";
import searchIcon from "../../../../public/icon/searchIcon.png";
import cartIcon from "../../../../public/icon/cartIcon.png";
import xIcon from "../../../../public/icon/xIcon.png";

const Header = () => {
  const pathname = usePathname();
  const router = useRouter();

  const HOME = pathname === "/";
  const ADMIN = pathname === "/admin";
  const LOGIN = pathname === "/login";
  const PRODUCTS_LIST = pathname === "/products/list";
  const MY_PAGE = pathname === "/mypage";
  const SIGN_UP = pathname === "/signup";
  const PRODUCTS_UPLOAD = pathname === "/products/upload";
  const SEARCH = pathname === "/search";

  // header 타이틀
  let headerTitle;
  if (SIGN_UP) {
    headerTitle = "회원가입";
  } else if (PRODUCTS_UPLOAD) {
    headerTitle = "공구 구매 상품 등록";
  } else if (SEARCH) {
    headerTitle = "검색";
  }

  // header 왼쪽 아이콘
  let leftIcon;
  if (HOME || ADMIN || MY_PAGE || PRODUCTS_LIST) {
    leftIcon = (
      <Link href={"/"}>
        <Image src={logo} alt="urr_logo" width={62} />
      </Link>
    );
  } else if (LOGIN) {
    leftIcon = <div></div>;
  } else {
    leftIcon = (
      <button onClick={() => router.back()}>
        <Image src={backIcon} alt="뒤로가기 버튼" />
      </button>
    );
  }

  // header 오른쪽 아이콘
  let rightIcon;
  if (HOME || ADMIN) {
    rightIcon = (
      <>
        <Link href={"/search"}>
          <Image src={searchIcon} alt="검색" />
        </Link>
        <Link href={"/cart"}>
          <Image src={cartIcon} alt="장바구니" />
        </Link>
      </>
    );
  } else if (PRODUCTS_LIST || MY_PAGE) {
    rightIcon = (
      <Link href={"/cart"}>
        <Image src={cartIcon} alt="장바구니" />
      </Link>
    );
  } else if (SIGN_UP || LOGIN || SEARCH) {
    rightIcon = (
      <Link href={"/"}>
        <Image src={xIcon} alt="홈" />
      </Link>
    );
  }

  return (
    <>
      <header className="flex flex-row justify-between items-center h-12 w-[90%] mx-auto shrink-0">
        <div>{leftIcon}</div>
        <div className=" font-semibold text-xl">{headerTitle}</div>
        <div className="flex">{rightIcon}</div>
      </header>
      {/* <div className="bg-gray-300 flex-col h-[100px] w-full fixed">
        <div className="flex flex-col border border-red-500 w-[90%] mx-auto">
          <input type="text" className="border border-black rounded-md mx-auto h-8 w-[80%]" />
          <p>추천 인플루언서</p>
        </div>
      </div> */}
    </>
  );
};

export default Header;
