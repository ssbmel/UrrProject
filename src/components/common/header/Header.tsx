"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import logo from "../../../../public/logo/title_logo.png";
import BackIcon from "../../../../public/icon/backIcon.svg";
import SearchIcon from "../../../../public/icon/searchIcon.svg";
import CartIcon from "../../../../public/icon/cartIcon.svg";
import XIcon from "../../../../public/icon/XIcon.svg";

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
  const PAYMENT = pathname === "/payment";
  const CHATLIST = pathname === "/chatlist";
  const INFLUENCER = pathname === "/influencer";

  // header 타이틀
  let headerTitle;
  if (SIGN_UP) {
    headerTitle = "회원가입";
  } else if (PRODUCTS_UPLOAD) {
    headerTitle = "공구 구매 상품 등록";
  } else if (SEARCH) {
    headerTitle = "검색";
  } else if (PAYMENT) {
    headerTitle = "결제하기";
  }

  // header 왼쪽 아이콘
  let leftIcon;
  if (HOME || ADMIN || MY_PAGE || PRODUCTS_LIST || CHATLIST || INFLUENCER) {
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
        <BackIcon />
      </button>
    );
  }

  // header 오른쪽 아이콘
  let rightIcon;
  if (HOME || ADMIN) {
    rightIcon = (
      <>
        <Link href={"/search"}>
          <SearchIcon />
        </Link>
        <Link href={"/cart"}>
          <CartIcon />
        </Link>
      </>
    );
  } else if (PRODUCTS_LIST || MY_PAGE || CHATLIST || INFLUENCER) {
    rightIcon = (
      <Link href={"/cart"}>
        <CartIcon />
      </Link>
    );
  } else if (SIGN_UP || LOGIN || SEARCH || PAYMENT) {
    rightIcon = (
      <Link href={"/"}>
        <XIcon />
      </Link>
    );
  }

  return (
    <>
      <header className="flex flex-row justify-between items-center h-12 w-[90%] mx-auto shrink-0">
        <div>{leftIcon}</div>
        <div className=" font-semibold text-xl">{headerTitle}</div>
        <div className="flex gap-2">{rightIcon}</div>
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
