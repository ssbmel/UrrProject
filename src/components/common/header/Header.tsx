"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import logo from "../../../../public/logo/title_logo.png";
import BackIcon from "../../../../public/icon/backIcon.svg";
import SearchIcon from "../../../../public/icon/searchIcon.svg";
import CartIcon from "../../../../public/icon/cartIcon.svg";
import XIcon from "../../../../public/icon/XIcon.svg";
import { useState } from "react";
import SearchModal from "../search/SearchModal";

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
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
        <button
          onClick={() => {
            setIsModalOpen(true);
            setTimeout(() => setIsModalVisible(true), 100); // Slight delay to trigger animation
          }}
        >
          <SearchIcon />
        </button>
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
      <header className="flex flex-row justify-between items-center h-[50px] w-full mx-auto shrink-0 sticky top-0 bg-white z-50 px-[5%] py-[6px]">
        <div className="h-full min-w-[32px] p-[4px] flex justify-center items-center">{leftIcon}</div>
        <div className="font-semibold text-xl">{headerTitle}</div>
        <div className="flex gap-2 p-[4px]">{rightIcon}</div>
      </header>

      {isModalOpen && (
        <div
          className={`modal-overlay ${isModalVisible ? "visible" : ""}`}
          onClick={() => {
            setIsModalVisible(false);
            setTimeout(() => setIsModalOpen(false), 300); // Delay to match the animation duration
          }}
        >
          <div className={`modal-content ${isModalVisible ? "slide-down" : ""}`} onClick={(e) => e.stopPropagation()}>
            <SearchModal
              closeModal={() => {
                setIsModalVisible(false);
                setTimeout(() => setIsModalOpen(false), 300); // Delay to match the animation duration
              }}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
