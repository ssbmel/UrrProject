"use client";

import { getAddress } from "@/services/users/account/account.service";
import { FormEvent, useRef, useState } from "react";
import { Addr, PageData } from "../../../../types/addr.type";
import AddrPagination from "./AddrPagination";

interface Props {
  address: string | string[];
  setAddress: React.Dispatch<React.SetStateAction<string | null>>;
  required?: boolean;
}

const InfoOnEditAddress = ({ address, setAddress, required }: Props) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const [step, setStep] = useState<number>(1);
  const searchKeyword = useRef<HTMLInputElement>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [data, setData] = useState<Addr[] | null>(null);
  const [pageData, setPageData] = useState<PageData | null>(null);

  const zipNoRef = useRef<HTMLInputElement>(null);
  const roadAddrRef = useRef<HTMLInputElement>(null);
  const [jibun, setJibun] = useState<string | null>(null);
  const userAddrRef = useRef<HTMLInputElement>(null);
  const userAddrInsert = useRef<HTMLInputElement>(null);

  const openAddressForm = () => {
    searchKeyword.current!.value = "";
    setData(null);
    setStep(1);
    setIsVisible(!isVisible);
  };

  const searchHandler = async (e: FormEvent, keyword: string, currentPage: number) => {
    e.preventDefault();

    if (keyword === "") {
      alert("검색어를 입력해주세요");
      searchKeyword.current?.focus();
      return;
    }

    setStep(1);
    setCurrentPage(1);

    const res = await getAddress({ keyword, currentPage });

    const { results } = res;
    const { common, juso: data } = results;

    if (common?.errorCode !== "0") {
      console.log(common);
      alert(common?.errorMessage);
      return;
    }

    setPageData(common);
    setData(data);
  };

  const selectAddr = (addr: Addr) => {
    setIsSelected(true);
    const { zipNo, roadAddr, jibunAddr } = addr;
    zipNoRef.current!.value = zipNo;
    roadAddrRef.current!.value = roadAddr;
    setJibun(jibunAddr);
  };

  const goNextStep = () => {
    if (!zipNoRef.current!.value) {
      alert("입력할 주소를 선택해주세요");
      return;
    }
    if (step === 2) {
      if (!userAddrInsert.current!.value) {
        alert("상세 주소를 입력해주세요");
        return;
      }
      userAddrRef.current!.value = userAddrInsert.current!.value;
      searchKeyword.current!.value = "";
      setAddress(`${zipNoRef.current!.value},${roadAddrRef.current!.value},${userAddrInsert.current!.value}`);
      setData(null);
      setIsVisible(!isVisible);
      return;
    }
    setStep(2);
  };

  return (
    <div className="flex flex-col gap-[8px] w-full">
      <p className="">
        <span>주소</span>
        {required && <span className="text-red-600">*</span>}
      </p>
      <div className="flex flex-col gap-[12px]">
        <div className="flex gap-[8px]">
          <input
            type="text"
            ref={zipNoRef}
            defaultValue={address[0]}
            readOnly
            className="h-[48px] border rounded-[6px] p-[4px] pr-[8px] pl-[8px] w-1/3 outline-none"
            placeholder="우편번호"
          />
          <button
            onClick={openAddressForm}
            className="border p-[7px] pr-[14px] pl-[14px] text-[14px] rounded-[4px] text-[#0068E5] h-[48px]"
          >
            주소 검색
          </button>
        </div>
        <div
          className={
            isVisible
              ? "bg-[#FFFFFE] fixed flex flex-col justify-between w-full h-full top-0 left-0 z-[100] overflow-y-auto"
              : "hidden"
          }
        >
          <div>
            <div className="flex justify-end p-[6px] pr-[16px] pl-[16px] h-[40px]">
              <button onClick={openAddressForm} className="w-[32px] h-[32px] text-[20px]">
                ✖
              </button>
            </div>
            <form
              onSubmit={(e) => searchHandler(e, searchKeyword.current!.value, currentPage)}
              className="p-[16px] pt-[28px] pb-[28px] flex flex-col justify-center gap-[8px]"
            >
              <p className="text-[18px]">도로명 주소를 입력해주세요</p>
              <div className="h-[51px] flex justify-between">
                <input
                  className="w-[80%] p-[12px] pt-[4px] pb-[4px] rounded-[6px] border"
                  ref={searchKeyword}
                  type="text"
                  placeholder="ex) 종로1가"
                />
                <button className="w-[18%] rounded-[6px] font-[600] text-[#0068E5] bg-[#F2F2F2]">검색</button>
              </div>
            </form>
            <hr className="border-4" />
            {step === 1 ? (
              <div className="w-[calc(100%-32px)] ml-[16px] mr-[16px] pt-[16px] pb-[16px] flex justify-evenly items-center text-center text-[14px] border-b">
                <p className="w-[25%] text-[12px]">우편 번호</p>
                <p className="w-[70%] text-[12px]">주소</p>
              </div>
            ) : (
              <div className="w-[calc(100%-32px)] ml-[16px] mr-[16px] pt-[16px] pb-[16px] flex justify-evenly items-center text-center text-[14px] border-b">
                <p className="w-[95%] text-[12px]">주소</p>
              </div>
            )}
            <>
              {step === 1 ? (
                <div className="flex flex-col justify-center gap-1">
                  {data ? (
                    <ul className="overflow-y-auto w-[calc(100%-32px)] ml-[16px] mr-[16px] flex flex-col justify-center bg-[#FFFFFE]">
                      {data.length ? (
                        data.map((addr, idx) => (
                          <li key={addr?.bdMgtSn} onClick={() => selectAddr(addr)}>
                            <label
                              htmlFor={"address" + idx}
                              className="flex justify-evenly items-center h-[81px] text-[12px] pt-[20px] pb-[20px] border-b"
                            >
                              <div className="flex gap-[6px] w-[25%] items-center">
                                <input
                                  type="radio"
                                  name="address"
                                  className="w-[18px] h-[18px] m-[4px] p-[6px] focus:ring-0"
                                  id={"address" + idx}
                                />
                                <p className="font-bold text-center">{addr?.zipNo}</p>
                              </div>
                              <div className="text-[12px] w-[70%]">
                                <span className="font-bold block">{addr?.roadAddr}</span>
                                <span className="text-[10px] block">{addr?.jibunAddr}</span>
                              </div>
                            </label>
                          </li>
                        ))
                      ) : (
                        <div className="w-full text-center flex items-center justify-center text-[#CDCFD0] min-h-[550px]">
                          <p>검색 결과가 없습니다.</p>
                        </div>
                      )}
                    </ul>
                  ) : (
                    <div className="w-full text-center flex items-center justify-center text-[#CDCFD0] min-h-[550px]">
                      <p>검색할 주소를 입력해주세요</p>
                    </div>
                  )}
                  <AddrPagination
                    keyword={searchKeyword.current?.value}
                    currentPage={currentPage}
                    pageData={pageData}
                    setCurrentPage={setCurrentPage}
                    setPageData={setPageData}
                    setData={setData}
                  />
                </div>
              ) : step === 2 ? (
                <div className="p-[16px] flex flex-col gap-[16px] min-h-[340px]">
                  <div className="flex flex-col gap-[8px]">
                    <span className="text-[14px]">{zipNoRef.current!.value}</span>
                    <div>
                      <p className="font-bold">{roadAddrRef.current!.value}</p>
                      <p className="text-[#4C4F52]">{jibun}</p>
                    </div>
                  </div>
                  <div>
                    <input
                      type="text"
                      ref={userAddrInsert}
                      placeholder="상세 주소"
                      className="h-[48px] w-full border rounded-[6px] p-[4px] pr-[8px] pl-[8px] indent-[4px]"
                    />
                  </div>
                </div>
              ) : (
                <div className="w-full text-center flex items-center justify-center text-[#CDCFD0] min-h-[340px]">
                  <p>검색 결과가 없습니다.</p>
                </div>
              )}
            </>
          </div>
          <div className="h-[10%]">
            <button
              onClick={goNextStep}
              className="w-[calc(100%-32px)] m-[16px] mb-[18px] mt-[8px] h-[52px] p-[14px] pr-[36px] pl-[36px] text-[#FFFFFE] rounded-[8px] bg-[#1A82FF]"
            >
              {step === 1 ? "다음" : step === 2 ? "완료" : ""}
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-[12px]">
          <input
            type="text"
            ref={roadAddrRef}
            defaultValue={address[1]}
            readOnly
            className="h-[48px] border rounded-[6px] p-[4px] pr-[8px] pl-[8px] indent-[4px] outline-none"
          />
          <input
            type="text"
            ref={userAddrRef}
            defaultValue={address[2]}
            readOnly
            className="h-[48px] border rounded-[6px] p-[4px] pr-[8px] pl-[8px] indent-[4px] outline-none"
          />
        </div>
      </div>
    </div>
  );
};

export default InfoOnEditAddress;
