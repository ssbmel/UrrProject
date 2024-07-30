"use client";

import { SearchProductTitleList } from "@/services/search/search.service";
import { useRef, useState } from "react";
import { Product } from "../../../../types/common";

export default function Search() {
  const searchWordRef = useRef<HTMLInputElement>(null);
  const [filteringTitle, setFilteringTitle] = useState<Product[]>([]);

  const SearchProducts = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const searchWord = searchWordRef.current?.value;

    if (searchWord) {
      const { productTitle } = await SearchProductTitleList(searchWord);
      setFilteringTitle(productTitle);
      console.log(productTitle);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center h-svh">
        <form onSubmit={SearchProducts}>
          <input
            type="text"
            ref={searchWordRef}
            placeholder="검색어를 입력하세요"
            className="w-[343px] h-[48px] border border-[#EAECEC] rounded-md indent-3"
          />
          <button>⭕️</button>
        </form>
        {filteringTitle.length > 0 ? (
          <ul>
            {filteringTitle.map((product, index) => (
              <li key={index}>{product.title}</li>
            ))}
          </ul>
        ) : (
          <p>검색 결과가 없습니다.</p>
        )}
      </div>
    </>
  );
}
