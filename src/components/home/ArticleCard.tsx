// ArticleCard.js
import { ICMSBlogPost } from "@/types";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import articleImage from "@/assets/article.png";

const ArticleCard = ({ article }: {article: ICMSBlogPost}) => {
    const image = article.imageUrl || articleImage;
    
  return (
    <div className="bg-pink-100 p-4 mb-4 shadow-lg rounded-md">
      <div className="flex flex-wrap items-center">
        <div className="w-full md:w-1/2 pr-4">
          <Image
            src={image}
            alt={article.title}
            className="w-full h-auto rounded-md"
            height={300}
            width={400}
          />
        </div>
        <div className="w-full md:w-1/2">
          <p className="text-gray-500">{dayjs(article.createdAt).format('YYYY-MM-DD')} | Latest</p>
          <h3 className="text-xl font-semibold mt-2 text-pink-900">{article.title}</h3>
          <p className="text-sm mt-2">{article.content}</p>
          <Link href='/' className="text-blue-500 mt-2 block underline">
            Read More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
