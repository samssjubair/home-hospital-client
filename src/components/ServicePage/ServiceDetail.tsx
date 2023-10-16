"use client";
import { IReview, IService } from "@/types";
import Image from "next/image";
import React, { useState } from "react";
import Heading from "../ui/Heading";
import { Rate, message } from "antd";
import { getUserInfo } from "@/services/auth.service";
import axios from "axios";
import { getBaseUrl } from "@/helpers/config/envConfig";
import { getFromLocalStorage } from "@/utils/local-storage";
import { authKey } from "@/constants/storage";
import { revalidatePath, revalidateTag } from "next/cache";

interface ServiceDetailProps {
  service: IService;
}

const ServiceDetail: React.FC<ServiceDetailProps> = ({ service }) => {
  const [newReview, setNewReview] = useState<string>("");
  const [rating, setRating] = useState<number>(0);
  const userInfo = getUserInfo() as any;

  const handleReviewSubmit = () => {
    // Implement review submission logic here

    
    if (!userInfo) {
      message.error("Please login to submit review");
    } else {
        const body = {
          userId: userInfo.id,
          serviceId: service.id,
          text: newReview,
          rating: rating,
        };
        console.log(body);
      axios
        .post(getBaseUrl() + "/reviews/create-review", body, {
            headers: {
                Authorization: `${getFromLocalStorage(authKey)}`,
            },
        })
        .then((res) => {
            message.success("Review submitted successfully").then(() => window.location.reload());
            setNewReview("");
            setRating(0);
        //   if (res.status === 200) {
            
        //   } else {
        //     message.error("Something went wrong");
        //   }
        })
        .catch((err) => {
          message.error("Something went wrong");
        });
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row">
        <div className="mb-8 md:w-1/2">
          <Image
            src={service.imageUrl || "https://picsum.photos/300/300"}
            alt={service.title}
            width={600}
            height={400}
            className="rounded-lg"
          />
        </div>
        <div className="md:w-1/2 md:pl-8">
          <Heading title={service.title} />
          <div className="mb-8">
            <h3 className="text-xl font-semibold">Service Details</h3>
            <p className="text-lg mb-4">{service.description}</p>
            <p className="text-lg">
              <strong>Price:</strong> &#2547; {service.price}
            </p>
            <p className="text-lg">
              <strong>Organization:</strong> {service.organization}
            </p>
            <p className="text-lg">
              <strong>Service Area:</strong> {service.serviceArea}
            </p>
          </div>
          <div className="mb-8">
            <div className="flex justify-between items-center">
              <div>
                <button className="bg-pink-700 text-white px-4 py-2 rounded-md me-2">
                  Book Now
                </button>
                <button className="bg-pink-700 text-white px-4 py-2 rounded-md me-2">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mb-8">
        <h3 className="text-2xl my-4 text-pink-900 font-semibold">Reviews</h3>
        {service.reviews.length === 0 ? (
          <p>No reviews available.</p>
        ) : (
          <ul>
            {service.reviews.map((review: IReview, index: number) => (
              <li key={index} className="mb-8">
                <div className="flex items-center">
                  <div className="w-12 h-12">
                    <Image
                      src={
                        review.user.profileImg || "https://picsum.photos/50/50"
                      }
                      alt={review.user.name}
                      width={50}
                      height={50}
                      className="rounded-full"
                    />
                  </div>
                  <div className="ms-4">
                    <Rate defaultValue={review.rating} disabled />
                    <div className="flex">
                      <h4 className="text-lg ">
                        {review.user.name}{" "}
                        <span className="font-light">from</span>{" "}
                        {review.user.address}
                      </h4>
                      <p className=" ms-1 text-lg ">
                        {" "}
                        | {new Date(review.createdAt).toDateString()}
                      </p>
                    </div>
                    <p className="text-md ">{review.text}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="mb-8">
        <h3 className="text-xl text-pink-900 font-semibold">Add Your Review</h3>
        <span className="block my-2">Your Experience: </span>
        <Rate
          className="mb-4"
          defaultValue={0}
          onChange={(value) => setRating(value)}
        />
        <textarea
          rows={4}
          className="w-full p-2 border border-gray-300 rounded-md mb-4"
          placeholder="Write a review..."
          value={newReview}
          onChange={(e) => setNewReview(e.target.value)}
        />
        <button
          onClick={handleReviewSubmit}
          className="bg-pink-700 text-white px-4 py-2 rounded-md"
        >
          Submit Review
        </button>
      </div>
    </div>
  );
};

export default ServiceDetail;
