"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X, Phone, TrendingUp, ShieldCheck, Sparkles, Calendar, MessageCircle } from 'lucide-react';
import { useRates } from '@/src/context/RatesContext';
import { BUSINESS_DETAILS } from '@/src/config/business';

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { rates, formatINR } = useRates();
    const [rateTrend, setRateTrend] = useState('');

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const gold24k = rates?.gold24k || 138250;
    const gold22k = rates?.gold22k || 125000;

    return (
        <header className="z-50 sticky top-0 font-sans shadow-md">
            {/* Top Bar - Deep Burgundy Velvet with Antique Gold Detailing */}
            <div className="bg-[#270611] text-[#F3E8D0] text-[11px] py-2 px-4 md:px-8 flex justify-between items-center border-b border-[#C5A059]/30">
                <div className="flex items-center gap-3 md:gap-6">
                    <span className="hidden sm:inline-flex items-center gap-1.5 text-[#EAD8B1] tracking-wider">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059] animate-pulse"></span>
                        <span className="font-serif italic">विरासत एवं विश्वास</span> · {BUSINESS_DETAILS.shortAddress}
                    </span>
                    <span className="flex items-center gap-1 text-[#C5A059] font-medium tracking-wide">
                        <ShieldCheck size={13} className="text-[#DFBE7A]" /> 100% BIS Hallmarked (916) Gold
                    </span>
                </div>

                <div className="flex items-center gap-4">
                    <Link href="/rates" className="flex items-center gap-1.5 hover:opacity-90 transition-opacity bg-[#3A091A] px-2.5 py-1 rounded-sm border border-[#C5A059]/25">
                        <TrendingUp className="w-3.5 h-3.5 text-[#C5A059]" />
                        <span className="text-[#EAD8B1] text-[10px] uppercase tracking-wider font-semibold">22K Gold (10g):</span>
                        <span className={`rate-val font-mono font-bold text-xs text-white ${rateTrend}`}>
                            ₹{formatINR(gold22k)}
                        </span>
                    </Link>

                    <Link href="/rates" className="text-[10px] text-[#C5A059] hover:text-[#FFF0D0] uppercase tracking-widest hidden md:inline font-bold transition-colors">
                        Live Rates →
                    </Link>
                </div>
            </div>

            {/* Main Navigation - Warm Ivory Silk with Hairline Gold Accents */}
            <div className={`w-full transition-all duration-300 border-b border-[#C5A059]/20 ${
                scrolled ? 'bg-[#FAF7F2]/95 backdrop-blur-md shadow-[0_4px_20px_rgba(39,6,17,0.08)] py-3' : 'bg-[#FAF7F2] py-4'
            }`}>
                <div className="container mx-auto px-4 md:px-8 flex justify-between items-center">
                    
                    {/* Mobile Menu Button */}
                    <button 
                        onClick={() => setIsMenuOpen(true)} 
                        aria-label="Open Navigation Menu"
                        className="md:hidden text-[#270611] p-1.5 hover:text-[#6B0E2A] transition-colors"
                    >
                        <Menu size={26} />
                    </button>

                    {/* Royal Logo & Monogram */}
                    <Link href="/" className="flex items-center gap-3 group mx-auto md:mx-0">
                        <img 
                            src="/images/yash/business/logo/logo-1923200437.jpeg" 
                            alt="Yash Jewellers Logo" 
                            className="w-10 h-10 md:w-11 md:h-11 rounded-full object-cover border-2 border-[#C5A059] shadow-sm group-hover:scale-105 transition-transform"
                        />
                        <div className="flex flex-col text-left">
                            <div className="flex items-center gap-1.5">
                                <span className="text-[9px] uppercase tracking-[0.25em] text-[#6B0E2A] font-bold">
                                    Chaubepur, Kanpur
                                </span>
                            </div>
                            <h1 className="font-serif text-xl md:text-2xl lg:text-[26px] tracking-[0.05em] font-normal text-[#270611] leading-none mt-0.5">
                                YASH <span className="font-serif italic font-bold text-gold-gradient">JEWELLERS</span>
                            </h1>
                            <span className="text-[8px] tracking-[0.18em] text-[#8C6D38] uppercase font-medium mt-0.5 hidden sm:inline">
                                100% बीआईएस हॉलमार्क जेवर
                            </span>
                        </div>
                    </Link>

                    {/* Desktop Links */}
                    <nav className="hidden md:flex gap-5 lg:gap-6 items-center">
                        {[
                            { name: 'Home', path: '/', hi: 'गृह' },
                            { name: 'Collections', path: '/shop', hi: 'संग्रह' },
                            { name: 'Custom Design', path: '/shop#custom-design', hi: 'डिज़ाइन भेजें' },
                            { name: 'Live Rates', path: '/rates', hi: 'सोना भाव' },
                            { name: 'Heritage', path: '/about', hi: 'विरासत' },
                            { name: 'Boutique', path: '/contact', hi: 'संपर्क' }
                        ].map((item) => (
                            <Link
                                key={item.name}
                                href={item.path}
                                className="text-[#270611] hover:text-[#6B0E2A] transition-colors uppercase tracking-[0.16em] text-[11px] font-bold relative group py-1"
                            >
                                <span>{item.name}</span>
                                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gradient-to-r from-[#C5A059] to-[#6B0E2A] transition-all duration-300 group-hover:w-full"></span>
                            </Link>
                        ))}
                    </nav>

                    {/* Desktop CTA Buttons */}
                    <div className="hidden lg:flex items-center gap-3">
                        <Link
                            href="/shop#custom-design"
                            className="inline-flex items-center gap-1.5 bg-[#FAF7F2] hover:bg-[#F3E8D0] text-[#6B0E2A] px-3.5 py-2 text-[10px] font-bold uppercase tracking-[0.18em] border border-[#C5A059] transition-all duration-300"
                        >
                            <Sparkles size={12} className="text-[#C5A059]" />
                            <span>Send Photo</span>
                        </Link>
                        <a
                            href={`https://wa.me/${BUSINESS_DETAILS.whatsappClean}?text=${encodeURIComponent("Namaste Yash Jewellers, I would like to book a jewellery consultation.")}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-[#6B0E2A] hover:bg-[#4E0A1E] text-[#FAF7F2] px-4 py-2 text-[10px] font-bold uppercase tracking-[0.18em] border border-[#C5A059]/40 transition-all duration-300 shadow-sm hover:shadow-md"
                        >
                            <Calendar size={12} className="text-[#C5A059]" />
                            <span>Consultation</span>
                        </a>
                    </div>

                    {/* Quick Call Icon for Mobile */}
                    <a 
                        href={`tel:${BUSINESS_DETAILS.phoneClean}`}
                        aria-label="Call Yash Jewellers"
                        className="md:hidden text-[#6B0E2A] p-2 hover:bg-[#F3E8D0] rounded-full transition-colors"
                    >
                        <Phone size={20} />
                    </a>

                </div>
            </div>

            {/* Mobile Navigation Drawer */}
            {isMenuOpen && (
                <div className="fixed inset-0 z-50 flex">
                    <div 
                        className="fixed inset-0 bg-[#270611]/70 backdrop-blur-sm transition-opacity" 
                        onClick={() => setIsMenuOpen(false)}
                    />
                    
                    <div className="relative w-4/5 max-w-sm bg-[#FAF7F2] h-full shadow-2xl p-6 flex flex-col justify-between overflow-y-auto border-r border-[#C5A059]/40">
                        <div>
                            <div className="flex justify-between items-center pb-6 border-b border-[#C5A059]/30">
                                <div>
                                    <h2 className="font-serif text-xl font-normal text-[#270611] tracking-wider">
                                        YASH <span className="text-gold-gradient font-bold">JEWELLERS</span>
                                    </h2>
                                    <p className="text-[10px] uppercase tracking-widest text-[#6B0E2A]">Chaubepur · Kanpur</p>
                                </div>
                                <button 
                                    onClick={() => setIsMenuOpen(false)} 
                                    className="text-[#270611] p-1 hover:text-[#6B0E2A]"
                                >
                                    <X size={24} />
                                </button>
                            </div>

                            {/* Hindi Welcome */}
                            <div className="my-5 p-3 bg-[#F3E8D0]/60 rounded-md border border-[#C5A059]/30 text-center">
                                <p className="font-serif text-sm text-[#270611] italic">
                                    "शुद्धता और विश्वास का अटूट बंधन"
                                </p>
                                <p className="text-[10px] text-[#6B0E2A] font-semibold mt-0.5 tracking-wider uppercase">
                                    100% BIS Hallmarked Jewellery
                                </p>
                            </div>

                            <nav className="flex flex-col gap-4 mt-6">
                                {[
                                    { name: 'Home', path: '/', hi: 'मुख्य पृष्ठ' },
                                    { name: 'High Jewellery Catalogue', path: '/shop', hi: 'शाही आभूषण संग्रह' },
                                    { name: 'Custom Design Karigari', path: '/shop#custom-design', hi: 'मनपसंद डिज़ाइन अपने वजन में बनवाएं' },
                                    { name: 'Live Gold Rates', path: '/rates', hi: 'लाइव सोने-चांदी के भाव' },
                                    { name: 'Heritage & Craftsmanship', path: '/about', hi: 'हमारी विरासत एवं कला' },
                                    { name: 'Bespoke Atelier & Store', path: '/contact', hi: 'स्टोर एवं निजी परामर्श' }
                                ].map((item) => (
                                    <Link
                                        key={item.name}
                                        href={item.path}
                                        onClick={() => setIsMenuOpen(false)}
                                        className="flex flex-col py-2 border-b border-[#C5A059]/15 text-[#270611] hover:text-[#6B0E2A] transition-colors"
                                    >
                                        <span className="text-xs uppercase tracking-widest font-bold">{item.name}</span>
                                        <span className="text-[10px] text-[#8C6D38] font-serif">{item.hi}</span>
                                    </Link>
                                ))}
                            </nav>
                        </div>

                        <div className="pt-6 border-t border-[#C5A059]/30 space-y-3">
                            <a 
                                href={`https://wa.me/${BUSINESS_DETAILS.whatsappClean}?text=${encodeURIComponent("Namaste Yash Jewellers, I would like to inquire about your jewellery collection.")}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full flex items-center justify-center gap-2 bg-[#6B0E2A] text-white py-3 rounded-none text-xs font-bold uppercase tracking-widest border border-[#C5A059]/40"
                            >
                                <MessageCircle size={16} className="text-[#C5A059]" />
                                <span>WhatsApp ({BUSINESS_DETAILS.phoneFormatted})</span>
                            </a>
                            <p className="text-center text-[10px] text-[#8C6D38]">
                                {BUSINESS_DETAILS.shortAddress}
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}
