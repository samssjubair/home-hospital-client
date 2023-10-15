import { socialLinks } from "@/constants/global";
import React from "react";
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";

const iconsMap: any = {
  Facebook: FaFacebook,
  Twitter: FaTwitter,
  LinkedIn: FaLinkedin,
  Instagram: FaInstagram,
};

const Footer = () => {
  return (
    <footer className="bg-pink-700 text-white py-8">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-semibold">Contact Us</h2>
          <p className="text-sm mt-2">
            1234 Uttara, Dhaka
            <br />
            Bangladesh
            <br />
            Email: samssjubair@gmail.com
            <br />
            Phone: (123) 456-7890
          </p>
        </div>

        <div className="mt-4 md:mt-0">
          <h2 className="text-2xl font-semibold">Follow Us</h2>
          <div className="flex space-x-4 mt-2">
            {socialLinks.map((link) => {
              const Icon = iconsMap[link.name];
              return (
                <a
                  key={link.name}
                  href={link.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-3xl hover:text-pink-100"
                >
                  <Icon />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
