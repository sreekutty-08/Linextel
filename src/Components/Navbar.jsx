import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FaLinkedin,
  FaFacebookF,
  FaTelegramPlane,
  FaWhatsapp,
} from "react-icons/fa";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    handleScroll(); // set correct state on mount (e.g. if page loads mid-scroll)
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

 const navLinkStyle = ({ isActive }) =>
  isActive
    ? "text-[#C8A24A] font-medium transition-all duration-300"
    : "text-[#F8F4E9] hover:text-[#E2C26B] transition-all duration-300";

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#101a30] shadow-[0_8px_30px_-12px_rgba(16,26,48,0.6)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <nav
          className={`flex items-center justify-between transition-all duration-500 ${
            scrolled ? "h-20" : "h-24"
          }`}
        >
          {/* Logo */}
          <NavLink to="/" className="flex items-center gap-4 group">
            <div>
              <h1 className="text-3xl font-bold tracking-wide text-[#F8F4E9]">
                Linextel
              </h1>
            </div>
          </NavLink>

          {/* Navigation */}
          <ul className="hidden lg:flex items-center gap-10 text-[17px] font-medium">
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

          {/* Social Icons */}
          <div className="hidden lg:flex items-center gap-5 text-[#F8F4E9]">
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#C8A24A] transition-all duration-300 hover:scale-110"
            >
              <FaLinkedin size={21} />
            </a>

            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#C8A24A] transition-all duration-300 hover:scale-110"
            >
              <FaFacebookF size={20} />
            </a>

            <a
              href="https://telegram.org"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#C8A24A] transition-all duration-300 hover:scale-110"
            >
              <FaTelegramPlane size={20} />
            </a>

            <a
              href="https://wa.me/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#C8A24A] transition-all duration-300 hover:scale-110"
            >
              <FaWhatsapp size={21} />
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;