"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Logo from "../../../../public/logo/title_logo.svg";
import BackIcon from "../../../../public/icon/backIcon.svg";
import SearchIcon from "../../../../public/icon/searchIcon.svg";
import CartIcon from "../../../../public/icon/cartIcon.svg";
import XIcon from "../../../../public/icon/XIcon.svg";
import AddProductIcon from "../../../../public/icon/addProductIcon.svg";
import { useEffect, useState } from "react";
import SearchModal from "../search/SearchModal";
import { useUserData } from "@/hooks/useUserData";
import { useMenuStore } from "@/zustand/MenuStore";

const MobileHeader = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const pathname = usePathname();
  const router = useRouter();
  const { data: user } = useUserData();

  const [isMobile, setIsMobile] = useState<boolean>(false);
  
  const HOME = pathname === "/";
  const ADMIN = pathname === "/admin";
  const LOGIN = pathname === "/login";
  const PRODUCTS_LIST = pathname === "/products/list";
  const MY_PAGE = pathname === "/mypage";
  const SIGN_UP = pathname === "/signup";
  const PRODUCTS_UPLOAD = pathname === "/products/upload/new";
  const SEARCH = pathname === "/search";
  const PAYMENT = pathname === "/payment";
  const CHATLIST = pathname === "/chatlist";
  const INFLUENCER = pathname === "/influencer";
  const { setActiveMenu } = useMenuStore();

  const isInfluncer = () => {
    if (user?.approve === true) {
      return true;
    }
    return false;
  };

  const isActiveMenu = () => {
    setActiveMenu("/");
    router.push("/");
  };

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
        <Logo />
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
            setTimeout(() => setIsModalVisible(true), 100);
          }}
        >
          <SearchIcon />
        </button>
        <Link href={"/cart"}>
          <CartIcon />
        </Link>
      </>
    );
  } else if (SIGN_UP || LOGIN || SEARCH || PAYMENT) {
    rightIcon = (
      <button onClick={isActiveMenu}>
        <XIcon />
      </button>
    );
  } else {
    rightIcon = (
      <Link href={"/cart"}>
        <CartIcon />
      </Link>
    );
  }

  if (MY_PAGE) {
    if (() => isInfluncer()) {
      rightIcon = (
        <>
          <Link href={"/products/upload/new"}>
            <AddProductIcon />
          </Link>
          <Link href={"/cart"}>
            <CartIcon />
          </Link>
        </>
      );
    }
  }

  useEffect(()=>{
    setIsMobile(/Mobi/i.test(window.navigator.userAgent));
  },[])

  if (!isMobile && (pathname.startsWith("/chatlist/") && pathname.split("/").length === 3)) {
    return null;
  }

  return (
    <>
      <header className="flex flex-row justify-between items-center h-[52px] w-full mx-auto shrink-0  bg-white z-50 px-[5%] pt-[10px] pb-[6px]">
        <div className="h-full min-w-[32px] p-[4px] flex justify-center items-center">{leftIcon}</div>
        <div className="font-semibold text-xl">{headerTitle}</div>
        <div className="flex gap-2 p-[4px]">{rightIcon}</div>
      </header>
      <div></div>
      {isModalOpen && (
        <div
          className={`modal-overlay ${isModalVisible ? "visible" : ""}`}
          onClick={() => {
            setIsModalVisible(false);
            setTimeout(() => setIsModalOpen(false), 300);
          }}
        >
          <div className={`modal-content ${isModalVisible ? "slide-down" : ""}`} onClick={(e) => e.stopPropagation()}>
            <SearchModal
              closeModal={() => {
                setIsModalVisible(false);
                setTimeout(() => setIsModalOpen(false), 300);
              }}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default MobileHeader;
