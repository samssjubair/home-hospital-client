// CategoryCard.tsx
import React from "react";
import Image from "next/image";
import { ICategory } from "@/types";

const CategoryCard: React.FC<{ category: ICategory }> = ({ category }) => {
  const imageUrl = category.imageUrl || "https://picsum.photos/300/300";

  return (
    <div className="bg-pink-100 rounded-lg shadow-lg p-4 transform hover:scale-105 transition-transform">
      <div className="relative aspect-w-3 aspect-h-2">
        <Image src={imageUrl} alt={category.title} className="object-cover" height={300} width={400} />
      </div>
      <div className="mt-4">
        <h3 className="text-2xl font-semibold text-pink-600">
          {category.title}
        </h3>
      </div>
    </div>
  );
};

export default CategoryCard;
