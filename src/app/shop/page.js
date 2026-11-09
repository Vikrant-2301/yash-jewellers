"use client";

import { useState, useMemo } from 'react';
import ProductCard from '@/src/components/ProductCard';
import { Filter, Search, SlidersHorizontal, Sparkles, X } from 'lucide-react';

const FULL_CATALOGUE = [
    // BRIDAL & HAAR SETS
    { 
        id: 501, 
        title: "Rani Haar Kundan Jadau Set", 
        hindiTitle: "शाही रानी हार कुंदन जड़ाऊ",
        price: "4,50,000", 
        category: "Bridal Sets", 
        purity: "22K 916 Hallmark",
        weight: "62.50g",
        making: "10%",
        image: "https://images.unsplash.com/photo-1602752250055-567f4a127b14?auto=format&fit=crop&q=80&w=700", 
        tag: "Royal Masterpiece",
        description: "Regal multilayered Rani Haar with Zambian emerald beads, uncut diamond polki florets, and peacock meenakari."
    },
    { 
        id: 502, 
        title: "Padmavati Temple Gold Choker", 
        hindiTitle: "पद्मावती मंदिर चोकर सेट",
        price: "2,80,000", 
        category: "Bridal Sets", 
        purity: "22K 916 Hallmark",
        weight: "38.20g",
        making: "9%",
        image: "https://images.unsplash.com/photo-1630138235282-5202867e3dfd?auto=format&fit=crop&q=80&w=700", 
        tag: "Temple Nakshi",
        description: "Hand-chiseled south Indian temple choker depicting Lakshmi with authentic freshwater pearl tassels."
    },
    { 
        id: 503, 
        title: "Rajputana Meenakari Polki Hasli", 
        hindiTitle: "राजपूताना मीनाकारी हँसली",
        price: "3,20,000", 
        category: "Bridal Sets", 
        purity: "22K 916 Hallmark",
        weight: "44.00g",
        making: "11%",
        image: "https://images.unsplash.com/photo-1595357906976-a0772278cb78?auto=format&fit=crop&q=80&w=700", 
        tag: "Heritage",
        description: "Solid gold Hasli neckpiece featuring fine ruby-red and dark green royal Jaipur meenakari work."
    },

    // LADIES RINGS
    { 
        id: 101, 
        title: "Meenakari Lotus Blossom Ring", 
        hindiTitle: "कमल पुष्प मीनाकारी अंगूठी",
        price: "28,500", 
        category: "Ladies Ring", 
        purity: "22K 916 Hallmark",
        weight: "3.80g",
        making: "8%",
        image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=700", 
        tag: "Trending",
        description: "Inspired by sacred Indian lotus ponds, featuring vibrant enamel layers and a central gold bud."
    },
    { 
        id: 102, 
        title: "Solitaire Halo Diamond Ring", 
        hindiTitle: "सॉलिटेयर डायमंड रिंग",
        price: "85,000", 
        category: "Ladies Ring", 
        purity: "18K Gold · IGI Certified",
        weight: "3.20g",
        making: "Included",
        image: "https://images.unsplash.com/photo-1599643478518-17488fbbcd75?auto=format&fit=crop&q=80&w=700", 
        tag: "Solitaire",
        description: "0.60 Carat central brilliant cut solitaire surrounded by a shimmering halo of natural diamonds."
    },

    // GENTS RINGS & ACCESSORIES
    { 
        id: 201, 
        title: "Lion Head Maharaja Signet", 
        hindiTitle: "सिंह मुखी महाराजा अंगूठी",
        price: "58,000", 
        category: "Gents Ring", 
        purity: "22K 916 Hallmark",
        weight: "8.50g",
        making: "7%",
        image: "https://images.unsplash.com/photo-1622398925373-3f91b1e275f5?auto=format&fit=crop&q=80&w=700", 
        tag: "Bold",
        description: "Substantial solid 22K signet ring with sculpted lion head symbolising royal courage and stature."
    },
    { 
        id: 202, 
        title: "Navratna Vedic Astrological Ring", 
        hindiTitle: "नवरत्न वैदिक अंगूठी",
        price: "46,000", 
        category: "Gents Ring", 
        purity: "22K 916 Hallmark",
        weight: "6.80g",
        making: "8%",
        image: "https://images.unsplash.com/photo-1617112028246-0c9cb6b7b51c?auto=format&fit=crop&q=80&w=700", 
        tag: "Astrological",
        description: "Set with nine consecrated natural Vedic planetary gemstones to channel planetary harmony."
    },

    // BRACELETS & KANGANS
    { 
        id: 301, 
        title: "Filigree Royal Gold Kangan Pair", 
        hindiTitle: "बारीक जालीदार सोने के कंगन",
        price: "2,20,000", 
        category: "Bracelets", 
        purity: "22K 916 Hallmark",
        weight: "34.00g",
        making: "8%",
        image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=700", 
        tag: "Wedding",
        description: "Fine jaali filigree pair with classic screw lock for easy elegance and heritage weight."
    },
    { 
        id: 302, 
        title: "Rose Gold Tennis Diamond Bracelet", 
        hindiTitle: "रोज गोल्ड डायमंड ब्रेसलेट",
        price: "1,45,000", 
        category: "Bracelets", 
        purity: "18K Rose Gold · IGI",
        weight: "9.50g",
        making: "Included",
        image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=700", 
        tag: "Luxe",
        description: "A continuous ribbon of sparkling round brilliant diamonds set in lustrous 18K rose gold."
    },

    // CHAINS & MANGALSUTRAS
    { 
        id: 401, 
        title: "Rudraksha 22K Gold Chain", 
        hindiTitle: "रुद्राक्ष स्वर्ण कंठी माला",
        price: "88,000", 
        category: "Chains", 
        purity: "22K 916 Hallmark",
        weight: "13.20g",
        making: "6%",
        image: "https://images.unsplash.com/photo-1596906263051-93c4c9693994?auto=format&fit=crop&q=80&w=700", 
        tag: "Spiritual",
        description: "Panchmukhi natural Rudraksha beads encased in pure hallmarked gold caps and interlinked chain."
    },
    { 
        id: 402, 
        title: "Heritage Vati Mangalsutra", 
        hindiTitle: "पारंपरिक दो वाटी मंगलसूत्र",
        price: "65,000", 
        category: "Chains", 
        purity: "22K 916 Hallmark",
        weight: "9.80g",
        making: "7%",
        image: "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?auto=format&fit=crop&q=80&w=700", 
        tag: "Auspicious",
        description: "Sacred twin gold Vati cups with black beads hand-threaded on pure silk thread and gold links."
    }
];

const CATEGORIES = ["All", "Bridal Sets", "Ladies Ring", "Gents Ring", "Bracelets", "Chains"];
const PURITY_FILTERS = ["All", "22K 916", "18K", "Solitaire"];

export default function Shop() {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedPurity, setSelectedPurity] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState('featured');

    const filteredCatalogue = useMemo(() => {
        return FULL_CATALOGUE.filter((item) => {
            const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
            const matchesPurity = selectedPurity === 'All' || item.purity.includes(selectedPurity);
            const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                  item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                  (item.hindiTitle && item.hindiTitle.includes(searchQuery));
            return matchesCategory && matchesPurity && matchesSearch;
        }).sort((a, b) => {
            const numA = parseInt(a.price.replace(/,/g, ''), 10);
            const numB = parseInt(b.price.replace(/,/g, ''), 10);
            if (sortBy === 'low-high') return numA - numB;
            if (sortBy === 'high-low') return numB - numA;
            return a.id - b.id;
        });
    }, [selectedCategory, selectedPurity, searchQuery, sortBy]);

    return (
        <div className="bg-[#FAF7F2] text-[#270611] min-h-screen py-12 md:py-16 font-sans">
            <div className="container mx-auto px-4 md:px-8">
                
                {/* Editorial Title Banner */}
                <div className="text-center max-w-2xl mx-auto mb-12">
                    <span className="text-[10px] uppercase font-bold tracking-[0.35em] text-[#6B0E2A]">
                        Atelier Catalogue · शाही आभूषण संग्रह
                    </span>
                    <h1 className="font-serif text-3xl md:text-5xl text-[#270611] mt-2 font-normal">
                        Royal Masterpieces
                    </h1>
                    <div className="ornament-divider">
                        <span className="w-2 h-2 rotate-45 bg-[#C5A059]"></span>
                    </div>
                    <p className="text-xs md:text-sm text-gray-600">
                        Explore handcrafted jewellery certified by the Bureau of Indian Standards (BIS 916), accompanied by clear weight &amp; making charges transparency.
                    </p>
                </div>

                {/* Filter and Search Bar */}
                <div className="bg-white p-4 md:p-6 border border-[#C5A059]/30 mb-10 shadow-sm">
                    <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
                        
                        {/* Search Input */}
                        <div className="relative w-full md:w-80">
                            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search by name, stone, style..."
                                className="w-full pl-9 pr-3 py-2 text-xs border border-[#C5A059]/40 bg-[#FAF7F2] text-[#270611] focus:outline-none focus:border-[#6B0E2A]"
                            />
                            {searchQuery && (
                                <button 
                                    onClick={() => setSearchQuery('')}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black"
                                >
                                    <X size={14} />
                                </button>
                            )}
                        </div>

                        {/* Sort Dropdown */}
                        <div className="flex items-center gap-3 w-full md:w-auto justify-end">
                            <span className="text-[10px] uppercase tracking-wider text-gray-500 font-semibold">
                                Sort by:
                            </span>
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="border border-[#C5A059]/40 bg-[#FAF7F2] text-xs px-3 py-2 text-[#270611] focus:outline-none focus:border-[#6B0E2A]"
                            >
                                <option value="featured">Featured Collection</option>
                                <option value="low-high">Price: Low to High</option>
                                <option value="high-low">Price: High to Low</option>
                            </select>
                        </div>

                    </div>

                    {/* Category Buttons */}
                    <div className="mt-4 pt-4 border-t border-[#C5A059]/20 flex flex-wrap gap-2 items-center">
                        <span className="text-[10px] uppercase tracking-widest text-[#6B0E2A] font-bold mr-2">
                            Category:
                        </span>
                        {CATEGORIES.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`text-[11px] px-3 py-1.5 uppercase tracking-wider transition-all border ${
                                    selectedCategory === cat
                                        ? 'bg-[#6B0E2A] text-white border-[#6B0E2A] font-bold shadow-xs'
                                        : 'bg-[#FAF7F2] text-[#270611] border-[#C5A059]/30 hover:border-[#C5A059]'
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* Purity Filter Buttons */}
                    <div className="mt-3 flex flex-wrap gap-2 items-center">
                        <span className="text-[10px] uppercase tracking-widest text-[#6B0E2A] font-bold mr-2">
                            Purity:
                        </span>
                        {PURITY_FILTERS.map(pur => (
                            <button
                                key={pur}
                                onClick={() => setSelectedPurity(pur)}
                                className={`text-[10px] px-2.5 py-1 uppercase tracking-wider transition-all border ${
                                    selectedPurity === pur
                                        ? 'bg-[#270611] text-[#EAD8B1] border-[#C5A059] font-bold'
                                        : 'bg-white text-gray-600 border-gray-200 hover:border-[#C5A059]'
                                }`}
                            >
                                {pur}
                            </button>
                        ))}
                    </div>

                </div>

                {/* Product Results */}
                <div className="mb-6 flex justify-between items-center text-xs text-gray-500">
                    <span>Showing <strong>{filteredCatalogue.length}</strong> Masterpieces</span>
                    {(selectedCategory !== 'All' || selectedPurity !== 'All' || searchQuery) && (
                        <button
                            onClick={() => { setSelectedCategory('All'); setSelectedPurity('All'); setSearchQuery(''); }}
                            className="text-[#6B0E2A] underline font-bold uppercase tracking-wider text-[10px]"
                        >
                            Reset All Filters
                        </button>
                    )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {filteredCatalogue.map((product) => (
                        <ProductCard key={product.id} {...product} />
                    ))}
                </div>

                {filteredCatalogue.length === 0 && (
                    <div className="bg-white p-12 text-center border border-[#C5A059]/30 my-8">
                        <Sparkles size={32} className="text-[#C5A059] mx-auto mb-3" />
                        <h3 className="font-serif text-2xl text-[#270611]">No matching designs found</h3>
                        <p className="text-xs text-gray-500 mt-2 mb-4">
                            Try adjusting your filters, or contact our bespoke atelier for custom jewellery design.
                        </p>
                        <button
                            onClick={() => { setSelectedCategory('All'); setSelectedPurity('All'); setSearchQuery(''); }}
                            className="bg-[#6B0E2A] text-white px-6 py-2.5 text-xs uppercase tracking-widest font-bold"
                        >
                            View All Masterpieces
                        </button>
                    </div>
                )}

            </div>
        </div>
    );
}
