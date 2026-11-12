"use client";

import { useState, useEffect } from 'react';
import { 
    RefreshCw, 
    ShieldCheck, 
    Calculator, 
    Phone, 
    MessageSquare, 
    X, 
    Sparkles, 
    MapPin, 
    Check, 
    Clock, 
    ExternalLink,
    TrendingUp
} from 'lucide-react';
import { useRates } from '@/src/context/RatesContext';
import { BUSINESS_DETAILS } from '@/src/config/business';

export default function RateCard() {
    const { data, rates, spot, loading, refreshRates, formatINR } = useRates();
    const [activeTab, setActiveTab] = useState('gold');
    const [selectedItem, setSelectedItem] = useState(null);
    const [selectedQtyGrams, setSelectedQtyGrams] = useState(10);
    const [showCalculatorModal, setShowCalculatorModal] = useState(false);

    // Calculator states
    const [calcPurity, setCalcPurity] = useState('22k');
    const [calcGrams, setCalcGrams] = useState(10);
    const [calcMakingRate, setCalcMakingRate] = useState(8);

    // Dynamic White-to-Green/Red transition states
    const [tickStates, setTickStates] = useState({});

    // Live tick simulation for visual fluidity between websocket/polling refreshes
    useEffect(() => {
        const interval = setInterval(() => {
            // Randomly flash a subtle rate tick (1-2 ₹ oscillation)
            const keys = ['G_24K', 'G_22K', 'G_18K', 'G_14K', 'S_999'];
            const targetKey = keys[Math.floor(Math.random() * keys.length)];
            const isUp = Math.random() > 0.45;
            setTickStates(s => ({ ...s, [targetKey]: isUp ? 'tick-up' : 'tick-down' }));
            setTimeout(() => {
                setTickStates(s => {
                    const copy = { ...s };
                    delete copy[targetKey];
                    return copy;
                });
            }, 1200);
        }, 3200);

        return () => clearInterval(interval);
    }, []);

    // Calculator Rate Logic
    const getPerGramRate = (purity) => {
        if (!rates) return 12500;
        if (purity === '24k') return rates.perGram24k || Math.round(rates.gold24k / 10);
        if (purity === '22k') return rates.perGram22k || Math.round(rates.gold22k / 10);
        if (purity === '18k') return rates.perGram18k || Math.round(rates.gold18k / 10);
        if (purity === '14k') return rates.perGram14k || Math.round(rates.gold14k / 10);
        if (purity === 'silver') return rates.perGramSilver || +(rates.silver / 1000).toFixed(2);
        return rates.perGram22k || 12500;
    };

    const calcPerGram = getPerGramRate(calcPurity);
    const calcMetalValue = calcPerGram * (parseFloat(calcGrams) || 0);
    const calcMakingAmount = calcMetalValue * (parseFloat(calcMakingRate) / 100);
    const calcGrandTotal = (calcMetalValue + calcMakingAmount) * 1.03; // Statutory 3% GST

    // Retail commodities list
    const commoditiesList = data?.commodities?.all || [
        {
            id: "G_24K",
            name: "GOLD 24K (999 PURE GOLD)",
            hindiName: "शुद्ध 24 कैरट सोना (999)",
            desc: "100% Fine Gold • International Spot Benchmark",
            purity: "24K 999",
            unit: "10 GM",
            rate10g: rates?.gold24k || 138250,
            rate1g: rates?.perGram24k || 13825,
            high: Math.round((rates?.gold24k || 138250) * 1.01),
            low: Math.round((rates?.gold24k || 138250) * 0.99),
            isJewelleryStandard: false
        },
        {
            id: "G_22K",
            name: "GOLD 22K (916 BIS HALLMARK)",
            hindiName: "22 कैरट हॉलमार्क जेवर (916)",
            desc: "BIS Hallmarked HUID Gold • Official Jewellery Standard",
            purity: "22K 916",
            unit: "10 GM",
            rate10g: rates?.gold22k || 125015,
            rate1g: rates?.perGram22k || 12502,
            high: Math.round((rates?.gold22k || 125015) * 1.01),
            low: Math.round((rates?.gold22k || 125015) * 0.99),
            isJewelleryStandard: true
        },
        {
            id: "G_18K",
            name: "GOLD 18K (750 DIAMOND JEWELLERY)",
            hindiName: "18 कैरट डायमंड आभूषण (750)",
            desc: "BIS Hallmarked 750 Gold • Solitaire & Fine Diamond Mounts",
            purity: "18K 750",
            unit: "10 GM",
            rate10g: rates?.gold18k || 103008,
            rate1g: rates?.perGram18k || 10301,
            high: Math.round((rates?.gold18k || 103008) * 1.01),
            low: Math.round((rates?.gold18k || 103008) * 0.99),
            isJewelleryStandard: false
        },
        {
            id: "G_14K",
            name: "GOLD 14K (585 MODERN WEAR)",
            hindiName: "14 कैरट आधुनिक आभूषण (585)",
            desc: "BIS Hallmarked 585 Gold • Lightweight & Everyday Jewellery",
            purity: "14K 585",
            unit: "10 GM",
            rate10g: rates?.gold14k || 81464,
            rate1g: rates?.perGram14k || 8146,
            high: Math.round((rates?.gold14k || 81464) * 1.01),
            low: Math.round((rates?.gold14k || 81464) * 0.99),
            isJewelleryStandard: false
        },
        {
            id: "S_999",
            name: "SILVER 999 (FINE ORNAMENTS & ARTICLES)",
            hindiName: "शुद्ध चांदी 999 (आभूषण व बर्तन)",
            desc: "Fine Silver 99.9% Purity • Payal, Pooja Utensils & Silver Giftware",
            purity: "Silver 999",
            unit: "1 KG",
            rate10g: Math.round((rates?.silver || 182424) / 100),
            rate1g: rates?.perGramSilver || 182.42,
            rateKg: rates?.silver || 182424,
            high: Math.round((rates?.silver || 182424) * 1.01),
            low: Math.round((rates?.silver || 182424) * 0.99),
            isJewelleryStandard: false
        }
    ];

    const currentDisplayItems = commoditiesList.filter(item => {
        if (activeTab === 'gold') return item.id.startsWith('G_');
        if (activeTab === 'silver') return item.id.startsWith('S_');
        return true;
    });

    const spotGold = spot?.gold || { price: 3950.00, high: 4000.00, low: 3940.00 };
    const spotSilver = spot?.silver || { price: 51.35, high: 52.00, low: 51.00 };
    const spotInr = spot?.inr || { price: 93.97 };

    return (
        <div className="w-full max-w-6xl mx-auto font-sans">
            
            {/* 1. International Spot Ticker Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                
                {/* Spot Gold Card */}
                <div className="bg-[#1F040D] border border-[#C5A059]/40 p-4 md:p-5 relative shadow-md">
                    <div className="flex justify-between items-center mb-1">
                        <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#C5A059]">
                            INTERNATIONAL GOLD (USD)
                        </span>
                        <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span> LIVE SPOT
                        </span>
                    </div>
                    <div className="text-2xl md:text-3xl font-mono font-bold my-1 text-white">
                        <span>${formatINR(spotGold.price)}</span>
                        <span className="text-xs text-[#EAD8B1]/60 font-sans ml-1.5">/ oz</span>
                    </div>
                    <div className="text-[11px] text-[#EAD8B1]/75 font-mono">
                        H: ${spotGold.high} | L: ${spotGold.low}
                    </div>
                </div>

                {/* Spot Silver Card */}
                <div className="bg-[#1F040D] border border-[#C5A059]/40 p-4 md:p-5 relative shadow-md">
                    <div className="flex justify-between items-center mb-1">
                        <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#C5A059]">
                            INTERNATIONAL SILVER (USD)
                        </span>
                        <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span> LIVE SPOT
                        </span>
                    </div>
                    <div className="text-2xl md:text-3xl font-mono font-bold my-1 text-white">
                        <span>${spotSilver.price}</span>
                        <span className="text-xs text-[#EAD8B1]/60 font-sans ml-1.5">/ oz</span>
                    </div>
                    <div className="text-[11px] text-[#EAD8B1]/75 font-mono">
                        H: ${spotSilver.high} | L: ${spotSilver.low}
                    </div>
                </div>

                {/* Spot USD/INR Card */}
                <div className="bg-[#1F040D] border border-[#C5A059]/40 p-4 md:p-5 relative shadow-md">
                    <div className="flex justify-between items-center mb-1">
                        <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#C5A059]">
                            USD / INR (₹)
                        </span>
                        <span className="text-[10px] text-[#EAD8B1]/80 font-mono">Forex Parity</span>
                    </div>
                    <div className="text-2xl md:text-3xl font-mono font-bold my-1 text-white">
                        <span>₹{spotInr.price}</span>
                    </div>
                    <div className="text-[11px] text-[#EAD8B1]/75">
                        Reserve Bank &amp; Custom Tariff Reference
                    </div>
                </div>

            </div>

            {/* 2. Running Notice Bar (Clean Retail Jewellery Notice) */}
            <div className="bg-[#270611] border border-[#C5A059]/40 py-2.5 px-4 mb-6 flex items-center gap-3 overflow-hidden shadow-sm">
                <span className="bg-[#6B0E2A] text-white text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 border border-[#C5A059]/40 shrink-0">
                    TODAY'S RATES
                </span>
                <div className="overflow-hidden whitespace-nowrap text-xs text-[#EAD8B1]">
                    <div className="inline-block animate-[marquee_25s_linear_infinite]">
                        यश ज्वेलर्स (चौबेपुर, कानपुर) • 100% बीआईएस हॉलमार्क (HUID) शुद्धता • आज का आधिकारिक लाइव गोल्ड रेट • 22K आभूषण मानक • सभी आभूषणों का मूल्य पारदर्शी रीति से तय किया जाता है • शोरूम पता: पिपरी रोड, नरसिंह मंदिर के पास, चौबेपुर, कानपुर • फोन/व्हाट्सएप: {BUSINESS_DETAILS.phoneFormatted}
                    </div>
                </div>
            </div>

            {/* 3. Main Live Rates Board Container */}
            <div className="bg-[#270611] border border-[#C5A059]/40 shadow-2xl overflow-hidden">
                
                {/* Header Strip with Actions */}
                <div className="p-4 md:p-6 bg-[#38081A] border-b border-[#C5A059]/30 flex flex-wrap justify-between items-center gap-3">
                    <div>
                        <div className="flex items-center gap-2">
                            <h2 className="font-serif text-xl md:text-2xl text-[#FAF7F2] font-semibold">
                                Yash Jewellers · Live Daily Rates
                            </h2>
                            <span className="inline-flex items-center gap-1 text-[9px] font-bold px-2 py-0.5 bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span> LIVE STREAM
                            </span>
                        </div>
                        <p className="text-[11px] text-[#C5A059] font-serif mt-0.5">
                            चौबेपुर, कानपुर प्रतिष्ठान • All Rates in Pure White • Turns Green/Red on Tick • Statutory Customs 6% + GST 3% Included
                        </p>
                    </div>

                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setShowCalculatorModal(true)}
                            className="inline-flex items-center gap-1.5 text-xs text-[#FAF7F2] bg-[#1F040D] border border-[#C5A059]/40 px-3 py-1.5 hover:bg-[#C5A059]/20 transition-colors"
                        >
                            <Calculator size={13} className="text-[#DFBE7A]" />
                            <span>Ornament Estimator</span>
                        </button>
                        <button
                            onClick={refreshRates}
                            className="inline-flex items-center gap-1 text-xs text-[#270611] bg-gradient-to-r from-[#ECC880] to-[#C5A059] px-3.5 py-1.5 font-bold uppercase tracking-wider hover:opacity-90"
                        >
                            <RefreshCw size={11} className={loading ? "animate-spin" : ""} />
                            <span>Refresh</span>
                        </button>
                    </div>
                </div>

                {/* 4. Rates Navigation Tabs */}
                <div className="grid grid-cols-3 bg-[#1F040D] border-b border-[#C5A059]/20 text-xs">
                    {[
                        { id: 'gold', label: '🥇 GOLD RATES', hi: 'सोने का भाव' },
                        { id: 'silver', label: '🥈 SILVER RATES', hi: 'चांदी का भाव' },
                        { id: 'calc', label: '⚡ PRICE CALCULATOR', hi: 'जेवर कैलकुलेटर' },
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`py-3.5 px-2 text-center transition-all border-b-2 flex flex-col items-center justify-center gap-0.5 ${
                                activeTab === tab.id
                                    ? 'border-[#C5A059] bg-[#3C081A] text-white font-bold'
                                    : 'border-transparent text-[#FAF7F2]/60 hover:text-white hover:bg-[#270611]'
                            }`}
                        >
                            <span className="uppercase tracking-wider text-[11px] md:text-xs">{tab.label}</span>
                            <span className="text-[10px] text-[#C5A059] font-serif italic hidden sm:inline">{tab.hi}</span>
                        </button>
                    ))}
                </div>

                {/* 5. Tab Content: Live Rates Table or Interactive Calculator */}
                <div className="p-4 md:p-6 bg-[#270611]">
                    
                    {activeTab !== 'calc' ? (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-[#C5A059]/30 text-[#C5A059] text-[10px] md:text-xs uppercase tracking-[0.15em]">
                                        <th className="py-3 px-3 font-semibold" style={{ width: '42%' }}>Purity Standard</th>
                                        <th className="py-3 px-3 font-semibold" style={{ width: '25%' }}>Rate / 10 GM (₹)</th>
                                        <th className="py-3 px-3 font-semibold" style={{ width: '20%' }}>Rate / 1 GM (₹)</th>
                                        <th className="py-3 px-3 font-semibold text-right" style={{ width: '13%' }}>Inquiry</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[#C5A059]/15 text-xs md:text-sm">
                                    {currentDisplayItems.map((item) => {
                                        const tickClass = tickStates[item.id] || '';

                                        return (
                                            <tr 
                                                key={item.id} 
                                                onClick={() => setSelectedItem(item)}
                                                className={`hover:bg-[#38081A]/60 transition-colors cursor-pointer group ${
                                                    item.isJewelleryStandard ? 'bg-[#3C081A]/30' : ''
                                                }`}
                                            >
                                                <td className="py-3.5 px-3">
                                                    <div className="flex items-center gap-2">
                                                        <div className="font-bold text-white tracking-wide">
                                                            {item.name}
                                                        </div>
                                                        {item.isJewelleryStandard && (
                                                            <span className="bg-[#C5A059] text-[#270611] text-[9px] font-bold px-1.5 py-0.2 tracking-widest uppercase">
                                                                JEWELLERY BENCHMARK
                                                            </span>
                                                        )}
                                                    </div>
                                                    <div className="text-[11px] text-[#C5A059] font-serif mt-0.5">
                                                        {item.desc}
                                                    </div>
                                                </td>

                                                {/* Rate per 10 Grams */}
                                                <td className="py-3.5 px-3">
                                                    <div>
                                                        <span className={`rate-val font-mono font-bold text-sm md:text-base ${tickClass}`}>
                                                            ₹{formatINR(item.rate10g)}
                                                        </span>
                                                    </div>
                                                    <div className="text-[10px] text-[#EAD8B1]/70 font-mono mt-0.5">
                                                        L: <span className="text-white font-semibold">₹{formatINR(item.low)}</span> | H: <span className="text-white font-semibold">₹{formatINR(item.high)}</span>
                                                    </div>
                                                </td>

                                                {/* Rate per 1 Gram */}
                                                <td className="py-3.5 px-3">
                                                    <div>
                                                        <span className={`rate-val font-mono font-bold text-sm md:text-base ${tickClass}`}>
                                                            ₹{formatINR(item.rate1g)}
                                                        </span>
                                                    </div>
                                                    <div className="text-[10px] text-[#EAD8B1]/65 font-serif mt-0.5">
                                                        प्रति ग्राम
                                                    </div>
                                                </td>

                                                <td className="py-3.5 px-3 text-right">
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setSelectedItem(item);
                                                        }}
                                                        className="bg-[#6B0E2A] hover:bg-[#851336] text-white px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-wider border border-[#C5A059]/40 transition-colors"
                                                    >
                                                        Inquire
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        /* Instant Retail Ornament Price Calculator */
                        <div className="max-w-3xl mx-auto bg-[#1F040D] p-6 border border-[#C5A059]/40">
                            <h3 className="font-serif text-2xl text-white text-center font-medium mb-1">
                                Instant Jewellery Price &amp; Value Estimator
                            </h3>
                            <p className="text-xs text-[#C5A059] text-center font-serif italic mb-6">
                                पारदर्शी मूल्य निर्धारण • Live Rate + Making Charges + 3% GST
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6 text-xs">
                                <div>
                                    <label className="block text-[10px] uppercase text-[#EAD8B1] font-semibold mb-1">
                                        Purity Standard
                                    </label>
                                    <select
                                        value={calcPurity}
                                        onChange={(e) => setCalcPurity(e.target.value)}
                                        className="w-full bg-[#270611] text-white border border-[#C5A059]/40 p-2 text-xs focus:outline-none"
                                    >
                                        <option value="22k">Gold 22K (916) Hallmark Jewellery</option>
                                        <option value="18k">Gold 18K (750) Diamond Mount</option>
                                        <option value="14k">Gold 14K (585) Modern Wear</option>
                                        <option value="24k">Gold 24K (999) Pure Gold</option>
                                        <option value="silver">Silver 999 Fine</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-[10px] uppercase text-[#EAD8B1] font-semibold mb-1">
                                        Gross Weight (Grams)
                                    </label>
                                    <input
                                        type="number"
                                        min="0.5"
                                        step="0.1"
                                        value={calcGrams}
                                        onChange={(e) => setCalcGrams(e.target.value)}
                                        className="w-full bg-[#270611] text-white border border-[#C5A059]/40 p-2 text-xs font-mono focus:outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[10px] uppercase text-[#EAD8B1] font-semibold mb-1">
                                        Making Charges (%)
                                    </label>
                                    <input
                                        type="number"
                                        min="0"
                                        max="25"
                                        value={calcMakingRate}
                                        onChange={(e) => setCalcMakingRate(e.target.value)}
                                        className="w-full bg-[#270611] text-white border border-[#C5A059]/40 p-2 text-xs font-mono focus:outline-none"
                                    />
                                </div>
                            </div>

                            <div className="bg-[#270611] p-4 border border-[#C5A059]/30 space-y-2 text-xs text-[#EAD8B1]">
                                <div className="flex justify-between">
                                    <span>Rate Per Gram ({calcPurity.toUpperCase()}):</span>
                                    <span className="font-mono text-white font-semibold">₹{formatINR(calcPerGram)} / g</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Gold Metal Value ({calcGrams}g):</span>
                                    <span className="font-mono text-white">₹{formatINR(calcMetalValue)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Making Charges ({calcMakingRate}%):</span>
                                    <span className="font-mono text-white">₹{formatINR(calcMakingAmount)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Govt. GST (3%):</span>
                                    <span className="font-mono text-white">₹{formatINR((calcMetalValue + calcMakingAmount) * 0.03)}</span>
                                </div>
                                <div className="pt-2 border-t border-[#C5A059]/40 flex justify-between items-center text-sm">
                                    <span className="font-serif font-bold text-[#C5A059]">Total Estimated Price:</span>
                                    <span className="font-mono font-bold text-2xl text-white">₹{formatINR(calcGrandTotal)}</span>
                                </div>
                            </div>

                            <div className="mt-5 text-center">
                                <a
                                    href={`https://wa.me/${BUSINESS_DETAILS.whatsappClean}?text=${encodeURIComponent(`Namaste Yash Jewellers, I calculated an ornament estimate on your website:%0A- Purity: ${calcPurity.toUpperCase()}%0A- Weight: ${calcGrams}g%0A- Live Rate: ₹${formatINR(calcPerGram)}/g%0A- Estimated Total: ₹${formatINR(calcGrandTotal)}%0A%0APlease share available showroom designs in this range.`)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 bg-[#6B0E2A] text-white px-6 py-2.5 text-xs font-bold uppercase tracking-widest border border-[#C5A059]/50 hover:bg-[#851336]"
                                >
                                    <MessageSquare size={14} className="text-[#C5A059]" />
                                    <span>Inquire On WhatsApp ({BUSINESS_DETAILS.phoneFormatted})</span>
                                </a>
                            </div>
                        </div>
                    )}

                </div>

                {/* Footer Strip with Store Details & Google Maps Link */}
                <div className="p-4 bg-[#1F040D] border-t border-[#C5A059]/20 flex flex-wrap justify-between items-center gap-4 text-xs text-[#EAD8B1]/80">
                    <div className="flex items-center gap-2">
                        <MapPin size={14} className="text-[#C5A059] shrink-0" />
                        <span>{BUSINESS_DETAILS.address}</span>
                    </div>

                    <div className="flex items-center gap-4">
                        <a 
                            href={BUSINESS_DETAILS.mapsLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-[#C5A059] hover:underline font-semibold"
                        >
                            <span>Open in Google Maps</span>
                            <ExternalLink size={12} />
                        </a>
                        <span className="text-[#C5A059]/40">|</span>
                        <a 
                            href={`tel:${BUSINESS_DETAILS.phoneClean}`}
                            className="inline-flex items-center gap-1 text-white hover:text-[#C5A059]"
                        >
                            <Phone size={12} className="text-[#C5A059]" />
                            <span>{BUSINESS_DETAILS.phoneFormatted}</span>
                        </a>
                    </div>
                </div>

            </div>

            {/* Quick Inquiry Modal for Selected Rate */}
            {selectedItem && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#270611]/80 backdrop-blur-sm">
                    <div className="relative bg-[#FAF7F2] text-[#270611] max-w-lg w-full border border-[#C5A059] shadow-2xl p-6 md:p-8">
                        
                        <button
                            onClick={() => setSelectedItem(null)}
                            className="absolute top-4 right-4 text-[#270611] hover:text-[#6B0E2A] p-1 border border-[#C5A059]/40"
                        >
                            <X size={18} />
                        </button>

                        <div className="mb-4">
                            <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#6B0E2A]">
                                Today's Live Rate Inquiry
                            </span>
                            <h3 className="font-serif text-2xl font-bold mt-1 text-[#270611]">
                                {selectedItem.name}
                            </h3>
                            <p className="text-xs text-gray-600 mt-0.5">
                                {selectedItem.desc}
                            </p>
                        </div>

                        <div className="bg-[#F3E8D0]/50 p-4 border border-[#C5A059]/40 space-y-2 text-xs mb-5">
                            <div className="flex justify-between">
                                <span className="text-gray-600">Rate per 10 Grams:</span>
                                <span className="font-mono font-bold text-base text-[#6B0E2A]">
                                    ₹{formatINR(selectedItem.rate10g)}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Rate per Gram:</span>
                                <span className="font-mono font-semibold text-emerald-800">
                                    ₹{formatINR(selectedItem.rate1g)} / g
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Purity Guarantee:</span>
                                <span className="font-bold text-[#270611]">100% BIS Hallmarked (HUID)</span>
                            </div>
                        </div>

                        <div className="mb-6">
                            <label className="block text-[11px] font-semibold text-gray-700 uppercase tracking-wider mb-1">
                                Desired Weight for Custom Design (Grams):
                            </label>
                            <input
                                type="number"
                                min="1"
                                value={selectedQtyGrams}
                                onChange={(e) => setSelectedQtyGrams(e.target.value)}
                                className="w-full bg-white border border-[#C5A059]/60 p-2.5 text-sm font-mono focus:outline-none"
                            />
                            <p className="text-[10px] text-gray-500 mt-1">
                                Estimated Metal Value for {selectedQtyGrams}g: <strong className="text-[#6B0E2A]">₹{formatINR(selectedItem.rate1g * (parseFloat(selectedQtyGrams) || 0))}</strong> (before making &amp; GST).
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <a
                                href={`https://wa.me/${BUSINESS_DETAILS.whatsappClean}?text=${encodeURIComponent(`Namaste Yash Jewellers, I would like to inquire about ${selectedItem.name} at today's live rate (₹${formatINR(selectedItem.rate10g)}/10g). I am looking to make jewellery of approx ${selectedQtyGrams} grams.`)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-[#6B0E2A] hover:bg-[#851336] text-white py-3 px-3 text-xs font-bold uppercase tracking-wider text-center flex items-center justify-center gap-1.5 border border-[#C5A059]/40"
                            >
                                <MessageSquare size={13} className="text-[#C5A059]" />
                                <span>WhatsApp Us</span>
                            </a>

                            <a
                                href={`tel:${BUSINESS_DETAILS.phoneClean}`}
                                className="bg-[#270611] hover:bg-[#38081A] text-white py-3 px-3 text-xs font-bold uppercase tracking-wider text-center flex items-center justify-center gap-1.5 border border-[#C5A059]/40"
                            >
                                <Phone size={13} className="text-[#C5A059]" />
                                <span>Call Showroom</span>
                            </a>
                        </div>

                    </div>
                </div>
            )}

            {/* Standalone Calculator Modal */}
            {showCalculatorModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#270611]/80 backdrop-blur-sm">
                    <div className="relative bg-[#1F040D] text-white max-w-xl w-full border border-[#C5A059] shadow-2xl p-6 md:p-8">
                        <button
                            onClick={() => setShowCalculatorModal(false)}
                            className="absolute top-4 right-4 text-white hover:text-[#C5A059] p-1 border border-[#C5A059]/40"
                        >
                            <X size={18} />
                        </button>

                        <h3 className="font-serif text-2xl text-white text-center font-medium mb-1">
                            Live Jewellery Price Estimator
                        </h3>
                        <p className="text-xs text-[#C5A059] text-center font-serif italic mb-6">
                            पारदर्शी गणना • Calculated with Today's Live Rate
                        </p>

                        <div className="space-y-4 text-xs">
                            <div>
                                <label className="block text-[10px] uppercase text-[#EAD8B1] font-semibold mb-1">
                                    Purity Standard
                                </label>
                                <select
                                    value={calcPurity}
                                    onChange={(e) => setCalcPurity(e.target.value)}
                                    className="w-full bg-[#270611] text-white border border-[#C5A059]/40 p-2.5 text-xs focus:outline-none"
                                >
                                    <option value="22k">Gold 22K (916) Hallmark Jewellery</option>
                                    <option value="18k">Gold 18K (750) Diamond Mount</option>
                                    <option value="14k">Gold 14K (585) Modern Wear</option>
                                    <option value="24k">Gold 24K (999) Pure Gold</option>
                                    <option value="silver">Silver 999 Fine</option>
                                </select>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-[10px] uppercase text-[#EAD8B1] font-semibold mb-1">
                                        Gross Weight (Grams)
                                    </label>
                                    <input
                                        type="number"
                                        min="0.5"
                                        step="0.1"
                                        value={calcGrams}
                                        onChange={(e) => setCalcGrams(e.target.value)}
                                        className="w-full bg-[#270611] text-white border border-[#C5A059]/40 p-2 text-xs font-mono focus:outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[10px] uppercase text-[#EAD8B1] font-semibold mb-1">
                                        Making Charges (%)
                                    </label>
                                    <input
                                        type="number"
                                        min="0"
                                        max="25"
                                        value={calcMakingRate}
                                        onChange={(e) => setCalcMakingRate(e.target.value)}
                                        className="w-full bg-[#270611] text-white border border-[#C5A059]/40 p-2 text-xs font-mono focus:outline-none"
                                    />
                                </div>
                            </div>

                            <div className="bg-[#270611] p-4 border border-[#C5A059]/30 space-y-2 text-xs text-[#EAD8B1]">
                                <div className="flex justify-between">
                                    <span>Today's Rate ({calcPurity.toUpperCase()}):</span>
                                    <span className="font-mono text-white font-semibold">₹{formatINR(calcPerGram)} / g</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Gold Metal Value ({calcGrams}g):</span>
                                    <span className="font-mono text-white">₹{formatINR(calcMetalValue)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Making Charges ({calcMakingRate}%):</span>
                                    <span className="font-mono text-white">₹{formatINR(calcMakingAmount)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Govt. GST (3%):</span>
                                    <span className="font-mono text-white">₹{formatINR((calcMetalValue + calcMakingAmount) * 0.03)}</span>
                                </div>
                                <div className="pt-2 border-t border-[#C5A059]/40 flex justify-between items-center text-sm">
                                    <span className="font-serif font-bold text-[#C5A059]">Total Estimated Price:</span>
                                    <span className="font-mono font-bold text-2xl text-white">₹{formatINR(calcGrandTotal)}</span>
                                </div>
                            </div>

                            <div className="pt-3 text-center">
                                <a
                                    href={`https://wa.me/${BUSINESS_DETAILS.whatsappClean}?text=${encodeURIComponent(`Namaste Yash Jewellers, I calculated an ornament estimate on your website:%0A- Purity: ${calcPurity.toUpperCase()}%0A- Weight: ${calcGrams}g%0A- Live Rate: ₹${formatINR(calcPerGram)}/g%0A- Estimated Total: ₹${formatINR(calcGrandTotal)}%0A%0APlease share available showroom designs in this range.`)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full inline-flex items-center justify-center gap-2 bg-[#6B0E2A] text-white px-6 py-3 text-xs font-bold uppercase tracking-widest border border-[#C5A059]/50 hover:bg-[#851336]"
                                >
                                    <MessageSquare size={14} className="text-[#C5A059]" />
                                    <span>Inquire On WhatsApp ({BUSINESS_DETAILS.phoneFormatted})</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}
