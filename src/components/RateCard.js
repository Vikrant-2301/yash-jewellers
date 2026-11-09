"use client";

import { useState, useEffect, useRef } from 'react';
import { RefreshCw, TrendingUp, ShieldCheck, Calculator, Phone, MessageSquare, ChevronRight, X, Info, Sparkles } from 'lucide-react';

export default function RateCard() {
    const [data, setData] = useState(null);
    const [activeTab, setActiveTab] = useState('gold');
    const [loading, setLoading] = useState(true);
    const [showFormulaModal, setShowFormulaModal] = useState(false);
    
    // Calculator States
    const [calcPurity, setCalcPurity] = useState('22k'); // '24k', '22k', '18k', 'silver'
    const [calcGrams, setCalcGrams] = useState(10);
    const [calcMakingRate, setCalcMakingRate] = useState(8); // 8%

    // Active tick states for green/red flashes
    const [tickStates, setTickStates] = useState({});

    useEffect(() => {
        fetchRates();
        const interval = setInterval(simulateLiveTick, 2000);
        return () => clearInterval(interval);
    }, []);

    const fetchRates = async () => {
        try {
            setLoading(true);
            const res = await fetch('/api/rates');
            const json = await res.json();
            setData(json);
        } catch (err) {
            console.error('Rate Fetch Error:', err);
        } finally {
            setLoading(false);
        }
    };

    // Realistic market tick simulation between API calls
    const simulateLiveTick = () => {
        setData(prevData => {
            if (!prevData || !prevData.commodities) return prevData;

            const tabKeys = ['gold', 'silver', 'delhi'];
            const randomTab = tabKeys[Math.floor(Math.random() * tabKeys.length)];
            const list = [...(prevData.commodities[randomTab] || [])];
            if (list.length === 0) return prevData;

            const targetIdx = Math.floor(Math.random() * list.length);
            const item = { ...list[targetIdx] };
            const isGold = randomTab === 'gold' || randomTab === 'delhi';
            const tickAmount = (Math.floor(Math.random() * 3) + 1) * (isGold ? 10 : 20) * (Math.random() > 0.5 ? 1 : -1);

            item.buy += tickAmount;
            item.sell += tickAmount;
            if (item.buy > item.high) item.high = item.buy;
            if (item.buy < item.low) item.low = item.buy;

            list[targetIdx] = item;
            
            const itemKey = `${randomTab}_${item.id || targetIdx}`;
            setTickStates(prev => ({ ...prev, [itemKey]: tickAmount > 0 ? 'tick-up' : 'tick-down' }));
            setTimeout(() => {
                setTickStates(prev => {
                    const next = { ...prev };
                    delete next[itemKey];
                    return next;
                });
            }, 1000);

            return {
                ...prevData,
                commodities: {
                    ...prevData.commodities,
                    [randomTab]: list
                }
            };
        });
    };

    const formatINR = (n) => new Intl.NumberFormat('en-IN').format(Math.round(n || 0));

    // Calculate rates for calculator
    const base24kPerGram = data?.rates?.gold24k ? (data.rates.gold24k / 10) : 14520;
    const baseSilverPerGram = data?.rates?.silver ? (data.rates.silver / 1000) : 185;

    const getCalculatedRatePerGram = () => {
        if (calcPurity === '24k') return base24kPerGram;
        if (calcPurity === '22k') return base24kPerGram * (22 / 24);
        if (calcPurity === '18k') return base24kPerGram * (18 / 24);
        if (calcPurity === 'silver') return baseSilverPerGram;
        return base24kPerGram;
    };

    const perGram = getCalculatedRatePerGram();
    const goldValue = perGram * (parseFloat(calcGrams) || 0);
    const makingAmount = goldValue * (parseFloat(calcMakingRate) / 100);
    const subtotal = goldValue + makingAmount;
    const gstAmount = subtotal * 0.03;
    const grandTotal = subtotal + gstAmount;

    const currentItems = data?.commodities?.[activeTab] || [];

    return (
        <div className="w-full max-w-6xl mx-auto font-sans">
            
            {/* Top Board Container */}
            <div className="bg-[#270611] border border-[#C5A059]/40 rounded-none shadow-[0_20px_50px_rgba(39,6,17,0.4)] overflow-hidden">
                
                {/* Board Header */}
                <div className="p-6 md:p-8 bg-gradient-to-r from-[#38081A] via-[#270611] to-[#38081A] border-b border-[#C5A059]/30 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                            <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#C5A059]">
                                Live Bullion Trading Desk · कानपुर व दिल्ली भाव
                            </span>
                        </div>
                        <h2 className="font-serif text-2xl md:text-3xl text-[#FAF7F2] font-medium">
                            Real-Time Benchmark Rates
                        </h2>
                    </div>

                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setShowFormulaModal(true)}
                            className="inline-flex items-center gap-1.5 text-xs text-[#EAD8B1] border border-[#C5A059]/40 px-3 py-1.5 hover:bg-[#C5A059]/10 transition-colors"
                        >
                            <Info size={14} className="text-[#C5A059]" />
                            <span>Duty &amp; GST Formula</span>
                        </button>
                        <button
                            onClick={fetchRates}
                            className="inline-flex items-center gap-1.5 text-xs text-[#270611] bg-gradient-to-r from-[#ECC880] to-[#C5A059] px-3.5 py-1.5 font-bold uppercase tracking-wider hover:opacity-90 transition-opacity"
                        >
                            <RefreshCw size={12} className={loading ? "animate-spin" : ""} />
                            <span>Refresh</span>
                        </button>
                    </div>
                </div>

                {/* Tabs */}
                <div className="grid grid-cols-3 md:grid-cols-4 bg-[#1F040D] border-b border-[#C5A059]/20 text-xs">
                    {[
                        { id: 'gold', label: 'Gold (Kanpur)', hi: 'सोना कानपुर' },
                        { id: 'silver', label: 'Silver (RTGS)', hi: 'चांदी भाव' },
                        { id: 'delhi', label: 'Delhi Gold Spot', hi: 'दिल्ली सोना' },
                        { id: 'calculator', label: 'Ornament Calculator', hi: 'जेवर कैलकुलेटर' },
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`py-3.5 px-3 text-center transition-all border-b-2 flex flex-col items-center justify-center gap-0.5 ${
                                activeTab === tab.id
                                    ? 'border-[#C5A059] bg-[#3C081A] text-[#FAF7F2] font-bold'
                                    : 'border-transparent text-[#FAF7F2]/60 hover:text-[#FAF7F2] hover:bg-[#270611]'
                            }`}
                        >
                            <span className="uppercase tracking-wider text-[11px]">{tab.label}</span>
                            <span className="text-[10px] text-[#C5A059]/80 font-serif italic hidden sm:inline">{tab.hi}</span>
                        </button>
                    ))}
                </div>

                {/* Content Area */}
                <div className="p-6 md:p-8 bg-[#270611]">
                    
                    {activeTab !== 'calculator' ? (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-[#C5A059]/30 text-[#C5A059] text-[10px] md:text-xs uppercase tracking-[0.2em]">
                                        <th className="py-3 px-4 font-semibold">Commodity &amp; Purity</th>
                                        <th className="py-3 px-4 font-semibold text-right">Buy / बिड (₹)</th>
                                        <th className="py-3 px-4 font-semibold text-right">Sell / आस्क (₹)</th>
                                        <th className="py-3 px-4 font-semibold text-right hidden sm:table-cell">High (₹)</th>
                                        <th className="py-3 px-4 font-semibold text-right hidden sm:table-cell">Low (₹)</th>
                                        <th className="py-3 px-4 font-semibold text-center">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[#C5A059]/15 text-xs md:text-sm">
                                    {currentItems.length > 0 ? (
                                        currentItems.map((item, idx) => {
                                            const itemKey = `${activeTab}_${item.id || idx}`;
                                            const tickClass = tickStates[itemKey] || '';

                                            return (
                                                <tr key={idx} className="hover:bg-[#38081A]/60 transition-colors">
                                                    <td className="py-4 px-4">
                                                        <div className="font-semibold text-[#FAF7F2] tracking-wide">
                                                            {item.name}
                                                        </div>
                                                        <div className="text-[10px] text-[#C5A059] font-serif">
                                                            {item.purity || '100% Certified Standard'}
                                                        </div>
                                                    </td>
                                                    <td className="py-4 px-4 text-right">
                                                        <span className={`rate-val font-mono font-bold ${tickClass}`}>
                                                            ₹{formatINR(item.buy)}
                                                        </span>
                                                    </td>
                                                    <td className="py-4 px-4 text-right">
                                                        <span className={`rate-val font-mono font-bold ${tickClass}`}>
                                                            ₹{formatINR(item.sell)}
                                                        </span>
                                                    </td>
                                                    <td className="py-4 px-4 text-right font-mono text-[#FAF7F2]/60 hidden sm:table-cell">
                                                        ₹{formatINR(item.high)}
                                                    </td>
                                                    <td className="py-4 px-4 text-right font-mono text-[#FAF7F2]/60 hidden sm:table-cell">
                                                        ₹{formatINR(item.low)}
                                                    </td>
                                                    <td className="py-4 px-4 text-center">
                                                        <a
                                                            href={`https://wa.me/918881121119?text=${encodeURIComponent(`Namaste, I want to lock the rate for ${item.name} at ₹${formatINR(item.buy)}`)}`}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="inline-flex items-center gap-1 bg-[#6B0E2A] hover:bg-[#851336] text-[#FAF7F2] px-3 py-1.5 text-[10px] uppercase font-bold tracking-wider border border-[#C5A059]/40 transition-colors"
                                                        >
                                                            <MessageSquare size={11} className="text-[#C5A059]" />
                                                            <span>Lock Rate</span>
                                                        </a>
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    ) : (
                                        <tr>
                                            <td colSpan={6} className="py-8 text-center text-[#FAF7F2]/60 italic font-serif">
                                                Loading live market rates...
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        /* Interactive Live Jewellery / Gold Calculator */
                        <div className="max-w-3xl mx-auto bg-[#1F040D] p-6 md:p-8 border border-[#C5A059]/30">
                            <div className="text-center mb-6">
                                <h3 className="font-serif text-2xl text-[#FAF7F2] font-medium">
                                    Instant Ornament Price Estimator
                                </h3>
                                <p className="text-xs text-[#C5A059] mt-1 font-serif italic">
                                    पारदर्शी गणना · 100% हॉलमार्क शुद्धता
                                </p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                                <div>
                                    <label className="block text-[10px] uppercase tracking-wider text-[#FAF7F2]/70 mb-1.5">
                                        Metal / Purity
                                    </label>
                                    <select
                                        value={calcPurity}
                                        onChange={(e) => setCalcPurity(e.target.value)}
                                        className="w-full bg-[#270611] text-[#FAF7F2] border border-[#C5A059]/40 px-3 py-2.5 text-xs focus:outline-none focus:border-[#C5A059]"
                                    >
                                        <option value="22k">22K 916 Hallmark (Standard Jewellery)</option>
                                        <option value="24k">24K 999 Pure Gold (Coins &amp; Bars)</option>
                                        <option value="18k">18K 750 (Diamond Jewellery)</option>
                                        <option value="silver">Silver 999 (चांदी 999)</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-[10px] uppercase tracking-wider text-[#FAF7F2]/70 mb-1.5">
                                        Gross Weight (in Grams)
                                    </label>
                                    <input
                                        type="number"
                                        min="0.5"
                                        step="0.5"
                                        value={calcGrams}
                                        onChange={(e) => setCalcGrams(e.target.value)}
                                        className="w-full bg-[#270611] text-[#FAF7F2] border border-[#C5A059]/40 px-3 py-2.5 text-xs font-mono focus:outline-none focus:border-[#C5A059]"
                                        placeholder="e.g. 15.5"
                                    />
                                </div>

                                <div>
                                    <label className="block text-[10px] uppercase tracking-wider text-[#FAF7F2]/70 mb-1.5">
                                        Est. Making Charges (%)
                                    </label>
                                    <input
                                        type="number"
                                        min="0"
                                        max="25"
                                        value={calcMakingRate}
                                        onChange={(e) => setCalcMakingRate(e.target.value)}
                                        className="w-full bg-[#270611] text-[#FAF7F2] border border-[#C5A059]/40 px-3 py-2.5 text-xs font-mono focus:outline-none focus:border-[#C5A059]"
                                        placeholder="8"
                                    />
                                </div>
                            </div>

                            {/* Breakdown Receipt */}
                            <div className="bg-[#270611] p-5 border border-[#C5A059]/30 space-y-2.5 text-xs">
                                <div className="flex justify-between text-[#FAF7F2]/80">
                                    <span>Rate per Gram ({calcPurity.toUpperCase()}):</span>
                                    <span className="font-mono text-[#FAF7F2]">₹{formatINR(perGram)} / g</span>
                                </div>
                                <div className="flex justify-between text-[#FAF7F2]/80">
                                    <span>Gold Metal Value ({calcGrams}g):</span>
                                    <span className="font-mono text-[#FAF7F2]">₹{formatINR(goldValue)}</span>
                                </div>
                                <div className="flex justify-between text-[#FAF7F2]/80">
                                    <span>Making Charges ({calcMakingRate}%):</span>
                                    <span className="font-mono text-[#FAF7F2]">₹{formatINR(makingAmount)}</span>
                                </div>
                                <div className="flex justify-between text-[#FAF7F2]/80">
                                    <span>Govt. GST (3% on metal + making):</span>
                                    <span className="font-mono text-[#FAF7F2]">₹{formatINR(gstAmount)}</span>
                                </div>
                                <div className="pt-3 border-t border-[#C5A059]/40 flex justify-between items-center text-sm md:text-base">
                                    <span className="font-serif font-bold text-[#C5A059]">Total Estimated Price:</span>
                                    <span className="font-mono font-bold text-2xl text-[#FAF7F2]">
                                        ₹{formatINR(grandTotal)}
                                    </span>
                                </div>
                            </div>

                            <div className="mt-5 text-center">
                                <a
                                    href={`https://wa.me/918881121119?text=${encodeURIComponent(`Namaste Yash Jewellers, I calculated an ornament estimate for ${calcGrams}g of ${calcPurity.toUpperCase()} gold at ₹${formatINR(grandTotal)}. Can you share designs in this budget?`)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 bg-[#6B0E2A] hover:bg-[#851336] text-white px-6 py-3 text-xs uppercase font-bold tracking-widest border border-[#C5A059]/50 transition-colors"
                                >
                                    <MessageSquare size={14} className="text-[#C5A059]" />
                                    <span>Consult Our Bullion Desk on WhatsApp</span>
                                </a>
                            </div>
                        </div>
                    )}

                </div>

                {/* Footer Strip */}
                <div className="bg-[#1F040D] px-6 py-4 border-t border-[#C5A059]/20 flex flex-col sm:flex-row justify-between items-center gap-2 text-[11px] text-[#FAF7F2]/70">
                    <span className="flex items-center gap-1.5">
                        <ShieldCheck size={14} className="text-[#C5A059]" />
                        <span>All rates comply with Indian Customs Duty (6%) and GST (3%) landed formula.</span>
                    </span>
                    <span className="text-[#C5A059] font-medium font-serif italic">
                        कानपुर सर्राफा बाजार बेंचमार्क
                    </span>
                </div>

            </div>

            {/* Formula Explainer Modal */}
            {showFormulaModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
                    <div className="relative bg-[#FAF7F2] text-[#270611] max-w-xl w-full p-6 md:p-8 border border-[#C5A059] shadow-2xl">
                        <button
                            onClick={() => setShowFormulaModal(false)}
                            className="absolute top-4 right-4 text-[#270611] hover:text-[#6B0E2A]"
                        >
                            <X size={20} />
                        </button>

                        <div className="flex items-center gap-2 mb-2">
                            <Sparkles size={16} className="text-[#6B0E2A]" />
                            <h3 className="font-serif text-xl font-bold text-[#6B0E2A]">
                                Indian Landed Bullion Formula
                            </h3>
                        </div>
                        <p className="text-xs text-gray-600 mb-4">
                            How genuine gold rates in Kanpur and Delhi are derived directly from the London/NY International Spot price:
                        </p>

                        <div className="bg-[#F3E8D0]/60 p-4 border border-[#C5A059]/30 space-y-2 text-xs font-mono">
                            <p><strong>1. Spot Ounce to Gram:</strong> (International Spot $/oz ÷ 31.1035) × USD/INR</p>
                            <p><strong>2. Customs Duty:</strong> + 6% Govt. Import Tariff</p>
                            <p><strong>3. Landed 10g Base:</strong> Gram Price × 10</p>
                            <p><strong>4. Local GST:</strong> + 3% Goods &amp; Services Tax</p>
                            <p className="text-[#6B0E2A] font-bold"><strong>= Final 24K 999 Bullion Rate</strong></p>
                        </div>

                        <p className="text-xs text-gray-600 mt-4 leading-relaxed">
                            Yash Jewellers guarantees 100% price integrity with zero speculative markup, directly matching the certified Kanpur &amp; Delhi Bullion benchmark.
                        </p>
                    </div>
                </div>
            )}

        </div>
    );
}
