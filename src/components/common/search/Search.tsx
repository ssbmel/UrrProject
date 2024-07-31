"use client";

import { SearchProductTitleList } from "@/services/search/search.service";
import { useEffect, useRef, useState } from "react";
import { Product } from "../../../../types/common";
import Link from "next/link";
import { v4 as uuidv4 } from "uuid";

type Keyword = {
  id: string;
  text: string;
};

export default function Search() {
  const searchWordRef = useRef<HTMLInputElement>(null);
  const [filteringTitle, setFilteringTitle] = useState<Product[]>([]);
  const [keywords, setKeywords] = useState<Keyword[]>([]);

  // window 즉, 브라우저가 모두 렌더링된 상태에서 해당 함수를 실행할 수 있도록 작업
  useEffect(() => {
    if (typeof window !== "undefined") {
      const result = localStorage.getItem("keywords") || "[]";
      setKeywords(JSON.parse(result));
    }
  }, []);

  // keywords 객체에 의존하여, 변경될 경우 새롭게 localStorage의 아이템 keywords'를 세팅한다
  useEffect(() => {
    localStorage.setItem("keywords", JSON.stringify(keywords));
  }, [keywords]);

  // 최근 검색어 추가
  const addKeywordHandler = (text: string) => {
    const newKeyword = {
      id: uuidv4(),
      text
    };
    setKeywords((prevKeywords) => {
      const updatedKeywords = [newKeyword, ...prevKeywords.filter((keyword) => keyword.text !== text)];
      localStorage.setItem("keywords", JSON.stringify(updatedKeywords));
      return updatedKeywords;
    });
  };

  // 단일 검색어 삭제
  const handleRemoveKeyword = (id: string) => {
    setKeywords((prevKeywords) => {
      const nextKeywords = prevKeywords.filter((keyword) => keyword.id !== id);
      localStorage.setItem("keywords", JSON.stringify(nextKeywords));
      return nextKeywords;
    });
  };

  //검색어 전체 삭제
  const handleClearKeywords = () => {
    setKeywords([]);
    localStorage.removeItem("keywords");
  };

  // 상픔 title을 기준으로 한 검색기능
  const SearchProducts = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const searchWord = searchWordRef.current?.value;

    if (searchWord) {
      const { productTitle } = await SearchProductTitleList(searchWord);
      setFilteringTitle(productTitle);
      addKeywordHandler(searchWord);
      if (searchWordRef.current) {
        searchWordRef.current.value = "";
      }
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

          <div>
            <h2>최근 검색어</h2>
            {keywords.length ? (
              <button type="button" onClick={handleClearKeywords}>
                전체 삭제
              </button>
            ) : (
              <button />
            )}

            <ul>
              {keywords.length ? (
                keywords.map((keyword) => (
                  <li key={keyword.id} className="flex">
                    <p>{keyword.text}</p>
                    <button onClick={() => handleRemoveKeyword(keyword.id)}>❌</button>
                  </li>
                ))
              ) : (
                <div>최근 검색어가 없습니다</div>
              )}
            </ul>
          </div>
        </form>
        {filteringTitle.length > 0 ? (
          <ul>
            {filteringTitle.map((product) => (
              <li key={product.id}>
                <Link href={`/products/detail/${product.id}`}>
                  <div>{product.title}</div>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p>검색 결과가 없습니다.</p>
        )}
      </div>
    </>
  );
}
