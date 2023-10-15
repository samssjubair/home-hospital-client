import Image from "next/image";
import contactUsImage from "@/assets/contactus.png"

const ContactUs = () => {
  return (
    <div className="text-pink-700 bg-pink-100 py-8 px-4">
      <div className="container mx-auto flex flex-wrap items-center">
        <div className="w-full md:w-1/2 text-center md:text-left md:pr-4">
          <h2 className="text-3xl font-semibold mb-4">
            GOT A PROBLEM? WE GOT YOU!
          </h2>
          <p className="text-lg">
            We rise by lifting others is what we believe in. You wont stay
            stuck in the process thats our promise. All the support tickets
            are taken care of with high priority. You will hear back from us
            within 12 hours of receiving your mail.
          </p>
          <div className="mt-8">
            <a
              href="/contact" // Replace with your contact page URL
              className="bg-white text-pink-500 hover:bg-pink-400 hover:text-white font-semibold px-6 py-2 rounded-full mx-2 transition duration-300"
            >
              CONTACT US
            </a>
            <a
              href="/user-guide" // Replace with your user guide page URL
              className="bg-white text-pink-500 hover:bg-pink-400 hover:text-white font-semibold px-6 py-2 rounded-full mx-2 transition duration-300"
            >
              USER GUIDE
            </a>
          </div>
        </div>
        <div className="w-full md:w-1/2 text-center flex justify-end">
          <Image
            src={contactUsImage}
            alt="Contact Us Image"
            className="mx-auto md:mx-0"
            height={300}
            width={300}
          />
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
