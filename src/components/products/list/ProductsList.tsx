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
      case "최신 순":
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      case "오래된 순":
        return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
      case "마감임박 순":
        return new Date(a.end).getTime() - new Date(b.end).getTime();
      default:
        return 0;
    }
  });

  const totalProducts = sortedProducts.length.toString().padStart(2, "0");

  const handleSortOptionChange = (option: string) => {
    setSortOption(option);
    setIsMenuOpen(false);
  };

  const handleExcludeExpiredChange = () => {
    setExcludeExpired(!excludeExpired);
  };

  return (
    <>
      {isLoading ? (
        <LoadingUrr />
      ) : (
        <>
          <div className="flex justify-between px-6 pt-3 items-center">
            <div className="flex items-center cursor-pointer" onClick={handleExcludeExpiredChange}>
              <Image
                src={excludeExpired ? checkedImg : uncheckedImg}
                alt={excludeExpired ? "판매 종료 제외" : "판매 종료 포함"}
                width={20}
                height={20}
                className="mr-2"
              />
              <label htmlFor="excludeExpired" className="text-[16px] text-[#4C4F52]">
                판매 종료 제외
              </label>
            </div>
            <div className="relative">
              <div className="flex items-center cursor-pointer">
                <p className="mx-2 text-[16px] text-[#4C4F52]">{sortOption}</p>
                <div className="relative w-[20px] h-[20px]" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                  <Image
                    src={isMenuOpen ? closeFilter : openFilter}
                    alt="정렬 아이콘"
                    fill
                    sizes="20px"
                    className="object-cover"
                  />
                </div>
              </div>
              {isMenuOpen && (
                <div className="absolute right-0 bg-white rounded-md shadow-[0px_1px_8px_0px_rgba(0,_0,_0,_0.25),_0px_0px_4px_0px_rgba(0,_0,_0,_0.08),_0px_0px_1px_0px_rgba(0,_0,_0,_0.08)] z-10 p-1">
                  <ul className="list-none w-[90px] text-[#4C4F52] flex flex-col divide-y-2 divide-[#F4F4F4]">
                    <li>
                      <p
                        className="block w-full text-sm px-3 py-1 cursor-pointer"
                        onClick={() => handleSortOptionChange("최신 순")}
                      >
                        최신 순
                      </p>
                    </li>
                    <li>
                      <p
                        className="block w-full text-sm px-3 py-1 cursor-pointer"
                        onClick={() => handleSortOptionChange("오래된 순")}
                      >
                        오래된 순
                      </p>
                    </li>
                    <li>
                      <p
                        className="block w-full text-sm px-3 py-1 cursor-pointer"
                        onClick={() => handleSortOptionChange("마감임박 순")}
                      >
                        마감임박 순
                      </p>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
          <div className="border-[#F4F4F4] border-[1px] w-full mt-3" />
          <div>
            <p className="text-[16px] text-[#4C4F52] ml-6 mt-4">총 {totalProducts}개</p>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-[36px] p-[17px] gap-x-4">
              {sortedProducts.map((product, index) => {
                const cost = parseFloat(product.cost);
                const price = parseFloat(product.price);
                const discountRate = Math.round(((cost - price) / cost) * 100);
                const expired = isExpired(product.end);

                return (
                  <div
                    key={index}
                    className="bg-white rounded-md flex flex-col justify-center items-center w-[166px] mx-auto"
                  >
                    <Link href={`/products/detail/${product.id}`}>
                      <div className="relative w-[165px] h-[178px] md:w-[220px] md:h-[230px] cursor-pointer mb-2">
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
                            <p className="text-[#FFFFFE] text-[18px]">판매 종료</p>
                          </div>
                        )}
                      </div>
                    </Link>
                    <div className={`ml-3 ${expired ? "text-[#B2B5B8]" : ""}`}>
                      <p className="text-[#B2B5B8] text-[12px]">{product.nickname}</p>
                      <p className={`text-sm truncate w-[165px] ${expired ? "text-[#B2B5B8]" : "text-gray-600"}`}>
                        {product.title}
                      </p>
                      <div className="flex items-center">
                        <p className={`text-sm ${expired ? "text-[#B2B5B8]" : "text-red-500"}`}>{discountRate}%</p>
                        <p className={`text-md font-bold ml-1 ${expired ? "text-[#B2B5B8]" : ""}`}>
                          {price.toLocaleString()}원
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
    </>
  );
}
