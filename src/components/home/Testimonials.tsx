// Testimonials.js
import React from "react";
import TestimonialCard from "./TestimonialCard";
import Heading from "../ui/Heading";
import { getBaseUrl } from "@/helpers/config/envConfig";
import { ITestimonial } from "@/types";

const Testimonials = async () => {
  const res = await fetch(getBaseUrl() + "/feedback");
  const testimonials = await res.json();
  return (
    <div className="container mx-auto p-4">
      <Heading title="Testimonials" />
      <div className="grid grid-cols-1 md:grid-cols-2  gap-4">
        {testimonials.data.map((testimonial: ITestimonial, index: number) => (
          <TestimonialCard key={index} testimonial={testimonial} />
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
