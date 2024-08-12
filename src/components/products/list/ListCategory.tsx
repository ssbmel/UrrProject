import { useState } from "react";
import Image from "next/image";

interface ListCategoryProps {
  onSelectCategory: (category: string) => void;
}

export default function ListCategory({ onSelectCategory }: ListCategoryProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = [
    { name: "전체", image: "/categories/전체.png" },
    { name: "뷰티", image: "/categories/뷰티.png" },
    { name: "패션/잡화", image: "/categories/패션잡화.png" },
    { name: "식품", image: "/categories/식품.png" },
    { name: "헬스건강", image: "/categories/헬스건강.png" },
    { name: "반려동물용품", image: "/categories/반려동물용품.png" },
    { name: "생활용품", image: "/categories/생활용품.png" },
    { name: "가전/디지털", image: "/categories/가전디지털.png" },
    { name: "취미/도서", image: "/categories/취미도서.png" }
  ];

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    onSelectCategory(category);
  };

  return (
    <div className="container mx-auto bg-[#F2F4F8]">
      <div className="flex h-[105px] overflow-x-auto space-x-2 justify-between p-3">
        {categories.map((category) => (
          <div
            key={category.name}
            className={`category-item text-center min-w-[75px] cursor-pointer flex flex-col ${
              selectedCategory === category.name ? "shadow-inner scale-95" : ""
            } transition-transform duration-200 ease-in-out`}
            onClick={() => handleCategoryClick(category.name)}
          >
            <Image
              src={category.image}
              alt={category.name}
              width={52}
              height={52}
              className={`mx-auto mb-2 border rounded-lg ${
                selectedCategory === category.name ? "shadow-inner" : ""
              } transition-colors duration-200 ease-in-out`}
            />
            <p className="text-[14px] font-normal">{category.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
