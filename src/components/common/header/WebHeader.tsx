"use client";

import Image from "next/image";
import Logo from "../../../../public/logo/logo_big.png";
import { useEffect, useState } from "react";
import SearchModal from "../search/SearchModal";
import CartIcon from "../../../../public/icon/w_cart.svg";
import SearchIcon from "../../../../public/icon/w_search.svg";
import MypageIcon from "../../../../public/icon/mypageIcon.svg";
import ChatIcon from "../../../../public/icon/chatIcon.svg";
import Link from "next/link";
import ChatList from "@/components/chat/ChatList";
import { useAlertchatStore } from "@/zustand/alertchatStore";
import { usePathname } from "next/navigation";

export function WebHeader() {
  const pathname = usePathname();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [isHoveringStore, setIsHoveringStore] = useState<boolean>(false);

  const { isChatModalOpen, setIsChatModalOpen } = useAlertchatStore();

  const handleChatButton = () => {
    if (isChatModalOpen) {
      setIsChatModalOpen(false);
    } else {
      setIsChatModalOpen(true);
    }
  };

  useEffect(() => {
    setIsChatModalOpen(false);
  }, [pathname]);

  return (
    <>
      <header className="flex flex-row justify-between items-center h-[108px] w-full mx-auto shrink-0 sticky top-0 bg-white z-50 px-[6%] py-[6px] ">
        <ul className="flex flex-row items-center">
          <Link href={"/"}>
            <Image src={Logo} alt="Urr logo" width={121} height={66} className="mr-[71px] priority" />
          </Link>
          <li className="text-xl mr-10 cursor-pointer  relative">
            <Link href={"/products/list"}>
              <p className="hover:text-primarystrong">Store</p>
            </Link>
            {/* {isHoveringStore && (
              <div className="fixed flex left-0 top-[108px] w-full h-[344px] px-[6%] hover: bg-white z-40 shadow-lg ">
                <div className="w-[192px]" />
                <div className="w-[104px]  flex flex-col text-[18px] gap-[10px]">
                  <Link href="/products/list?category=뷰티">
                    <p className="hover:text-primarystrong">뷰티</p>
                  </Link>
                  <Link href="/products/list?category=패션/잡화">
                    <p className="hover:text-primarystrong">패션잡화</p>
                  </Link>
                  <Link href="/products/list?category=식품">
                    <p className="hover:text-primarystrong">식품</p>
                  </Link>
                  <Link href="/products/list?category=헬스건강">
                    <p className="hover:text-primarystrong">헬스/건강</p>
                  </Link>
                  <Link href="/products/list?category=반려동물용품">
                    <p className="hover:text-primarystrong">반려동물용품</p>
                  </Link>
                  <Link href="/products/list?category=생활용품">
                    <p className="hover:text-primarystrong">생활용품</p>
                  </Link>
                  <Link href="/products/list?category=가전/디지털">
                    <p className="hover:text-primarystrong">가전/디지털</p>
                  </Link>
                  <Link href="/products/list?category=취미/도서">
                    <p className="hover:text-primarystrong">취미/도서</p>
                  </Link>
                </div>
              </div>
            )} */}
          </li>

          <Link href={"/influencer"}>
            <li className="text-xl cursor-pointer hover:text-primarystrong">Influencers</li>
          </Link>
        </ul>

        <div className="flex flex-row gap-6">
          <div>
            <button
              onClick={() => {
                setIsModalOpen(true);
                setTimeout(() => setIsModalVisible(true), 100);
              }}
            >
              <SearchIcon />
            </button>
          </div>

          <Link href={"/cart"}>
            <CartIcon />
          </Link>

          <Link href={"/mypage"}>
            <MypageIcon />
          </Link>

          <div>
            <button onClick={handleChatButton}>
              <ChatIcon />
            </button>
          </div>

          {isChatModalOpen && (
            <div className="border-4 rounded-lg border-primaryheavy overflow-y-auto scrollbar-hide fixed z-50 top-[88px] right-[84px] w-[301px] h-[380px] shadow-2xl bg-white justify-center">
              <ChatList />
            </div>
          )}
        </div>
      </header>

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
}
