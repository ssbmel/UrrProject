import { useEffect, useState } from "react";
import { ReviewImgGroup } from "./WrittenMyReview";
import Blackcamera from "../../../../public/icon/blackcamera.png";
import AccentIcon from "../../../../public/icon/accentmark.svg";
import Image from "next/image";
import swal from "sweetalert";
interface ReviewProps {
  reviewImages: ReviewImgGroup[];
  setReviewImages: React.Dispatch<React.SetStateAction<ReviewImgGroup[]>>;
  uploadedReviewImages: string;
}

const UploadReviewImage: React.FC<ReviewProps> = ({ reviewImages, setReviewImages, uploadedReviewImages }) => {
  const [reviewImgUrls, setReviewImgUrls] = useState<ReviewImgGroup[]>([]);

  useEffect(() => {
    return () => {
      reviewImgUrls.forEach((item) => URL.revokeObjectURL(item.url));
    };
  }, [reviewImgUrls]);

  useEffect(() => {
    setReviewImgUrls(reviewImages);
  }, [reviewImages]);

  const readReviewImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;

    const files = Array.from(e.target.files);
    const newReviewImgGroups = files.map((file) => ({
      file,
      url: URL.createObjectURL(file)
    }));

    setReviewImages((prevFiles) => {
      const totalFiles = prevFiles.length + newReviewImgGroups.length;
      if (totalFiles > 3) {
        swal("사진은 최대 3장까지 업로드 가능합니다.");
        return prevFiles;
      }
      return [...prevFiles, ...newReviewImgGroups];
    });

    setReviewImgUrls((prevUrls) => {
      const totalUrls = prevUrls.length + newReviewImgGroups.length;
      if (totalUrls > 3) {
        return prevUrls;
      }
      return [...prevUrls, ...newReviewImgGroups];
    });
  };

  const handleReviewImage = (imgObj: ReviewImgGroup) => {
    if (!imgObj) return;
    const itemToDelete = reviewImgUrls.find((item) => item.url === imgObj.url);

    if (itemToDelete) {
      URL.revokeObjectURL(itemToDelete.url);
      setReviewImgUrls((prevUrls) => prevUrls.filter((item) => item !== itemToDelete));
      setReviewImages((prevFiles) => prevFiles.filter((item) => item.url !== itemToDelete.url));
    }
  };

  return (
    <div className="w-full p-2">
      <div className="gap-2 flex">
        <h3 className="font-bold text-[18px] whitespace-nowrap">사진 첨부</h3>
        <div className="flex mt-1">
          <p className="mt-[3px] mr-1">
            <AccentIcon />
          </p>
          <p className="mb-4 text-sm text-[#989C9F] whitespace-nowrap">사진은 최대 3장까지 업로드 가능합니다.</p>
        </div>
      </div>
      {!reviewImgUrls || reviewImgUrls.length === 0 ? (
        <div className="w-[100px] h-[100px] xl:w-[120px] border shadow-md rounded-md text-center flex flex-col items-center justify-center mb-5 cursor-pointer">
          <label className="w-full h-full flex flex-col items-center justify-center">
            <div className="w-[38px] h-[38px] relative">
              <Image src={Blackcamera.src} alt="img" fill sizes="38px" className="w-full h-full object-cover" />
            </div>
            <span className="text-sm">사진</span>
            <input type="file" multiple accept="image/*" id="files" onChange={readReviewImages} className="hidden" />
          </label>
        </div>
      ) : (
        <div className="flex flex-row overflow-x-auto flex-nowrap">
          <div className="w-[100px] h-[100px] xl:w-[120px] border shadow-md rounded-md text-center flex flex-col items-center justify-center mb-5 cursor-pointer flex-shrink-0  mr-4">
            <label className="w-full h-full flex flex-col items-center justify-center">
              <div className="w-[38px] h-[38px] relative">
                <Image src={Blackcamera.src} alt="img" fill sizes="38px" className="w-full h-full object-cover" />
              </div>
              <span className="text-sm">사진</span>
              <input type="file" multiple accept="image/*" id="files" onChange={readReviewImages} className="hidden" />
            </label>
          </div>

          <div className="flex gap-4 flex-nowrap">
            {reviewImgUrls &&
              reviewImgUrls.map((item) => (
                <div key={item.url} className="relative w-[100px] h-[100px] xl:w-[120px] xl:h-[100px] flex-shrink-0">
                  <button
                    type="button"
                    onClick={() => handleReviewImage(item)}
                    className="border w-7 h-7 rounded-full absolute top-1 right-1 bg-white text-black flex items-center justify-center z-10"
                    aria-label="Remove image"
                  >
                    ✖︎
                  </button>
                  <div className="w-[100px] xl:w-[120px] h-full relative">
                    <Image src={item.url} alt="리뷰이미지" fill sizes="100px xl:w-[120px]" className="object-cover rounded-md" />
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadReviewImage;
