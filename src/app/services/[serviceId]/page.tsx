import ServiceDetail from "@/components/ServicePage/ServiceDetail";
import { getBaseUrl } from "@/helpers/config/envConfig";
import { IService } from "@/types";
import axios from "axios";

export async function generateStaticParams() {
  const res = await fetch(getBaseUrl()+'/services') as any;
  const {data : services} =await res.json() ;

  return services.map((service: IService) => ({
    serviceId: service.id,
  }));
}

const ServiceDetailPage =async ({params}: {params: {serviceId: string}}) => {
    const {serviceId} = params;
    const res = await axios.get(`${getBaseUrl()}/services/${serviceId}`).then((res) => res.data);
    const {data} = res;

    return (
        <div>
            <ServiceDetail service={data} />
        </div>
    );
};

export default ServiceDetailPage;