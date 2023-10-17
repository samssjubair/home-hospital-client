import ServiceCard from '@/components/home/ServiceCard';
import Heading from '@/components/ui/Heading';
import { getBaseUrl } from '@/helpers/config/envConfig';
import { ICategory, IService } from '@/types';
import axios from 'axios';
import React from 'react';

export async function generateStaticParams() {
  const res = (await fetch(getBaseUrl() + "/categories")) as any;
  const { data: categories } = await res.json();

  return categories.map((category: ICategory) => ({
    categoryId: category.id,
  }));
}

const ServiceByCategoryPage = async ({params}: {params: {categoryId: string}}) => {
    const { categoryId } = params;
    const res = await axios
      .get(`${getBaseUrl()}/services/${categoryId}/category`)
      .then((res) => res.data);
    const { data } = res;

    const categoryRes = await axios
      .get(`${getBaseUrl()}/categories/${categoryId}`)
      .then((res) => res.data);
    const { data: category } = categoryRes;


    return (
      <div className="container mx-auto py-8">
        <Heading title={`All ${category.title}`} />
        {data ? (
          data.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {data.map((service: IService) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          ) : (
            <p className='text-center'>No data available for this category.</p>
          )
        ) : (
          <p>Loading data...</p>
        )}
      </div>
    );
};

export default ServiceByCategoryPage;