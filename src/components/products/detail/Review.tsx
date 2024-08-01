import Image from "next/image";

interface ReviewProps {
  user_nickname: string;
  review_score: number;
  review_images: string[];
  review_content: string;
  created_at: string;
}

const Review = ({ props }: { props: ReviewProps }) => {
  const formattedDate = formatDate(props.created_at);
  return (
    <div className="w-[343px] py-8 px-4">
      <div className="flex divide-x-2">
        <div className="pr-2 text-[14px] font-semibold">{props.user_nickname}</div>
        <div className="pl-2 text-blue-600 text-[14px]">평점 {props.review_score}</div>
      </div>
      <div className="flex gap-3 py-2">
        {props.review_images.map((value, index) => {
          return (
            <div key={index} className="relative w-[84px] h-[84px]">
              <Image src={value} alt="후기사진" key={index} layout="fill" className="rounded-md object-cover" />
            </div>
          );
        })}
      </div>
      <div className="text-[14px] text-[#4C4F52]">{props.review_content}</div>
      <div className="mt-[33px] text-[12px] text-[#989898]">{formattedDate}</div>
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
