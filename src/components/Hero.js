"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, ShieldCheck, TrendingUp, Calendar, ChevronRight, Award } from "lucide-react";

const HERO_SLIDES = [
    {
        id: "banner-1",
        tag: "Yash Jewellers · Chaubepur, Kanpur",
        headline: "A Legacy Cast in Pure Gold.",
        headlineAccent: "Fifty Years of Trust.",
        hindi: "पीढ़ियों का विश्वास, हर दुल्हन का राजसी श्रृंगार।",
        description: "Explore 100% BIS Hallmarked (916 HUID) gold jewellery, authentic temple necklaces, and real-time live rates directly streaming from Sarafa Mandi.",
        image: "/images/yash/carousel/20210520151949066869EMGe0/master.png",
        accent: "Bridal Masterpieces"
    },
    {
        id: "banner-2",
        tag: "Royal Heritage Suite · शाही आभूषण",
        headline: "Echoes of Royalty,",
        headlineAccent: "Crafted for Generations.",
        hindi: "राजपुताना नफासत और अनकट कुंदन की शाही चमक।",
        description: "Intricately crafted bridal choker sets, jadau rani haars, and 22K heirlooms created with unmatched artisanal precision in Kanpur.",
        image: "/images/yash/carousel/20210507143711864251lah8a/master.jpeg",
        accent: "Polki Heritage"
    },
    {
        id: "banner-3",
        tag: "Pure Silver & Gold · शुद्ध चांदी व सोना",
        headline: "Sculpted in Absolute Purity,",
        headlineAccent: "Sacred Traditions.",
        hindi: "शुद्ध 916 हॉलमार्क सोने एवं 99+ चांदी का संगम।",
        description: "From lightweight daily-wear tops to heavy bridal necklaces and fine silver gift articles, every ornament carries our hallmark guarantee.",
        image: "/images/yash/carousel/20210507143659484624db2M0/master.jpeg",
        accent: "Temple Gold"
    },
    {
        id: "banner-4",
        tag: "Handcrafted Elegance · हाथ की नक्काशी",
        headline: "Timeless Indian Artistry,",
        headlineAccent: "Every Occasion Celebrated.",
        hindi: "उत्सव का उल्लास, यश ज्वेलर्स के साथ।",
        description: "Customized bespoke jewellery handcrafted to perfection. Visit our showroom at Pipari Road, near Narsingh Mandir, Chaubepur, Kanpur.",
        image: "/images/yash/carousel/20210507143656884657JZcJl/master.jpeg",
        accent: "Festive Joy"
    },
    {
        id: "banner-5",
        tag: "Chaubepur Showroom · आपका अपना ज्वेलर्स",
        headline: "Transparent Live Pricing,",
        headlineAccent: "No Hidden Costs.",
        hindi: "दैनिक लाइव भाव एवं पारदर्शी बिलिंग व्यवस्था।",
        description: "Track live market gold and silver Cash Bhav daily with complete breakdown of net weight, making charges, and statutory GST.",
        image: "/images/yash/carousel/20210507143418560944Z0cBm/master.png",
        accent: "Live Rates"
    }
];

export default function Hero() {
    const [activeSlide, setActiveSlide] = useState(0);

    // Auto rotate slides every 7 seconds
    useEffect(() => {
        const timer = setInterval(() => {
            setActiveSlide(prev => (prev + 1) % HERO_SLIDES.length);
        }, 7000);
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
                    <div className="absolute inset-0 bg-gradient-to-r from-[#270611]/98 via-[#270611]/80 to-[#270611]/40" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#270611] via-transparent to-[#270611]/50" />
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
                        <span className="block mt-1 font-serif italic text-gold-gradient font-normal">
                            {slide.headlineAccent}
                        </span>
                    </h1>

                    {/* Hindi Sub-headline */}
                    <p className="mt-4 text-base sm:text-lg text-[#C5A059] font-serif italic tracking-wide">
                        {slide.hindi}
                    </p>

                    {/* Narrative Description */}
                    <p className="mt-4 text-xs sm:text-sm md:text-base text-[#FAF7F2]/80 leading-relaxed font-sans max-w-2xl font-light">
                        {slide.description}
                    </p>

                    {/* CTA Action Buttons */}
                    <div className="mt-10 flex flex-wrap items-center gap-4">
                        <Link 
                            href="/shop" 
                            className="bg-gradient-to-r from-[#ECC880] via-[#C5A059] to-[#8C6D38] text-[#270611] font-bold text-xs uppercase tracking-[0.25em] px-8 py-4 rounded-none hover:shadow-[0_0_30px_rgba(197,160,89,0.4)] transition-all duration-300 flex items-center gap-3 group"
                        >
                            <span>Explore Catalogue</span>
                            <ArrowRight size={15} className="group-hover:translate-x-1.5 transition-transform" />
                        </Link>

                        <Link 
                            href="/rates" 
                            className="border border-[#C5A059]/60 text-[#FAF7F2] font-semibold text-xs uppercase tracking-[0.25em] px-8 py-4 rounded-none hover:bg-[#FAF7F2]/10 hover:border-[#DFBE7A] transition-all duration-300 flex items-center gap-2"
                        >
                            <TrendingUp size={15} className="text-[#C5A059]" />
                            <span>Live Rates (Bhav)</span>
                        </Link>
                    </div>

                </div>

                {/* Bottom Trust Indicators & Slide Selectors */}
                <div className="pt-12 border-t border-[#C5A059]/25 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    
                    {/* Three Pillars of Trust */}
                    <div className="flex flex-wrap items-center gap-6 md:gap-10 text-xs text-[#FAF7F2]/85">
                        <div className="flex items-center gap-2.5">
                            <ShieldCheck size={16} className="text-[#C5A059]" />
                            <span className="tracking-wider">100% BIS Hallmarked (916 HUID)</span>
                        </div>
                        <div className="flex items-center gap-2.5">
                            <Award size={16} className="text-[#C5A059]" />
                            <span className="tracking-wider">Sarafa Mandi Live Cash Bhav</span>
                        </div>
                        <div className="flex items-center gap-2.5">
                            <Sparkles size={16} className="text-[#C5A059]" />
                            <span className="tracking-wider">Chaubepur, Kanpur Showroom</span>
                        </div>
                    </div>

                    {/* Interactive Slide Dots */}
                    <div className="flex items-center gap-3">
                        {HERO_SLIDES.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setActiveSlide(i)}
                                aria-label={`Go to slide ${i + 1}`}
                                className={`transition-all duration-300 h-1 rounded-none ${
                                    i === activeSlide 
                                        ? "w-10 bg-[#C5A059]" 
                                        : "w-4 bg-[#FAF7F2]/30 hover:bg-[#FAF7F2]/60"
                                }`}
                            />
                        ))}
                    </div>

                </div>

            </div>
        </section>
    );
}
