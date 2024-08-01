import Image from "next/image";

const Review = ({ props }) => {
  return (
    <div className="w-[343px] bg-slate-400">
      ProductReview
      <div className="flex">
        <div>{props.user_nickname}</div>
      </div>
      <div className="flex">
        {props.review_images.map((value, index) => {
          return <Image src={value} alt="hehe" key={index} width={100} height={50} />;
        })}
      </div>
      <div>{props.review_content}</div>
      <div>{props.created_at}</div>
      {/* <div>{props.product_id}</div> */}
    </div>
  );
};

export default Review;
