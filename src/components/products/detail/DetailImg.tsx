"use client";
import useGetProductDetail from "@/hooks/useGetProductDetail";
import Image from "next/image";
import React, { useEffect, useState, useRef } from "react";
import more from "../../../../public/icon/moreDetail.png";

const DetailImg = ({ id }: { id: string }) => {
  const { data } = useGetProductDetail({ id });
  const [images, setImages] = useState<string[]>([]);
  const [showMore, setShowMore] = useState<boolean>(false);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (data && Array.isArray(data.detail_img)) {
      setImages(data.detail_img);
    }
  }, [data]);

  useEffect(() => {
    const checkShowMore = () => {
      if (contentRef.current && contentRef.current.scrollHeight > 500) {
        setShowMore(true);
      } else {
        setShowMore(false);
      }
    };

    const timeoutId = setTimeout(checkShowMore, 100);
    return () => clearTimeout(timeoutId);
  }, [images]);

  useEffect(() => {
    setShowMore(false);
    setIsExpanded(false);
  }, [id]);

  const handleToggle = () => {
    setIsExpanded(true);
    setShowMore(false);
  };

  return (
    <div className="relative">
      <div
        className={`flex flex-col py-2 w-full transition-all duration-500 ease-in-out relative ${
          isExpanded ? "max-h-full" : "max-h-[500px] xl:max-h-full"
        } overflow-hidden`}
        ref={contentRef}
      >
        {images.map((value, index) => (
          <div key={index} className="w-full relative flex flex-col items-center">
            {value && (
              <Image
                src={value}
                alt={`Image ${index}`}
                width={500}
                height={500}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover xl:w-[1262px] w-[500px]"
                priority
              />
            )}
          </div>
        ))}
        {!isExpanded && showMore && (
          <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-white to-transparent xl:hidden"></div>
        )}
      </div>
      {showMore && !isExpanded && (
        <button
          onClick={handleToggle}
          className="absolute bottom-[calc(100%-480px)] left-1/2 transform -translate-x-1/2 w-[343px] h-[52px] bg-white text-[#1A82FF] rounded mt-4 cursor-pointer text-[14px] flex justify-center items-center xl:hidden"
        >
          상품정보 더보기
          <Image src={more} alt="상품정보더보기" width={20} height={20} />
        </button>
      )}
    </div>
  );
};

export default DetailImg;
