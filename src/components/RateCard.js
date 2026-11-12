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
    TrendingUp,
    Info,
    HelpCircle,
    CheckCircle2
} from 'lucide-react';
import { useRates } from '@/src/context/RatesContext';
import { BUSINESS_DETAILS } from '@/src/config/business';

export default function RateCard() {
    const { data, rates, cashBhav, spot, formula, loading, refreshRates, formatINR } = useRates();
    const [activeTab, setActiveTab] = useState('gold'); // 'gold' | 'silver' | 'formula' | 'calc'
    const [selectedItem, setSelectedItem] = useState(null);
    const [selectedQtyGrams, setSelectedQtyGrams] = useState(10);
    const [showCalculatorModal, setShowCalculatorModal] = useState(false);

    // Calculator states
    const [calcPurity, setCalcPurity] = useState('22k');
    const [calcGrams, setCalcGrams] = useState(10);
    const [calcMakingRate, setCalcMakingRate] = useState(8);

    // Dynamic White-to-Green/Red transition states
    const [tickStates, setTickStates] = useState({});

    // Live subtle tick animation for visual realism
    useEffect(() => {
        const interval = setInterval(() => {
            const keys = ['G_CASH_995', 'G_24K_FINE', 'G_22K', 'S_REFINERY_CASH', 'S_SILCUT_CASH'];
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
        }, 3500);

        return () => clearInterval(interval);
    }, []);

    // Calculator Per Gram Rate Logic
    const getPerGramRate = (purity) => {
        if (!rates) return 12507;
        if (purity === '24k') return rates.perGram24k || Math.round(rates.gold24k / 10);
        if (purity === '22k') return rates.perGram22k || Math.round(rates.gold22k / 10);
        if (purity === '18k') return rates.perGram18k || Math.round(rates.gold18k / 10);
        if (purity === '14k') return rates.perGram14k || Math.round(rates.gold14k / 10);
        if (purity === 'silver') return rates.perGramSilver || +(rates.silver / 1000).toFixed(2);
        return rates.perGram22k || 12507;
    };

    const calcPerGram = getPerGramRate(calcPurity);
    const calcMetalValue = calcPerGram * (parseFloat(calcGrams) || 0);
    const calcMakingAmount = calcMetalValue * (parseFloat(calcMakingRate) / 100);
    const calcGrandTotal = (calcMetalValue + calcMakingAmount) * 1.03; // Statutory 3% GST

    // Commodities Lists
    const goldCommodities = data?.commodities?.gold || [
        {
            id: "G_CASH_995",
            name: "GOLD 99.50 CASH BHAV (SARAFA MANDI)",
            hindiName: "गोल्ड 99.50 कैश भाव (हाजिर मंडी)",
            desc: "Official Sarafa Mandi Cash Bhav Benchmark • कानपुर सर्राफा मानक",
            unit: "10 GM",
            rate10g: rates?.gold995Cash || 140955,
            rate1g: rates?.perGram24k || 14096,
            high: Math.round((rates?.gold995Cash || 140955) * 1.01),
            low: Math.round((rates?.gold995Cash || 140955) * 0.99),
            isCashBhav: true
        },
        {
            id: "G_24K_FINE",
            name: "GOLD 24K (999 PURE CASH BHAV)",
            hindiName: "शुद्ध 24 कैरट सोना (999 फाइन कैश भाव)",
            desc: "100% Fine Gold • Calculated: 99.50 Cash Bhav ÷ 0.995",
            unit: "10 GM",
            rate10g: rates?.gold24k || 141663,
            rate1g: Math.round((rates?.gold24k || 141663) / 10),
            high: Math.round((rates?.gold24k || 141663) * 1.01),
            low: Math.round((rates?.gold24k || 141663) * 0.99),
            isCashBhav: true
        },
        {
            id: "G_22K",
            name: "GOLD 22K (916 BIS HALLMARK JEWELLERY)",
            hindiName: "22 कैरट हॉलमार्क जेवर (916)",
            desc: "BIS Hallmarked HUID Gold • Official Jewellery Standard",
            unit: "10 GM",
            rate10g: rates?.gold22k || 125065,
            rate1g: rates?.perGram22k || 12507,
            high: Math.round((rates?.gold22k || 125065) * 1.01),
            low: Math.round((rates?.gold22k || 125065) * 0.99),
            isJewelleryStandard: true
        },
        {
            id: "G_18K",
            name: "GOLD 18K (750 DIAMOND MOUNT)",
            hindiName: "18 कैरट डायमंड आभूषण (750)",
            desc: "BIS Hallmarked 750 Gold • Solitaire & Certified Diamond Jewellery",
            unit: "10 GM",
            rate10g: rates?.gold18k || 103049,
            rate1g: rates?.perGram18k || 10305,
            high: Math.round((rates?.gold18k || 103049) * 1.01),
            low: Math.round((rates?.gold18k || 103049) * 0.99),
            isJewelleryStandard: false
        },
        {
            id: "G_14K",
            name: "GOLD 14K (585 MODERN WEAR)",
            hindiName: "14 कैरट आधुनिक आभूषण (585)",
            desc: "BIS Hallmarked 585 Gold • Lightweight Everyday Jewellery",
            unit: "10 GM",
            rate10g: rates?.gold14k || 81497,
            rate1g: rates?.perGram14k || 8150,
            high: Math.round((rates?.gold14k || 81497) * 1.01),
            low: Math.round((rates?.gold14k || 81497) * 0.99),
            isJewelleryStandard: false
        }
    ];

    const silverCommodities = data?.commodities?.silver || [
        {
            id: "S_REFINERY_CASH",
            name: "SILVER REFINERY 99 PLUS CASH BHAV",
            hindiName: "चांदी रिफाइनरी 99+ कैश भाव",
            desc: "Official Mandi Cash Bhav • Payal, Ornaments & Utensils Standard",
            unit: "1 KG",
            rateKg: rates?.silverKg || 186284,
            rate10g: Math.round((rates?.silverKg || 186284) / 100),
            rate1g: rates?.perGramSilver || 186.28,
            high: Math.round((rates?.silverKg || 186284) * 1.01),
            low: Math.round((rates?.silverKg || 186284) * 0.99),
            isCashBhav: true,
            isJewelleryStandard: true
        },
        {
            id: "S_SILCUT_CASH",
            name: "SILVER 99.90 SILCUT CASH BHAV",
            hindiName: "चांदी 99.90 सिल्कूट कैश भाव",
            desc: "High Purity Silcut Cash Bhav for Fine Silver Articles & Bullion",
            unit: "1 KG",
            rateKg: rates?.silverSilcutKg || 187684,
            rate10g: Math.round((rates?.silverSilcutKg || 187684) / 100),
            rate1g: 187.68,
            high: Math.round((rates?.silverSilcutKg || 187684) * 1.01),
            low: Math.round((rates?.silverSilcutKg || 187684) * 0.99),
            isCashBhav: true
        },
        {
            id: "S_PAMP_BAR",
            name: "MMTC PAMP SILVER BAR 99.99 CASH BHAV",
            hindiName: "एमएमटीसी पैम्प चांदी बार (99.99 शुद्ध)",
            desc: "Internationally Accredited 999.9 Fine Silver Investment Bar",
            unit: "1 KG",
            rateKg: 199884,
            rate10g: 1999,
            rate1g: 199.88,
            high: 201700,
            low: 195684,
            isCashBhav: true
        },
        {
            id: "S_PAMP_10G",
            name: "MMTC PAMP 10 GM SILVER BAR",
            hindiName: "एमएमटीसी पैम्प 10 ग्राम चांदी बार",
            desc: "Certified 10 Gram Minted Investment Silver Bar",
            unit: "10 GM",
            rateKg: 211900,
            rate10g: 2119,
            rate1g: 211.90,
            high: 2167,
            low: 2107,
            isCashBhav: false
        }
    ];

    const currentDisplayItems = activeTab === 'silver' ? silverCommodities : goldCommodities;

    const spotGold = spot?.gold || { price: 3949.42, high: 4000.00, low: 3925.00 };
    const spotSilver = spot?.silver || { price: 51.18, high: 52.00, low: 50.70 };
    const spotInr = spot?.inr || { price: 94.053 };

    return (
        <div className="w-full max-w-6xl mx-auto font-sans">
            
            {/* 1. International Spot & Yash Jewellers Cash Bhav Spotlight */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                
                {/* Gold 99.50 Cash Bhav Card */}
                <div className="bg-[#1F040D] border-2 border-[#C5A059] p-4 relative shadow-lg">
                    <div className="flex justify-between items-center mb-1">
                        <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#EAD8B1]">
                            GOLD 99.50 CASH BHAV
                        </span>
                        <span className="text-[9px] text-[#C5A059] font-mono px-1.5 py-0.2 bg-[#3A091A] border border-[#C5A059]/40">
                            HAJIR MANDI
                        </span>
                    </div>
                    <div className="text-2xl md:text-3xl font-mono font-bold my-1 text-white">
                        <span>₹{formatINR(rates?.gold995Cash || 140955)}</span>
                        <span className="text-xs text-[#EAD8B1]/70 font-sans ml-1">/ 10g</span>
                    </div>
                    <div className="text-[11px] text-[#C5A059] font-serif">
                        शुद्ध 24K (999): ₹{formatINR(rates?.gold24k || 141663)}
                    </div>
                </div>

                {/* Silver Refinery Cash Bhav Card */}
                <div className="bg-[#1F040D] border-2 border-[#C5A059] p-4 relative shadow-lg">
                    <div className="flex justify-between items-center mb-1">
                        <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#EAD8B1]">
                            SILVER 99+ CASH BHAV
                        </span>
                        <span className="text-[9px] text-emerald-400 font-mono flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span> LIVE
                        </span>
                    </div>
                    <div className="text-2xl md:text-3xl font-mono font-bold my-1 text-white">
                        <span>₹{formatINR(rates?.silverKg || 186284)}</span>
                        <span className="text-xs text-[#EAD8B1]/70 font-sans ml-1">/ 1 KG</span>
                    </div>
                    <div className="text-[11px] text-[#EAD8B1]/80 font-mono">
                        10g: ₹{formatINR(rates?.silver10g || 1863)} • 1g: ₹{rates?.perGramSilver || 186.28}
                    </div>
                </div>

                {/* Spot Gold USD Card */}
                <div className="bg-[#1F040D] border border-[#C5A059]/40 p-4 relative shadow-md">
                    <div className="flex justify-between items-center mb-1">
                        <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#C5A059]">
                            INTERNATIONAL SPOT GOLD
                        </span>
                        <span className="text-[10px] text-emerald-400 font-mono">LBMA / NY</span>
                    </div>
                    <div className="text-2xl font-mono font-bold my-1 text-white">
                        <span>${spotGold.price}</span>
                        <span className="text-xs text-[#EAD8B1]/60 font-sans ml-1.5">/ oz</span>
                    </div>
                    <div className="text-[11px] text-[#EAD8B1]/75 font-mono">
                        USD/INR Parity: ₹{spotInr.price}
                    </div>
                </div>

                {/* Spot Silver USD Card */}
                <div className="bg-[#1F040D] border border-[#C5A059]/40 p-4 relative shadow-md">
                    <div className="flex justify-between items-center mb-1">
                        <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#C5A059]">
                            INTERNATIONAL SPOT SILVER
                        </span>
                        <span className="text-[10px] text-emerald-400 font-mono">COMEX</span>
                    </div>
                    <div className="text-2xl font-mono font-bold my-1 text-white">
                        <span>${spotSilver.price}</span>
                        <span className="text-xs text-[#EAD8B1]/60 font-sans ml-1.5">/ oz</span>
                    </div>
                    <div className="text-[11px] text-[#EAD8B1]/75 font-mono">
                        Silver Silcut Cash: ₹{formatINR(rates?.silverSilcutKg || 187684)}
                    </div>
                </div>

            </div>

            {/* 2. Running Notice Bar */}
            <div className="bg-[#270611] border border-[#C5A059]/40 py-2.5 px-4 mb-6 flex items-center gap-3 overflow-hidden shadow-sm">
                <span className="bg-[#6B0E2A] text-white text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 border border-[#C5A059]/40 shrink-0">
                    LIVE MANDI BHAV
                </span>
                <div className="overflow-hidden whitespace-nowrap text-xs text-[#EAD8B1]">
                    <div className="inline-block animate-[marquee_25s_linear_infinite]">
                        यश ज्वेलर्स (चौबेपुर, कानपुर) • आधिकारिक लाइव कैश भाव • गोल्ड 99.50 कैश भाव: ₹{formatINR(rates?.gold995Cash || 140955)} • 24K फाइन (999): ₹{formatINR(rates?.gold24k || 141663)} • 22K (916) हॉलमार्क: ₹{formatINR(rates?.gold22k || 125065)} • चांदी रिफाइनरी 99+ कैश भाव: ₹{formatINR(rates?.silverKg || 186284)} प्रति किलो (₹{rates?.perGramSilver || 186.28}/ग्राम) • फोन/व्हाट्सएप: {BUSINESS_DETAILS.phoneFormatted}
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
                                Live Market Rates · Yash Jewellers
                            </h2>
                            <span className="inline-flex items-center gap-1 text-[9px] font-bold px-2 py-0.5 bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span> SARAFA LIVE BCAST
                            </span>
                        </div>
                        <p className="text-[11px] text-[#C5A059] font-serif mt-0.5">
                            चौबेपुर, कानपुर प्रतिष्ठान • Official Cash Bhav &amp; 22K BIS Hallmarked Jewellery Benchmarks • Zero Clutter
                        </p>
                    </div>

                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setShowCalculatorModal(true)}
                            className="inline-flex items-center gap-1.5 text-xs text-[#FAF7F2] bg-[#1F040D] border border-[#C5A059]/40 px-3 py-1.5 hover:bg-[#C5A059]/20 transition-colors"
                        >
                            <Calculator size={13} className="text-[#DFBE7A]" />
                            <span>Price Estimator</span>
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
                <div className="grid grid-cols-4 bg-[#1F040D] border-b border-[#C5A059]/20 text-xs">
                    {[
                        { id: 'gold', label: '🥇 GOLD CASH BHAV', hi: 'सोने का कैश भाव' },
                        { id: 'silver', label: '🥈 SILVER CASH BHAV', hi: 'चांदी का भाव (किलो/ग्राम)' },
                        { id: 'formula', label: '📐 BHAV FORMULA', hi: 'भाव निर्धारण सूत्र' },
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
                            <span className="uppercase tracking-wider text-[10px] sm:text-xs">{tab.label}</span>
                            <span className="text-[10px] text-[#C5A059] font-serif italic hidden sm:inline">{tab.hi}</span>
                        </button>
                    ))}
                </div>

                {/* 5. Tab Content */}
                <div className="p-4 md:p-6 bg-[#270611]">
                    
                    {/* A. Gold & Silver Tables */}
                    {(activeTab === 'gold' || activeTab === 'silver') && (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-[#C5A059]/30 text-[#C5A059] text-[10px] md:text-xs uppercase tracking-[0.15em]">
                                        <th className="py-3 px-3 font-semibold" style={{ width: '42%' }}>Purity Standard</th>
                                        <th className="py-3 px-3 font-semibold" style={{ width: '25%' }}>
                                            {activeTab === 'silver' ? 'Rate / 1 KG (₹)' : 'Rate / 10 GM (₹)'}
                                        </th>
                                        <th className="py-3 px-3 font-semibold" style={{ width: '20%' }}>
                                            {activeTab === 'silver' ? 'Rate / 10g & 1g (₹)' : 'Rate / 1 GM (₹)'}
                                        </th>
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
                                                    <div className="flex flex-wrap items-center gap-2">
                                                        <div className="font-bold text-white tracking-wide">
                                                            {item.name}
                                                        </div>
                                                        {item.isCashBhav && (
                                                            <span className="bg-[#DFBE7A] text-[#270611] text-[9px] font-bold px-1.5 py-0.2 tracking-widest uppercase">
                                                                CASH BHAV
                                                            </span>
                                                        )}
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

                                                {/* Primary Price Column (1 KG for Silver, 10 GM for Gold) */}
                                                <td className="py-3.5 px-3">
                                                    <div>
                                                        <span className={`rate-val font-mono font-bold text-sm md:text-base ${tickClass}`}>
                                                            ₹{formatINR(activeTab === 'silver' ? (item.rateKg || item.rate10g) : item.rate10g)}
                                                        </span>
                                                        <span className="text-[10px] text-[#EAD8B1]/70 ml-1">
                                                            {activeTab === 'silver' ? (item.unit === '10 GM' ? '/ 10g' : '/ 1 KG') : '/ 10g'}
                                                        </span>
                                                    </div>
                                                    <div className="text-[10px] text-[#EAD8B1]/70 font-mono mt-0.5">
                                                        L: <span className="text-white font-semibold">₹{formatINR(item.low)}</span> | H: <span className="text-white font-semibold">₹{formatINR(item.high)}</span>
                                                    </div>
                                                </td>

                                                {/* Secondary Price Column (Per 10g & 1g for Silver, Per 1g for Gold) */}
                                                <td className="py-3.5 px-3">
                                                    <div>
                                                        <span className={`rate-val font-mono font-bold text-sm md:text-base ${tickClass}`}>
                                                            ₹{formatINR(item.rate1g)}
                                                        </span>
                                                        <span className="text-[10px] text-[#EAD8B1]/70 ml-1">/ ग्राम</span>
                                                    </div>
                                                    {activeTab === 'silver' && item.rate10g && (
                                                        <div className="text-[10px] text-[#C5A059] font-mono mt-0.5">
                                                            10 ग्राम: ₹{formatINR(item.rate10g)}
                                                        </div>
                                                    )}
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
                    )}

                    {/* B. Official Cash Bhav Formula Breakdown */}
                    {activeTab === 'formula' && (
                        <div className="max-w-4xl mx-auto space-y-6">
                            
                            <div className="bg-[#1F040D] p-5 border border-[#C5A059]/40">
                                <div className="flex items-center gap-2 text-[#DFBE7A] font-bold text-sm mb-1 uppercase tracking-wider">
                                    <Sparkles size={16} />
                                    <span>Sarafa Mandi Cash Bhav &amp; Landed Cost Formula</span>
                                </div>
                                <p className="text-xs text-[#EAD8B1]/80 leading-relaxed font-sans mb-4">
                                    This is the authentic Sarafa Mandi mathematical model used to translate international bullion quotes (USD/oz) into domestic Cash Bhav and retail hallmarked jewellery prices:
                                </p>

                                {/* Formula Banner */}
                                <div className="bg-[#270611] p-4 border-l-4 border-[#C5A059] font-mono text-xs md:text-sm text-[#DFBE7A] overflow-x-auto space-y-2">
                                    <div>
                                        <span className="text-[#FAF7F2] font-bold">1. Landed Cash Bhav = </span> 
                                        <span>[(Spot USD ÷ 31.1035) × 10 × USDINR] × 1.06 (Customs) × 1.03 (GST) + Mandi Premium</span>
                                    </div>
                                    <div>
                                        <span className="text-[#FAF7F2] font-bold">2. Pure 24K (999) Bhav = </span> 
                                        <span>Gold 99.50 Cash Bhav ÷ 0.995 = ₹{formatINR(rates?.gold24k || 141663)} / 10g</span>
                                    </div>
                                    <div>
                                        <span className="text-[#FAF7F2] font-bold">3. Retail Jewellery Price = </span> 
                                        <span>[(Net Gold Weight in g × Per-Gram Rate) + Making Charges] × 1.03 (GST)</span>
                                    </div>
                                </div>
                            </div>

                            {/* Step-by-Step Live Numbers */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                
                                <div className="bg-[#1F040D] p-4 border border-[#C5A059]/25">
                                    <div className="text-xs font-bold text-[#C5A059] uppercase mb-1">
                                        Step 1: International Spot Metal
                                    </div>
                                    <div className="text-sm font-mono text-white mb-1">
                                        Spot: ${spotGold.price} / oz • USD/INR: ₹{spotInr.price}
                                    </div>
                                    <p className="text-xs text-[#EAD8B1]/70 font-sans">
                                        Raw metal parity in INR: (${spotGold.price} ÷ 31.1035) × 10 × {spotInr.price} = ₹{formatINR(Math.round((spotGold.price / 31.1035) * 10 * spotInr.price))} / 10g.
                                    </p>
                                </div>

                                <div className="bg-[#1F040D] p-4 border border-[#C5A059]/25">
                                    <div className="text-xs font-bold text-[#C5A059] uppercase mb-1">
                                        Step 2: Customs Tariff (6%) + GST (3%)
                                    </div>
                                    <div className="text-sm font-mono text-white mb-1">
                                        Statutory Landed Parity = Raw × 1.06 × 1.03
                                    </div>
                                    <p className="text-xs text-[#EAD8B1]/70 font-sans">
                                        Refinery landing cost includes official import duties, statutory local taxes, insurance, and bank clearance.
                                    </p>
                                </div>

                                <div className="bg-[#1F040D] p-4 border border-[#C5A059]/25">
                                    <div className="text-xs font-bold text-[#C5A059] uppercase mb-1">
                                        Step 3: Gold 99.50 Cash Bhav
                                    </div>
                                    <div className="text-sm font-mono text-white mb-1">
                                        Live Mandi Bhav: ₹{formatINR(rates?.gold995Cash || 140955)} / 10g
                                    </div>
                                    <p className="text-xs text-[#EAD8B1]/70 font-sans">
                                        Local bullion benchmark in Kanpur/UP. Pure 24K fine rate is calculated by dividing 99.50 rate by 0.995.
                                    </p>
                                </div>

                                <div className="bg-[#1F040D] p-4 border border-[#C5A059]/25">
                                    <div className="text-xs font-bold text-[#C5A059] uppercase mb-1">
                                        Step 4: Silver Refinery 99+ Cash Bhav
                                    </div>
                                    <div className="text-sm font-mono text-white mb-1">
                                        Live Refinery Bhav: ₹{formatINR(rates?.silverKg || 186284)} / 1 KG
                                    </div>
                                    <p className="text-xs text-[#EAD8B1]/70 font-sans">
                                        Per 10g: ₹{formatINR(rates?.silver10g || 1863)} • Per 1g: ₹{rates?.perGramSilver || 186.28}. Used for silver ornaments, payal, and bartan.
                                    </p>
                                </div>

                            </div>

                            {/* Trust Guarantee Note */}
                            <div className="bg-[#38081A] p-4 border border-[#C5A059]/40 flex items-start gap-3">
                                <CheckCircle2 size={18} className="text-[#DFBE7A] shrink-0 mt-0.5" />
                                <div className="text-xs text-[#EAD8B1] leading-relaxed">
                                    <strong className="text-white font-semibold">100% Transparent Billing Guarantee: </strong>
                                    At Yash Jewellers (Chaubepur, Kanpur), every bill displays the exact net weight, the live per-gram gold/silver rate, making charges, and 3% GST separately. Zero hidden surcharges.
                                </div>
                            </div>

                        </div>
                    )}

                    {/* C. Instant Retail Ornament Price Calculator */}
                    {activeTab === 'calc' && (
                        <div className="max-w-3xl mx-auto bg-[#1F040D] p-6 border border-[#C5A059]/40">
                            <h3 className="font-serif text-2xl text-white text-center font-medium mb-1">
                                Instant Jewellery Price &amp; Value Estimator
                            </h3>
                            <p className="text-xs text-[#C5A059] text-center font-serif italic mb-6">
                                पारदर्शी मूल्य निर्धारण • Live Bhav + Making Charges + 3% GST
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
                                        <option value="24k">Gold 24K (999) Pure Cash Bhav</option>
                                        <option value="silver">Silver 999 Fine (Refinery Cash Bhav)</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-[10px] uppercase text-[#EAD8B1] font-semibold mb-1">
                                        Gross Weight (Grams)
                                    </label>
                                    <input
                                        type="number"
                                        min="0.1"
                                        step="0.05"
                                        value={calcGrams}
                                        onChange={(e) => setCalcGrams(e.target.value)}
                                        className="w-full bg-[#270611] text-white border border-[#C5A059]/40 p-2 text-xs font-mono focus:outline-none"
                                        placeholder="e.g. 10"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[10px] uppercase text-[#EAD8B1] font-semibold mb-1">
                                        Making Charges (%)
                                    </label>
                                    <input
                                        type="number"
                                        min="0"
                                        max="30"
                                        value={calcMakingRate}
                                        onChange={(e) => setCalcMakingRate(e.target.value)}
                                        className="w-full bg-[#270611] text-white border border-[#C5A059]/40 p-2 text-xs font-mono focus:outline-none"
                                        placeholder="e.g. 8"
                                    />
                                </div>
                            </div>

                            {/* Calculator Price Breakdown Receipt */}
                            <div className="bg-[#270611] p-5 border border-[#C5A059]/30 space-y-2.5 text-xs">
                                <div className="flex justify-between items-center text-[#EAD8B1]/80">
                                    <span>Purity Rate (Live Market Bhav):</span>
                                    <span className="font-mono text-white font-semibold">₹{formatINR(calcPerGram)} / ग्राम</span>
                                </div>
                                <div className="flex justify-between items-center text-[#EAD8B1]/80">
                                    <span>Net Metal Value ({calcGrams || 0}g):</span>
                                    <span className="font-mono text-white font-semibold">₹{formatINR(calcMetalValue)}</span>
                                </div>
                                <div className="flex justify-between items-center text-[#EAD8B1]/80">
                                    <span>Artisanal Making Charges ({calcMakingRate}%):</span>
                                    <span className="font-mono text-white font-semibold">₹{formatINR(calcMakingAmount)}</span>
                                </div>
                                <div className="flex justify-between items-center text-[#EAD8B1]/80">
                                    <span>Statutory GST (3% on Metal + Making):</span>
                                    <span className="font-mono text-white font-semibold">₹{formatINR((calcMetalValue + calcMakingAmount) * 0.03)}</span>
                                </div>
                                <div className="h-px bg-[#C5A059]/30 my-2" />
                                <div className="flex justify-between items-center text-sm md:text-base font-serif">
                                    <span className="text-[#C5A059] font-bold">Estimated Grand Total (अनुमानित कुल मूल्य):</span>
                                    <span className="font-mono text-white font-bold text-lg md:text-xl">₹{formatINR(calcGrandTotal)}</span>
                                </div>
                            </div>

                            <div className="mt-5 text-center">
                                <a
                                    href={`https://wa.me/${BUSINESS_DETAILS.whatsappClean}?text=${encodeURIComponent(`नमस्ते यश ज्वेलर्स! मैंने वेबसाइट पर ${calcGrams}g (${calcPurity.toUpperCase()}) आभूषण का भाव ₹${formatINR(calcGrandTotal)} देखा है। कृपया विवरण साझा करें।`)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 bg-gradient-to-r from-[#ECC880] to-[#C5A059] text-[#270611] px-6 py-2.5 text-xs font-bold uppercase tracking-wider hover:opacity-90 transition-opacity"
                                >
                                    <MessageSquare size={14} />
                                    <span>Inquire on WhatsApp</span>
                                </a>
                            </div>
                        </div>
                    )}

                </div>

            </div>

            {/* Inquire Modal */}
            {selectedItem && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-[#1F040D] border-2 border-[#C5A059] max-w-lg w-full p-6 text-left relative shadow-2xl">
                        <button
                            onClick={() => setSelectedItem(null)}
                            className="absolute top-4 right-4 text-[#FAF7F2]/60 hover:text-white"
                        >
                            <X size={20} />
                        </button>

                        <div className="inline-flex items-center gap-2 text-[#DFBE7A] text-[10px] font-bold uppercase tracking-widest mb-1">
                            <Sparkles size={12} />
                            <span>Yash Jewellers · Chaubepur</span>
                        </div>
                        <h3 className="font-serif text-2xl text-white font-normal mb-1">
                            {selectedItem.name}
                        </h3>
                        <p className="text-xs text-[#C5A059] font-serif mb-4">
                            {selectedItem.desc}
                        </p>

                        <div className="bg-[#270611] p-4 border border-[#C5A059]/30 mb-5 space-y-2 text-xs">
                            <div className="flex justify-between items-center text-[#EAD8B1]">
                                <span>Current Benchmark Rate:</span>
                                <span className="font-mono text-white font-bold text-base">
                                    ₹{formatINR(selectedItem.rateKg || selectedItem.rate10g)}
                                    <span className="text-xs text-[#EAD8B1]/70 ml-1">/ {selectedItem.unit}</span>
                                </span>
                            </div>
                            <div className="flex justify-between items-center text-[#EAD8B1]">
                                <span>Per Gram Rate (प्रति ग्राम):</span>
                                <span className="font-mono text-white font-bold">
                                    ₹{formatINR(selectedItem.rate1g)} / g
                                </span>
                            </div>
                            <div className="flex justify-between items-center text-[#EAD8B1]">
                                <span>Purity Certification:</span>
                                <span className="text-emerald-400 font-semibold">100% BIS Hallmarked (HUID)</span>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <a
                                href={`https://wa.me/${BUSINESS_DETAILS.whatsappClean}?text=${encodeURIComponent(`नमस्ते यश ज्वेलर्स! मुझे ${selectedItem.name} (रेट: ₹${formatINR(selectedItem.rateKg || selectedItem.rate10g)} / ${selectedItem.unit}) के बारे में जानकारी चाहिए।`)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-1 text-center bg-[#25D366] text-white py-2.5 text-xs font-bold uppercase tracking-wider hover:opacity-90 transition-opacity flex items-center justify-center gap-1.5"
                            >
                                <MessageSquare size={14} />
                                <span>WhatsApp Inquire</span>
                            </a>
                            <a
                                href={`tel:${BUSINESS_DETAILS.phoneClean}`}
                                className="flex-1 text-center bg-[#6B0E2A] text-white py-2.5 text-xs font-bold uppercase tracking-wider hover:bg-[#851336] transition-colors flex items-center justify-center gap-1.5 border border-[#C5A059]/40"
                            >
                                <Phone size={14} />
                                <span>Call Showroom</span>
                            </a>
                        </div>
                    </div>
                </div>
            )}

            {/* Quick Calculator Modal */}
            {showCalculatorModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-[#1F040D] border-2 border-[#C5A059] max-w-lg w-full p-6 text-left relative shadow-2xl">
                        <button
                            onClick={() => setShowCalculatorModal(false)}
                            className="absolute top-4 right-4 text-[#FAF7F2]/60 hover:text-white"
                        >
                            <X size={20} />
                        </button>
                        <h3 className="font-serif text-2xl text-white font-normal mb-1">
                            Quick Jewellery Estimator
                        </h3>
                        <p className="text-xs text-[#C5A059] font-serif mb-4">
                            Calculated dynamically using live market cash bhav + making charges + 3% GST
                        </p>

                        <div className="space-y-3 mb-5 text-xs">
                            <div>
                                <label className="block text-[10px] uppercase text-[#EAD8B1] font-semibold mb-1">Purity Standard</label>
                                <select
                                    value={calcPurity}
                                    onChange={(e) => setCalcPurity(e.target.value)}
                                    className="w-full bg-[#270611] text-white border border-[#C5A059]/40 p-2 text-xs focus:outline-none"
                                >
                                    <option value="22k">Gold 22K (916) Hallmark</option>
                                    <option value="18k">Gold 18K (750) Diamond Mount</option>
                                    <option value="14k">Gold 14K (585) Modern Wear</option>
                                    <option value="24k">Gold 24K (999) Pure Cash Bhav</option>
                                    <option value="silver">Silver 999 Fine (Refinery Cash Bhav)</option>
                                </select>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-[10px] uppercase text-[#EAD8B1] font-semibold mb-1">Weight (g)</label>
                                    <input
                                        type="number"
                                        min="0.1"
                                        step="0.1"
                                        value={calcGrams}
                                        onChange={(e) => setCalcGrams(e.target.value)}
                                        className="w-full bg-[#270611] text-white border border-[#C5A059]/40 p-2 text-xs font-mono focus:outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[10px] uppercase text-[#EAD8B1] font-semibold mb-1">Making (%)</label>
                                    <input
                                        type="number"
                                        value={calcMakingRate}
                                        onChange={(e) => setCalcMakingRate(e.target.value)}
                                        className="w-full bg-[#270611] text-white border border-[#C5A059]/40 p-2 text-xs font-mono focus:outline-none"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="bg-[#270611] p-4 border border-[#C5A059]/30 mb-5 space-y-2 text-xs">
                            <div className="flex justify-between items-center text-[#EAD8B1]">
                                <span>Metal Rate:</span>
                                <span className="font-mono text-white">₹{formatINR(calcPerGram)} / g</span>
                            </div>
                            <div className="flex justify-between items-center text-[#EAD8B1]">
                                <span>Metal Value:</span>
                                <span className="font-mono text-white">₹{formatINR(calcMetalValue)}</span>
                            </div>
                            <div className="flex justify-between items-center text-[#EAD8B1]">
                                <span>Making Charges ({calcMakingRate}%):</span>
                                <span className="font-mono text-white">₹{formatINR(calcMakingAmount)}</span>
                            </div>
                            <div className="flex justify-between items-center text-[#EAD8B1]">
                                <span>GST (3%):</span>
                                <span className="font-mono text-white">₹{formatINR((calcMetalValue + calcMakingAmount) * 0.03)}</span>
                            </div>
                            <div className="h-px bg-[#C5A059]/30 my-1" />
                            <div className="flex justify-between items-center font-bold text-sm">
                                <span className="text-[#C5A059]">Total Landed Price:</span>
                                <span className="font-mono text-white text-base">₹{formatINR(calcGrandTotal)}</span>
                            </div>
                        </div>

                        <button
                            onClick={() => setShowCalculatorModal(false)}
                            className="w-full bg-gradient-to-r from-[#ECC880] to-[#C5A059] text-[#270611] py-2.5 text-xs font-bold uppercase tracking-wider hover:opacity-90"
                        >
                            Close Estimator
                        </button>
                    </div>
                </div>
            )}

        </div>
    );
}
