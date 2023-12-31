
"use client"
import { addToCart } from "@/redux/cart/cartSlice";
import { useAppDispatch } from "@/redux/hooks";
import { isLoggedIn } from "@/services/auth.service";
import { IService } from "@/types";
import { message } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const ServiceCard = ({ service }: {service: IService}) => {
  const dispatch = useAppDispatch();
  const imageUrl = service.imageUrl || "https://picsum.photos/300/300";
  const router = useRouter();


  const handleAddToCart = () => {
    if(isLoggedIn()){
      dispatch(addToCart(service));
    }
    else{
      message.error("Please login to add to cart");
    }
    
  }

  return (
    <div className="bg-pink-100 rounded-lg shadow-lg p-4 transform hover:scale-105 transition-transform">
      <div className="relative aspect-w-3 aspect-h-2">
        <Image
          src={imageUrl}
          alt={service.title}
          className="object-cover h-64 w-full"
          height={200}
          width={400}
        />
      </div>
      <div className="mt-4">
        <h3 className="text-2xl font-semibold text-pink-600">
          {service.title}
        </h3>
        <p className="text-lg text-pink-500">{service.subCategory}</p>
        <p className="text-lg text-gray-600">${service.price}</p>
        <button
          onClick={handleAddToCart}
          className="bg-pink-700 hover:bg-pink-800 text-white font-semibold py-2 px-4 rounded-full mt-4"
        >
          Add to Cart
        </button>
        <button className="bg-pink-700 ms-2 hover:bg-pink-800 text-white font-semibold py-2 px-4 rounded-full mt-4">
          <Link href={`/services/${service.id}`}>View Details</Link>
        </button>
      </div>
    </div>
  );
};

export default ServiceCard;
