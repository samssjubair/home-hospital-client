// TestimonialCard.js
import Image from "next/image";
import React from "react";

const TestimonialCard = ({ testimonial }: any) => {
    const image =
      testimonial.user.profileImg ||
      "https://source.unsplash.com/1600x900/?people";

  return (
    <div className="bg-pink-100 p-4 mb-4 shadow-md rounded-md">
      <div className="flex items-center">
        <div className="me-12">
          <Image
            src={image}
            alt={testimonial.user.name}
            className="w-24 h-24 rounded-full"
            height={200}
            width={200}
          />
        </div>
        <div>
          <h3 className="text-xl font-semibold">{testimonial.user.name}</h3>
          <p className="text-gray-500">{testimonial.user.address}</p>
          <p className="text-sm mt-2">{testimonial.feedback}</p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
