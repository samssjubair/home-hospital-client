// CategoryCard.tsx
import React from "react";
import Image from "next/image";
import { ICategory } from "@/types";
import Link from "next/link";

const CategoryCard: React.FC<{ category: ICategory }> = ({ category }) => {
  const imageUrl = category.imageUrl || "https://picsum.photos/300/300";

  return (
    <>
      <Link href={`/category/${category.id}`}>
        <div className="bg-pink-700 rounded-lg shadow-lg  transform hover:scale-105 transition-transform">
          <div className="relative aspect-w-3 aspect-h-2">
            <Image
              src={imageUrl}
              alt={category.title}
              className="object-cover rounded-t-lg"
              height={200}
              width={400}
            />
          </div>
          <div className="m-4">
            <h3 className="text-2xl font-semibold text-center pb-4 text-white ">
              {category.title}
            </h3>
          </div>
        </div>
      </Link>
    </>
  );
};

export default CategoryCard;
