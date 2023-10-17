import { getBaseUrl } from "@/helpers/config/envConfig";
import ServiceCard from "./ServiceCard";
import Heading from "../ui/Heading";
import { IService } from "@/types";

const UpcomingServices =  () => {
  const data: IService[] = [
    {
      id: "056b577a-f1d3-4887-9b6c-0515824f8ab0",
      title: "Dr AK Faisal",
      department: null,
      subCategory: "Medicine",
      imageUrl: null,
      description: "MS, MD, MBBS, DMC",
      organization: "Dhaka Medical College",
      serviceArea: "Dhaka",
      price: 5000,
      createdAt: "2023-10-12T08:43:39.410Z",
      updatedAt: "2023-10-12T08:43:39.410Z",
      categoryId: "3c244656-f463-4d13-b9e9-10dba147dc21",
      reviews: []
    },
  ];
  return (
    <div className="container mx-auto py-8">
      <Heading title="Upcoming Services" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {data.map((service: IService) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
    </div>
  );
};

export default UpcomingServices;
