import Link from 'next/link';
import { Instagram, Facebook, Phone, MapPin, Clock, ShieldCheck, Mail, Sparkles, Award } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-[#1F040D] text-[#FAF7F2] pt-16 pb-10 border-t-2 border-[#C5A059] font-sans relative overflow-hidden">
            {/* Subtle Heritage Jali Background Pattern */}
            <div className="absolute inset-0 opacity-8 bg-heritage-pattern pointer-events-none" />

            <div className="container mx-auto px-4 md:px-8 relative z-10">
                
                {/* VIP Newsletter & Rate Alert Banner */}
                <div className="bg-[#270611] p-6 md:p-8 border border-[#C5A059]/40 mb-14 max-w-5xl mx-auto shadow-xl flex flex-col md:flex-row justify-between items-center gap-6">
                    <div>
                        <div className="flex items-center gap-2 text-[#C5A059] text-[10px] uppercase font-bold tracking-[0.25em]">
                            <Sparkles size={13} className="text-[#DFBE7A]" />
                            <span>The Yash Royal Club · विशेष क्लब</span>
                        </div>
                        <h3 className="font-serif text-2xl text-[#FAF7F2] font-medium mt-1">
                            Subscribe for Live Bullion Alerts &amp; Private Previews
                        </h3>
                        <p className="text-xs text-[#EAD8B1]/75 mt-1 font-sans">
                            Receive daily morning gold benchmark rates and exclusive invitations to bridal exhibitions.
                        </p>
                    </div>

                    <div className="w-full md:w-auto flex flex-col sm:flex-row gap-2">
                        <input
                            type="text"
                            placeholder="Enter WhatsApp or Email"
                            className="bg-[#1F040D] text-xs text-[#FAF7F2] border border-[#C5A059]/50 px-4 py-2.5 focus:outline-none focus:border-[#C5A059] w-full sm:w-64"
                        />
                        <button
                            className="bg-[#6B0E2A] hover:bg-[#851336] text-[#FAF7F2] text-xs font-bold uppercase tracking-widest px-6 py-2.5 border border-[#C5A059]/50 transition-colors whitespace-nowrap"
                        >
                            Subscribe
                        </button>
                    </div>
                </div>

                {/* Main 4-Column Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
                    
                    {/* 1. Brand Monogram & Credo */}
                    <div className="space-y-4">
                        <div>
                            <span className="text-[9px] uppercase tracking-[0.3em] text-[#C5A059] font-bold">
                                Estd. 1975 · Kanpur
                            </span>
                            <h2 className="font-serif text-2xl text-[#FAF7F2] font-normal leading-tight mt-1">
                                YASH <span className="text-gold-gradient font-serif italic font-bold">JEWELLERS</span>
                            </h2>
                            <p className="font-serif text-xs text-[#EAD8B1] italic mt-1">
                                "पीढ़ियों का विश्वास, खूबसूरती की पहचान।"
                            </p>
                        </div>
                        
                        <p className="text-xs text-[#FAF7F2]/75 leading-relaxed font-sans">
                            Kanpur's revered high jewellery house crafting 100% BIS Hallmarked gold, uncut Kundan Polki, and certified solitaires for fifty distinguished years.
                        </p>

                        <div className="flex gap-3 pt-2">
                            <a 
                                href="https://instagram.com" 
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Instagram"
                                className="w-9 h-9 rounded-none border border-[#C5A059]/40 bg-[#270611] flex items-center justify-center hover:bg-[#6B0E2A] text-[#C5A059] hover:text-white transition-colors"
                            >
                                <Instagram size={16} />
                            </a>
                            <a 
                                href="https://facebook.com" 
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Facebook"
                                className="w-9 h-9 rounded-none border border-[#C5A059]/40 bg-[#270611] flex items-center justify-center hover:bg-[#6B0E2A] text-[#C5A059] hover:text-white transition-colors"
                            >
                                <Facebook size={16} />
                            </a>
                            <a 
                                href="https://wa.me/918881121119" 
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="WhatsApp"
                                className="w-9 h-9 rounded-none border border-[#C5A059]/40 bg-[#270611] flex items-center justify-center hover:bg-[#6B0E2A] text-[#C5A059] hover:text-white transition-colors"
                            >
                                <Phone size={16} />
                            </a>
                        </div>
                    </div>

                    {/* 2. High Jewellery Collections */}
                    <div>
                        <h3 className="text-[#C5A059] font-bold tracking-[0.2em] uppercase text-xs mb-4">
                            Collections · संग्रह
                        </h3>
                        <ul className="space-y-2.5 text-xs text-[#FAF7F2]/80">
                            <li>
                                <Link href="/shop" className="hover:text-[#DFBE7A] transition-colors">
                                    Bridal Chokers &amp; Rani Haars
                                </Link>
                            </li>
                            <li>
                                <Link href="/shop" className="hover:text-[#DFBE7A] transition-colors">
                                    Imperial Kundan &amp; Polki Jadau
                                </Link>
                            </li>
                            <li>
                                <Link href="/shop" className="hover:text-[#DFBE7A] transition-colors">
                                    22K Nakshi Temple Jewellery
                                </Link>
                            </li>
                            <li>
                                <Link href="/shop" className="hover:text-[#DFBE7A] transition-colors">
                                    Filigree Kangans &amp; Bangles
                                </Link>
                            </li>
                            <li>
                                <Link href="/shop" className="hover:text-[#DFBE7A] transition-colors">
                                    IGI Certified Diamond Solitaires
                                </Link>
                            </li>
                            <li>
                                <Link href="/shop" className="hover:text-[#DFBE7A] transition-colors">
                                    Pure 24K Minted Gold Coins
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* 3. Bullion & Client Services */}
                    <div>
                        <h3 className="text-[#C5A059] font-bold tracking-[0.2em] uppercase text-xs mb-4">
                            Bullion &amp; Services
                        </h3>
                        <ul className="space-y-2.5 text-xs text-[#FAF7F2]/80">
                            <li>
                                <Link href="/rates" className="hover:text-[#DFBE7A] transition-colors flex items-center gap-1.5">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                                    <span>Live Bullion Trading Desk</span>
                                </Link>
                            </li>
                            <li>
                                <Link href="/rates" className="hover:text-[#DFBE7A] transition-colors">
                                    Gold Rate Calculator &amp; GST
                                </Link>
                            </li>
                            <li>
                                <Link href="/about" className="hover:text-[#DFBE7A] transition-colors">
                                    BIS Hallmarking Standards (HUID)
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="hover:text-[#DFBE7A] transition-colors">
                                    Book VIP In-Store Consultation
                                </Link>
                            </li>
                            <li>
                                <Link href="/about" className="hover:text-[#DFBE7A] transition-colors">
                                    Lifetime Gold Exchange Policy
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="hover:text-[#DFBE7A] transition-colors">
                                    Bespoke Bridal Atelier Orders
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* 4. Boutique Flagship */}
                    <div>
                        <h3 className="text-[#C5A059] font-bold tracking-[0.2em] uppercase text-xs mb-4">
                            Kanpur Showroom · प्रतिष्ठान
                        </h3>
                        <ul className="space-y-3 text-xs text-[#FAF7F2]/80">
                            <li className="flex gap-2.5 items-start">
                                <MapPin className="shrink-0 text-[#C5A059] mt-0.5" size={15} />
                                <span>307, Krishna Niwas, Yusuf Meherali Rd &amp; Kanpur Bullion Market, UP</span>
                            </li>
                            <li className="flex gap-2.5 items-center">
                                <Phone className="shrink-0 text-[#C5A059]" size={15} />
                                <span>+91 88811 21119 (VIP Desk)</span>
                            </li>
                            <li className="flex gap-2.5 items-center">
                                <Mail className="shrink-0 text-[#C5A059]" size={15} />
                                <span>concierge@yashjewellers.com</span>
                            </li>
                            <li className="flex gap-2.5 items-center">
                                <Clock className="shrink-0 text-[#C5A059]" size={15} />
                                <span>Mon - Sat: 10:30 AM – 8:30 PM</span>
                            </li>
                        </ul>
                    </div>

                </div>

                {/* Bottom Assurance Strip */}
                <div className="border-t border-[#C5A059]/25 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] text-[#FAF7F2]/60">
                    <div className="flex flex-wrap items-center gap-4">
                        <span className="flex items-center gap-1 text-[#EAD8B1]">
                            <ShieldCheck size={14} className="text-[#C5A059]" /> 100% Certified 916 BIS Hallmark
                        </span>
                        <span>•</span>
                        <span>Kanpur &amp; Delhi Bullion Benchmark</span>
                        <span>•</span>
                        <span>Direct Landed Formula (6% Duty + 3% GST)</span>
                    </div>

                    <p>&copy; {new Date().getFullYear()} Yash Jewellers. All Rights Reserved. Crafted with Royal Heritage Pride.</p>
                </div>

            </div>
        </footer>
    );
}
