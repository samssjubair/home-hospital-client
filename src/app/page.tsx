
import HomeCarousel from "@/components/home/Carousel";
import Category from "@/components/home/Category";
import Services from "@/components/home/Services";
import UpcomingServices from "@/components/home/UpcomingService";

const HomePage = () => {
  return (
    <div>
      <HomeCarousel />
      <Services />
      <UpcomingServices />
      <Category />
    </div>
  )
  ;
};

export default HomePage;
