import React from "react";
import { FaWhatsapp } from "react-icons/fa";

const WhatsAppButton = () => {
  const phoneNumber = "+919462719609";
  const message = "Hello! I would like to inquire about Linxtel Ltd VOIP services.";
  
  const whatsappUrl = `https://wa.me/${phoneNumber.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-8 right-8 z-[100] flex items-center justify-center w-14 h-14 bg-[#25D366] rounded-full shadow-lg hover:bg-[#20bd5a] transition-all duration-300 hover:scale-110 animate-bounce"
    >
      <FaWhatsapp size={32} className="text-white" />
    </a>
  );
};

export default WhatsAppButton;