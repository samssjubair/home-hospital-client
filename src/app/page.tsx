
import Achievements from "@/components/home/Achievements";
import HomeCarousel from "@/components/home/Carousel";
import Category from "@/components/home/Category";
import ContactUs from "@/components/home/ContactUs";
import FAQAccordion from "@/components/home/FAQAccordion";
import Services from "@/components/home/Services";
import UpcomingServices from "@/components/home/UpcomingService";
import { achievementsData } from "@/constants/global";

const HomePage = () => {
  return (
    <div>
      <HomeCarousel />
      <Achievements achievements={achievementsData} />
      <Category />
      <Services />
      <UpcomingServices />
      <ContactUs />
      <FAQAccordion />
    </div>
  );
};

export default HomePage;
