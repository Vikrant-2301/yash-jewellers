"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, ShieldCheck, TrendingUp, Calendar, ChevronRight, Award } from "lucide-react";

const HERO_SLIDES = [
    {
        id: "bridal",
        tag: "Royal Bridal Suite · शाही दुल्हन",
        headline: "A Legacy Cast in Gold.",
        headlineAccent: "A Promise Forever.",
        hindi: "पीढ़ियों का विश्वास, हर दुल्हन का राजसी श्रृंगार।",
        description: "Handcrafted bridal choker sets, jadau rani haars, and 22K temple heirlooms woven with fifty years of unmatched artisanal trust in Kanpur.",
        image: "https://images.unsplash.com/photo-1584302179602-e4c3d3fd629d?auto=format&fit=crop&w=2000&q=85",
        accent: "Bridal Masterpieces"
    },
    {
        id: "kundan",
        tag: "Imperial Polki & Jadau · कुंदन राजवाड़ा",
        headline: "Echoes of Royalty,",
        headlineAccent: "Refined for Today.",
        hindi: "राजपुताना नफासत और अनकट डायमंड की शाही चमक।",
        description: "Intricately set uncut polki diamonds and vibrant meenakari enameling celebrating the splendour of Indian royal heritage.",
        image: "https://images.unsplash.com/photo-1602752250055-567f4a127b14?auto=format&fit=crop&w=2000&q=85",
        accent: "Polki Heritage"
    },
    {
        id: "temple",
        tag: "Divine 22K Temple Gold · दक्षिण व उत्तर कला",
        headline: "Sculpted in Purity,",
        headlineAccent: "Sacred Traditions.",
        hindi: "शुद्ध 916 हॉलमार्क सोने में देव-कला का साक्षात रूप।",
        description: "Magnificent nakshi carvings, authentic temple deities, and heavy gold kadas built to be treasured across generations.",
        image: "https://images.unsplash.com/photo-1630138235282-5202867e3dfd?auto=format&fit=crop&w=2000&q=85",
        accent: "Temple Gold"
    }
];

export default function Hero() {
    const [activeSlide, setActiveSlide] = useState(0);

    // Auto rotate slides every 8 seconds
    useEffect(() => {
        const timer = setInterval(() => {
            setActiveSlide(prev => (prev + 1) % HERO_SLIDES.length);
        }, 8000);
        return () => clearInterval(timer);
    }, []);

    const slide = HERO_SLIDES[activeSlide];

    return (
        <section className="relative min-h-[700px] lg:min-h-[820px] bg-[#270611] text-[#FAF7F2] overflow-hidden">
            
            {/* Cinematic Background Images with Crossfade */}
            {HERO_SLIDES.map((s, idx) => (
                <div
                    key={s.id}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                        idx === activeSlide ? "opacity-100 scale-100" : "opacity-0 scale-105 pointer-events-none"
                    }`}
                    style={{ transition: "opacity 1.2s ease-in-out, transform 10s ease-out" }}
                >
                    <img
                        src={s.image}
                        alt={s.headline}
                        className="w-full h-full object-cover object-center"
                    />
                    {/* Multi-layered Royal Burgundy & Maroon Vignettes */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#270611]/98 via-[#270611]/75 to-[#270611]/30" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#270611] via-transparent to-[#270611]/40" />
                </div>
            ))}

            {/* Subtle Indian Heritage Lattice Jali Texture */}
            <div 
                className="absolute inset-0 pointer-events-none opacity-10"
                style={{
                    backgroundImage: "radial-gradient(circle, #C5A059 0.8px, transparent 0.8px)",
                    backgroundSize: "32px 32px"
                }}
            />

            {/* Content Container */}
            <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-12 lg:px-16 pt-28 pb-20 md:py-32 flex flex-col justify-between min-h-[700px] lg:min-h-[820px]">
                
                {/* Main Headline Block */}
                <div className="max-w-3xl">
                    
                    {/* Eyebrow / Hindi & English Badge */}
                    <div className="inline-flex items-center gap-3 bg-[#3C081A]/90 border border-[#C5A059]/40 px-4 py-1.5 rounded-none backdrop-blur-sm mb-6">
                        <Sparkles size={13} className="text-[#DFBE7A] animate-pulse" />
                        <span className="text-[10px] md:text-xs font-semibold uppercase tracking-[0.28em] text-[#EAD8B1]">
                            {slide.tag}
                        </span>
                    </div>

                    {/* Editorial Main Headline */}
                    <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-[76px] font-normal leading-[1.08] tracking-tight text-[#FAF7F2]">
                        {slide.headline}
                        <br />
                        <span className="italic font-serif text-gold-gradient font-normal">
                            {slide.headlineAccent}
                        </span>
                    </h1>

                    {/* Hindi Poetic Proverb */}
                    <p className="mt-5 font-serif text-lg sm:text-2xl text-[#EAD8B1] tracking-wide italic border-l-2 border-[#C5A059] pl-4">
                        "{slide.hindi}"
                    </p>

                    {/* Detailed Paragraph */}
                    <p className="mt-4 max-w-xl text-sm md:text-base leading-relaxed text-[#FAF7F2]/80 font-sans">
                        {slide.description}
                    </p>

                    {/* Call to Actions */}
                    <div className="mt-8 flex flex-wrap items-center gap-4">
                        <Link
                            href="/shop"
                            className="group inline-flex items-center gap-3 bg-gradient-to-r from-[#ECC880] via-[#C5A059] to-[#9A7432] text-[#270611] px-7 py-3.5 text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300 hover:shadow-[0_0_25px_rgba(197,160,89,0.5)] hover:scale-[1.02]"
                        >
                            <span>Explore Masterpieces</span>
                            <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
                        </Link>

                        <Link
                            href="/rates"
                            className="inline-flex items-center gap-2.5 bg-[#3C081A]/80 hover:bg-[#6B0E2A] text-[#FAF7F2] border border-[#C5A059]/50 px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] transition-all duration-300 backdrop-blur-sm"
                        >
                            <TrendingUp size={14} className="text-[#C5A059]" />
                            <span>Live Gold Rates</span>
                        </Link>
                    </div>

                </div>

                {/* Bottom Bar: Trust Badges & Slide Navigation */}
                <div className="pt-12 mt-12 border-t border-[#C5A059]/25 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                    
                    {/* Heritage Trust Badges */}
                    <div className="flex flex-wrap items-center gap-6 sm:gap-10 text-[#EAD8B1]">
                        <div>
                            <p className="font-serif text-2xl text-gold-gradient font-bold">1975</p>
                            <p className="text-[9px] uppercase tracking-[0.25em] text-[#FAF7F2]/60">Kanpur Heritage</p>
                        </div>
                        <div className="h-8 w-px bg-[#C5A059]/30" />
                        <div>
                            <p className="font-serif text-2xl text-gold-gradient font-bold">100%</p>
                            <p className="text-[9px] uppercase tracking-[0.25em] text-[#FAF7F2]/60">BIS 916 Hallmark</p>
                        </div>
                        <div className="h-8 w-px bg-[#C5A059]/30" />
                        <div>
                            <p className="font-serif text-2xl text-gold-gradient font-bold">IGI / SGL</p>
                            <p className="text-[9px] uppercase tracking-[0.25em] text-[#FAF7F2]/60">Certified Diamonds</p>
                        </div>
                        <div className="h-8 w-px bg-[#C5A059]/30 hidden sm:block" />
                        <div className="hidden sm:block">
                            <p className="font-serif text-2xl text-gold-gradient font-bold">₹0</p>
                            <p className="text-[9px] uppercase tracking-[0.25em] text-[#FAF7F2]/60">Hidden Charges</p>
                        </div>
                    </div>

                    {/* Interactive Slide Switcher */}
                    <div className="flex items-center gap-2">
                        {HERO_SLIDES.map((s, idx) => (
                            <button
                                key={s.id}
                                onClick={() => setActiveSlide(idx)}
                                aria-label={`Select Slide ${idx + 1}`}
                                className={`px-3 py-1.5 text-[10px] uppercase tracking-wider font-semibold border transition-all duration-300 ${
                                    idx === activeSlide
                                        ? "bg-[#C5A059] text-[#270611] border-[#C5A059] shadow-sm font-bold"
                                        : "bg-[#270611]/60 text-[#FAF7F2]/60 border-[#C5A059]/30 hover:border-[#C5A059] hover:text-[#FAF7F2]"
                                }`}
                            >
                                0{idx + 1} {s.accent.split(" ")[0]}
                            </button>
                        ))}
                    </div>

                </div>

            </div>

        </section>
    );
}
