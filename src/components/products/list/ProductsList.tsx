import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
import rec from "../../../../public/icon/rec.png";

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
  const [products, setProducts] = useState<PostData[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [sortOption, setSortOption] = useState<string>("기본");
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [excludeExpired, setExcludeExpired] = useState<boolean>(false);

  useEffect(() => {
    async function getData() {
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
      <div className="flex justify-between px-6 pt-6 items-center ">
        <p className="text-[16px] text-[#4C4F52]">총 {totalProducts}개</p>
        <div className="relative">
          <div className="flex items-center cursor-pointer" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <p className="mx-2 text-[16px] text-[#4C4F52]">{sortOption}</p>
            <div className="relative w-[20px] h-[20px]">
              <Image src={rec} alt="정렬 아이콘" fill sizes="20px" className="object-cover" />
            </div>
          </div>
          {isMenuOpen && (
            <div className="absolute right-0 mt-2 bg-white bg-opacity-80 rounded-md shadow-lg z-10 py-2">
              <ul className="list-none w-[102px] text-[#4C4F52] flex flex-col ">
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
                <li>
                  <p className="block w-full text-sm px-3 py-1 cursor-pointer" onClick={handleExcludeExpiredChange}>
                    {excludeExpired ? "판매종료 포함" : "판매종료 제외"}
                  </p>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-[36px] p-[17px] gap-x-2">
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
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-md">
                      <p className="text-white text-lg ">판매 종료</p>
                    </div>
                  )}
                </div>
              </Link>
              <div className="ml-3">
                <p className="text-[#B2B5B8] text-[12px]">{product.nickname}</p>
                <p className="text-sm text-gray-600 truncate w-[165px]">{product.title}</p>
                <div className="flex items-center">
                  <p className="text-sm text-red-500">{discountRate}%</p>
                  <p className="text-md font-bold ml-1">{price.toLocaleString()}원</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
