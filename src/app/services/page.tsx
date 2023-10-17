"use client"
import ServiceCard from "@/components/home/ServiceCard";
import Heading from "@/components/ui/Heading";
import { getBaseUrl } from "@/helpers/config/envConfig";
import { IService } from "@/types";
import React, { useEffect, useState } from "react";
import { Input, Space, Slider, Pagination } from "antd";
import _ from "lodash";

const { Search } = Input;

const ServicesPage = () => {
  const pageSize = 5; // Number of services per page
  const [serviceList, setServiceList] = useState<IService[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalServices, setTotalServices] = useState<number>(0);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [priceRange, setPriceRange] = useState<[number, number]>([200, 10000]); // Set your desired range here

  const fetchData = async (
    page: number,
    search: string,
    minPrice: number,
    maxPrice: number
  ) => {
    const res = await fetch(
      getBaseUrl() +
        `/services?page=${page}&size=${pageSize}&searchTerm=${search}&minPrice=${minPrice}&maxPrice=${maxPrice}`
    );
    const data = await res.json();
    setServiceList(data.data);
    setTotalServices(data.meta.total);
  };

  useEffect(() => {
    fetchData(currentPage, searchTerm, priceRange[0], priceRange[1]);
  }, [currentPage, searchTerm, priceRange]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };

  const handlePriceChange = (value: any) => {
    setPriceRange(value);
  };

  const fetchDataWithDebounce = _.debounce(
    (page: number, search: string, minPrice: number, maxPrice: number) => {
      fetchData(page, search, minPrice, maxPrice);
    },
    500 // Set your desired debounce delay (e.g., 500 milliseconds)
  );

  const debouncedSearch = (value: string) => {
    setSearchTerm(value);
    fetchDataWithDebounce(currentPage, value, priceRange[0], priceRange[1]);
  };

  const debouncedPriceChange = (value: any) => {
    setPriceRange(value);
    fetchDataWithDebounce(currentPage, searchTerm, value[0], value[1]);
  };


  return (
    <div className="container mx-auto py-8">
      <Heading title="Our Services" />

      <Space direction="vertical" className="w-full mb-4">
        <Search
          placeholder="Search by category, service, city or organization"
          onSearch={debouncedSearch} // Use debounced function for search
          enterButton
          size="large"
        />
        <span>Filter by price: </span>
        <Slider
          range
          min={0}
          max={20000} // Set your desired max price
          defaultValue={priceRange}
          onChange={debouncedPriceChange} // Use debounced function for price filter
        />
      </Space>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {serviceList.map((service: IService) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>

      <div className="mt-4 flex justify-center">
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={totalServices}
          onChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default ServicesPage;
