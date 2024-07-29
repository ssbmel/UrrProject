import Image from "next/image";
import Link from "next/link";

export default function ProductsList() {
  const products = [
    {
      influencer: "임현아",
      name: "기초 탄탄 세트",
      discount: "20%",
      price: "50,000",
      image: "/images/화장품.jpg"
    },
    {
      influencer: "서샛별",
      name: "싱싱 유기농 토마토 1kg",
      discount: "15%",
      price: "7,500",
      image: "/images/토마토.jpg"
    },
    {
      influencer: "박수미",
      name: "데이식스가 착용한 비니",
      discount: "10%",
      price: "34,000",
      image: "/images/비니.jpg"
    },
    {
      influencer: "장민영",
      name: "당도 최고 과즙 뚝뚝 복숭아 3kg",
      discount: "15%",
      price: "23,000",
      image: "/images/복숭아.jpg"
    },
    {
      influencer: "이녕수",
      name: "토마토 치즈 피자",
      discount: "25%",
      price: "12,900",
      image: "/images/피자.jpg"
    },
    {
      influencer: "김예진",
      name: "최고급 원두",
      discount: "30%",
      price: "19,900",
      image: "/images/원두.jpg"
    }
  ];
  return (
    <>
      <div className="flex justify-between p-6">
        <p>총 00개</p>
        <p>추천순</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-">
        {products.map((product, index) => (
          <div key={index} className="bg-white rounded-md p-2 flex flex-col ">
            <div className="flex justify-center ">
              <Link href={`/products/detail`} passHref>
                <div className="relative w-[165px] h-[178px] md:w-[220px] md:h-[230px] cursor-pointer mb-2">
                  <Image
                    src={product.image}
                    alt={product.name}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-md"
                  />
                </div>
              </Link>
            </div>
            <div className="ml-2">
              <h2 className="text-sm text-gray-400">[{product.influencer}]의</h2>
              <p className="text-sm text-gray-600">{product.name}</p>
              <div className="flex items-center">
                <p className="text-sm text-red-500">{product.discount}</p>
                <p className="text-md font-bold ml-1">{product.price}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
