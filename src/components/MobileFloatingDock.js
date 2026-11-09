"use client";

import Link from "next/link";
import { MessageCircle, TrendingUp, Phone, Calendar } from "lucide-react";

export default function MobileFloatingDock() {
  const whatsappNumber = "919336120419";
  const whatsappUrl = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodeURIComponent("Namaste Yash Jewellers, I would like to inquire about your bullion rates and book a consultation.")}`;

  return (
    <aside aria-label="Quick Mobile Actions" className="md:hidden fixed bottom-3 left-3 right-3 z-40 bg-[#270611]/95 backdrop-blur-md border border-[#C5A059]/40 rounded-full py-2.5 px-4 shadow-[0_10px_25px_rgba(39,6,17,0.5)] flex items-center justify-between text-white">
      <Link 
        href="/rates" 
        className="flex flex-col items-center gap-0.5 text-[#F3E8D0] hover:text-[#C5A059] transition-colors"
      >
        <TrendingUp size={18} className="text-[#C5A059]" />
        <span className="text-[9px] uppercase tracking-wider font-semibold">Live Rates</span>
      </Link>

      <div className="h-6 w-px bg-[#C5A059]/30" />

      <a 
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 bg-[#6B0E2A] hover:bg-[#851336] text-[#FAF7F2] px-4 py-1.5 rounded-full border border-[#C5A059]/40 text-xs font-semibold tracking-wide transition-all shadow-sm"
      >
        <MessageCircle size={15} className="text-[#C5A059]" />
        <span>WhatsApp VIP</span>
      </a>

      <div className="h-6 w-px bg-[#C5A059]/30" />

      <Link 
        href="/contact" 
        className="flex flex-col items-center gap-0.5 text-[#F3E8D0] hover:text-[#C5A059] transition-colors"
      >
        <Calendar size={18} className="text-[#C5A059]" />
        <span className="text-[9px] uppercase tracking-wider font-semibold">Book Visit</span>
      </Link>
    </aside>
  );
}

