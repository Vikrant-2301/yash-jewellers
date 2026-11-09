"use client";

import { useState } from 'react';
import { MessageCircle, Eye, ShieldCheck, Sparkles, X, ChevronRight } from 'lucide-react';

export default function ProductCard({ 
    id, 
    title, 
    hindiTitle,
    image, 
    category, 
    price, 
    tag, 
    purity = "22K 916 Hallmark", 
    weight = "18.50g",
    making = "8%",
    description = "Masterfully handcrafted by heritage karigars with 100% BIS Hallmarked gold, flawless gemstone settings, and timeless Indian symmetry."
}) {
    const [showQuickView, setShowQuickView] = useState(false);

    // WhatsApp Direct Inquiry
    const handleInquiry = (e) => {
        if (e) e.stopPropagation();
        const safePrice = price || "On Request";
        const safeCategory = category || "Jewellery";
        const safeTitle = title || "Product";

        const phoneNumber = "918881121119";
        const message = `Namaste Yash Jewellers, I am interested in inquiring about the "${safeTitle}" (${safeCategory}, Purity: ${purity}, Price: ₹${safePrice}). Kindly share detailed specifications and store availability.`;

        const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
    };

    return (
        <>
            <div className="group bg-[#FAF7F2] rounded-none overflow-hidden transition-all duration-500 border border-[#C5A059]/25 hover:border-[#C5A059] hover:shadow-[0_15px_35px_rgba(39,6,17,0.12)] flex flex-col justify-between">
                
                {/* Image Container with Editorial Frame */}
                <div className="relative aspect-[3/4] overflow-hidden bg-[#270611]/5 cursor-pointer" onClick={() => setShowQuickView(true)}>
                    <img
                        src={image}
                        alt={title}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                    />

                    {/* Subtle Antique Gold Border Inset */}
                    <div className="absolute inset-2 border border-[#C5A059]/30 pointer-events-none transition-colors group-hover:border-[#C5A059]/70"></div>

                    {/* Tag / Ribbon */}
                    {tag && (
                        <span className="absolute top-4 left-4 bg-[#6B0E2A] text-[#FAF7F2] text-[9px] font-bold px-3 py-1 uppercase tracking-[0.2em] shadow-md border border-[#C5A059]/40">
                            {tag}
                        </span>
                    )}

                    {/* Purity Badge */}
                    <div className="absolute top-4 right-4 bg-[#270611]/85 backdrop-blur-xs text-[#EAD8B1] text-[9px] font-semibold px-2.5 py-1 tracking-wider border border-[#C5A059]/30 flex items-center gap-1">
                        <ShieldCheck size={11} className="text-[#DFBE7A]" />
                        <span>{purity.split(" ")[0]}</span>
                    </div>

                    {/* Quick View Hover Reveal */}
                    <div className="absolute inset-0 bg-[#270611]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                        <button
                            onClick={(e) => { e.stopPropagation(); setShowQuickView(true); }}
                            className="bg-[#FAF7F2] text-[#270611] px-4 py-2 text-[10px] uppercase font-bold tracking-widest flex items-center gap-1.5 shadow-lg hover:bg-[#F3E8D0] transition-colors"
                        >
                            <Eye size={13} className="text-[#6B0E2A]" />
                            <span>Quick View</span>
                        </button>
                    </div>
                </div>

                {/* Content Section */}
                <div className="p-5 text-center flex flex-col justify-between flex-grow bg-gradient-to-b from-[#FAF7F2] to-[#F3E8D0]/40">
                    <div>
                        <div className="flex items-center justify-center gap-2 mb-1.5">
                            <span className="h-px w-3 bg-[#C5A059]/60" />
                            <p className="text-[10px] text-[#6B0E2A] font-bold uppercase tracking-[0.25em]">
                                {category}
                            </p>
                            <span className="h-px w-3 bg-[#C5A059]/60" />
                        </div>

                        <h3 className="font-serif text-lg text-[#270611] group-hover:text-[#6B0E2A] transition-colors line-clamp-1 font-medium">
                            {title}
                        </h3>
                        
                        {hindiTitle && (
                            <p className="text-xs text-[#8C6D38] font-serif italic mt-0.5">
                                {hindiTitle}
                            </p>
                        )}

                        <p className="text-xs text-[#6B0E2A]/70 mt-1">
                            Approx. {weight} · {purity}
                        </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-[#C5A059]/20">
                        <div className="mb-3">
                            <p className="text-xs uppercase tracking-wider text-gray-500 text-[10px]">Landed Price (Incl. GST)</p>
                            <p className="text-[#270611] font-serif text-xl font-bold tracking-tight">
                                ₹ {price}
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                            <button
                                onClick={() => setShowQuickView(true)}
                                className="border border-[#C5A059]/60 text-[#270611] hover:bg-[#F3E8D0] py-2 text-[10px] font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-1"
                            >
                                Details
                            </button>
                            <button
                                onClick={handleInquiry}
                                className="bg-[#6B0E2A] hover:bg-[#4E0A1E] text-[#FAF7F2] py-2 text-[10px] font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 border border-[#C5A059]/40"
                            >
                                <MessageCircle size={12} className="text-[#C5A059]" />
                                Inquiry
                            </button>
                        </div>
                    </div>

                </div>

            </div>

            {/* Quick View Modal */}
            {showQuickView && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#270611]/80 backdrop-blur-sm">
                    <div className="relative bg-[#FAF7F2] max-w-2xl w-full border border-[#C5A059] shadow-2xl p-6 md:p-8 overflow-hidden">
                        
                        <button 
                            onClick={() => setShowQuickView(false)}
                            className="absolute top-4 right-4 text-[#270611] hover:text-[#6B0E2A] p-1.5 border border-[#C5A059]/40"
                        >
                            <X size={20} />
                        </button>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                            <div className="relative aspect-[3/4] overflow-hidden border border-[#C5A059]/40">
                                <img src={image} alt={title} className="w-full h-full object-cover" />
                                <div className="absolute top-3 left-3 bg-[#6B0E2A] text-white text-[9px] font-bold px-2.5 py-1 tracking-widest uppercase">
                                    100% BIS Certified
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <span className="text-[10px] uppercase tracking-[0.25em] text-[#6B0E2A] font-bold">
                                        {category} · Yash Heritage
                                    </span>
                                    <h2 className="font-serif text-2xl text-[#270611] font-semibold mt-1">
                                        {title}
                                    </h2>
                                    {hindiTitle && (
                                        <p className="text-sm font-serif text-[#8C6D38] italic">
                                            {hindiTitle}
                                        </p>
                                    )}
                                </div>

                                <div className="p-3 bg-[#F3E8D0]/50 border border-[#C5A059]/30 space-y-1.5 text-xs text-[#270611]">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Purity Standard:</span>
                                        <span className="font-bold text-[#6B0E2A]">{purity}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Approx. Weight:</span>
                                        <span className="font-bold">{weight}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Making Charges:</span>
                                        <span className="font-bold">{making}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Certification:</span>
                                        <span className="font-bold text-emerald-800">Govt. BIS Hallmark</span>
                                    </div>
                                </div>

                                <p className="text-xs text-gray-700 leading-relaxed font-sans">
                                    {description}
                                </p>

                                <div className="pt-2">
                                    <p className="text-[10px] uppercase tracking-wider text-gray-500">Estimated Landed Price</p>
                                    <p className="font-serif text-3xl font-bold text-[#6B0E2A]">
                                        ₹ {price}
                                    </p>
                                    <p className="text-[10px] text-gray-500 italic mt-0.5">
                                        *Final amount may vary marginally based on live bullion spot rate on invoice date.
                                    </p>
                                </div>

                                <div className="flex gap-3 pt-2">
                                    <button
                                        onClick={handleInquiry}
                                        className="flex-1 bg-[#6B0E2A] hover:bg-[#4E0A1E] text-white py-3 px-4 text-xs font-bold uppercase tracking-widest border border-[#C5A059]/50 flex items-center justify-center gap-2"
                                    >
                                        <MessageCircle size={15} className="text-[#C5A059]" />
                                        Inquire on WhatsApp
                                    </button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            )}
        </>
    );
}
