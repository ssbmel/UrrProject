"use client";

import Image from "next/image";
import cart from "../../../../public/icon/장바구니.png";
import { useEffect, useState } from "react";
import useGetProductDetail from "@/hooks/useGetProductDetail";
import ReviewList from "./ReviewList";
import ProductInquiry from "./ProductInquiry";
import DetailImg from "./DetailImg";
import share from "../../../../public/icon/share.png";
import expiredCart from "../../../../public/icon/cartGray.png";
import CountModal from "./CountModal";
import { useAddrStore } from "@/zustand/addrStore";
import { useRouter } from "next/navigation";
import DetailInflu from "./DetailInflu";
import LoadingUrr from "@/components/common/loading/LoadingUrr";
import useGetProductReview from "@/hooks/useGetProductReview";
import WebpDetail from "./WebpDetail";

interface detailProps {
  params: { id: string };
}

type CompoStateType = "상품정보" | "상품후기" | "상품문의";

export default function Detail({ params }: detailProps) {
  const { data, isLoading } = useGetProductDetail({ id: params.id });
  const { data: review } = useGetProductReview({ id: params.id });
  const [loading, setLoading] = useState<boolean>(true);
  const [compoState, setCompoState] = useState<CompoStateType>("상품정보");
  const [restart, setRestart] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [quantity, setQuantity] = useState<number>(1);
  const { setProductList } = useAddrStore();
  const router = useRouter();

  const cost = parseFloat(data?.cost);
  const price = parseFloat(data?.price);
  const discountPercentage = ((cost - price) / cost) * 100;
  const discountPercentageInteger = Math.floor(discountPercentage);

  const endDate = data?.end;
  const isExpired = endDate && new Date(endDate) < new Date();

  useEffect(() => {
    if (!isLoading) {
      setLoading(false);
    }
  }, [isLoading]);

  const getClassNames = (state: any) => {
    return `w-[120px] xl:w-[182px] text-[16px] xl:text-[20px] px-3 py-4 flex justify-center items-center border-b-4 ${
      compoState === state ? "border-blue-500 text-blue-500" : "border-gray-200"
    }`;
  };

  const handleBuy = () => {
    setShowModal(false);
    setProductList([
      {
        id: data.id,
        name: data.title,
        amount: data.price,
        quantity: quantity,
        imgUrl: data.main_img
      }
    ]);
    router.push(`/payment`);
  };

  const handleShare = () => {
    const url = window.location.href;
    navigator.clipboard
      .writeText(url)
      .then(() => {
        alert("URL이 클립보드에 복사되었습니다!");
      })
      .catch((error) => {
        console.error("URL 복사 실패:", error);
      });
  };

  if (loading) {
    return <LoadingUrr />;
  }

  return (
    <>
      <div className="flex flex-col min-h-screen xl:w-full">
        <WebpDetail
          id={params.id}
          handleBuy={handleBuy}
          quantity={quantity}
          setQuantity={setQuantity}
          title={data?.title}
          main_img={data?.main_img}
          nickname={data?.nickname}
          end={data?.end}
        />
        <div className="xl:hidden">
          <div className="flex justify-center w-full relative">
            {data && (
              <>
                <Image
                  src={data?.main_img}
                  alt={data?.title}
                  width={500}
                  height={375}
                  priority
                  className={`rounded-md object-cover ${isExpired ? "opacity-50 " : ""}`}
                />
                {isExpired && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-md ">
                    <p className="text-[#FFFFFE] text-[20px] ">판매 종료</p>
                  </div>
                )}
              </>
            )}
            <div></div>
          </div>

          <DetailInflu userId={data?.user_id} />
          <div className="border-[#F4F4F4] border-[1px] w-full" />

          <div className="my-[20px] mx-4">
            <div className="flex justify-between items-cente py-2">
              <p className="text-xl flex items-center font-normal text-[#1B1C1D]">{data?.title}</p>
              <div>
                <Image src={share} alt="공유하기" width={38} height={38} onClick={handleShare} />
              </div>
            </div>
            <p className="text-gray-300 line-through font-light">{cost.toLocaleString()}</p>
            <p className="my-1 text-[18px]">
              <span className={`${isExpired ? "text-[#B2B5B8]" : "text-red-500"}`}>{discountPercentageInteger}%</span>
              <span className={`ml-1 font-medium ${isExpired ? "text-[#B2B5B8]" : "text-[#1B1C1D]"}`}>
                {price.toLocaleString()} 원
              </span>
            </p>
          </div>
          <div className="border-[#F4F4F4] border-[6px] w-full mt-3" />
          <div className="m-4 mx-auto w-[375px] flex flex-col items-center">
            <div className="flex flex-col gap-[14px] my-2 text-[16px]">
              <div className="flex">
                <span className="w-[105px] text-[#4C4F52]">진행기간</span>
                <span className="text-[#1B1C1D]">
                  {data?.start} ~ {data?.end}
                </span>
              </div>
              <div className="flex">
                <span className="w-[105px] text-[#4C4F52]">배송 예정일</span>
                <span className="text-[#1B1C1D]">08.21 순차적으로 출고</span>
              </div>
              <div className="flex">
                <span className="w-[105px] text-[#4C4F52]">택배사</span>
                <span className="text-[#1B1C1D]">cj 대한통운</span>
              </div>
              <div className="flex">
                <span className="w-[105px] text-[#4C4F52]">배송비</span>
                <div className="flex flex-col">
                  <span className="text-[#1B1C1D]">3,000원</span>
                  <span className="text-[14px] text-[#989C9F]">제주 5,000 원 / 도서산간 5,000 원</span>
                </div>
              </div>

              <div className="w-[375px] h-[124px] rounded-lg bg-[#E1EEFE] flex flex-col justify-center mt-5 p-4 gap-[12px] px-[14px] py-[12px]">
                <div className="text-[16px] font-semibold text-[#0051B2]">주문 전 확인해주세요!</div>
                <div className="text-[14px] text-[#4C4F52]">{data?.text}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="border-[#F4F4F4] border-[6px] w-full mt-3" />
        <div className="flex flex-col w-full mx-auto">
          <div className="flex justify-center items-center">
            <div onClick={() => setCompoState("상품정보")} className={getClassNames("상품정보")}>
              상품 정보
            </div>
            <div onClick={() => setCompoState("상품후기")} className={getClassNames("상품후기")}>
              상품 후기 ({review?.length})
            </div>
            <div onClick={() => setCompoState("상품문의")} className={getClassNames("상품문의")}>
              상품 문의
            </div>
          </div>
          <div className="component w-full">
            {compoState === "상품정보" && (
              <div>
                <DetailImg id={params.id} />
              </div>
            )}
            {compoState === "상품후기" && (
              <div>
                <ReviewList id={params.id} />
              </div>
            )}
            {compoState === "상품문의" && (
              <div>
                <ProductInquiry id={params.id} restart={restart} setRestart={setRestart} />
              </div>
            )}
          </div>
        </div>
        <div className="paybar sticky bottom-0 bg-white left-0 w-full z-30 xl:hidden">
          <div className="flex justify-evenly py-2">
            <div>
              <Image
                src={isExpired ? expiredCart : cart}
                alt="장바구니로고"
                width={52}
                height={52}
                className={isExpired ? "cursor-not-allowed" : ""}
              />
            </div>
            <div>
              <button
                onClick={() => {
                  if (!isExpired) setShowModal(true);
                }}
                className={`w-[278px] h-[52px] text-white text-[18px] rounded-md ${
                  isExpired ? "bg-[#F2F2F2] text-[#bcbebf]  cursor-not-allowed" : "bg-[#1A82FF]"
                }`}
                disabled={isExpired}
              >
                {isExpired ? "판매 종료" : "구매하기"}
              </button>
            </div>
          </div>
        </div>
      </div>
      <CountModal
        id={params.id}
        showModal={showModal}
        setShowModal={setShowModal}
        quantity={quantity}
        setQuantity={setQuantity}
        handleBuy={handleBuy}
        title={data?.title}
        price={price}
        cost={cost}
        main_img={data?.main_img}
        nickname={data?.nickname}
        end={data?.end}
      />
    </>
  );
}
