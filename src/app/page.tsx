import HomeCarousel from "@/components/home/Carousel";
import Navbar from "@/components/ui/Navbar";
import { Button } from "antd";
import { redirect } from "next/navigation";

const HomePage = () => {
  return (
    <div>
      <HomeCarousel />
    </div>
  )
  ;
};

export default HomePage;
