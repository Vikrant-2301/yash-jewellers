"use client";

import { useState } from "react";
import Hero from "../components/Hero";
import ProductCard from "../components/ProductCard";
import RateCard from "../components/RateCard";
import AtelierBookingModal from "../components/AtelierBookingModal";
import CustomDesignModal from "../components/CustomDesignModal";
import Link from 'next/link';
import { BUSINESS_DETAILS } from "@/src/config/business";
import { 
    ArrowRight, 
    ShieldCheck, 
    Gem, 
    Clock, 
    Sparkles, 
    Award, 
    Check, 
    Star,
    Camera,
    UploadCloud,
    MessageCircle,
    SlidersHorizontal,
    Sparkle
} from 'lucide-react';

// Authentic Yash Jewellers Catalogue Categories mapped to downloaded photos
const CATEGORIES = [
    { 
        id: 'haar-set', 
        name: 'Haar Set Collection', 
        hindi: 'शाही हार सेट संग्रह',
        desc: 'Majestic bridal chokers, rani haars, kundan necklaces, and temple sets handcrafted in 22K 916 gold.',
        image: '/images/yash/pages/114497/haar-set_1621611750cU7ML9.jpeg',
        link: '/shop?category=Haar%20Set'
    },
    { 
        id: 'ladies-rings', 
        name: 'Ladies Rings Design', 
        hindi: 'लेडीज रिंग्स डिज़ाइन',
        desc: 'Delicate floral, gemstone, and filigree gold rings for women in certified 22K 916 hallmarked gold.',
        image: '/images/yash/pages/115402/ladies-rin_162209013039gV52.jpeg',
        link: '/shop?category=Ladies%20Rings%20Design'
    },
    { 
        id: 'bracelets', 
        name: 'Bracelets Collection', 
        hindi: 'सोने के ब्रेसलेट्स संग्रह',
        desc: 'Designer kada-style, sleek Italian mesh, and contemporary wrist bracelets in pure 22K gold.',
        image: '/images/yash/pages/115773/brackets_16222892941sZ3wG.jpeg',
        link: '/shop?category=Bracelets'
    },
    { 
        id: 'chains', 
        name: 'Chains Design', 
        hindi: 'सोने की चेन डिज़ाइन',
        desc: 'Classic rope, curb, box, hollow, and solid 22K gold chain designs crafted with utmost precision.',
        image: '/images/yash/pages/115436/chains-des_16221057465n2S8b.jpeg',
        link: '/shop?category=Chains%20Design'
    },
    { 
        id: 'gents-rings', 
        name: 'Gents Ring Design', 
        hindi: 'जेंट्स रिंग डिज़ाइन',
        desc: 'Bold signet rings, textured bands, and traditional gemstone-ready 22K gold rings for men.',
        image: '/images/yash/pages/115404/gents-ring_1622106809h7grSw.jpeg',
        link: '/shop?category=Gents%20Ring%20Design'
    },
    { 
        id: 'silver', 
        name: 'Pure Silver & Payal', 
        hindi: 'शुद्ध चांदी आभूषण व बर्तन',
        desc: 'Certified 99+ silver payal, bichhiya, pooja thalis, and auspicious silver giftware.',
        image: '/images/yash/updates/767116/silver-pri_1622829552yGdBcV.jpeg',
        link: '/shop?category=Silver'
    }
];

// Featured Masterpiece Jewellery from Yash Jewellers Inventory
const FEATURED_PRODUCTS = [
    {
        id: 205,
        title: "Kundan Polki Grand Bridal Haar Set",
        hindiTitle: "शाही कुंदन पोलकी ब्राइडल हार",
        price: "7,85,000",
        category: "Haar Set",
        purity: "22K 916 Hallmark",
        weight: "61.20g",
        making: "11%",
        image: "/images/yash/pages/114497/haar-set_1621611750cU7ML9.jpeg",
        tag: "Royal Masterpiece",
        description: "High-jewellery bridal haar featuring uncut kundan stones, emerald drops, and fine 22K gold foil setting."
    },
    {
        id: 221,
        title: "Floral Filigree 22K Ladies Gold Ring",
        hindiTitle: "फ्लोरल नक्काशी लेडीज रिंग",
        price: "56,000",
        category: "Ladies Rings Design",
        purity: "22K 916 Hallmark",
        weight: "4.35g",
        making: "8%",
        image: "/images/yash/pages/115402/ladies-rin_162209013039gV52.jpeg",
        tag: "Bestseller Ring",
        description: "Delicate openwork floral ring in 22K gold featuring laser-cut petals and high-gloss center polish."
    },
    {
        id: 231,
        title: "Classic 22K Hallmarked Gold Chain",
        hindiTitle: "क्लासिक 22K हॉलमार्क गोल्ड चेन",
        price: "1,55,000",
        category: "Chains Design",
        purity: "22K 916 Hallmark",
        weight: "12.00g",
        making: "8.5%",
        image: "/images/yash/pages/115436/chains-des_16221057465n2S8b.jpeg",
        tag: "Daily Elegance",
        description: "Pure 22K 916 hallmarked solid rope gold chain with interlocking links and heavy-duty locking clasp."
    },
    {
        id: 241,
        title: "Royal Italian Mesh 22K Gold Bracelet",
        hindiTitle: "रॉयल 22K मेश गोल्ड ब्रेसलेट",
        price: "2,15,000",
        category: "Bracelets",
        purity: "22K 916 Hallmark",
        weight: "16.50g",
        making: "9%",
        image: "/images/yash/pages/115773/brackets_16222892941sZ3wG.jpeg",
        tag: "Royal Bracelet",
        description: "Intricately woven gold mesh wrist bracelet with secure side-lock mechanism and polished edge borders."
    }
];

export default function Home() {
    const [isBookingOpen, setIsBookingOpen] = useState(false);
    const [isCustomDesignOpen, setIsCustomDesignOpen] = useState(false);
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
                                <Award className="w-6 h-6 text-[#DFBE7A]" />
                            </div>
                            <h3 className="font-serif text-sm md:text-base font-semibold text-[#FAF7F2]">Sarafa Mandi Live Bhav</h3>
                            <p className="text-[10px] text-[#EAD8B1]/70 tracking-wider">Transparent Daily Mandi Rate</p>
                        </div>

                        <div className="flex flex-col items-center gap-2 group">
                            <div className="w-12 h-12 rounded-full bg-[#3C081A] flex items-center justify-center border border-[#C5A059]/40 group-hover:border-[#C5A059] transition-colors">
                                <Gem className="w-6 h-6 text-[#DFBE7A]" />
                            </div>
                            <h3 className="font-serif text-sm md:text-base font-semibold text-[#FAF7F2]">100% Purity Guarantee</h3>
                            <p className="text-[10px] text-[#EAD8B1]/70 tracking-wider">Zero Adulteration Assurance</p>
                        </div>

                        <div className="flex flex-col items-center gap-2 group">
                            <div className="w-12 h-12 rounded-full bg-[#3C081A] flex items-center justify-center border border-[#C5A059]/40 group-hover:border-[#C5A059] transition-colors">
                                <Clock className="w-6 h-6 text-[#DFBE7A]" />
                            </div>
                            <h3 className="font-serif text-sm md:text-base font-semibold text-[#FAF7F2]">Chaubepur Showroom</h3>
                            <p className="text-[10px] text-[#EAD8B1]/70 tracking-wider">Pipari Road, Near Narsingh Mandir</p>
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
                            <span>Sarafa Mandi Live Streaming · आज का सोना एवं चांदी भाव</span>
                        </div>
                        <h2 className="font-serif text-3xl md:text-5xl text-[#FAF7F2] font-normal">
                            Live Gold &amp; Silver Cash Bhav
                        </h2>
                        <div className="ornament-divider">
                            <span className="w-2 h-2 rotate-45 bg-[#C5A059]"></span>
                        </div>
                        <p className="text-xs md:text-sm text-[#EAD8B1]/80 leading-relaxed">
                            Transparent landed gold and silver rates streaming live in real-time. 100% retail jewellery focus with live price calculation formula.
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
                            Showroom Original Masterpieces · सर्वश्रेष्ठ कारीगरी
                        </span>
                        <h2 className="font-serif text-3xl md:text-5xl text-[#270611] mt-2 font-normal">
                            Signature Masterpieces
                        </h2>
                        <div className="ornament-divider">
                            <span className="w-2 h-2 rotate-45 bg-[#C5A059]"></span>
                        </div>
                        <p className="text-xs md:text-sm text-gray-600">
                            Each design is photographed directly from our showroom inventory, certified with a 100% BIS Hallmark laser HUID.
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
                            <span>Explore Complete Showroom Catalogue</span>
                            <ArrowRight size={14} className="text-[#C5A059]" />
                        </Link>
                    </div>

                </div>
            </section>

            {/* 5B. Custom Jewellery Design & Karigari Showcase (मनपसंद डिज़ाइन अपने वजन में बनवाएं) */}
            <section id="custom-design" className="py-20 md:py-28 bg-[#FAF7F2] relative overflow-hidden border-b border-[#C5A059]/25">
                <div className="container mx-auto px-4 md:px-8">
                    <div className="bg-[#270611] text-[#FAF7F2] border-2 border-[#C5A059]/50 shadow-2xl relative overflow-hidden p-8 md:p-14 lg:p-16">
                        
                        {/* Decorative Corner Ornaments */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#C5A059]/20 to-transparent pointer-events-none" />
                        <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-[#C5A059]/20 to-transparent pointer-events-none" />

                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center relative z-10">
                            
                            {/* Left Text & Pitch */}
                            <div className="lg:col-span-7 space-y-5">
                                <div className="inline-flex items-center gap-2 bg-[#3C081A] px-3.5 py-1.5 border border-[#C5A059]/50 text-[#DFBE7A] text-[10px] font-bold uppercase tracking-[0.25em]">
                                    <Sparkles size={13} className="text-[#C5A059]" />
                                    <span>Bespoke Karigari · कस्टम जेवर निर्माण</span>
                                </div>

                                <h2 className="font-serif text-3xl md:text-5xl text-white font-normal leading-tight">
                                    Send Any Jewellery Photo,
                                    <br />
                                    <span className="font-serif italic text-gold-gradient font-normal">
                                        We Craft It In Your Desired Weight.
                                    </span>
                                </h2>

                                <p className="font-serif text-sm md:text-base text-[#EAD8B1] italic">
                                    "आप जो भी डिज़ाइन इंटरनेट या शादी में पसंद करेंगे — हमारे कारीगर उसे आपके मनपसंद वजन और बजट में हूबहू तैयार करेंगे।"
                                </p>

                                <p className="text-xs md:text-sm text-[#FAF7F2]/80 leading-relaxed font-sans">
                                    Saw an exquisite bridal haar, sleek rope chain, Italian bracelet, or designer ring on Pinterest or Instagram? Simply send us the screenshot or photo. Choose your preferred metal weight (e.g. 5g, 12g, 25g, 50g) and purity (22K 916 Hallmark or 18K), and our master goldsmiths in Chaubepur will craft it with 100% BIS Hallmarking.
                                </p>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                                    <div className="flex items-center gap-2.5 bg-[#3C081A]/60 p-2.5 border border-[#C5A059]/20 text-xs">
                                        <Camera size={16} className="text-[#DFBE7A] shrink-0" />
                                        <span>Upload Any Photo or Sketch</span>
                                    </div>
                                    <div className="flex items-center gap-2.5 bg-[#3C081A]/60 p-2.5 border border-[#C5A059]/20 text-xs">
                                        <SlidersHorizontal size={16} className="text-[#DFBE7A] shrink-0" />
                                        <span>Your Target Weight &amp; Budget</span>
                                    </div>
                                    <div className="flex items-center gap-2.5 bg-[#3C081A]/60 p-2.5 border border-[#C5A059]/20 text-xs">
                                        <ShieldCheck size={16} className="text-[#DFBE7A] shrink-0" />
                                        <span>100% BIS Hallmarked (916 HUID)</span>
                                    </div>
                                    <div className="flex items-center gap-2.5 bg-[#3C081A]/60 p-2.5 border border-[#C5A059]/20 text-xs">
                                        <Sparkles size={16} className="text-[#DFBE7A] shrink-0" />
                                        <span>Instant WhatsApp Estimate</span>
                                    </div>
                                </div>

                                <div className="pt-4 flex flex-wrap gap-4 items-center">
                                    <button
                                        onClick={() => setIsCustomDesignOpen(true)}
                                        className="bg-gradient-to-r from-[#ECC880] to-[#C5A059] text-[#270611] font-bold text-xs uppercase tracking-[0.2em] px-8 py-4 hover:shadow-xl transition-all flex items-center gap-2.5 shadow-lg group cursor-pointer"
                                    >
                                        <Camera size={16} className="group-hover:scale-110 transition-transform" />
                                        <span>Send Design Photo · फोटो भेजें</span>
                                        <ArrowRight size={14} />
                                    </button>

                                    <a
                                        href={`https://wa.me/${BUSINESS_DETAILS.whatsappClean}?text=${encodeURIComponent('नमस्ते यश ज्वेलर्स! मेरे पास एक ज्वेलरी डिज़ाइन की फोटो है जिसे मुझे अपने वजन और बजट में बनवाना है।')}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="border border-[#C5A059] text-[#EAD8B1] hover:bg-[#C5A059]/10 px-6 py-4 text-xs font-semibold uppercase tracking-[0.18em] transition-colors flex items-center gap-2"
                                    >
                                        <MessageCircle size={15} className="text-[#25D366]" />
                                        <span>WhatsApp Inquiry</span>
                                    </a>
                                </div>
                            </div>

                            {/* Right Visual Card */}
                            <div className="lg:col-span-5 flex flex-col gap-4">
                                <div className="relative border-2 border-[#C5A059] shadow-xl overflow-hidden group">
                                    <div className="aspect-[4/3] bg-black/40 overflow-hidden">
                                        <img
                                            src="/images/yash/pages/114497/haar-set_1621611944gr5wqq.jpeg"
                                            alt="Custom Jewellery Crafting Yash Jewellers"
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                        />
                                    </div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#270611] via-transparent to-transparent" />
                                    <div className="absolute bottom-4 left-4 right-4 bg-[#270611]/90 backdrop-blur-sm p-4 border border-[#C5A059]/40">
                                        <div className="flex justify-between items-center text-[10px] text-[#C5A059] font-bold uppercase tracking-widest mb-1">
                                            <span>Custom Karigari Sample</span>
                                            <span>100% 916 Gold</span>
                                        </div>
                                        <p className="font-serif text-sm text-white">
                                            Crafted as per customer photo in 38.5 grams
                                        </p>
                                        <p className="text-[11px] text-[#EAD8B1]/75 mt-0.5">
                                            Client selected weight &amp; BIS 916 Hallmark certification
                                        </p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-3 gap-2.5">
                                    <div className="border border-[#C5A059]/30 p-3 bg-[#3C081A]/50 text-center">
                                        <span className="block font-serif text-lg text-[#ECC880] font-bold">1. Photo</span>
                                        <span className="text-[10px] text-[#FAF7F2]/70">Send image</span>
                                    </div>
                                    <div className="border border-[#C5A059]/30 p-3 bg-[#3C081A]/50 text-center">
                                        <span className="block font-serif text-lg text-[#ECC880] font-bold">2. Weight</span>
                                        <span className="text-[10px] text-[#FAF7F2]/70">Choose grams</span>
                                    </div>
                                    <div className="border border-[#C5A059]/30 p-3 bg-[#3C081A]/50 text-center">
                                        <span className="block font-serif text-lg text-[#ECC880] font-bold">3. Craft</span>
                                        <span className="text-[10px] text-[#FAF7F2]/70">BIS Hallmarked</span>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </section>

            {/* 6. Heritage & Artisanal Karigar Tribute (हमारी विरासत · चौबेपुर, कानपुर) */}
            <section className="py-20 md:py-28 bg-[#270611] text-[#FAF7F2] relative">
                <div className="container mx-auto px-4 md:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                        
                        {/* Image Showcase */}
                        <div className="relative">
                            <div className="relative aspect-[4/5] border border-[#C5A059]/40 overflow-hidden shadow-2xl">
                                <img
                                    src="/images/yash/updates/741561/yash-jewel_1621504828rfZ4Fq.png"
                                    alt="Yash Jewellers showroom Chaubepur Kanpur"
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
                                Established with a singular promise in Chaubepur, Kanpur: to provide unadulterated purity, transparent pricing, and timeless aesthetic mastery to families celebrating life’s greatest milestones.
                            </p>

                            <p className="text-xs md:text-sm text-[#FAF7F2]/80 leading-relaxed font-sans">
                                Every piece of jewellery in our showroom carries a 100% BIS Hallmarked (916 HUID) laser engraving. We follow direct mandi parity rates with full transparency on net gold weight, making charges, and statutory GST.
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
                                        <p className="font-bold text-[#FAF7F2]">Sarafa Mandi Live Bhav</p>
                                        <p className="text-[#EAD8B1]/60 text-[11px]">Official market cash benchmark</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-2.5">
                                    <Check size={16} className="text-[#C5A059] shrink-0 mt-0.5" />
                                    <div>
                                        <p className="font-bold text-[#FAF7F2]">Bespoke Customization</p>
                                        <p className="text-[#EAD8B1]/60 text-[11px]">Handcrafted to your design</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-2.5">
                                    <Check size={16} className="text-[#C5A059] shrink-0 mt-0.5" />
                                    <div>
                                        <p className="font-bold text-[#FAF7F2]">Lifetime Trust</p>
                                        <p className="text-[#EAD8B1]/60 text-[11px]">Guaranteed purity buyback</p>
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
                                location: "Chaubepur, Kanpur",
                                occasion: "Bridal Suite Customer"
                            },
                            {
                                quote: "Our family has trusted Yash Jewellers for years. We always check their live rate board before making gold purchases in Kanpur.",
                                name: "Rajeshwar Mehrotra",
                                location: "Kanpur Nagar",
                                occasion: "Regular Patron"
                            },
                            {
                                quote: "The floral gold ring and jhumkas were stunning and 100% hallmarked. Very respectful and honest billing.",
                                name: "Sneha & Vivek Singhal",
                                location: "UP",
                                occasion: "Jewellery Collection"
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
                        Bespoke Consultation · चौबेपुर शोरूम
                    </span>

                    <h2 className="mt-4 font-serif text-3xl md:text-5xl text-[#FAF7F2] leading-tight">
                        Visit Yash Jewellers Showroom
                    </h2>

                    <p className="mt-4 text-xs md:text-sm text-[#EAD8B1]/80 max-w-xl mx-auto leading-relaxed">
                        पिपरी रोड, नरसिंह मंदिर के पास, चौबेपुर, कानपुर नगर, उत्तर प्रदेश - 209203
                    </p>

                    <div className="mt-8 flex flex-wrap justify-center gap-4">
                        <a
                            href={`https://wa.me/${BUSINESS_DETAILS.whatsappClean}?text=${encodeURIComponent('नमस्ते यश ज्वेलर्स! मुझे शोरूम विजिट एवं आभूषणों के बारे में जानकारी चाहिए।')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-gradient-to-r from-[#ECC880] to-[#C5A059] text-[#270611] px-8 py-3.5 text-xs font-bold uppercase tracking-[0.2em] shadow-lg hover:shadow-2xl transition-all"
                        >
                            WhatsApp Chat ({BUSINESS_DETAILS.phoneFormatted})
                        </a>

                        <a
                            href={`tel:${BUSINESS_DETAILS.phoneClean}`}
                            className="inline-flex items-center gap-2 border border-[#C5A059] text-[#FAF7F2] px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] hover:bg-[#3C081A] transition-colors"
                        >
                            <span>Call Showroom</span>
                        </a>
                    </div>
                </div>
            </section>

            {/* Atelier Booking Modal */}
            <AtelierBookingModal
                isOpen={isBookingOpen}
                onClose={() => setIsBookingOpen(false)}
            />

            {/* Custom Design Submission Modal */}
            <CustomDesignModal
                isOpen={isCustomDesignOpen}
                onClose={() => setIsCustomDesignOpen(false)}
            />

        </div>
    );
}
