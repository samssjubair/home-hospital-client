import { getBaseUrl } from "@/helpers/config/envConfig";
import ServiceCard from "./ServiceCard";
import Heading from "../ui/Heading";
import { ICategory, IService } from "@/types";
import CategoryCard from "./CategoryCard";

const Category = async () => {
  const res = await fetch(getBaseUrl() + "/categories");
  const data = await res.json();
  
  return (
    <div className="container mx-auto py-8">
      <Heading title="Categories of Services We Provide" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {data.data.map((category: ICategory) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </div>
  );
};

export default Category;
