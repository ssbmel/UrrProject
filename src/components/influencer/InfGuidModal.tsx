"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import sendImg from "../../../public/bgImg/send.png";
import Modal from "react-modal";

const ModalComponent: React.FC = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [hideForToday, setHideForToday] = useState(false);

  useEffect(() => {
    const isHiddenForToday = localStorage.getItem('hideModalForToday');
    if (!isHiddenForToday) {
      setModalIsOpen(true);
    } else {
      setHideForToday(true);
    }
  }, []);

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleHideForToday = () => {
    localStorage.setItem('hideModalForToday', 'true');
    setHideForToday(true);
    closeModal();
  };

  return (
    <>
      {!hideForToday && (
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          ariaHideApp={false}
          contentLabel="Influencer Subscription Modal"
          style={{
            content: {
              width: '90%',
              maxWidth: '500px',
              height: 'auto',
              maxHeight: '600px',
              top: '50%',
              left: '50%',
              right: 'auto',
              bottom: 'auto',
              marginRight: '-50%',
              transform: 'translate(-50%, -50%)',
              padding: '20px',
              borderRadius: '10px',
              boxShadow: '0px 5px 15px rgba(0,0,0,0.3)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            },
            overlay: {
              backgroundColor: 'rgba(0, 0, 0, 0.5)'
            }
          }}
        >
          <div className="relative w-[80px] h-[90px] xl:w-[150px] xl:h-[160px] mb-4 xl:mb-10">
            <Image 
              src={sendImg} 
              fill 
              sizes="w-[80px] xl:w-[150px]" 
              alt="가이드" 
              className="object-cover rounded mx-auto" 
            />
          </div>
          <h2 className="text-sm sm:text-base lg:text-lg xl:text-xl text-center my-4">
            인플루언서를 구독하고 메세지를 보내보세요!
          </h2>
          <div className="text-center">
            <button
              onClick={handleHideForToday}
              className="mr-3 px-3 py-2 rounded-sm border-none bg-[#F2F2F2] text-[14px] xl:text-[18px]">
              오늘은 그만보기
            </button>
            <button
              onClick={closeModal}
              className="mr-3 px-3 py-2 rounded-sm border-none bg-[#4C4F52] text-[#fff] text-[14px] xl:text-[18px]">
              닫기
            </button>
          </div>

        </Modal>
      )}
    </>
  );
};

export default ModalComponent;