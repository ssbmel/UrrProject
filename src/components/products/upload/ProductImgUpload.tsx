"use client";

/* eslint-disable @next/next/no-img-element */
import { useState, RefObject } from 'react';

interface ContentsProps {
  fileInputRef: RefObject<HTMLInputElement>;
  productMainImgRef: RefObject<HTMLImageElement>;
}

const ProductImgUpload: React.FC<ContentsProps> = ({ fileInputRef, productMainImgRef }) => {
  const [imageURLs, setImageURLs] = useState<string[]>([]);

  const readImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;

    const imageFile = e.target.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (e: ProgressEvent<FileReader>) => {
      if (!e || !e.target) return;
      if (typeof e.target.result !== 'string' || !productMainImgRef.current) return;

      productMainImgRef.current.src = e.target.result;
    });

    reader.readAsDataURL(imageFile);
  };

  const readImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;

    const files = Array.from(e.target.files);
    const newImageURLs: string[] = [];

    files.forEach((file) => {
      const reader = new FileReader();
      reader.addEventListener('load', (event: ProgressEvent<FileReader>) => {
        if (event.target && typeof event.target.result === 'string') {
          newImageURLs.push(event.target.result);
          if (newImageURLs.length === files.length) {
            setImageURLs((prevURLs) => [...prevURLs, ...newImageURLs]);
          }
        }
      });
      reader.readAsDataURL(file);
    });
  };

  return (
    <>
      <div className="my-5">
        <p className="font-bold mb-3 text-md">썸네일 첨부</p>
        <input type="file" onChange={readImage}/>

        <div>
        <img ref={productMainImgRef} alt="" width="auto" height="auto" className="mb-5" />

        </div>
      </div>
      <hr />
      <div className="my-5">
        <p className="font-bold mb-3 text-md">상세설명 첨부</p>
        <input type="file" multiple onChange={readImages} accept="image/*" ref={fileInputRef} />

        <div>
          {imageURLs.map((url, index) => (
            <img key={index} src={url} alt={`preview-${index}`} width="auto" height="auto" className="mb-5" />
          ))}
        </div>
      </div>
    </>
  );
};

export default ProductImgUpload;
