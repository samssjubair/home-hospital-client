// ServiceCard.js
import Image from "next/image";
import React from "react";

const ServiceCard = ({ service }: {service: any}) => {
  const imageUrl = service.imageUrl || "https://picsum.photos/300/300";

  return (
    <div className="bg-pink-100 rounded-lg shadow-lg p-4 transform hover:scale-105 transition-transform">
      <div className="relative aspect-w-3 aspect-h-2">
        <Image src={imageUrl} alt={service.title} className="object-contain" width={400} height={200} />
      </div>
      <div className="mt-4">
        <h3 className="text-2xl font-semibold text-pink-600">
          {service.title}
        </h3>
        <p className="text-lg text-pink-500">{service.subCategory}</p>
        <p className="text-lg text-gray-600">${service.price}</p>
        <button className="bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2 px-4 rounded-full mt-4">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ServiceCard;
