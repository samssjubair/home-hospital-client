import React from "react";
import { Carousel } from "antd";

const CarouselItem = ({
  backgroundImage,
  title,
  description,
}: {
  backgroundImage: string,
  title: string,
  description: string
}) => (
  <div>
    <div
      style={{
        ...contentStyle,
        backgroundImage: `url(${backgroundImage})`,
        boxShadow: 'inset 0 0 0 2000px rgba(255, 0, 150, 0.3)'

      }}
    >
      <div className="px-4">
        <h3 className="text-6xl font-bold">{title}</h3>
        <p className="text-3xl">{description}</p>
      </div>
    </div>
  </div>
);

const HomeCarousel: React.FC = () => (
  <Carousel autoplay>
    <CarouselItem
      backgroundImage="https://source.unsplash.com/1600x900/?doctor"
      title="Experienced Doctors at your doorstep"
      description="Providing top-notch healthcare services"
    />
    <CarouselItem
      backgroundImage="https://source.unsplash.com/1600x900/?nurse"
      title="Skilled Nurses in your home"
      description="Caring for your well-being with compassion"
    />
    <CarouselItem
      backgroundImage="https://source.unsplash.com/1600x900/?medicine"
      title="Quality Medicine in no time"
      description="Delivering the best pharmaceutical solutions"
    />
    <CarouselItem
      backgroundImage="https://source.unsplash.com/1600x900/?hospital"
      title="Blood test without going to hospital"
      description="Your health is our top priority"
    />
  </Carousel>
);

const contentStyle: React.CSSProperties = {
  height: "400px",
  color: "#fff",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  backgroundSize: "cover",
  backgroundPosition: "center",
  position: "relative",
};

export default HomeCarousel;
