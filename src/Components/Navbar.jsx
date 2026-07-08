import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FaLinkedin,
  FaFacebookF,
  FaTelegramPlane,
  FaWhatsapp,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";

// Importing the requested images
import LogoNoBg from "../Assets/Images/Linxtel_Logo.jpg-removebg-preview.png";
import LogoWithBg from "../Assets/Images/Linxtel Logo.jpg.jpeg";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const textColor = scrolled ? "text-[#101a30]" : "text-[#F8F4E9]";
  const hoverColor = scrolled ? "hover:text-[#C8A24A]" : "hover:text-[#E2C26B]";
  
  const navLinkStyle = ({ isActive }) =>
    isActive
      ? `text-[#C8A24A] font-medium transition-all duration-300`
      : `${textColor} ${hoverColor} transition-all duration-300`;

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white shadow-[0_8px_30px_-12px_rgba(0,0,0,0.1)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <nav
          className={`flex items-center justify-between transition-all duration-500 ${
            scrolled ? "h-20" : "h-24"
          }`}
        >
          {/* Logo Section */}
          <NavLink to="/" className="flex items-center gap-4 group">
            <img 
              src={scrolled ? LogoWithBg : LogoNoBg} 
              alt="Linxtel Logo" 
              className={`transition-all duration-500 ${scrolled ? "h-14" : "h-16"}`}
            />
          </NavLink>

          {/* Navigation */}
          <ul className={`hidden lg:flex items-center gap-10 text-[17px] font-medium ${textColor}`}>
            {["Home", "About Us", "Services", "Contact Us", "FAQ"].map(
              (item) => (
                <li key={item}>
                  <NavLink
                    to={
                      item === "Home"
                        ? "/"
                        : `/${item.toLowerCase().replace(/\s+/g, "-")}`
                    }
                    className={navLinkStyle}
                  >
                    {item}
                  </NavLink>
                </li>
              )
            )}
          </ul>

          {/* Social Icons with Brand Colors */}
          <div className="hidden lg:flex items-center gap-4">
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-[#0A66C2] transition-all duration-300 hover:scale-110">
              <FaLinkedin size={20} />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-[#1877F2] transition-all duration-300 hover:scale-110">
              <FaFacebookF size={20} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-[#E1306C] transition-all duration-300 hover:scale-110">
              <FaInstagram size={20} />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-[#FF0000] transition-all duration-300 hover:scale-110">
              <FaYoutube size={20} />
            </a>
            <a href="https://telegram.org" target="_blank" rel="noopener noreferrer" className="text-[#0088CC] transition-all duration-300 hover:scale-110">
              <FaTelegramPlane size={20} />
            </a>
            <a href="https://wa.me/" target="_blank" rel="noopener noreferrer" className="text-[#25D366] transition-all duration-300 hover:scale-110">
              <FaWhatsapp size={20} />
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;