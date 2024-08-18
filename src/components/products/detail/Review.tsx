import Image from "next/image";
import fullStar from "../../../../public/icon/full_star.png";
import halfStar from "../../../../public/icon/half_star.png";
import emptyStar from "../../../../public/icon/empty_star.png";

interface ReviewProps {
  user_nickname: string;
  review_score: number;
  review_images: string[];
  review_content: string;
  created_at: string;
}

const Review = ({ props }: { props: ReviewProps }) => {
  // 별점 계산
  const fullStars = Math.floor(props.review_score);
  const hasHalfStar = props.review_score % 1 !== 0;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
  const formattedDate = formatDate(props.created_at);
  return (
    <div className="w-[375px] xl:w-[1000px] py-[16px] px-[12px] xl:py-[54px]">
      <div className="flex items-center divide-x-2 my-2 xl:hidden">
        <div className="pr-2 text-[14px] font-medium text-[#1B1C1D] ">{props.user_nickname}</div>
        <div className="pl-2 gap-[4px] text-blue-600 text-[14px] flex items-center">
          {Array(fullStars)
            .fill(null)
            .map((_, index) => (
              <div key={`full-${index}`} className="w-4 h-4 relative">
                <Image src={fullStar} alt="full star" fill sizes="4px" className="rounded-md object-cover" />
              </div>
            ))}
          {hasHalfStar && (
            <div className="w-4 h-4 relative">
              <Image src={halfStar} alt="half star" fill sizes="4px" className="rounded-md object-cover" />
            </div>
          )}
          {Array(emptyStars)
            .fill(null)
            .map((_, index) => (
              <div key={`empty-${index}`} className="w-4 h-4 relative">
                <Image src={emptyStar} alt="empty star" fill sizes="4px" className="rounded-md object-cover" />
              </div>
            ))}
        </div>
      </div>
      <div className="xl:flex">
        <div className="flex gap-2 py-2 xl:w-[50%] xl:gap-3">
          {props.review_images.map((value, index) => {
            return (
              <div key={index} className="relative w-[84px] h-[84px] xl:w-[146px] xl:h-[146px]">
                <Image
                  src={value}
                  alt="후기사진"
                  key={index}
                  fill
                  sizes="84px xl:146px"
                  className="rounded-md object-cover"
                />
              </div>
            );
          })}
        </div>
        <div className="xl:flex xl:flex-col py-2">
          <div className="hidden xl:flex xl:divide-x-2">
            <div className="pr-2 text-[18px] font-medium text-[#1B1C1D] ">{props.user_nickname}</div>
            <div className="pl-2 text-blue-600 gap-[4px] text-[14px] flex items-center">
              {Array(fullStars)
                .fill(null)
                .map((_, index) => (
                  <div key={`full-${index}`} className="w-4 h-4 relative">
                    <Image src={fullStar} alt="full star" fill sizes="4px" className="rounded-md object-cover" />
                  </div>
                ))}
              {hasHalfStar && (
                <div className="w-4 h-4 relative">
                  <Image src={halfStar} alt="half star" fill sizes="4px" className="rounded-md object-cover" />
                </div>
              )}
              {Array(emptyStars)
                .fill(null)
                .map((_, index) => (
                  <div key={`empty-${index}`} className="w-4 h-4 relative">
                    <Image src={emptyStar} alt="empty star" fill sizes="4px" className="rounded-md object-cover" />
                  </div>
                ))}
            </div>
          </div>
          <div className="text-[14px] xl:text-[18px] text-[#4C4F52] xl:my-3">{props.review_content}</div>
          <div className="mt-[25px] text-[12px] xl:text-[16px] text-[#989898]">{formattedDate}</div>
        </div>
      </div>
    </div>
  );
};

function formatDate(dateString: any) {
  const date = new Date(dateString);
  const year = String(date.getFullYear()).slice(-2);
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}.${month}.${day}`;
}

export default Review;
