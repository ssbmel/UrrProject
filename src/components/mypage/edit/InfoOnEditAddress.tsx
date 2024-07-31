"use client";

import { getAddress } from "@/services/users/account/account.service";
import { FormEvent, useRef, useState } from "react";
import { Addr, PageData } from "../../../../types/addr.type";
import AddrPagination from "./AddrPagination";

interface Props {
  setAddress: React.Dispatch<React.SetStateAction<string | null>>;
}

const InfoOnEditAddress = ({ setAddress }: Props) => {
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
  const userAddrInsert = useRef<HTMLInputElement>(null);

  const openAddressForm = () => {
    keyword.current!.value = "";
    setData(null);
    setStep(1);
    setIsVisible(!isVisible);
  };

  const searchHandler = async (e: FormEvent, keyword: string, currentPage: number) => {
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
      keyword.current!.value = "";
      setAddress(`${zipNoRef.current!.value}, ${roadAddrRef.current!.value} ${userAddrInsert.current!.value}`);
      setData(null);
      setIsVisible(!isVisible);
      return;
    }
    setStep(2);
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
          <button onClick={openAddressForm} className="p-1 self-end">
            ❌
          </button>
          <form
            onSubmit={(e) => searchHandler(e, keyword.current?.value!, currentPage)}
            className="p-2 flex justify-between"
          >
            <input className="w-[80%]" ref={keyword} type="text" placeholder="검색어를 입력하세요" />
            <button className="w-[18%] border align-baseline bg-white font-bold">🔍</button>
          </form>
          {step === 1 ? (
            <div className="w-full p-1 border flex justify-evenly items-center text-center">
              <p className="w-[14%] text-[12px]">우편 번호</p>
              <p className="w-[78%] text-[12px]">주소</p>
            </div>
          ) : (
            <div className="w-full p-1 border flex justify-evenly items-center text-center">
              <p className="w-[92%] text-[12px]">주소</p>
            </div>
          )}
          <>
            {step === 1 ? (
              <div className="flex flex-col justify-center h-[75%] gap-1">
                {data ? (
                  <ul className="overflow-y-auto w-full flex flex-col justify-center bg-slate-300">
                    {data.length ? (
                      data.map((addr, idx) => (
                        <li key={addr?.bdMgtSn} onClick={() => selectAddr(addr)}>
                          <label
                            htmlFor={"address" + idx}
                            className="flex justify-evenly items-center h-[61px] p-1 border"
                          >
                            <input type="radio" name="address" id={"address" + idx} />
                            <p className="w-[14%] text-[12px] font-bold text-center">{addr?.zipNo}</p>
                            <div className="text-[12px] w-[78%]">
                              <span className="font-bold block">{addr?.roadAddr}</span>
                              <span className="text-[10px] block">{addr?.jibunAddr}</span>
                            </div>
                          </label>
                        </li>
                      ))
                    ) : (
                      <div className="w-full text-center">검색 결과가 없습니다.</div>
                    )}
                  </ul>
                ) : (
                  <div className="w-full text-center">검색할 주소를 입력해주세요</div>
                )}

                <AddrPagination
                  keyword={keyword.current?.value}
                  currentPage={currentPage}
                  pageData={pageData}
                  setCurrentPage={setCurrentPage}
                  setPageData={setPageData}
                  setData={setData}
                />
              </div>
            ) : step === 2 ? (
              <div>
                <div>
                  <span>{zipNoRef.current!.value}</span>
                  <p>{roadAddrRef.current!.value}</p>
                  <p>{jibun}</p>
                </div>
                <div>
                  <input
                    className="text-[12px] w-[78%]"
                    type="text"
                    ref={userAddrInsert}
                    placeholder="상세 주소를 입력해주세요"
                  />
                </div>
              </div>
            ) : (
              <div>검색된 주소가 없습니다!!!!!!!!!</div>
            )}
          </>
          <div className="h-[17%]">
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
