import Image from "next/image";
import productImg from "../../../../public/images/화장품.jpg";

export default function Detail({ params }: { params: { postId: string } }) {
  return (
    <>
      <div>
        <p>상품 목록</p>
        <Image src={productImg} alt="" />
      </div>
    </>
  );
}
