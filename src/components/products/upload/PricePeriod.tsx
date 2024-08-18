"use client";

import { RefObject } from "react";
import ArrowRight from "../../../../public/icon/arrowR.svg";

interface PricePeriodProps {
  startDateRef: RefObject<HTMLInputElement>;
  endDateRef: RefObject<HTMLInputElement>;
  costRef: RefObject<HTMLInputElement>;
  priceRef: RefObject<HTMLInputElement>;
  productCountRef: RefObject<HTMLInputElement>;
}

const PricePeriod: React.FC<PricePeriodProps> = ({ startDateRef, endDateRef, costRef, priceRef, productCountRef }) => {
  const today = new Date();

  const formatNumberWithLocale = (value: string) => {
    const cleanedValue = value.replace(/[^0-9]/g, "");
    const numberValue = parseInt(cleanedValue, 10);
    return isNaN(numberValue) ? "" : numberValue.toLocaleString();
  };

  const enforcePositiveValue = (e: React.FormEvent<HTMLInputElement>) => {
    const input = e.currentTarget;
    const formattedValue = formatNumberWithLocale(input.value);

    input.value = formattedValue;
  };

  const preventInvalidInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (["e", "E", "+", "-"].includes(e.key)) {
      e.preventDefault();
    }
  };

  const validateDates = () => {
    const startDate = startDateRef.current?.value;
    const endDate = endDateRef.current?.value;

    if (startDate && endDate && new Date(startDate) > new Date(endDate)) {
      alert("종료 날짜는 시작 날짜 이후여야 합니다.");
      if (endDateRef.current) {
        endDateRef.current.value = "";
      }
    }
  };

  return (
    <details open className="w-full px-4 contents-box">
      <h1 className="font-bold text-xl my-5 hidden xl:block">기간 및 가격 설정</h1>
      <summary className="font-bold text-xl xl:hidden">기간 및 가격 설정</summary>
      <hr className="xl:hidden" />
      <div className="my-5 mx-auto flex gap-2 items-center">
        <span className="whitespace-nowrap w-[70px] xl:w-[156px] xl:text-[18px]  text-[#4C4F52]">진행 기간</span>
        <input
          type="date"
          min={today.toISOString().substring(0, 10)}
          ref={startDateRef}
          className="w-[110px] border xl:w-[156px] xl:h-[27px]"
        />
        <span className="mx-1">~</span>
        <input
          type="date"
          min={today.toISOString().substring(0, 10)}
          ref={endDateRef}
          onChange={validateDates}
          className="w-[110px] border xl:w-[156px] xl:h-[27px]"
        />
      </div>
      <div className="my-5 mx-auto flex gap-2 items-center">
        <span className="whitespace-nowrap w-[70px] xl:w-[156px] xl:h-[27px] xl:text-[18px] text-[#4C4F52]">가격</span>
        <input
          type="text"
          className="w-[110px] border xl:w-[156px] xl:h-[27px]"
          placeholder="원가"
          ref={costRef}
          onKeyDown={preventInvalidInput}
          onInput={enforcePositiveValue}
        />
        <ArrowRight />
        <input
          type="text"
          className="w-[110px] border xl:w-[156px] xl:h-[27px]"
          placeholder="판매가"
          ref={priceRef}
          onKeyDown={preventInvalidInput}
          onInput={enforcePositiveValue}
        />
      </div>
      <div className="mx-auto flex gap-2 items-center mb-5">
        <span className="whitespace-nowrap w-[70px] xl:w-[155px] xl:h-[27px] xl:text-[18px]">수량</span>
        <input
          type="text"
          className="w-[110px] border xl:w-[156px] xl:h-[27px]"
          placeholder="상품 등록 수"
          ref={productCountRef}
          onKeyDown={preventInvalidInput}
          onInput={enforcePositiveValue}
        />
      </div>
    </details>
  );
};

export default PricePeriod;
