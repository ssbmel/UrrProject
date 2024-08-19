"use client";

import { getAddress } from "@/services/users/account/account.service";
import { FormEvent, useEffect, useRef, useState } from "react";
import { Addr, PageData } from "../../../../types/addr.type";
import AddrPagination from "./AddrPagination";
import swal from "sweetalert";

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
  const [zipNostate, setZipNoState] = useState<string>("");
  const roadAddrRef = useRef<HTMLInputElement>(null);
  const [roadAddrState, setRoadAddrState] = useState<string>("");

  const [jibun, setJibun] = useState<string | null>(null);

  const userAddrRef = useRef<HTMLInputElement>(null);
  const userAddrInsert = useRef<HTMLInputElement>(null);
  const [userAddrState, setUserAddrState] = useState<string>("");

  const openAddressForm = () => {
    searchKeyword.current!.value = "";
    setData(null);
    setStep(1);
    setIsVisible(!isVisible);
  };

  const searchHandler = async (e: FormEvent, keyword: string, currentPage: number) => {
    e.preventDefault();
    setZipNoState("");
    setRoadAddrState("");
    setUserAddrState("");

    if (keyword === "") {
      swal("검색어를 입력해주세요");
      searchKeyword.current?.focus();
      return;
    }

    setStep(1);
    setCurrentPage(1);

    const res = await getAddress({ keyword, currentPage });

    const { results } = res;
    const { common, juso: data } = results;

    if (common?.errorCode !== "0") {
      swal(common?.errorMessage);
      return;
    }

    setPageData(common);
    setData(data);
  };

  const selectAddr = (addr: Addr) => {
    setIsSelected(true);
    const { zipNo, roadAddr, jibunAddr } = addr;
    setZipNoState(zipNo);
    setRoadAddrState(roadAddr);
    setJibun(jibunAddr);
  };

  useEffect(() => {
    if (step === 2 && userAddrInsert.current !== null) {
      userAddrInsert.current.focus();
    }
  }, [step]);

  const goNextStep = () => {
    if (step === 1) {
      if (roadAddrState === "" || zipNostate === "") {
        swal("입력할 주소를 선택해주세요");
        return;
      }
      setStep(2);
    }
    if (step === 2) {
      if (!userAddrInsert.current!.value) {
        swal("상세 주소를 입력해주세요");
        return;
      }
      searchKeyword.current!.value = "";

      userAddrRef.current!.value = userAddrState;
      zipNoRef.current!.value = zipNostate;
      roadAddrRef.current!.value = roadAddrState;

      setAddress(`${zipNostate},${roadAddrState},${userAddrInsert.current!.value}`);

      setZipNoState("");
      setRoadAddrState("");
      setUserAddrState("");

      setData(null);
      setStep(1);
      setIsVisible(!isVisible);
      return;
    }
  };

  return (
    <div className="flex flex-col gap-[8px] w-full">
      <p>
        <span className="font-bold">주소</span>
        {required && <span className="text-red-600"> *</span>}
      </p>
      <div className="flex flex-col gap-[12px]">
        <div className="flex gap-[8px]">
          <input
            type="text"
            ref={zipNoRef}
            defaultValue={address[0]}
            readOnly
            className="h-[48px] border border-[#EAECEC] rounded-[6px] p-[4px] pr-[8px] pl-[8px] w-1/3 outline-none"
            placeholder="우편번호"
          />
          <button
            onClick={openAddressForm}
            className="border p-[7px] pr-[14px] pl-[14px] text-[14px] rounded-[4px] text-[#0068E5] h-[48px] transition-colors hover:bg-[#E1EEFE]"
          >
            주소 검색
          </button>
        </div>
        <div
          className={
            isVisible ? "xl:fixed xl:bg-[#3436378C] xl:w-full xl:h-full xl:top-0 xl:left-0 xl:z-[50]" : "hidden"
          }
        >
          <div
            className={
              isVisible
                ? "bg-[#FFFFFE] xl:absolute xl:z-auto fixed z-50 flex flex-col justify-between w-full xl:w-[500px] h-full xl:h-[680px] top-0 xl:top-[50%] left-0 xl:left-[50%] xl:ml-[-250px] xl:mt-[-340px] xl:rounded-[12px] xl:shadow-md overflow-y-auto"
                : "hidden"
            }
          >
            <div>
              <div className="flex xl:justify-between justify-center items-center py-[10px] px-[16px] xl:pt-[42px] xl:pb-[0] xl:px-[32px]">
                <h2 className="text-[20px] font-[600]">주소 검색</h2>
                <button
                  onClick={openAddressForm}
                  className="w-[32px] h-[32px] text-[20px] xl:static absolute right-[16px] bg-[url('../../public/icon/close.png')] bg-contain indent-[-99999px]"
                >
                  ✖
                </button>
              </div>
              <form
                onSubmit={(e) => searchHandler(e, searchKeyword.current!.value, currentPage)}
                className="xl:px-[32px] xl:py-[20px] px-[16px] py-[18px] flex flex-col justify-center gap-[8px]"
              >
                <p className="text-[18px] font-[500]">도로명 주소를 입력해주세요</p>
                <div className="h-[51px] flex justify-between">
                  <input
                    className="w-[80%] p-[12px] pt-[4px] pb-[4px] rounded-[6px] border"
                    ref={searchKeyword}
                    type="text"
                    placeholder="ex) 종로1가"
                  />
                  <button className="w-[18%] rounded-[6px] font-[600] text-[#0068E5] bg-[#F2F2F2] transition-colors hover:bg-primarylightness">
                    검색
                  </button>
                </div>
              </form>
              <hr className="border-4" />
              {step === 1 ? (
                <div className="w-[calc(100%-32px)] xl:w-[calc(100%-64px)] mx-[16px] py-[16px] xl:mx-[32px] flex justify-evenly items-center text-center text-[14px] border-b">
                  <p className="w-[25%] text-[12px]">우편 번호</p>
                  <p className="w-[70%] text-[12px]">주소</p>
                </div>
              ) : (
                <div className="w-[calc(100%-32px)] xl:w-[calc(100%-64px)] mx-[16px] py-[16px] xl:mx-[32px] flex justify-evenly items-center text-center text-[14px] border-b">
                  <p className="w-[95%] text-[12px]">주소</p>
                </div>
              )}
              <>
                {step === 1 ? (
                  <div className="flex flex-col justify-between">
                    {data ? (
                      <ul className="overflow-y-auto h-[567px] xl:h-[243px] w-[calc(100%-32px)] xl:w-[calc(100%-64px)] mx-[16px] xl:mx-[32px] flex flex-col bg-[#FFFFFE]">
                        {data.length ? (
                          data.map((addr, idx) => (
                            <li key={addr?.bdMgtSn} onClick={() => selectAddr(addr)} className="border-b">
                              <label
                                htmlFor={"address" + idx}
                                className="flex justify-evenly items-center h-[81px] text-[12px] py-[20px]"
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
                          <div className="text-center flex items-center justify-center text-[#CDCFD0]">
                            <p className="w-full py-[42px]">검색 결과가 없습니다.</p>
                          </div>
                        )}
                      </ul>
                    ) : (
                      <div className="text-center flex items-center justify-center text-[#CDCFD0]">
                        <p className="w-full py-[42px]">검색할 주소를 입력해주세요</p>
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
                  <div className="p-[16px] xl:px-[32px] flex flex-col gap-[16px] min-h-[243px]">
                    <div className="flex flex-col gap-[8px]">
                      <span className="text-[14px]">{zipNostate}</span>
                      <div>
                        <p className="font-bold">{roadAddrState}</p>
                        <p className="text-[#4C4F52]">{jibun}</p>
                      </div>
                    </div>
                    <div>
                      <input
                        type="text"
                        ref={userAddrInsert}
                        value={userAddrState}
                        onChange={(e) => setUserAddrState(e.target.value)}
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
            <div className="flex justify-center pb-[42px]">
              <button
                onClick={goNextStep}
                disabled={
                  step === 1 && (roadAddrState === "" || zipNostate === "")
                    ? true
                    : step === 2 && userAddrState === ""
                    ? true
                    : false
                }
                className="w-[calc(100%-32px)] xl:w-[calc(100%-64px)] mx-auto h-[52px] p-[14px] px-[36px] text-[#FFFFFE] rounded-[8px] bg-[#1A82FF] disabled:bg-[#F2F2F2] disabled:text-[#CDCFD0]"
              >
                {step === 1 ? "다음" : step === 2 ? "완료" : ""}
              </button>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-[12px]">
          <input
            type="text"
            ref={roadAddrRef}
            defaultValue={address[1]}
            readOnly
            className="h-[48px] border border-[#EAECEC] rounded-[6px] p-[4px] pr-[8px] pl-[8px] indent-[4px] outline-none"
          />
          <input
            type="text"
            ref={userAddrRef}
            defaultValue={address[2]}
            readOnly
            className="h-[48px] border border-[#EAECEC] rounded-[6px] p-[4px] pr-[8px] pl-[8px] indent-[4px] outline-none"
          />
        </div>
      </div>
    </div>
  );
};

export default InfoOnEditAddress;
