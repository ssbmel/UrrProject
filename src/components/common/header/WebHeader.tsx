"use client";

import Image from "next/image";
import Logo from "../../../../public/logo/logo_big.png";
import { useState } from "react";
import SearchModal from "../search/SearchModal";
import CartIcon from "../../../../public/icon/cartIcon.svg";
import SearchIcon from "../../../../public/icon/searchIcon.svg";
import MypageIcon from "../../../../public/icon/mypageIcon.svg";
import ChatIcon from "../../../../public/icon/chatIcon.svg";
import Link from "next/link";

export function WebHeader() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  return (
    <>
      <header className="flex flex-row justify-between items-center h-[108px] w-full mx-auto shrink-0 sticky top-0 bg-white z-50 px-[6%] py-[6px]">
        <ul className="flex flex-row items-center">
          <Link href={"/"}>
            <Image src={Logo} alt="Urr logo" width={121} height={66} className="mr-[71px]" />
          </Link>
          <Link href={"/products/list"}>
            <li className="text-xl mr-10 cursor-pointer hover:text-primarystrong">Store</li>
          </Link>
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

          <Link href={"/chatlist"}>
            <ChatIcon />
          </Link>
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
