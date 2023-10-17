
import Achievements from "@/components/home/Achievements";
import Articles from "@/components/home/Articles";
import HomeCarousel from "@/components/home/Carousel";
import Category from "@/components/home/Category";
import ContactUs from "@/components/home/ContactUs";
import FAQAccordion from "@/components/home/FAQAccordion";
import Services from "@/components/home/Services";
import Testimonials from "@/components/home/Testimonials";
import { achievementsData } from "@/constants/global";

const HomePage = () => {
  return (
    <div>
      <HomeCarousel />
      <Achievements achievements={achievementsData} />
      <Category />
      <Services />
      {/* <UpcomingServices /> */}
      <Articles />
      <Testimonials />
      <ContactUs />
      <FAQAccordion />
    </div>
  );
};

export default HomePage;
