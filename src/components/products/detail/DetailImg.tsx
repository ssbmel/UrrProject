import useGetProductDetail from "@/hooks/useGetProductDetail";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const DetailImg = ({ id }: { id: string }) => {
  const { data } = useGetProductDetail({ id });
  const [images, setImages] = useState<string[]>([]);
  console.log(data);
  useEffect(() => {
    if (data && Array.isArray(data.detail_img)) {
      setImages(data.detail_img);
    }
  }, [data]);
  return (
    <div>
      <div className="flex flex-col py-2 w-full">
        {images.map((value: any, index: any) => {
          return (
            <div key={index} className="w-full relative">
              <Image src={value} alt="후기사진" key={index} width={500} height={500} objectFit="contain" />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DetailImg;
