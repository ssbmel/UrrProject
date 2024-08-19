"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import openFilter from "../../../../public/icon/rec.png";
import checkedImg from "../../../../public/icon/checkAfter.png";
import uncheckedImg from "../../../../public/icon/checkBefore.png";
import closeFilter from "../../../../public/icon/closeFilter.png";
import LoadingUrr from "@/components/common/loading/LoadingUrr";

interface PostData {
  id: string;
  start: string;
  end: string;
  cost: string;
  price: string;
  product_count: string;
  title: string;
  text: string;
  category: string;
  main_img: string;
  detail_img: string[];
  nickname: string;
  created_at: string;
}

interface ProductsListProps {
  selectedCategory: string;
}

export default function ProductsList({ selectedCategory }: ProductsListProps) {
  const testRef = useRef<HTMLDivElement>(null);
  const [products, setProducts] = useState<PostData[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [sortOption, setSortOption] = useState<string>("최신순");
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [excludeExpired, setExcludeExpired] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedOption, setSelectedOption] = useState("최신순");

  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function getData() {
      setIsLoading(true);
      try {
        const response = await fetch("/api/products");
        const data = await response.json();
        if (response.ok) {
          setProducts(data);
        } else {
          setError(data.error || "데이터 받아오기 오류");
        }
      } catch (error) {
        setError("데이터 fetch 오류");
      } finally {
        setIsLoading(false);
      }
    }
    getData();
  }, []);

  const isExpired = (endDate: string) => {
    const today = new Date();
    const end = new Date(endDate);
    return end < today;
  };

  const filteredProducts = products.filter((product) => {
    const isCategoryMatch = selectedCategory === "전체" || product.category === selectedCategory;
    const isNotExpired = !excludeExpired || !isExpired(product.end);
    return isCategoryMatch && isNotExpired;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortOption) {
      case "최신순":
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      case "오래된순":
        return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
      case "마감임박순":
        return new Date(a.end).getTime() - new Date(b.end).getTime();
      default:
        return 0;
    }
  });

  const totalProducts = sortedProducts.length.toString().padStart(2, "0");

  const handleSortOptionChange = (option: string) => {
    setSortOption(option);
    setIsMenuOpen(false);
    setSelectedOption(option);
  };

  const handleExcludeExpiredChange = () => {
    setExcludeExpired(!excludeExpired);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  if (isLoading) {
    return <LoadingUrr />;
  }

  return (
    <>
      <div className="flex flex-col items-center">
        <div className="xl:w-[1132px]">
          <div className="flex justify-between my-4 ml-[10px] mr-[16px] items-center">
            <div className="flex items-center cursor-pointer xl:pt-4 xl:pb-2">
              <Image
                src={excludeExpired ? checkedImg : uncheckedImg}
                alt={excludeExpired ? "판매 종료 제외" : "판매 종료 포함"}
                width={20}
                height={20}
                className="mr-2"
                onClick={handleExcludeExpiredChange}
              />
              <label htmlFor="excludeExpired" className="text-[16px] xl:text-[18px] text-[#4C4F52]">
                판매 종료 제외
              </label>
            </div>
            <div className="relative" ref={menuRef}>
              <div className="flex items-center cursor-pointer">
                <p className="mx-2 text-[16px] xl:text-[18px] text-[#4C4F52]">{sortOption}</p>
                <div
                  className="relative w-[20px] h-[20px] xl:w-[25px] xl:h-[25px]"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                  <Image
                    src={isMenuOpen ? closeFilter : openFilter}
                    alt="정렬 아이콘"
                    fill
                    sizes="20px xl:25px"
                    className="object-cover"
                  />
                </div>
              </div>
              {isMenuOpen && (
                <div className="absolute right-0 bg-white rounded-md shadow-[0px_1px_8px_0px_rgba(0,_0,_0,_0.25),_0px_0px_4px_0px_rgba(0,_0,_0,_0.08),_0px_0px_1px_0px_rgba(0,_0,_0,_0.08)] z-10 p-1">
                  <ul className="list-none w-[95px] xl:w-[111px] text-[#4C4F52] flex flex-col divide-y-2 divide-[#F4F4F4]">
                    <li>
                      <p
                        className={`block w-full text-[16px] xl:text-[18px] px-3 py-1 cursor-pointer ${
                          selectedOption === "최신순" ? "text-blue-500" : ""
                        }`}
                        onClick={() => handleSortOptionChange("최신순")}
                      >
                        최신순
                      </p>
                    </li>
                    <li>
                      <p
                        className={`block w-full text-[16px] xl:text-[18px] px-3 py-1 cursor-pointer ${
                          selectedOption === "오래된순" ? "text-blue-500" : ""
                        }`}
                        onClick={() => handleSortOptionChange("오래된순")}
                      >
                        오래된순
                      </p>
                    </li>
                    <li>
                      <p
                        className={`block w-full text-[16px] xl:text-[18px] px-3 py-1 cursor-pointer ${
                          selectedOption === "마감임박순" ? "text-blue-500" : ""
                        }`}
                        onClick={() => handleSortOptionChange("마감임박순")}
                      >
                        마감임박순
                      </p>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
          <div className="border-[#F4F4F4] border-[1px] w-full mt-4" />
          <div className="flex flex-col">
            <p className="text-[16px] xl:text-[18px] text-[#4C4F52] mx-4 mt-4 xl:mt-6 ">총 {totalProducts}개</p>
            <div className="flex flex-col items-center">
              <div className="grid grid-cols-2 xl:grid-cols-4 gap-y-[36px] p-4 gap-x-[11px] xl:gap-x-8 xl:w-full">
                {sortedProducts.map((product, index) => {
                  const cost = parseFloat(product.cost);
                  const price = parseFloat(product.price);
                  const discountRate = Math.round(((cost - price) / cost) * 100);
                  const expired = isExpired(product.end);

                  return (
                    <div key={index}>
                      <Link href={`/products/detail/${product.id}`}>
                        <div className="relative mx-auto w-[165px] h-[178px] xl:w-[262px] xl:h-[270px] cursor-pointer mb-[8px]">
                          <Image
                            src={product.main_img}
                            alt={product.title}
                            fill
                            priority
                            sizes="165px"
                            className={`rounded-md object-cover ${expired ? "opacity-50" : ""}`}
                          />
                          {expired && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 rounded-md">
                              <p className="text-[#FFFFFE] text-[18px] xl:text-[24px]">판매 종료</p>
                            </div>
                          )}
                        </div>
                      </Link>
                      <div className={` ${expired ? "text-[#B2B5B8]" : ""}`}>
                        <p className="text-[#B2B5B8] text-[12px] xl:text-[16px]">{product.nickname}</p>
                        <p
                          className={`text-sm xl:py-2 xl:text-[20px] truncate w-[165px] xl:w-[255px] ${
                            expired ? "text-[#B2B5B8]" : "text-gray-600"
                          }`}
                        >
                          {product.title}
                        </p>
                        <div className="flex items-center">
                          <p
                            className={`text-sm font-semibold xl:text-[18px] ${
                              expired ? "text-[#B2B5B8]" : "text-[#F03F33]"
                            }`}
                          >
                            {discountRate}%
                          </p>
                          <p
                            className={`text-md xl:text-[18px] font-medium ml-1 xl:ml-2 ${
                              expired ? "text-[#B2B5B8]" : ""
                            }`}
                          >
                            {price.toLocaleString()}원
                          </p>
                          <p className="hidden ml-2 xl:block text-[18px] text-gray-300 line-through font-light">
                            {cost.toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
