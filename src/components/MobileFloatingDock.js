"use client";

import Link from "next/link";
import { MessageCircle, TrendingUp, Phone, Calendar } from "lucide-react";
import { BUSINESS_DETAILS } from "@/src/config/business";

export default function MobileFloatingDock() {
  const whatsappUrl = `https://wa.me/${BUSINESS_DETAILS.whatsappClean}?text=${encodeURIComponent("Namaste Yash Jewellers, I would like to inquire about your jewellery designs and current live gold rates.")}`;

  return (
    <aside aria-label="Quick Mobile Actions" className="md:hidden fixed bottom-3 left-3 right-3 z-40 bg-[#270611]/95 backdrop-blur-md border border-[#C5A059]/40 rounded-full py-2 px-4 shadow-[0_10px_25px_rgba(39,6,17,0.5)] flex items-center justify-between text-white">
      <Link 
        href="/rates" 
        className="flex flex-col items-center gap-0.5 text-[#F3E8D0] hover:text-[#C5A059] transition-colors"
      >
        <TrendingUp size={17} className="text-[#C5A059]" />
        <span className="text-[9px] uppercase tracking-wider font-semibold">Live Rates</span>
      </Link>

      <div className="h-5 w-px bg-[#C5A059]/30" />

      <a 
        href={`tel:${BUSINESS_DETAILS.phoneClean}`}
        className="flex flex-col items-center gap-0.5 text-[#F3E8D0] hover:text-[#C5A059] transition-colors"
      >
        <Phone size={17} className="text-[#C5A059]" />
        <span className="text-[9px] uppercase tracking-wider font-semibold">Call Store</span>
      </a>

      <div className="h-5 w-px bg-[#C5A059]/30" />

      <a 
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1.5 bg-[#6B0E2A] hover:bg-[#851336] text-[#FAF7F2] px-3.5 py-1.5 rounded-full border border-[#C5A059]/40 text-xs font-semibold tracking-wide transition-all shadow-sm"
      >
        <MessageCircle size={14} className="text-[#C5A059]" />
        <span>WhatsApp</span>
      </a>

      <div className="h-5 w-px bg-[#C5A059]/30" />

      <Link 
        href="/contact" 
        className="flex flex-col items-center gap-0.5 text-[#F3E8D0] hover:text-[#C5A059] transition-colors"
      >
        <Calendar size={17} className="text-[#C5A059]" />
        <span className="text-[9px] uppercase tracking-wider font-semibold">Visit Us</span>
      </Link>
    </aside>
  );
}
