import Image from "next/image";

export default function ListCategory() {
  const categories = [
    { name: "전체", image: "/categories/전체.png" },
    { name: "뷰티", image: "/categories/뷰티.png" },
    { name: "패션잡화", image: "/categories/패션잡화.png" },
    { name: "식품", image: "/categories/식품.png" },
    { name: "헬스/건강", image: "/categories/헬스건강.png" },
    { name: "반려동물 용품", image: "/categories/반려동물용품.png" },
    { name: "생활용품", image: "/categories/생활용품.png" },
    { name: "가전/디지털", image: "/categories/가전디지털.png" },
    { name: "취미/도서", image: "/categories/취미도서.png" }
  ];
  return (
    <>
      <div className="container mx-auto bg-[#F2F4F8]">
        <div className="flex overflow-x-auto space-x-2 justify-between p-3">
          {categories.map((category) => (
            <div key={category.name} className="category-item text-center p-1  min-w-[100px]">
              <Image
                src={category.image}
                alt={category.name}
                width={80}
                height={80}
                className="mx-auto mb-2 border rounded-lg "
              />
              <p className="text-sm font-normal">{category.name}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
