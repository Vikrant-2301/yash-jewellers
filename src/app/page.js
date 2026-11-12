"use client";

import { useState } from "react";
import Hero from "../components/Hero";
import ProductCard from "../components/ProductCard";
import RateCard from "../components/RateCard";
import AtelierBookingModal from "../components/AtelierBookingModal";
import Link from 'next/link';
import { BUSINESS_DETAILS } from "@/src/config/business";
import { 
    ArrowRight, 
    ShieldCheck, 
    Gem, 
    Truck, 
    Clock, 
    Sparkles, 
    Award, 
    Compass, 
    Calendar, 
    MessageCircle, 
    Check, 
    Star 
} from 'lucide-react';

// Curated Royal Categories
const CATEGORIES = [
    { 
        id: 'bridal', 
        name: 'Bridal Suite', 
        hindi: 'दुल्हन का संपूर्ण श्रृंगार',
        desc: 'Majestic chokers, rani haars, maang tikkas, and naths crafted for your once-in-a-lifetime day.',
        image: 'https://images.unsplash.com/photo-1595357906976-a0772278cb78?auto=format&fit=crop&q=80&w=600',
        link: '/shop?category=Haar%20Set'
    },
    { 
        id: 'kundan', 
        name: 'Polki & Kundan', 
        hindi: 'शाही कुंदन एवं जड़ाऊ',
        desc: 'Uncut diamond polki set in pure 22K gold foil with traditional Rajasthani and Bikaneri meenakari.',
        image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=600',
        link: '/shop?category=Haar%20Set'
    },
    { 
        id: 'temple', 
        name: 'Temple Gold', 
        hindi: 'देव-कला मंदिर आभूषण',
        desc: 'Sacred nakshi carvings representing Lakshmi, peacock, and floral motifs handcrafted in 22K gold.',
        image: 'https://images.unsplash.com/photo-1630138235282-5202867e3dfd?auto=format&fit=crop&q=80&w=600',
        link: '/shop?category=Haar%20Set'
    },
    { 
        id: 'bangles', 
        name: 'Kangans & Bangles', 
        hindi: 'शाही कंगन व चूड़ियां',
        desc: 'Heavy traditional kada sets, filigree cuffs, and timeless daily-wear bangles with hallmarked guarantee.',
        image: 'https://images.unsplash.com/photo-1596906263051-93c4c9693994?auto=format&fit=crop&q=80&w=600',
        link: '/shop?category=Bracelets'
    },
    { 
        id: 'diamond', 
        name: 'Diamond Solitaires', 
        hindi: 'सॉलिटेयर हीरे व अंगूठी',
        desc: 'IGI & SGL certified natural diamonds set in 18K rose, white, and yellow gold.',
        image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=600',
        link: '/shop?category=Ladies%20Ring'
    },
    { 
        id: 'mangal', 
        name: 'Mangalsutras', 
        hindi: 'पवित्र मंगलसूत्र संग्रह',
        desc: 'Traditional black-beaded sacred chains re-imagined with modern diamond drops and gold motifs.',
        image: 'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?auto=format&fit=crop&q=80&w=600',
        link: '/shop?category=Chains'
    }
];

// Featured Masterpiece Jewellery
const FEATURED_PRODUCTS = [
    {
        id: 1,
        title: "The Rajwada Imperial Kundan Choker",
        hindiTitle: "राजवाड़ा कुंदन चोकर सेट",
        price: "4,45,000",
        category: "Bridal Suite",
        purity: "22K 916 Hallmark",
        weight: "58.40g",
        making: "10%",
        image: "https://images.unsplash.com/photo-1602752250055-567f4a127b14?auto=format&fit=crop&q=80&w=700",
        tag: "Royal Heritage",
        description: "Adorned with natural untreated polki slices, Zambian emerald drops, and intricate peacock meenakari on the reverse."
    },
    {
        id: 2,
        title: "Padmavati Temple Gold Rani Haar",
        hindiTitle: "पद्मावती मंदिर नक्काशी रानी हार",
        price: "3,85,000",
        category: "Temple Gold",
        purity: "22K 916 Hallmark",
        weight: "48.20g",
        making: "9%",
        image: "https://images.unsplash.com/photo-1630138235282-5202867e3dfd?auto=format&fit=crop&q=80&w=700",
        tag: "Hand Carved",
        description: "Heavy south-Indian nakshi artwork featuring Goddess Lakshmi surrounded by divine temple archwork and hanging pearls."
    },
    {
        id: 3,
        title: "Flawless Solitaire Promise Ring",
        hindiTitle: "सॉलिटेयर डायमंड रिंग",
        price: "1,25,000",
        category: "Diamond",
        purity: "18K Gold · VVS-EF",
        weight: "4.80g",
        making: "Included",
        image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=700",
        tag: "IGI Certified",
        description: "1.02 Carat brilliant cut solitaire diamond certified by IGI, set in an 18K yellow gold tapered shank with micro-pave accents."
    },
    {
        id: 4,
        title: "Filigree Antique Royal Kangan Pair",
        hindiTitle: "पारंपरिक जालीदार सोने के कंगन",
        price: "2,10,000",
        category: "Bracelets",
        purity: "22K 916 Hallmark",
        weight: "32.00g",
        making: "8%",
        image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=700",
        tag: "Bestseller",
        description: "A pair of regal bangles featuring pure gold wire-mesh filigree work and screw-closure designed for effortless regal comfort."
    }
];

export default function Home() {
    const [isBookingOpen, setIsBookingOpen] = useState(false);
    const [selectedTab, setSelectedTab] = useState("All");

    const filteredList = selectedTab === "All"
        ? FEATURED_PRODUCTS
        : FEATURED_PRODUCTS.filter(p => p.category === selectedTab);

    return (
        <div className="bg-[#FAF7F2] text-[#270611] font-sans overflow-hidden">
            
            {/* 1. Cinematic Hero Section */}
            <Hero />

            {/* 2. Royal Heritage Trust Bar */}
            <section className="bg-[#270611] text-[#FAF7F2] py-8 border-y border-[#C5A059]/30 relative z-20">
                <div className="container mx-auto px-4 md:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                        <div className="flex flex-col items-center gap-2 group">
                            <div className="w-12 h-12 rounded-full bg-[#3C081A] flex items-center justify-center border border-[#C5A059]/40 group-hover:border-[#C5A059] transition-colors">
                                <ShieldCheck className="w-6 h-6 text-[#DFBE7A]" />
                            </div>
                            <h3 className="font-serif text-sm md:text-base font-semibold text-[#FAF7F2]">100% BIS Hallmarked</h3>
                            <p className="text-[10px] text-[#EAD8B1]/70 tracking-wider">HUID Certified 916 Gold</p>
                        </div>

                        <div className="flex flex-col items-center gap-2 group">
                            <div className="w-12 h-12 rounded-full bg-[#3C081A] flex items-center justify-center border border-[#C5A059]/40 group-hover:border-[#C5A059] transition-colors">
                                <Gem className="w-6 h-6 text-[#DFBE7A]" />
                            </div>
                            <h3 className="font-serif text-sm md:text-base font-semibold text-[#FAF7F2]">Natural Diamonds</h3>
                            <p className="text-[10px] text-[#EAD8B1]/70 tracking-wider">IGI / SGL Certified Stones</p>
                        </div>

                        <div className="flex flex-col items-center gap-2 group">
                            <div className="w-12 h-12 rounded-full bg-[#3C081A] flex items-center justify-center border border-[#C5A059]/40 group-hover:border-[#C5A059] transition-colors">
                                <Award className="w-6 h-6 text-[#DFBE7A]" />
                            </div>
                            <h3 className="font-serif text-sm md:text-base font-semibold text-[#FAF7F2]">100% Purity Guarantee</h3>
                            <p className="text-[10px] text-[#EAD8B1]/70 tracking-wider">HUID Laser Certified 916 Gold</p>
                        </div>

                        <div className="flex flex-col items-center gap-2 group">
                            <div className="w-12 h-12 rounded-full bg-[#3C081A] flex items-center justify-center border border-[#C5A059]/40 group-hover:border-[#C5A059] transition-colors">
                                <Clock className="w-6 h-6 text-[#DFBE7A]" />
                            </div>
                            <h3 className="font-serif text-sm md:text-base font-semibold text-[#FAF7F2]">Lifetime Exchange</h3>
                            <p className="text-[10px] text-[#EAD8B1]/70 tracking-wider">Complete Purity Buyback</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. Live Gold Rates Desk Preview */}
            <section className="py-16 md:py-24 bg-[#270611] text-[#FAF7F2] relative border-b border-[#C5A059]/30">
                <div className="absolute inset-0 opacity-10 bg-heritage-pattern pointer-events-none" />
                
                <div className="container mx-auto px-4 md:px-8 relative z-10">
                    <div className="text-center max-w-2xl mx-auto mb-10">
                        <div className="inline-flex items-center gap-2 text-[#C5A059] text-[10px] uppercase font-bold tracking-[0.3em] mb-2">
                            <Sparkles size={13} className="text-[#DFBE7A]" />
                            <span>Real-Time Market Benchmark · आज का सोना भाव</span>
                        </div>
                        <h2 className="font-serif text-3xl md:text-5xl text-[#FAF7F2] font-normal">
                            Live Gold Rates
                        </h2>
                        <div className="ornament-divider">
                            <span className="w-2 h-2 rotate-45 bg-[#C5A059]"></span>
                        </div>
                        <p className="text-xs md:text-sm text-[#EAD8B1]/80 leading-relaxed">
                            Transparent landed gold and silver rates streaming live in real-time. Conforming directly to 22K BIS Hallmarked jewellery standards.
                        </p>
                    </div>

                    <RateCard />
                </div>
            </section>

            {/* 4. Curated Royal Collections (शाही संग्रह) */}
            <section className="py-20 md:py-28 bg-[#FAF7F2] relative">
                <div className="container mx-auto px-4 md:px-8">
                    
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-14 gap-6">
                        <div>
                            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#6B0E2A]">
                                Handcrafted Splendour · शाही संग्रह
                            </span>
                            <h2 className="font-serif text-3xl md:text-5xl text-[#270611] mt-2 font-normal">
                                Curated Collections
                            </h2>
                            <p className="font-serif text-base md:text-lg text-[#8C6D38] italic mt-1">
                                "हर अवसर के लिए एक अनमोल आभूषण"
                            </p>
                        </div>

                        <Link
                            href="/shop"
                            className="inline-flex items-center gap-2 text-xs uppercase font-bold tracking-[0.2em] text-[#6B0E2A] hover:text-[#270611] border-b-2 border-[#C5A059] pb-1 transition-colors"
                        >
                            <span>View Full Catalogue</span>
                            <ArrowRight size={14} />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        {CATEGORIES.map((cat, idx) => (
                            <Link
                                key={cat.id}
                                href={cat.link}
                                className="group relative overflow-hidden bg-[#270611] border border-[#C5A059]/30 hover:border-[#C5A059] transition-all duration-500 shadow-md hover:shadow-xl"
                            >
                                <div className="aspect-[4/5] overflow-hidden">
                                    <img
                                        src={cat.image}
                                        alt={cat.name}
                                        loading="lazy"
                                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                                    />
                                </div>

                                {/* Deep Burgundy & Maroon Vignette */}
                                <div className="absolute inset-0 bg-gradient-to-t from-[#270611] via-[#270611]/50 to-transparent" />

                                <div className="absolute inset-x-0 bottom-0 p-6 md:p-8 text-[#FAF7F2]">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-[9px] uppercase tracking-[0.3em] text-[#C5A059] font-bold">
                                            Edition 0{idx + 1}
                                        </span>
                                        <span className="text-[#C5A059] transition-transform group-hover:translate-x-2">
                                            →
                                        </span>
                                    </div>

                                    <h3 className="font-serif text-2xl md:text-3xl font-medium text-[#FAF7F2]">
                                        {cat.name}
                                    </h3>
                                    
                                    <p className="font-serif text-xs text-[#EAD8B1] italic mt-0.5">
                                        {cat.hindi}
                                    </p>

                                    <p className="text-[11px] text-[#FAF7F2]/75 line-clamp-2 mt-2 font-sans">
                                        {cat.desc}
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>

                </div>
            </section>

            {/* 5. Featured Masterpieces (शाही आभूषण) with Quick View */}
            <section className="py-20 md:py-28 bg-[#F3E8D0]/30 border-y border-[#C5A059]/25">
                <div className="container mx-auto px-4 md:px-8">
                    
                    <div className="text-center max-w-2xl mx-auto mb-12">
                        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#6B0E2A]">
                            High Jewellery Showcase · सर्वश्रेष्ठ कारीगरी
                        </span>
                        <h2 className="font-serif text-3xl md:text-5xl text-[#270611] mt-2 font-normal">
                            Signature Masterpieces
                        </h2>
                        <div className="ornament-divider">
                            <span className="w-2 h-2 rotate-45 bg-[#C5A059]"></span>
                        </div>
                        <p className="text-xs md:text-sm text-gray-600">
                            Each design is an exclusive limited creation, accompanied by an authenticated BIS Hallmark Certificate and laser-engraved HUID number.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {FEATURED_PRODUCTS.map((prod) => (
                            <ProductCard key={prod.id} {...prod} />
                        ))}
                    </div>

                    <div className="text-center mt-12">
                        <Link
                            href="/shop"
                            className="inline-flex items-center gap-3 bg-[#6B0E2A] hover:bg-[#4E0A1E] text-white px-8 py-3.5 text-xs font-bold uppercase tracking-[0.2em] border border-[#C5A059]/40 transition-all duration-300 shadow-md"
                        >
                            <span>Explore Complete High Jewellery</span>
                            <ArrowRight size={14} className="text-[#C5A059]" />
                        </Link>
                    </div>

                </div>
            </section>

            {/* 6. Heritage & Artisanal Karigar Tribute (हमारी विरासत · 1975 से) */}
            <section className="py-20 md:py-28 bg-[#270611] text-[#FAF7F2] relative">
                <div className="container mx-auto px-4 md:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                        
                        {/* Image Showcase */}
                        <div className="relative">
                            <div className="relative aspect-[4/5] border border-[#C5A059]/40 overflow-hidden shadow-2xl">
                                <img
                                    src="https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=1200&q=85"
                                    alt="Crafting Yash Jewellers heritage gold"
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#270611]/80 via-transparent to-transparent" />
                            </div>

                            {/* Floating Quote Badge */}
                            <div className="absolute -bottom-6 -right-4 sm:right-6 bg-[#3C081A] border border-[#C5A059] p-5 shadow-2xl max-w-xs">
                                <p className="font-serif text-xs md:text-sm text-[#EAD8B1] italic">
                                    "हम केवल आभूषण नहीं बनाते, हम पीढ़ियों की यादें संजोते हैं।"
                                </p>
                                <p className="text-[10px] uppercase tracking-widest text-[#C5A059] mt-2 font-semibold">
                                    — Yash Jewellers Family
                                </p>
                            </div>
                        </div>

                        {/* Story Content */}
                        <div className="space-y-6">
                            <div className="inline-flex items-center gap-2 text-[#C5A059] text-[10px] uppercase font-bold tracking-[0.3em]">
                                <Sparkles size={13} className="text-[#DFBE7A]" />
                                <span>Art of Craftsmanship · पचास वर्षों की विरासत</span>
                            </div>

                            <h2 className="font-serif text-3xl md:text-5xl text-[#FAF7F2] font-normal leading-tight">
                                Half a Century of Trust,
                                <br />
                                <span className="font-serif italic text-gold-gradient font-normal">
                                    Cast in Pure Gold.
                                </span>
                            </h2>

                            <p className="text-xs md:text-sm text-[#FAF7F2]/80 leading-relaxed font-sans">
                                Established in 1975, Yash Jewellers began with a singular promise: to bring unadulterated purity and timeless aesthetic mastery to families celebrating life’s greatest milestones.
                            </p>

                            <p className="text-xs md:text-sm text-[#FAF7F2]/80 leading-relaxed font-sans">
                                Our master karigars from Kanpur and Varanasi still employ time-honoured techniques — hand-beaten gold, delicate filigree, and authentic kundan setting — married seamlessly with cutting-edge German laser hallmarking technology.
                            </p>

                            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[#C5A059]/30 text-xs">
                                <div className="flex items-start gap-2.5">
                                    <Check size={16} className="text-[#C5A059] shrink-0 mt-0.5" />
                                    <div>
                                        <p className="font-bold text-[#FAF7F2]">100% Transparency</p>
                                        <p className="text-[#EAD8B1]/60 text-[11px]">Clear weight, purity &amp; making charges</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-2.5">
                                    <Check size={16} className="text-[#C5A059] shrink-0 mt-0.5" />
                                    <div>
                                        <p className="font-bold text-[#FAF7F2]">Direct Gold Parity</p>
                                        <p className="text-[#EAD8B1]/60 text-[11px]">Benchmark landed rate integration</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-2.5">
                                    <Check size={16} className="text-[#C5A059] shrink-0 mt-0.5" />
                                    <div>
                                        <p className="font-bold text-[#FAF7F2]">Bespoke Customization</p>
                                        <p className="text-[#EAD8B1]/60 text-[11px]">Bring your bridal dreams to life</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-2.5">
                                    <Check size={16} className="text-[#C5A059] shrink-0 mt-0.5" />
                                    <div>
                                        <p className="font-bold text-[#FAF7F2]">Lifetime Value</p>
                                        <p className="text-[#EAD8B1]/60 text-[11px]">Guaranteed gold buyback policy</p>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-4 flex flex-wrap gap-4">
                                <Link
                                    href="/about"
                                    className="bg-gradient-to-r from-[#ECC880] to-[#C5A059] text-[#270611] px-7 py-3 text-xs font-bold uppercase tracking-[0.2em] hover:shadow-lg transition-all"
                                >
                                    Read Our Story
                                </Link>
                                <button
                                    onClick={() => setIsBookingOpen(true)}
                                    className="border border-[#C5A059] text-[#EAD8B1] hover:bg-[#C5A059]/10 px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] transition-colors"
                                >
                                    Book Atelier Visit
                                </button>
                            </div>

                        </div>

                    </div>
                </div>
            </section>

            {/* 7. Karat & Gold Purity Transparency Guide */}
            <section className="py-20 bg-[#FAF7F2] border-b border-[#C5A059]/25">
                <div className="container mx-auto px-4 md:px-8">
                    <div className="text-center max-w-xl mx-auto mb-14">
                        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#6B0E2A]">
                            Education &amp; Purity · शुद्धता का ज्ञान
                        </span>
                        <h2 className="font-serif text-3xl md:text-4xl text-[#270611] mt-1 font-normal">
                            Understanding Gold Karats
                        </h2>
                        <div className="ornament-divider">
                            <span className="w-2 h-2 rotate-45 bg-[#C5A059]"></span>
                        </div>
                        <p className="text-xs text-gray-600">
                            Know exactly what goes into your jewellery. We adhere strictly to Bureau of Indian Standards (BIS) norms.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                        <div className="bg-white p-6 md:p-8 border border-[#C5A059]/30 shadow-sm relative group hover:border-[#C5A059] transition-all">
                            <div className="text-[10px] font-bold uppercase tracking-widest text-[#6B0E2A] mb-2">
                                99.9% Purity · 24 Karat
                            </div>
                            <h3 className="font-serif text-2xl text-[#270611] font-semibold mb-2">24K Pure Gold</h3>
                            <p className="text-xs text-gray-600 leading-relaxed mb-4">
                                The purest form of gold with zero alloys. Ideal for minted gold coins, investment bars, and sacred pooja deities.
                            </p>
                            <div className="p-3 bg-[#FAF7F2] border border-[#C5A059]/20 text-[11px] space-y-1">
                                <p><strong>Hallmark:</strong> 999 Fineness</p>
                                <p><strong>Ideal for:</strong> Investment &amp; Gifting</p>
                            </div>
                        </div>

                        <div className="bg-[#FAF7F2] p-6 md:p-8 border-2 border-[#C5A059] shadow-md relative group">
                            <span className="absolute -top-3 left-6 bg-[#6B0E2A] text-white text-[9px] font-bold px-3 py-1 uppercase tracking-widest">
                                Most Popular in India
                            </span>
                            <div className="text-[10px] font-bold uppercase tracking-widest text-[#6B0E2A] mb-2">
                                91.6% Purity · 22 Karat
                            </div>
                            <h3 className="font-serif text-2xl text-[#270611] font-semibold mb-2">22K 916 Hallmark</h3>
                            <p className="text-xs text-gray-600 leading-relaxed mb-4">
                                The timeless benchmark for handcrafted Indian jewellery. Alloyed with copper and silver to give superior durability to bridal chokers and bangles.
                            </p>
                            <div className="p-3 bg-white border border-[#C5A059]/30 text-[11px] space-y-1">
                                <p><strong>Hallmark:</strong> 916 BIS Emblem</p>
                                <p><strong>Ideal for:</strong> Bridal &amp; Traditional Gold</p>
                            </div>
                        </div>

                        <div className="bg-white p-6 md:p-8 border border-[#C5A059]/30 shadow-sm relative group hover:border-[#C5A059] transition-all">
                            <div className="text-[10px] font-bold uppercase tracking-widest text-[#6B0E2A] mb-2">
                                75.0% Purity · 18 Karat
                            </div>
                            <h3 className="font-serif text-2xl text-[#270611] font-semibold mb-2">18K Diamond Gold</h3>
                            <p className="text-xs text-gray-600 leading-relaxed mb-4">
                                Engineered specifically for gemstone setting. Provides rigid prong security to hold diamonds, emeralds, and sapphires without deformation.
                            </p>
                            <div className="p-3 bg-[#FAF7F2] border border-[#C5A059]/20 text-[11px] space-y-1">
                                <p><strong>Hallmark:</strong> 750 Fineness</p>
                                <p><strong>Ideal for:</strong> Rings &amp; Diamond Jewellery</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 8. Royal Bride Stories & Client Trust (प्रशंसा एवं विश्वास) */}
            <section className="py-20 bg-[#FAF7F2]">
                <div className="container mx-auto px-4 md:px-8">
                    <div className="text-center max-w-xl mx-auto mb-14">
                        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#6B0E2A]">
                            Client Testimonials · विश्वास की कहानियां
                        </span>
                        <h2 className="font-serif text-3xl md:text-4xl text-[#270611] mt-1 font-normal">
                            Voices of Our Patrons
                        </h2>
                        <div className="ornament-divider">
                            <span className="w-2 h-2 rotate-45 bg-[#C5A059]"></span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                        {[
                            {
                                quote: "Yash Jewellers crafted my complete wedding bridal set. The karigari on the Kundan choker was unmatched, and their live gold rate calculation was 100% transparent.",
                                name: "Aaradhya Gupta",
                                location: "Civil Lines, Kanpur",
                                occasion: "Bridal Suite Customer"
                            },
                            {
                                quote: "Our family has trusted Yash Jewellers since my grandfather's time. We always check their live rate board before making gold purchases in UP.",
                                name: "Rajeshwar Mehrotra",
                                location: "Swaroop Nagar, Kanpur",
                                occasion: "Patron Since 1988"
                            },
                            {
                                quote: "The IGI certified solitaire ring I bought for our anniversary had spectacular brilliance. Excellent private viewing lounge experience.",
                                name: "Sneha & Vivek Singhal",
                                location: "Delhi NCR",
                                occasion: "Solitaire Collection"
                            }
                        ].map((review, idx) => (
                            <div key={idx} className="bg-white p-6 md:p-8 border border-[#C5A059]/25 shadow-sm flex flex-col justify-between">
                                <div>
                                    <div className="flex gap-1 text-[#C5A059] mb-4">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} size={14} fill="#C5A059" />
                                        ))}
                                    </div>
                                    <p className="font-serif text-xs md:text-sm text-gray-700 italic leading-relaxed">
                                        "{review.quote}"
                                    </p>
                                </div>
                                <div className="mt-6 pt-4 border-t border-[#C5A059]/20">
                                    <p className="font-bold text-xs text-[#270611]">{review.name}</p>
                                    <p className="text-[10px] text-gray-500">{review.location} · {review.occasion}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 9. VIP Concierge & Store Visit Banner */}
            <section className="relative overflow-hidden bg-[#270611] text-[#FAF7F2] py-20 px-6 md:px-12 text-center border-t border-[#C5A059]/30">
                <div className="absolute inset-0 opacity-10 bg-heritage-pattern pointer-events-none" />
                
                <div className="relative z-10 max-w-3xl mx-auto">
                    <span className="text-[10px] font-bold uppercase tracking-[0.35em] text-[#C5A059]">
                        Bespoke Consultation · शाही आतिथ्य
                    </span>

                    <h2 className="mt-4 font-serif text-3xl md:text-5xl text-[#FAF7F2] leading-tight">
                        Experience Yash Jewellers in Person
                    </h2>

                    <p className="mt-4 text-xs md:text-sm text-[#EAD8B1]/80 max-w-xl mx-auto leading-relaxed">
                        Step into our private VIP lounge in Kanpur or book a virtual video viewing. Let our senior jewellery curators guide your heirloom selection.
                    </p>

                    <div className="mt-8 flex flex-wrap justify-center gap-4">
                        <button
                            onClick={() => setIsBookingOpen(true)}
                            className="bg-gradient-to-r from-[#ECC880] to-[#C5A059] text-[#270611] px-8 py-3.5 text-xs font-bold uppercase tracking-[0.2em] shadow-lg hover:shadow-2xl transition-all"
                        >
                            Schedule Private Viewing
                        </button>

                        <a
                            href={`https://wa.me/${BUSINESS_DETAILS.whatsappClean}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 border border-[#C5A059] text-[#FAF7F2] px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] hover:bg-[#3C081A] transition-colors"
                        >
                            <MessageCircle size={15} className="text-[#C5A059]" />
                            <span>WhatsApp VIP Chat ({BUSINESS_DETAILS.phoneFormatted})</span>
                        </a>
                    </div>
                </div>
            </section>

            {/* Atelier Booking Modal */}
            <AtelierBookingModal
                isOpen={isBookingOpen}
                onClose={() => setIsBookingOpen(false)}
            />

        </div>
    );
}
