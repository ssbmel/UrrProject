import Image from "next/image";

export default function ListCategory() {
  const categories = [
    { name: "전체", image: "/images/all.png" },
    { name: "인플루언서 추천", image: "/images/default.png" },
    { name: "음식", image: "/images/default.png" },
    { name: "생활용품", image: "/images/default.png" },
    { name: "화장품", image: "/images/default.png" },
    { name: "위생용품", image: "/images/default.png" },
    { name: "문구류", image: "/images/default.png" }
  ];
  return (
    <>
      <div className="container mx-auto p-4">
        <div className="flex overflow-x-auto space-x-2 justify-between">
          {categories.map((category) => (
            <div key={category.name} className="category-item text-center p-1  min-w-[100px]">
              <Image
                src={category.image}
                alt={category.name}
                width={80}
                height={80}
                className="mx-auto mb-2 border rounded-lg"
              />
              <p className="text-sm font-normal">{category.name}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
