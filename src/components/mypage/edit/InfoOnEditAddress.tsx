"use client";

import { getAddress } from "@/services/users/account/account.service";
import React, { FormEvent, useRef, useState } from "react";
import { Addr, PageData } from "../../../../types/addr.type";
import AddrPagination from "./AddrPagination";

const InfoOnEditAddress = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const [step, setStep] = useState<number>(1);
  const keyword = useRef<HTMLInputElement>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [data, setData] = useState<Addr[] | null>(null);
  const [pageData, setPageData] = useState<PageData | null>(null);

  const zipNoRef = useRef<HTMLInputElement>(null);
  const roadAddrRef = useRef<HTMLInputElement>(null);
  const [jibun, setJibun] = useState<string | null>(null);
  const userAddrRef = useRef<HTMLInputElement>(null);

  const openAddressForm = (e: FormEvent) => {
    e.preventDefault();
    setIsVisible(!isVisible);
  };

  const searchHandler = async (e: React.FormEvent, keyword: string, currentPage: number) => {
    e.preventDefault();
    if (!keyword) {
      alert("검색어를 입력해주세요");
    }

    setStep(1);
    setCurrentPage(1);

    const { results } = await getAddress({ keyword, currentPage });
    const { common, juso: data } = results;
    if (common?.errorCode !== "0") {
      alert(common?.errorMessage);
      return;
    }
    setPageData(common);
    setData(data);
  };

  const selectAddr = (e: React.MouseEvent, addr: Addr) => {
    setIsSelected(true);
    const { zipNo, roadAddr, jibunAddr } = addr;
    zipNoRef.current!.value = zipNo;
    roadAddrRef.current!.value = roadAddr;
    setJibun(jibunAddr);
  };

  const goNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    setStep((prev) => prev + 1);
  };

  return (
    <div>
      <p>배송지</p>
      <div>
        <div>
          <input type="text" ref={zipNoRef} readOnly className="border outline-none" />
          <button onClick={openAddressForm} className="bg-blue-300">
            주소 검색
          </button>
        </div>
        <div className={isVisible ? "bg-slate-200 fixed flex flex-col w-full h-screen top-0 left-0" : "hidden"}>
          <button onClick={openAddressForm} className="p-2 self-end">
            X
          </button>
          <form
            onSubmit={(e) => searchHandler(e, keyword.current?.value!, currentPage)}
            className="p-2 flex justify-between"
          >
            <input className="w-[80%]" ref={keyword} type="text" placeholder="검색어를 입력하세요" />
            <button className="w-[18%] border align-baseline bg-white font-bold">🔍</button>
          </form>
          <div className="w-full p-1 border flex justify-evenly items-center text-center">
            <p className="w-[14%]">우편 번호</p>
            <p className="w-[78%]">주소</p>
          </div>
          <>
            {step === 1 ? (
              <>
                <ul className="max-h-[488px] overflow-y-auto w-full bg-slate-300">
                  {data?.map((addr) => (
                    <li
                      key={addr?.bdMgtSn}
                      onClick={(e) => selectAddr(e, addr)}
                      className="flex justify-evenly items-center h-[61px] p-1 border"
                    >
                      <p className="w-[14%] text-[12px] font-bold text-center">
                        <input type="radio" name="" id="" />
                        {addr?.zipNo}
                      </p>
                      <div className="text-[12px] w-[78%]">
                        <span className="font-bold block">{addr?.roadAddr}</span>
                        <span className="text-[10px] block">{addr?.jibunAddr}</span>
                      </div>
                    </li>
                  ))}
                </ul>
                <AddrPagination
                  keyword={keyword.current?.value!}
                  currentPage={currentPage}
                  pageData={pageData}
                  setCurrentPage={setCurrentPage}
                  setPageData={setPageData}
                  setData={setData}
                />
              </>
            ) : step === 2 ? (
              <div>
                <div>
                  <span>{zipNoRef.current!.value}</span>
                  <p>{roadAddrRef.current!.value}</p>
                  <p>{jibun}</p>
                </div>
                <div className="">
                  <input className="text-[12px] w-[78%]" type="text" placeholder="상세 주소를 입력해주세요" />
                </div>
              </div>
            ) : (
              <div>검색된 주소가 없습니다!!!!!!!!!</div>
            )}
          </>
          <div>
            <button onClick={goNextStep} className="w-full p-2 bg-amber-400">
              {step === 1 ? "다음" : step === 2 ? "완료" : ""}
            </button>
          </div>
        </div>
        <div className="flex flex-row flex-wrap">
          <input type="text" ref={roadAddrRef} readOnly className="outline-none border w-full" />
          <input type="text" ref={userAddrRef} readOnly className="border outline-none w-full" />
        </div>
      </div>
    </div>
  );
};

export default InfoOnEditAddress;
