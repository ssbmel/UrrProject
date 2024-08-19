"use client";

import { RefObject, useState } from "react";
import ArrowRight from "../../../../public/icon/arrowR.svg";

interface PricePeriodProps {
  startDateRef: RefObject<HTMLInputElement>;
  endDateRef: RefObject<HTMLInputElement>;
  costRef: RefObject<HTMLInputElement>;
  priceRef: RefObject<HTMLInputElement>;
  productCountRef: RefObject<HTMLInputElement>;
}

const PricePeriod: React.FC<PricePeriodProps> = ({
  startDateRef,
  endDateRef,
  costRef,
  priceRef,
  productCountRef,
}) => {
  const today = new Date();

  const [costError, setCostError] = useState<string>("");
  const [priceError, setPriceError] = useState<string>("");
  const [dateError, setDateError] = useState<string>("");

  const enforcePositiveValue = (
    e: React.FormEvent<HTMLInputElement>,
    setError: (msg: string) => void
  ) => {
    const input = e.currentTarget;
    const cleanedValue = input.value.replace(/[^0-9.]/g, "");

    if (Number(cleanedValue) < 1000 && cleanedValue !== "") {
      setError("금액은 1,000원 이상이어야 합니다.");
    } else {
      setError("");
      input.value = cleanedValue;
    }
  };

  const handleCostInput: React.FormEventHandler<HTMLInputElement> = (e) => {
    enforcePositiveValue(e, setCostError);
  };

  const handlePriceInput: React.FormEventHandler<HTMLInputElement> = (e) => {
    enforcePositiveValue(e, setPriceError);
  };

  const preventInvalidInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (["e", "E", "+", "-", ","].includes(e.key)) {
      e.preventDefault();
    }
  };

  const validateDates = () => {
    const startDate = startDateRef.current?.value;
    const endDate = endDateRef.current?.value;

    if (startDate && endDate && new Date(startDate) > new Date(endDate)) {
      setDateError("※종료 날짜는 시작 날짜 이후여야 합니다.");
      if (endDateRef.current) {
        endDateRef.current.value = "";
      }
    } else {
      setDateError("");
    }
  };

  return (
    <details open className="w-full px-4 contents-box">
      <h1 className="font-bold text-xl my-5 hidden xl:block">기간 및 가격 설정</h1>
      <summary className="font-bold text-xl xl:hidden">기간 및 가격 설정</summary>
      <hr className="xl:hidden" />
      <div className="my-5 mx-auto grid gap-2 items-center">
        <div className="flex gap-2 items-center">
          <span className="whitespace-nowrap w-[60px] xl:w-[156px] xl:text-[18px] text-[#4C4F52]">진행 기간</span>
          <input
            type="date"
            min={today.toISOString().substring(0, 10)}
            ref={startDateRef}
            className="w-[110px] h-[36px] border xl:w-[156px] xl:h-[27px]"
          />
          <span className="mx-1">~</span>
          <input
            type="date"
            min={today.toISOString().substring(0, 10)}
            ref={endDateRef}
            onChange={validateDates}
            className="w-[110px] h-[36px] border xl:w-[156px] xl:h-[27px]"
          />
        </div>
        {dateError && <p className="text-red-500 text-sm mt-1 p-0">{dateError}</p>}
      </div>

      <div className="my-5 mx-auto grid gap-2 items-center">
        <div className="flex gap-2 items-center">
          <span className="whitespace-nowrap w-[60px] xl:w-[156px] xl:text-[18px] text-[#4C4F52]">가격</span>
          <input
            type="text"
            className="w-[110px] h-[36px] border xl:w-[156px] xl:h-[27px]"
            placeholder="원가"
            ref={costRef}
            onKeyDown={preventInvalidInput}
            onInput={handleCostInput}
          />
          <ArrowRight />
          <input
            type="text"
            className="w-[110px] h-[36px] border xl:w-[156px] xl:h-[27px]"
            placeholder="판매가"
            ref={priceRef}
            onKeyDown={preventInvalidInput}
            onInput={handlePriceInput}
          />
        </div>
        {(costError || priceError) && (
    <div className="mt-1">
      <p className="text-red-500 text-sm p-0">
        {costError && priceError ? `${costError}` : costError || priceError}
      </p>
    </div>
  )}
      </div>

      <div className="mx-auto flex gap-2 items-center mb-5">
        <span className="whitespace-nowrap w-[60px] xl:w-[155px] xl:h-[27px] xl:text-[18px]">수량</span>
        <input
          type="text"
          className="w-[110px] h-[36px] border xl:w-[156px] xl:h-[27px]"
          placeholder="상품 등록 수"
          ref={productCountRef}
          onKeyDown={preventInvalidInput}
        />
      </div>
    </details>
  );
};

export default PricePeriod;
