import { getBaseUrl } from "@/helpers/config/envConfig";
import ServiceCard from "./ServiceCard";
import Heading from "../ui/Heading";
import { IService } from "@/types";

const Services = async () => {
    const res= await fetch(getBaseUrl()+'/services?page=1&size=4');
    const data=await res.json();
    return (
      <div className="container mx-auto py-8 px-4">
        <Heading title="Our Services" />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {data.data.map((service: IService) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    );
};

export default Services;