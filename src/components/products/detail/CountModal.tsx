import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import cart from "../../../../public/icon/장바구니.png";
import closeIcon from "../../../../public/icon/close.png";

interface ModalProps {
  showModal: boolean;
  setShowModal: (show: boolean) => void;
  quantity: number;
  setQuantity: (quantity: number) => void;
  handleBuy: () => void;
  title: string;
  price: number;
  cost: number;
}

const CountModal = ({ showModal, setShowModal, quantity, setQuantity, handleBuy, title, price, cost }: ModalProps) => {
  const totalPrice = quantity * price;
  const totalCost = quantity * cost;
  return (
    <>
      <div
        className={`fixed inset-0 bg-gray-600 bg-opacity-50 z-40 ${
          showModal ? "opacity-100" : "opacity-0 pointer-events-none"
        } transition-opacity duration-300`}
      />

      <div
        className={`fixed inset-x-0 bottom-0 flex justify-center items-end z-50 transition-transform duration-300 ${
          showModal ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="bg-white p-5 rounded-t-[40px] shadow-lg w-full max-w-md relative">
          <button
            className="absolute top-2 right-2 p-1 bg-white rounded-full"
            onClick={() => setShowModal(false)}
            aria-label="Close"
          >
            <Image src={closeIcon} alt="Close" width={24} height={24} />
          </button>
          <h2 className="text-xl font-semibold flex-grow text-center my-4 ">주문 수량</h2>
          <h2 className="text-lg font-semibold mb-8 ">{title}</h2>
          <div className="border-[#F4F4F4] border-[1px] w-full my-4" />
          <div className="flex items-center justify-between my-4">
            <div className="flex items-center">
              <p className="text-lg">{totalPrice.toLocaleString()} 원</p>
              <p className="text-gray-300 line-through ml-2">{totalCost.toLocaleString()}</p>
            </div>
            <div className="flex items-center justify-center border rounded-md border-gray-400 bg-white w-[80px] h-[35px]">
              <button
                className="w-1/3 h-full hover:text-gray-400"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                -
              </button>
              <input
                type="text"
                className="w-1/3 h-full text-center border-none outline-none bg-white"
                value={quantity}
                readOnly
              />
              <button className="w-1/3 h-full hover:text-gray-400" onClick={() => setQuantity(quantity + 1)}>
                +
              </button>
            </div>
          </div>
          <div className="flex justify-between">
            <Link href={"/cart"}>
              <div>
                <Image src={cart} alt="장바구니로고" width={52} height={52} />
              </div>
            </Link>
            <Link href={"/payment"}>
              <button className="w-[278px] h-[52px] text-white bg-[#1A82FF] rounded-md" onClick={handleBuy}>
                구매하기
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default CountModal;
