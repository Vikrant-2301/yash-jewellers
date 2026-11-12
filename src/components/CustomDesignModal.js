"use client";

import { useState } from 'react';
import { 
    X, 
    Upload, 
    Sparkles, 
    ShieldCheck, 
    MessageSquare, 
    Phone, 
    Clock, 
    Check, 
    Gem,
    ArrowRight,
    Camera
} from 'lucide-react';
import { useRates } from '@/src/context/RatesContext';
import { BUSINESS_DETAILS } from '@/src/config/business';

export default function CustomDesignModal({ isOpen, onClose }) {
    const { rates, formatINR, calculateJewelleryPrice } = useRates();

    const [category, setCategory] = useState('Haar Set');
    const [weight, setWeight] = useState('25');
    const [purity, setPurity] = useState('22K 916 Hallmark');
    const [customerName, setCustomerName] = useState('');
    const [notes, setNotes] = useState('');
    const [uploadedFileName, setUploadedFileName] = useState('');
    const [imagePreview, setImagePreview] = useState(null);

    if (!isOpen) return null;

    // Approximate cost calculation based on live rates
    const livePricing = calculateJewelleryPrice(parseFloat(weight) || 10, purity, 9, 0);

    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            setUploadedFileName(file.name);
            const reader = new FileReader();
            reader.onload = (event) => {
                setImagePreview(event.target?.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSendWhatsApp = () => {
        const greeting = customerName ? `नमस्ते यश ज्वेलर्स! मेरा नाम ${customerName} है।` : "नमस्ते यश ज्वेलर्स!";
        const message = `${greeting}
मेरे पास एक आभूषण (Jewellery) का डिज़ाइन/फोटो है जिसे मैं आपके कुशल कारीगरों से बनवाना चाहता/चाहती हूँ:

• आभूषण श्रेणी: ${category}
• वांछित वजन: ${weight} ग्राम
• शुद्धता मानक: ${purity}
• अनुमानित लाइव बजट: ₹${livePricing.formattedPrice}
${notes ? `• विशेष निर्देश: ${notes}` : ''}
${uploadedFileName ? `• डिज़ाइन फोटो: (संलग्न फोटो देखें)` : ''}

कृपया मुझे इस डिज़ाइन का सटीक वजन, मेकिंग चार्ज और निर्माण का समय बताएं।`;

        const url = `https://wa.me/${BUSINESS_DETAILS.whatsappClean}?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-[#1F040D] border-2 border-[#C5A059] max-w-2xl w-full p-6 md:p-8 text-left relative shadow-2xl overflow-y-auto max-h-[92vh]">
                
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-[#FAF7F2]/60 hover:text-white p-1"
                >
                    <X size={22} />
                </button>

                {/* Header */}
                <div className="text-center max-w-lg mx-auto mb-6">
                    <div className="inline-flex items-center gap-2 text-[#DFBE7A] text-[10px] uppercase font-bold tracking-[0.3em] mb-1.5">
                        <Sparkles size={13} />
                        <span>Bespoke Karigari · कस्टम जेवर निर्माण</span>
                    </div>
                    <h2 className="font-serif text-2xl md:text-3xl text-white font-normal">
                        Send Your Jewellery Design
                    </h2>
                    <p className="font-serif text-xs md:text-sm text-[#C5A059] italic mt-1">
                        "आप कोई भी डिज़ाइन या फोटो भेजें, हम उसे आपके पसंदीदा वजन और बजट में तैयार करेंगे"
                    </p>
                    <p className="text-[11px] text-[#EAD8B1]/75 mt-2 font-sans leading-relaxed">
                        Seen a gorgeous necklace or ring on Instagram, Pinterest, or in a family album? Upload or describe it below. Our Chaubepur master karigars will craft it in pure 100% BIS Hallmarked (916 HUID) gold or 99+ silver.
                    </p>
                </div>

                {/* Form Body */}
                <div className="space-y-4 text-xs">
                    
                    {/* Category & Purity */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-[10px] uppercase font-bold text-[#EAD8B1] tracking-wider mb-1">
                                Jewellery Type (आभूषण प्रकार)
                            </label>
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="w-full bg-[#270611] text-white border border-[#C5A059]/40 p-2.5 text-xs focus:outline-none focus:border-[#C5A059]"
                            >
                                <option value="Haar Set">Haar Set / Bridal Necklace (शाही हार)</option>
                                <option value="Ladies Rings Design">Ladies Rings Design (लेडीज अंगूठी)</option>
                                <option value="Gents Ring Design">Gents Ring Design (जेंट्स अंगूठी)</option>
                                <option value="Bracelets">Bracelets &amp; Kangans (कंगन व ब्रेसलेट)</option>
                                <option value="Chains Design">Chains Design (सोने की चेन)</option>
                                <option value="Earrings">Earrings &amp; Jhumkas (झुमकी व टॉप्स)</option>
                                <option value="Silver">Pure Silver Articles &amp; Payal (चांदी)</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-[10px] uppercase font-bold text-[#EAD8B1] tracking-wider mb-1">
                                Gold Purity (शुद्धता मानक)
                            </label>
                            <select
                                value={purity}
                                onChange={(e) => setPurity(e.target.value)}
                                className="w-full bg-[#270611] text-white border border-[#C5A059]/40 p-2.5 text-xs focus:outline-none focus:border-[#C5A059]"
                            >
                                <option value="22K 916 Hallmark">22K 916 BIS Hallmark (आभूषण मानक)</option>
                                <option value="18K 750 Diamond">18K 750 (डायमंड व स्टोन सेटिंग)</option>
                                <option value="14K 585 Modern">14K 585 (लाइटवेट मॉडर्न वियर)</option>
                                <option value="24K 999 Pure">24K 999 (शुद्ध 24 कैरट)</option>
                                <option value="Silver 999 Fine">Silver 999 (शुद्ध चांदी 99+)</option>
                            </select>
                        </div>
                    </div>

                    {/* Desired Gold Weight & Quick Select Pills */}
                    <div>
                        <div className="flex justify-between items-center mb-1">
                            <label className="text-[10px] uppercase font-bold text-[#EAD8B1] tracking-wider">
                                Desired Weight in Grams (अपेक्षित वजन ग्राम में)
                            </label>
                            <span className="text-[10px] text-[#C5A059] font-mono">
                                Approx. {weight}g
                            </span>
                        </div>
                        <input
                            type="number"
                            step="0.5"
                            min="1"
                            max="500"
                            value={weight}
                            onChange={(e) => setWeight(e.target.value)}
                            className="w-full bg-[#270611] text-white border border-[#C5A059]/40 p-2.5 text-xs font-mono focus:outline-none focus:border-[#C5A059]"
                            placeholder="Enter grams (e.g. 15)"
                        />
                        {/* Quick weight selector pills */}
                        <div className="flex flex-wrap gap-2 mt-2">
                            {['4g', '8g', '15g', '25g', '40g', '60g', '100g'].map((pill) => (
                                <button
                                    key={pill}
                                    type="button"
                                    onClick={() => setWeight(pill.replace('g', ''))}
                                    className={`px-2.5 py-1 text-[10px] font-mono border transition-colors ${
                                        weight === pill.replace('g', '')
                                            ? 'bg-[#C5A059] text-[#270611] font-bold border-[#C5A059]'
                                            : 'bg-[#270611] text-[#EAD8B1] border-[#C5A059]/30 hover:border-[#C5A059]'
                                    }`}
                                >
                                    {pill}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Photo Upload Area */}
                    <div>
                        <label className="block text-[10px] uppercase font-bold text-[#EAD8B1] tracking-wider mb-1">
                            Upload Design Photo / Screenshot (डिज़ाइन फोटो)
                        </label>
                        <div className="relative border-2 border-dashed border-[#C5A059]/50 hover:border-[#C5A059] p-4 text-center bg-[#270611]/60 transition-colors cursor-pointer">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                            />
                            {imagePreview ? (
                                <div className="flex items-center justify-center gap-3">
                                    <img src={imagePreview} alt="Preview" className="w-16 h-16 object-cover border border-[#C5A059]" />
                                    <div className="text-left">
                                        <p className="font-bold text-white text-xs">{uploadedFileName}</p>
                                        <p className="text-[10px] text-emerald-400">Photo attached! Click to change</p>
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-1">
                                    <Camera size={24} className="text-[#C5A059] mx-auto" />
                                    <p className="text-white text-xs font-semibold">Click to choose design photo or drop image here</p>
                                    <p className="text-[10px] text-[#EAD8B1]/70">PNG, JPG, JPEG, screenshot or sketch</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Customer Name & Notes */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-[10px] uppercase font-bold text-[#EAD8B1] tracking-wider mb-1">
                                Your Name (आपका नाम - Optional)
                            </label>
                            <input
                                type="text"
                                value={customerName}
                                onChange={(e) => setCustomerName(e.target.value)}
                                className="w-full bg-[#270611] text-white border border-[#C5A059]/40 p-2.5 text-xs focus:outline-none"
                                placeholder="e.g. Priya Sharma"
                            />
                        </div>

                        <div>
                            <label className="block text-[10px] uppercase font-bold text-[#EAD8B1] tracking-wider mb-1">
                                Special Notes (कोई विशेष निर्देश)
                            </label>
                            <input
                                type="text"
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                                className="w-full bg-[#270611] text-white border border-[#C5A059]/40 p-2.5 text-xs focus:outline-none"
                                placeholder="e.g. Need matching tops, for wedding"
                            />
                        </div>
                    </div>

                    {/* Real-time Estimated Live Cost Breakdown */}
                    <div className="bg-[#270611] p-4 border border-[#C5A059]/40 space-y-1.5 text-xs">
                        <div className="flex justify-between text-[#EAD8B1]/80">
                            <span>Today's Live Rate ({purity.split(" ")[0]}):</span>
                            <span className="font-mono text-white font-semibold">₹{formatINR(livePricing.ratePerGram)} / ग्राम</span>
                        </div>
                        <div className="flex justify-between text-[#EAD8B1]/80">
                            <span>Estimated Metal Value ({weight}g):</span>
                            <span className="font-mono text-white font-semibold">₹{formatINR(livePricing.metalValue)}</span>
                        </div>
                        <div className="flex justify-between text-[#EAD8B1]/80">
                            <span>Approx. Karigari Making (~{livePricing.makingPct}%):</span>
                            <span className="font-mono text-white font-semibold">₹{formatINR(livePricing.makingAmount)}</span>
                        </div>
                        <div className="flex justify-between text-[#EAD8B1]/80">
                            <span>Statutory GST (3%):</span>
                            <span className="font-mono text-white font-semibold">₹{formatINR(livePricing.gstAmount)}</span>
                        </div>
                        <div className="h-px bg-[#C5A059]/30 my-1" />
                        <div className="flex justify-between items-center text-sm font-serif">
                            <span className="text-[#C5A059] font-bold">Estimated Live Budget (अनुमानित लागत):</span>
                            <span className="font-mono text-white font-bold text-base md:text-lg">
                                ₹{livePricing.formattedPrice}
                            </span>
                        </div>
                    </div>

                </div>

                {/* Actions */}
                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                    <button
                        onClick={handleSendWhatsApp}
                        className="flex-1 bg-[#25D366] hover:bg-[#20ba59] text-white py-3 px-4 text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 shadow-lg"
                    >
                        <MessageSquare size={16} />
                        <span>Send Design on WhatsApp ({BUSINESS_DETAILS.phoneFormatted})</span>
                    </button>
                    <a
                        href={`tel:${BUSINESS_DETAILS.phoneClean}`}
                        className="bg-[#6B0E2A] hover:bg-[#851336] text-white py-3 px-6 text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 border border-[#C5A059]/40"
                    >
                        <Phone size={14} />
                        <span>Call Karigar Desk</span>
                    </a>
                </div>

                {/* Footer Assurance */}
                <div className="mt-4 text-center text-[10px] text-[#EAD8B1]/65 flex items-center justify-center gap-3">
                    <span className="flex items-center gap-1">
                        <ShieldCheck size={12} className="text-[#C5A059]" /> 100% BIS Hallmarked HUID
                    </span>
                    <span>•</span>
                    <span>Accurate Gram Weight Guaranteed</span>
                    <span>•</span>
                    <span>Chaubepur, Kanpur Showroom</span>
                </div>

            </div>
        </div>
    );
}

