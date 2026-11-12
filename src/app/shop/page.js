"use client";

import { useState, useMemo } from 'react';
import ProductCard from '@/src/components/ProductCard';
import CustomDesignModal from '@/src/components/CustomDesignModal';
import { Filter, Search, Sparkles, X, ShieldCheck, TrendingUp, Camera, MessageSquare, ArrowRight } from 'lucide-react';
import { useRates } from '@/src/context/RatesContext';
import { BUSINESS_DETAILS } from '@/src/config/business';

// Complete Yash Jewellers Catalogue with authentic photos
const FULL_CATALOGUE = [
    // HAAR SET & BRIDAL CHOKERS
    { 
        id: 201, 
        title: "Royal Bridal Kundan Choker Haar Set", 
        hindiTitle: "रॉयल ब्राइडल कुंदन हार सेट",
        price: "5,98,000", 
        category: "Haar Set", 
        purity: "22K 916 Hallmark",
        weight: "46.50g",
        making: "10.5%",
        image: "/images/yash/media/240013/_1620299402cGdvA7.jpeg", 
        tag: "Bridal Suite",
        description: "Imperial bridal necklace crafted in pure 22K 916 gold with traditional kundan foil settings and hand-carved floral drops."
    },
    { 
        id: 202, 
        title: "Traditional Temple Choker Necklace", 
        hindiTitle: "पारंपरिक मंदिर चोकर हार",
        price: "4,60,000", 
        category: "Haar Set", 
        purity: "22K 916 Hallmark",
        weight: "35.80g",
        making: "10%",
        image: "/images/yash/media/240012/_1620299352oltjxg.jpeg", 
        tag: "Temple Nakshi",
        description: "Magnificent south and north Indian temple fusion choker set featuring embossed nakshi figurines and delicate dangling gold beads."
    },
    { 
        id: 203, 
        title: "Heritage 22K Gold Multi-strand Rani Haar", 
        hindiTitle: "हेरिटेज सोने का रानी हार",
        price: "6,75,000", 
        category: "Haar Set", 
        purity: "22K 916 Hallmark",
        weight: "52.40g",
        making: "11%",
        image: "/images/yash/media/240011/_1620299307xF52Ki.jpeg", 
        tag: "Royal Suite",
        description: "Grand multi-layered 22K gold Rani Haar with intricately woven chain strands, auspicious motifs, and heritage craftsmanship."
    },
    { 
        id: 204, 
        title: "Antique Meenakari Floral Gold Necklace", 
        hindiTitle: "एंटीक मीनाकारी हार सेट",
        price: "3,72,000", 
        category: "Haar Set", 
        purity: "22K 916 Hallmark",
        weight: "28.90g",
        making: "9.5%",
        image: "/images/yash/media/240010/_1620299269d2lJzo.jpeg", 
        tag: "Festive Collection",
        description: "Artistic 22K hallmarked necklace showcasing vibrant meenakari enameling and filigree floral clusters."
    },
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
        description: "High-jewellery bridal haar featuring uncut kundan stones, green emerald drops, and fine 22K gold foil setting."
    },
    { 
        id: 206, 
        title: "Rajputana Royal Jadau Choker Set", 
        hindiTitle: "राजपूताना जड़ाऊ चोकर सेट",
        price: "5,15,000", 
        category: "Haar Set", 
        purity: "22K 916 Hallmark",
        weight: "40.00g",
        making: "10%",
        image: "/images/yash/pages/114497/haar-set_1621611944gr5wqq.jpeg", 
        tag: "Bespoke Karigari",
        description: "Handcrafted royal choker necklace with precision-cut gemstones and traditional Jaipuri meenakari detailing on the reverse."
    },
    { 
        id: 207, 
        title: "Peacock Motif Heritage Gold Haar", 
        hindiTitle: "मयूर नक्काशी हेरिटेज हार",
        price: "4,45,000", 
        category: "Haar Set", 
        purity: "22K 916 Hallmark",
        weight: "34.50g",
        making: "9.5%",
        image: "/images/yash/pages/114497/haar-set_1621611945FzugvZ.jpeg", 
        tag: "Peacock Motif",
        description: "Exquisite hand-carved peacock crests gracefully interlaced with pure 22K gold mesh chains."
    },
    { 
        id: 208, 
        title: "Auspicious Lakshmi Temple Choker", 
        hindiTitle: "महालक्ष्मी मंदिर चोकर",
        price: "4,90,000", 
        category: "Haar Set", 
        purity: "22K 916 Hallmark",
        weight: "38.20g",
        making: "10%",
        image: "/images/yash/pages/114497/haar-set_1621612168cty54j.jpeg", 
        tag: "Sacred Temple",
        description: "Auspicious south-Indian nakshi carving of Goddess Lakshmi flanked by sacred elephants and hanging gold pearls."
    },
    { 
        id: 209, 
        title: "Contemporary Minimalist Bridal Haar", 
        hindiTitle: "आधुनिक ब्राइडल हार",
        price: "3,30,000", 
        category: "Haar Set", 
        purity: "22K 916 Hallmark",
        weight: "25.80g",
        making: "9%",
        image: "/images/yash/pages/114497/haar-set_1621612416sEQ3fu.jpeg", 
        tag: "Modern Lightweight",
        description: "Lightweight and versatile bridal neckpiece designed for receptions, cocktail events, and family festivities."
    },

    // LADIES RINGS DESIGN
    { 
        id: 101, 
        title: "Ladies Gold Floral Filigree Ring", 
        hindiTitle: "सोने की लेडीज फ्लोरल अंगूठी",
        price: "62,500", 
        category: "Ladies Rings Design", 
        purity: "22K 916 Hallmark",
        weight: "4.85g",
        making: "8.5%",
        image: "/images/yash/media/240016/_1620299537ep2SIU.jpeg", 
        tag: "Showroom Original",
        description: "Handcrafted 22K 916 BIS Hallmarked ladies ring featuring fine filigree floral carvings and polished gold accents."
    },
    { 
        id: 102, 
        title: "Lotus Bloom Royal Ladies Ring", 
        hindiTitle: "कमल पुष्प शाही लेडीज अंगूठी",
        price: "54,200", 
        category: "Ladies Rings Design", 
        purity: "22K 916 Hallmark",
        weight: "4.20g",
        making: "8.5%",
        image: "/images/yash/pages/115402/ladies-rin_162209013039gV52.jpeg", 
        tag: "Lotus Design",
        description: "Fine 22K gold ring inspired by blossoming Indian lotus petals with multi-layered central crown."
    },
    { 
        id: 103, 
        title: "Crown Solitaire Mount Gold Ring", 
        hindiTitle: "क्राउन सॉलिटेयर लेडीज रिंग",
        price: "68,000", 
        category: "Ladies Rings Design", 
        purity: "22K 916 Hallmark",
        weight: "5.30g",
        making: "9%",
        image: "/images/yash/pages/115402/ladies-rin_1622090131TZ0ZR5.jpeg", 
        tag: "Crown Setting",
        description: "Regal crown prongs set in hallmarked 22K gold with intricate latticework along the band."
    },
    { 
        id: 104, 
        title: "Peacock Motif Filigree Cocktail Ring", 
        hindiTitle: "मयूर कॉकटेल लेडीज अंगूठी",
        price: "79,500", 
        category: "Ladies Rings Design", 
        purity: "22K 916 Hallmark",
        weight: "6.20g",
        making: "9%",
        image: "/images/yash/pages/115402/ladies-rin_1622090131IBhoWt.jpeg", 
        tag: "Cocktail Special",
        description: "Statement cocktail ring showcasing openwork peacock plumage hand-carved in 22K pure gold."
    },
    { 
        id: 105, 
        title: "Daily Wear Minimal Gold Band", 
        hindiTitle: "डेली वियर लेडीज गोल्ड रिंग",
        price: "41,000", 
        category: "Ladies Rings Design", 
        purity: "22K 916 Hallmark",
        weight: "3.20g",
        making: "8%",
        image: "/images/yash/pages/115402/ladies-rin_1622090131MLteSK.jpeg", 
        tag: "Daily Comfort",
        description: "Smooth ergonomic gold ring designed for comfortable everyday wear with lasting polish."
    },
    { 
        id: 106, 
        title: "Designer Diamond Cut Curved Ring", 
        hindiTitle: "डायमंड कट कर्व्ड रिंग",
        price: "59,800", 
        category: "Ladies Rings Design", 
        purity: "22K 916 Hallmark",
        weight: "4.65g",
        making: "8.5%",
        image: "/images/yash/pages/115402/ladies-rin_162209013206Mvxe.jpeg", 
        tag: "Diamond Cut",
        description: "Faceted diamond-cut patterns that shimmer under ambient light without requiring fragile stones."
    },

    // GENTS RING DESIGN
    { 
        id: 301, 
        title: "Gents Royal Maharaja Signet Ring", 
        hindiTitle: "जेंट्स शाही महाराजा अंगूठी",
        price: "92,800", 
        category: "Gents Ring Design", 
        purity: "22K 916 Hallmark",
        weight: "7.20g",
        making: "8.5%",
        image: "/images/yash/media/240015/_1620299484jhM9NC.jpeg", 
        tag: "Bestseller",
        description: "Distinctive solid 22K hallmarked gents signet ring with structured geometric texturing and high-polish borders."
    },
    { 
        id: 302, 
        title: "Bold Lion Head Gents Ring", 
        hindiTitle: "सिंह मुखी जेंट्स गोल्ड रिंग",
        price: "1,18,000", 
        category: "Gents Ring Design", 
        purity: "22K 916 Hallmark",
        weight: "9.20g",
        making: "8.5%",
        image: "/images/yash/pages/115404/gents-ring_1622106809h7grSw.jpeg", 
        tag: "Royal Stature",
        description: "Heavy solid 22K signet ring with sculpted lion head symbolising strength, authority, and royalty."
    },
    { 
        id: 303, 
        title: "Executive Rhodium Finish Gents Band", 
        hindiTitle: "एग्जीक्यूटिव जेंट्स बैंड रिंग",
        price: "84,000", 
        category: "Gents Ring Design", 
        purity: "22K 916 Hallmark",
        weight: "6.50g",
        making: "8%",
        image: "/images/yash/pages/115404/gents-ring_1622106809jWLoVC.jpeg", 
        tag: "Executive Wear",
        description: "Dual-tone gold band with brushed center texture and polished bevelled edges in certified 916 gold."
    },

    // BRACELETS & KANGANS
    { 
        id: 401, 
        title: "Royal Filigree Antique Gold Kangan", 
        hindiTitle: "शाही जालीदार सोने का कंगन",
        price: "2,45,000", 
        category: "Bracelets", 
        purity: "22K 916 Hallmark",
        weight: "19.00g",
        making: "9%",
        image: "/images/yash/pages/115773/brackets_1622289294WeOwEt.jpeg", 
        tag: "Antique Kangan",
        description: "Substantial 22K gold kada featuring hand-carved floral openwork and secure safety screw hinge."
    },
    { 
        id: 402, 
        title: "Bridal Nakshi Elephant Kada Pair", 
        hindiTitle: "हाथी मुखी मंदिर कड़ा",
        price: "3,85,000", 
        category: "Bracelets", 
        purity: "22K 916 Hallmark",
        weight: "30.00g",
        making: "9.5%",
        image: "/images/yash/pages/115773/brackets_16222892941sZ3wG.jpeg", 
        tag: "Heritage Kada",
        description: "Iconic Gajraj elephant head finials hand-chiseled in solid 22K gold with ruby eyes."
    },
    { 
        id: 403, 
        title: "Designer Floral Mesh Gold Bracelet", 
        hindiTitle: "फ्लोरल मेश गोल्ड ब्रेसलेट",
        price: "1,68,000", 
        category: "Bracelets", 
        purity: "22K 916 Hallmark",
        weight: "13.20g",
        making: "8.5%",
        image: "/images/yash/pages/115773/brackets_16222892952f4PoV.jpeg", 
        tag: "Flexible Mesh",
        description: "Fluid and flexible interlocking 22K gold links designed to drape gracefully on the wrist."
    },
    { 
        id: 404, 
        title: "Daily Wear Textured Gold Bangle", 
        hindiTitle: "डेली वियर गोल्ड चूड़ी",
        price: "1,22,000", 
        category: "Bracelets", 
        purity: "22K 916 Hallmark",
        weight: "9.60g",
        making: "8%",
        image: "/images/yash/pages/115773/brackets_1622289412Y6Grl5.jpeg", 
        tag: "Daily Bangle",
        description: "Lightweight yet sturdy 22K hallmarked bangle with diagonal diamond-cut grooves."
    },
    { 
        id: 405, 
        title: "Bikaneri Meenakari Jadau Kada", 
        hindiTitle: "बीकानेरी मीनाकारी कड़ा",
        price: "3,10,000", 
        category: "Bracelets", 
        purity: "22K 916 Hallmark",
        weight: "24.20g",
        making: "10%",
        image: "/images/yash/pages/115773/brackets_1622289414BCWMAX.jpeg", 
        tag: "Meenakari Art",
        description: "Traditional vibrant enamel flourishes on solid 22K gold crafted by heritage karigars."
    },

    // CHAINS DESIGN
    { 
        id: 501, 
        title: "Traditional Solid Rope Gold Chain", 
        hindiTitle: "सॉलिड रोप सोने की चेन",
        price: "1,98,000", 
        category: "Chains Design", 
        purity: "22K 916 Hallmark",
        weight: "15.50g",
        making: "7.5%",
        image: "/images/yash/pages/115436/chains-des_16221057465n2S8b.jpeg", 
        tag: "Strong Link",
        description: "Heavy tightly wound 22K rope chain engineered for extreme tensile durability and daily wear."
    },
    { 
        id: 502, 
        title: "Classic Franco Square Link Chain", 
        hindiTitle: "क्लासिक फ्रैंको गोल्ड चेन",
        price: "1,55,000", 
        category: "Chains Design", 
        purity: "22K 916 Hallmark",
        weight: "12.20g",
        making: "7.5%",
        image: "/images/yash/pages/115436/chains-des_1622105747oVQCS4.jpeg", 
        tag: "Franco Link",
        description: "Four-sided interlocking Franco weave in 22K gold offering a sleek mirror-like reflective finish."
    },
    { 
        id: 503, 
        title: "Designer Diamond Cut Figaro Chain", 
        hindiTitle: "फिगारो डायमंड कट चेन",
        price: "2,35,000", 
        category: "Chains Design", 
        purity: "22K 916 Hallmark",
        weight: "18.40g",
        making: "8%",
        image: "/images/yash/pages/115436/chains-des_1622105747pPH1qV.jpeg", 
        tag: "Bestseller Chain",
        description: "Alternating three-short and one-elongated oval link Figaro pattern in hallmarked 916 gold."
    },
    { 
        id: 504, 
        title: "Lightweight Daily Wear Box Chain", 
        hindiTitle: "लाइटवेट बॉक्स चेन",
        price: "82,000", 
        category: "Chains Design", 
        purity: "22K 916 Hallmark",
        weight: "6.50g",
        making: "7.5%",
        image: "/images/yash/pages/115436/chains-des_1622106370LD13sN.jpeg", 
        tag: "Pendant Friendly",
        description: "Smooth box-link chain ideal for pairing with sacred deities, lockets, and solitaires."
    },
    { 
        id: 505, 
        title: "Heavy Royal Rudraksha Gold Chain", 
        hindiTitle: "रुद्राक्ष कैपिंग सोने की चेन",
        price: "2,85,000", 
        category: "Chains Design", 
        purity: "22K 916 Hallmark",
        weight: "22.50g",
        making: "8.5%",
        image: "/images/yash/pages/115436/chains-des_1622106682Rgjv5F.jpeg", 
        tag: "Spiritual Sacred",
        description: "Authentic natural 5-mukhi Rudraksha beads encased in 22K hand-chiseled gold flower caps."
    },

    // EARRINGS & JHUMKAS
    { 
        id: 601, 
        title: "Traditional Gold Jhumki & Hanging Tops", 
        hindiTitle: "पारंपरिक झुमकी व इयररिंग्स",
        price: "1,58,000", 
        category: "Earrings", 
        purity: "22K 916 Hallmark",
        weight: "12.30g",
        making: "9%",
        image: "/images/yash/media/240008/_1620298549kOhvwW.jpeg", 
        tag: "Classic Jhumka",
        description: "Classic bell-shaped 22K gold jhumkas with delicate dangling ghungroo beads and embossed filigree dome."
    },
    { 
        id: 602, 
        title: "Royal Chandbali Bridal Earrings", 
        hindiTitle: "शाही चांदबाली झुमके",
        price: "2,04,000", 
        category: "Earrings", 
        purity: "22K 916 Hallmark",
        weight: "15.80g",
        making: "10%",
        image: "/images/yash/media/240007/_1620298512GXgV9M.jpeg", 
        tag: "Royal Chandbali",
        description: "Crescent moon-inspired 22K gold Chandbali earrings with multi-tiered hangings and intricate jali openwork."
    },
    { 
        id: 603, 
        title: "Daily Wear Lightweight Floral Tops", 
        hindiTitle: "डेली वियर फ्लोरल गोल्ड टॉप्स",
        price: "61,800", 
        category: "Earrings", 
        purity: "22K 916 Hallmark",
        weight: "4.80g",
        making: "8%",
        image: "/images/yash/media/240006/_1620298492YA6Yww.jpeg", 
        tag: "Daily Elegance",
        description: "Lightweight and comfortable 22K gold floral tops designed for everyday elegance and long-lasting strength."
    },
    { 
        id: 604, 
        title: "Fancy Designer Linear Drop Earrings", 
        hindiTitle: "फैंसी डिजाइनर ड्राप इयररिंग्स",
        price: "1,18,500", 
        category: "Earrings", 
        purity: "22K 916 Hallmark",
        weight: "9.20g",
        making: "9%",
        image: "/images/yash/media/240004/_1620297961YBRCdm.jpeg", 
        tag: "Contemporary",
        description: "Modern linear drop earrings in 22K hallmarked gold with diamond-cut faceted beads and fluid movement."
    },

    // SILVER ARTICLES & ORNAMENTS
    { 
        id: 701, 
        title: "Pure Silver Handcrafted Payal & Giftware", 
        hindiTitle: "शुद्ध चांदी पायल व पूजन बर्तन",
        price: "24,500", 
        category: "Silver", 
        purity: "Silver 999 Fine",
        weight: "120.00g",
        making: "8%",
        image: "/images/yash/updates/767116/silver-pri_1622829552yGdBcV.jpeg", 
        tag: "Silver Mandi Bhav",
        description: "Authentic fine silver payal, chandi bartan, pooja articles, and gift items crafted with 999/92.5% certified silver purity."
    }
];

const CATEGORIES = [
    "All",
    "Haar Set",
    "Ladies Rings Design",
    "Gents Ring Design",
    "Bracelets",
    "Chains Design",
    "Earrings",
    "Silver"
];

export default function Shop() {
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");
    const [sortBy, setSortBy] = useState("featured");
    const [showFiltersMobile, setShowFiltersMobile] = useState(false);
    const [isCustomDesignOpen, setIsCustomDesignOpen] = useState(false);
    const { rates, formatINR } = useRates();

    const filteredProducts = useMemo(() => {
        return FULL_CATALOGUE.filter((item) => {
            const matchesCat = selectedCategory === "All" || item.category === selectedCategory;
            const matchesQuery = !searchQuery || 
                item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (item.hindiTitle && item.hindiTitle.toLowerCase().includes(searchQuery.toLowerCase())) ||
                item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.description.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesCat && matchesQuery;
        }).sort((a, b) => {
            if (sortBy === "weight-asc") return parseFloat(a.weight) - parseFloat(b.weight);
            if (sortBy === "weight-desc") return parseFloat(b.weight) - parseFloat(a.weight);
            return a.id - b.id;
        });
    }, [selectedCategory, searchQuery, sortBy]);

    return (
        <div className="min-h-screen bg-[#FAF7F2] font-sans">
            
            {/* Header / Hero Strip */}
            <div className="bg-[#270611] text-[#FAF7F2] py-12 md:py-16 border-b border-[#C5A059]/30 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-heritage-pattern pointer-events-none" />
                
                <div className="container mx-auto px-4 md:px-8 text-center relative z-10 max-w-3xl">
                    <div className="inline-flex items-center gap-2 text-[#DFBE7A] text-[10px] uppercase font-bold tracking-[0.3em] mb-2">
                        <Sparkles size={13} />
                        <span>Authentic Showroom Collection · चौबेपुर, कानपुर</span>
                    </div>
                    <h1 className="font-serif text-3xl md:text-5xl font-normal text-white">
                        Yash Jewellers Catalogue
                    </h1>
                    <div className="ornament-divider my-3">
                        <span className="w-2 h-2 rotate-45 bg-[#C5A059]"></span>
                    </div>
                    <p className="text-xs md:text-sm text-[#EAD8B1]/80 leading-relaxed font-sans font-light">
                        Every ornament is photographed directly from our showroom inventory. Prices dynamically calculate in real-time according to Sarafa Mandi's official Cash Bhav.
                    </p>

                    {/* Live Ticker Bar in Header */}
                    <div className="mt-6 inline-flex flex-wrap items-center justify-center gap-4 bg-[#1F040D] border border-[#C5A059]/40 px-4 py-2 text-xs">
                        <div className="flex items-center gap-1.5 text-[#EAD8B1]">
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                            <span className="font-semibold text-white">Live 22K (916):</span>
                            <span className="font-mono text-[#DFBE7A]">₹{formatINR(rates?.gold22k || 125065)} / 10g</span>
                        </div>
                        <span className="text-[#C5A059]/40 hidden sm:inline">•</span>
                        <div className="flex items-center gap-1.5 text-[#EAD8B1]">
                            <span className="font-semibold text-white">Silver Refinery Cash Bhav:</span>
                            <span className="font-mono text-[#DFBE7A]">₹{formatINR(rates?.silverKg || 186284)} / KG</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Custom Design Banner Callout */}
            <div className="bg-[#38081A] border-b border-[#C5A059]/40 py-3.5 px-4 text-[#FAF7F2]">
                <div className="container mx-auto px-4 md:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-[#C5A059]/20 border border-[#C5A059] flex items-center justify-center shrink-0">
                            <Camera size={16} className="text-[#DFBE7A]" />
                        </div>
                        <div>
                            <p className="text-xs font-bold text-white tracking-wide">
                                Have a Custom Jewellery Design in Mind? (अपनी पसंद का गहना बनवाएं)
                            </p>
                            <p className="text-[11px] text-[#EAD8B1]/80">
                                Send us any photo or sketch — we craft it in your desired weight and budget with 100% BIS Hallmark.
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={() => setIsCustomDesignOpen(true)}
                        className="bg-gradient-to-r from-[#ECC880] to-[#C5A059] text-[#270611] px-5 py-2 text-xs font-bold uppercase tracking-wider hover:opacity-90 transition-opacity shrink-0 flex items-center gap-1.5"
                    >
                        <span>Send Design Photo</span>
                        <ArrowRight size={13} />
                    </button>
                </div>
            </div>

            {/* Filter & Search Bar */}
            <div className="sticky top-[69px] z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#C5A059]/20 shadow-xs py-3.5">
                <div className="container mx-auto px-4 md:px-8 flex flex-wrap items-center justify-between gap-3">
                    
                    {/* Category Pills (Desktop) */}
                    <div className="hidden lg:flex items-center gap-1.5 overflow-x-auto py-1">
                        {CATEGORIES.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider transition-colors ${
                                    selectedCategory === cat
                                        ? "bg-[#6B0E2A] text-white shadow-xs"
                                        : "bg-[#F3E8D0]/50 text-[#270611] hover:bg-[#F3E8D0] border border-[#C5A059]/30"
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* Mobile Category Trigger */}
                    <button
                        onClick={() => setShowFiltersMobile(!showFiltersMobile)}
                        className="lg:hidden flex items-center gap-1.5 px-3 py-1.5 bg-[#F3E8D0] text-[#270611] text-xs font-bold uppercase tracking-wider border border-[#C5A059]/40"
                    >
                        <Filter size={14} />
                        <span>Filter: {selectedCategory}</span>
                    </button>

                    {/* Search & Sort Inputs */}
                    <div className="flex items-center gap-3 flex-grow sm:flex-grow-0 justify-end">
                        <div className="relative flex-grow sm:w-56">
                            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search designs..."
                                className="w-full bg-white border border-[#C5A059]/30 pl-8 pr-3 py-1.5 text-xs text-[#270611] focus:outline-none focus:border-[#6B0E2A]"
                            />
                            {searchQuery && (
                                <button onClick={() => setSearchQuery("")} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                                    <X size={12} />
                                </button>
                            )}
                        </div>

                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="bg-white border border-[#C5A059]/30 px-3 py-1.5 text-xs text-[#270611] focus:outline-none"
                        >
                            <option value="featured">Featured Masterpieces</option>
                            <option value="weight-asc">Weight: Low to High</option>
                            <option value="weight-desc">Weight: High to Low</option>
                        </select>
                    </div>

                </div>

                {/* Mobile Filter Drawer */}
                {showFiltersMobile && (
                    <div className="lg:hidden px-4 pt-3 pb-2 border-t border-[#C5A059]/20 mt-3 flex flex-wrap gap-1.5">
                        {CATEGORIES.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => {
                                    setSelectedCategory(cat);
                                    setShowFiltersMobile(false);
                                }}
                                className={`px-3 py-1.5 text-xs font-semibold uppercase tracking-wider ${
                                    selectedCategory === cat
                                        ? "bg-[#6B0E2A] text-white"
                                        : "bg-[#F3E8D0]/50 text-[#270611] border border-[#C5A059]/30"
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* Products Grid */}
            <div className="container mx-auto px-4 md:px-8 py-10">
                <div className="flex justify-between items-center mb-6">
                    <p className="text-xs text-[#6B0E2A] font-semibold uppercase tracking-widest">
                        Showing {filteredProducts.length} Jewellery Designs
                    </p>
                    <span className="text-[11px] text-gray-500 italic hidden sm:inline">
                        100% BIS Hallmarked (HUID) • Live Landed Price Calculations
                    </span>
                </div>

                {filteredProducts.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {filteredProducts.map((item) => (
                            <ProductCard key={item.id} {...item} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white border border-[#C5A059]/20 p-8 max-w-lg mx-auto">
                        <Sparkles size={32} className="text-[#C5A059] mx-auto mb-3" />
                        <h3 className="font-serif text-xl text-[#270611] mb-1">No Ornaments Found</h3>
                        <p className="text-xs text-gray-500 mb-4">We could not find any items matching your search query.</p>
                        <button
                            onClick={() => { setSelectedCategory("All"); setSearchQuery(""); }}
                            className="bg-[#6B0E2A] text-white px-5 py-2 text-xs font-bold uppercase tracking-wider"
                        >
                            Reset Filters
                        </button>
                    </div>
                )}
            </div>

            {/* Custom Design Interactive Showcase Section */}
            <div className="container mx-auto px-4 md:px-8 pb-16">
                <div className="bg-[#270611] border border-[#C5A059]/40 p-8 md:p-12 text-[#FAF7F2] text-center max-w-4xl mx-auto shadow-2xl relative overflow-hidden">
                    <div className="inline-flex items-center gap-2 text-[#DFBE7A] text-[10px] font-bold uppercase tracking-[0.25em] mb-2">
                        <ShieldCheck size={14} />
                        <span>Bespoke Karigari &amp; Custom Orders</span>
                    </div>
                    <h2 className="font-serif text-2xl md:text-4xl font-normal text-white mb-2">
                        Bring Any Jewellery Design to Life
                    </h2>
                    <p className="font-serif text-sm md:text-base text-[#C5A059] italic mb-3">
                        "आप जो भी डिज़ाइन पसंद करेंगे, हम उसे आपके पसंदीदा वजन में तैयार करके देंगे"
                    </p>
                    <p className="text-xs md:text-sm text-[#EAD8B1]/80 max-w-2xl mx-auto mb-6 leading-relaxed">
                        Looking for a bridal haar, light ring, or heavy kada you found online? Send us the photo or screenshot. Our master karigars will provide the exact metal weight, making charges, and deliver it with 100% BIS Hallmarked purity.
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-4">
                        <button
                            onClick={() => setIsCustomDesignOpen(true)}
                            className="bg-gradient-to-r from-[#ECC880] to-[#C5A059] text-[#270611] font-bold text-xs uppercase tracking-wider px-8 py-3.5 hover:opacity-90 transition-opacity flex items-center gap-2 shadow-lg"
                        >
                            <Camera size={15} />
                            <span>Upload / Send Your Design</span>
                        </button>
                        <a
                            href={`tel:${BUSINESS_DETAILS.phoneClean}`}
                            className="border border-[#C5A059]/60 text-white font-semibold text-xs uppercase tracking-wider px-6 py-3.5 hover:bg-white/10 transition-colors"
                        >
                            Call Showroom: {BUSINESS_DETAILS.phoneFormatted}
                        </a>
                    </div>
                </div>
            </div>

            {/* Custom Design Modal */}
            <CustomDesignModal
                isOpen={isCustomDesignOpen}
                onClose={() => setIsCustomDesignOpen(false)}
            />

        </div>
    );
}
