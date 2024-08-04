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
  const fullStars = Math.floor(props.review_score); // 전체 별점
  const hasHalfStar = props.review_score % 1 !== 0; // 반 별점 여부
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
  const formattedDate = formatDate(props.created_at);
  return (
    <div className="w-[343px] py-6 px-4">
      <div className="flex divide-x-2 my-2">
        <div className="pr-2 text-[14px] ">{props.user_nickname}</div>
        <div className="pl-2 text-blue-600 text-[14px] flex items-center">
          {Array(fullStars)
            .fill(null)
            .map((_, index) => (
              <div key={`full-${index}`} className="w-4 h-4 relative">
                <Image src={fullStar} alt="full star" fill className="rounded-md object-cover" />
              </div>
            ))}
          {hasHalfStar && (
            <div className="w-4 h-4 relative">
              <Image src={halfStar} alt="half star" fill className="rounded-md object-cover" />
            </div>
          )}
          {Array(emptyStars)
            .fill(null)
            .map((_, index) => (
              <div key={`empty-${index}`} className="w-4 h-4 relative">
                <Image src={emptyStar} alt="empty star" fill className="rounded-md object-cover" />
              </div>
            ))}
        </div>
      </div>
      <div className="flex gap-3 py-2">
        {props.review_images.map((value, index) => {
          return (
            <div key={index} className="relative w-[84px] h-[84px]">
              <Image src={value} alt="후기사진" key={index} fill className="rounded-md object-cover" />
            </div>
          );
        })}
      </div>
      <div className="text-[14px] text-[#4C4F52]">{props.review_content}</div>
      <div className="mt-[25px] text-[12px] text-[#989898]">{formattedDate}</div>
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
