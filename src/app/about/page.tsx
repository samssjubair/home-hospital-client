// AboutUs.js
import React from "react";
import aboutUsImage from "@/assets/about.png";
import Heading from "@/components/ui/Heading";
import Image from "next/image";

const AboutUs = () => {
  return (
    <div className="container mx-auto p-4">
    {/* <Heading title="About Us" /> */}
      <div className="mb-8">
        <Image
          src={aboutUsImage}
          alt="About Us"
          className="mx-auto rounded-lg"
            height={400}
            width={800}
        />
      </div>
      <div>
        <p className="text-lg mb-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
          consectetur ligula ut enim fermentum, non facilisis tortor congue.
          Vivamus vel odio at nisl convallis posuere. Suspendisse potenti. Duis
          suscipit vestibulum est, in luctus nisl aliquam at.
        </p>
        <p className="text-lg mb-4">
          Vestibulum id dignissim purus. Nullam in sollicitudin lorem. Sed at
          turpis sit amet nunc tincidunt ultrices. Cras a lacus a velit
          scelerisque efficitur non in sapien.
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
