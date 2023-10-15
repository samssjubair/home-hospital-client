// Articles.js
import React from "react";
import ArticleCard from "./ArticleCard";
import Heading from "../ui/Heading";
import { getBaseUrl } from "@/helpers/config/envConfig";
import { ICMSBlogPost } from "@/types";



const Articles = async () => {
    const res= await fetch(getBaseUrl()+'/cms/blog_post/cms');
    const articles=await res.json();
  return (
    <div className="container mx-auto p-4">
      <Heading title="Articles" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {articles.data.map((article : ICMSBlogPost, index: number) => (
          <ArticleCard key={index} article={article} />
        ))}
      </div>
    </div>
  );
};

export default Articles;
