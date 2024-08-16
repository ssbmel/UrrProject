import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import Image from "next/image";
import sendImg from "../../../public/bgImg/send.png";

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
          contentLabel="Influencer Subscription Modal"
          style={{
            content: {
              width: '90%', // 모바일을 고려해 너비를 퍼센트로 설정
              maxWidth: '500px', // 최대 너비를 400px로 제한
              height: 'auto', // 높이를 내용에 따라 자동 조절
              maxHeight: '600px', // 최대 높이 600px
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
          <div className="relative w-[150px] h-[180px] xl:w-[300px] xl:h-[330px] mb-4">
            <Image 
              src={sendImg} 
              fill 
              sizes="w-[150px] xl:w-[300px]" 
              alt="가이드" 
              className="object-cover rounded mx-auto" 
            />
          </div>
          <h2 style={{ textAlign: 'center', marginBottom: '10px' }} className="text-sm sm:text-base lg:text-lg xl:text-xl">
            인플루언서를 구독하고 메세지를 보내보세요!
          </h2>
          <div style={{ textAlign: 'center' }}>
            <button
              onClick={handleHideForToday}
              style={{
                marginRight: '10px',
                padding: '10px 20px',
                backgroundColor: '#f0f0f0',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer'
              }}
            >
              오늘은 그만보기
            </button>
            <button
              onClick={closeModal}
              style={{
                padding: '10px 20px',
                backgroundColor: '#0070f3',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer'
              }}
            >
              닫기
            </button>
          </div>
        </Modal>
      )}
    </>
  );
};

export default ModalComponent;
