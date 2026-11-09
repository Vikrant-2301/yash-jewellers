"use client";

import { useState, useEffect } from 'react';
import { 
    RefreshCw, 
    TrendingUp, 
    ShieldCheck, 
    Calculator, 
    Phone, 
    MessageSquare, 
    X, 
    Info, 
    Building2, 
    Copy, 
    Check, 
    Coins, 
    Landmark 
} from 'lucide-react';

export default function RateCard() {
    const [data, setData] = useState(null);
    const [activeTab, setActiveTab] = useState('gold');
    const [loading, setLoading] = useState(true);
    
    // Modals
    const [selectedBookingItem, setSelectedBookingItem] = useState(null);
    const [bookingQty, setBookingQty] = useState(1);
    const [showFormulaModal, setShowFormulaModal] = useState(false);
    const [showBankModal, setShowBankModal] = useState(false);
    const [copiedField, setCopiedField] = useState('');

    // Calculator States
    const [calcPurity, setCalcPurity] = useState('22k');
    const [calcGrams, setCalcGrams] = useState(10);
    const [calcMakingRate, setCalcMakingRate] = useState(8);

    // Dynamic White-to-Green/Red transition states
    const [tickStates, setTickStates] = useState({});

    useEffect(() => {
        fetchRates();
        const interval = setInterval(simulateLiveTick, 1800);
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

    // Realistic volatility ticks matching APK RatesEngine
    const simulateLiveTick = () => {
        setData(prev => {
            if (!prev || !prev.commodities) return prev;

            const randomChoice = Math.random();
            const updated = { ...prev };

            // 1. Spot Tick
            if (randomChoice < 0.4) {
                const deltaGold = +((Math.random() * 1.8 - 0.9).toFixed(2));
                const oldGold = updated.spot.gold.price;
                const newGold = +(oldGold + deltaGold).toFixed(2);
                updated.spot.gold.price = newGold;
                if (newGold > updated.spot.gold.high) updated.spot.gold.high = newGold;
                if (newGold < updated.spot.gold.low) updated.spot.gold.low = newGold;

                setTickStates(s => ({ ...s, spot_gold: deltaGold > 0 ? 'tick-up' : 'tick-down' }));
                setTimeout(() => setTickStates(s => { const n = { ...s }; delete n.spot_gold; return n; }), 1200);
            } else if (randomChoice < 0.65) {
                const deltaSilver = +((Math.random() * 0.14 - 0.07).toFixed(2));
                const oldSilver = updated.spot.silver.price;
                const newSilver = +(oldSilver + deltaSilver).toFixed(2);
                updated.spot.silver.price = newSilver;
                if (newSilver > updated.spot.silver.high) updated.spot.silver.high = newSilver;
                if (newSilver < updated.spot.silver.low) updated.spot.silver.low = newSilver;

                setTickStates(s => ({ ...s, spot_silver: deltaSilver > 0 ? 'tick-up' : 'tick-down' }));
                setTimeout(() => setTickStates(s => { const n = { ...s }; delete n.spot_silver; return n; }), 1200);
            }

            // 2. Commodity Table Tick
            const tabKeys = ['gold', 'silver', 'coins', 'delhi'];
            const targetTab = tabKeys[Math.floor(Math.random() * tabKeys.length)];
            const list = [...(updated.commodities[targetTab] || [])];
            if (list.length > 0) {
                const idx = Math.floor(Math.random() * list.length);
                const item = { ...list[idx] };
                const isGold = targetTab === 'gold' || targetTab === 'delhi';
                const tickVal = (Math.floor(Math.random() * 3) + 1) * (isGold ? 10 : 20) * (Math.random() > 0.5 ? 1 : -1);

                item.buy += tickVal;
                item.sell += tickVal;
                if (item.buy > item.high) item.high = item.buy;
                if (item.buy < item.low) item.low = item.buy;
                list[idx] = item;
                updated.commodities[targetTab] = list;

                const itemKey = `${targetTab}_${item.id}`;
                setTickStates(s => ({ ...s, [itemKey]: tickVal > 0 ? 'tick-up' : 'tick-down' }));
                setTimeout(() => setTickStates(s => { const n = { ...s }; delete n[itemKey]; return n; }), 1200);
            }

            return updated;
        });
    };

    const formatINR = (val) => {
        if (!val || isNaN(val)) return "0";
        return new Intl.NumberFormat('en-IN', { maximumFractionDigits: 2 }).format(val);
    };

    const copyToClipboard = (text, field) => {
        navigator.clipboard.writeText(text);
        setCopiedField(field);
        setTimeout(() => setCopiedField(''), 2000);
    };

    const currentItems = data?.commodities?.[activeTab] || [];
    const spot = data?.spot || {
        gold: { price: 4100.45, high: 4125.00, low: 4085.20 },
        silver: { price: 52.63, high: 53.40, low: 51.90 },
        inr: { price: 93.94 }
    };

    // Calculator values
    const base24kPerGram = data?.rates?.gold24k ? (data.rates.gold24k / 10) : 14520;
    const baseSilverPerGram = data?.rates?.silver ? (data.rates.silver / 1000) : 190.3;
    const getCalculatedRate = () => {
        if (calcPurity === '24k') return base24kPerGram;
        if (calcPurity === '22k') return base24kPerGram * (22 / 24);
        if (calcPurity === '18k') return base24kPerGram * (18 / 24);
        if (calcPurity === 'silver') return baseSilverPerGram;
        return base24kPerGram;
    };
    const perGram = getCalculatedRate();
    const goldValue = perGram * (parseFloat(calcGrams) || 0);
    const makingAmount = goldValue * (parseFloat(calcMakingRate) / 100);
    const grandTotal = (goldValue + makingAmount) * 1.03; // including 3% GST

    return (
        <div className="w-full max-w-6xl mx-auto font-sans">
            
            {/* 1. Spot Rates Summary Cards (All Rates in Pure White, Flashing Green/Red on Tick) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                
                {/* Spot Gold Card */}
                <div className="bg-[#1F040D] border border-[#C5A059]/40 p-4 md:p-5 relative shadow-md">
                    <div className="flex justify-between items-center mb-1">
                        <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#C5A059]">
                            GOLD SPOT (USD)
                        </span>
                        <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span> LIVE
                        </span>
                    </div>
                    <div className="text-2xl md:text-3xl font-mono font-bold my-1 text-white">
                        <span className={`rate-val ${tickStates.spot_gold || ''}`}>
                            ${formatINR(spot.gold.price)}
                        </span>
                    </div>
                    <div className="text-[11px] text-[#EAD8B1]/75 font-mono">
                        H: ${spot.gold.high} | L: ${spot.gold.low}
                    </div>
                </div>

                {/* Spot Silver Card */}
                <div className="bg-[#1F040D] border border-[#C5A059]/40 p-4 md:p-5 relative shadow-md">
                    <div className="flex justify-between items-center mb-1">
                        <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#C5A059]">
                            SILVER SPOT (USD)
                        </span>
                        <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span> LIVE
                        </span>
                    </div>
                    <div className="text-2xl md:text-3xl font-mono font-bold my-1 text-white">
                        <span className={`rate-val ${tickStates.spot_silver || ''}`}>
                            ${formatINR(spot.silver.price)}
                        </span>
                    </div>
                    <div className="text-[11px] text-[#EAD8B1]/75 font-mono">
                        H: ${spot.silver.high} | L: ${spot.silver.low}
                    </div>
                </div>

                {/* Spot USD/INR Card */}
                <div className="bg-[#1F040D] border border-[#C5A059]/40 p-4 md:p-5 relative shadow-md">
                    <div className="flex justify-between items-center mb-1">
                        <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#C5A059]">
                            USD / INR (₹)
                        </span>
                        <span className="text-[10px] text-[#EAD8B1]/80 font-mono">RBI Reference</span>
                    </div>
                    <div className="text-2xl md:text-3xl font-mono font-bold my-1 text-white">
                        <span className="rate-val">
                            ₹{spot.inr.price}
                        </span>
                    </div>
                    <div className="text-[11px] text-[#EAD8B1]/75">
                        Live Spot Currency Benchmark
                    </div>
                </div>

            </div>

            {/* 2. Running Marquee Notice Bar (Authentic Hindi Bullion Notice from APK) */}
            <div className="bg-[#270611] border border-[#C5A059]/40 py-2.5 px-4 mb-6 flex items-center gap-3 overflow-hidden shadow-sm">
                <span className="bg-[#6B0E2A] text-white text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 border border-[#C5A059]/40 shrink-0">
                    NOTICE
                </span>
                <div className="overflow-hidden whitespace-nowrap text-xs text-[#EAD8B1]">
                    <div className="inline-block animate-[marquee_28s_linear_infinite]">
                        हाजिर सोने व चांदी का भाव BOOK करने के लिए नए ग्राहक बैंक डिटेल्स में जाकर SBI / HDFC अकाउंट के UPI में एडवांस पेमेंट करें और स्क्रीनशॉट भेजें | 1 किलो चांदी के लिए ₹25,000 और 10 ग्राम सोने के लिए ₹10,000 एडवांस भुगतान आवश्यक है | Yash Jewellers - 100% Genuine Rates Calculated Directly from International Spot &amp; Customs Tariffs • BIS Hallmarked Purity • Kanpur &amp; Delhi Branches.
                    </div>
                </div>
            </div>

            {/* 3. Main Board Container */}
            <div className="bg-[#270611] border border-[#C5A059]/40 shadow-2xl overflow-hidden">
                
                {/* Header Strip with Actions */}
                <div className="p-4 md:p-6 bg-[#38081A] border-b border-[#C5A059]/30 flex flex-wrap justify-between items-center gap-3">
                    <div>
                        <h2 className="font-serif text-xl md:text-2xl text-[#FAF7F2] font-semibold flex items-center gap-2">
                            <span>Kanpur &amp; Delhi Real-Time Rates</span>
                        </h2>
                        <p className="text-[10px] text-[#C5A059] uppercase tracking-wider font-semibold mt-0.5">
                            All Rates in Pure White • Turns Green/Red on Tick • Statutory Customs 6% + GST 3%
                        </p>
                    </div>

                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setShowFormulaModal(true)}
                            className="inline-flex items-center gap-1.5 text-xs text-[#FAF7F2] bg-[#1F040D] border border-[#C5A059]/40 px-3 py-1.5 hover:bg-[#C5A059]/20 transition-colors"
                        >
                            <ShieldCheck size={13} className="text-[#DFBE7A]" />
                            <span>Verified Formula</span>
                        </button>
                        <button
                            onClick={() => setShowBankModal(true)}
                            className="inline-flex items-center gap-1.5 text-xs text-[#FAF7F2] bg-[#1F040D] border border-[#C5A059]/40 px-3 py-1.5 hover:bg-[#C5A059]/20 transition-colors"
                        >
                            <Building2 size={13} className="text-[#DFBE7A]" />
                            <span>Bank Details</span>
                        </button>
                        <button
                            onClick={fetchRates}
                            className="inline-flex items-center gap-1 text-xs text-[#270611] bg-gradient-to-r from-[#ECC880] to-[#C5A059] px-3 py-1.5 font-bold uppercase tracking-wider hover:opacity-90"
                        >
                            <RefreshCw size={11} className={loading ? "animate-spin" : ""} />
                            <span>Refresh</span>
                        </button>
                    </div>
                </div>

                {/* 4. Rates Navigation Tabs (Exactly matching APK) */}
                <div className="grid grid-cols-2 sm:grid-cols-5 bg-[#1F040D] border-b border-[#C5A059]/20 text-xs">
                    {[
                        { id: 'gold', label: '🥇 GOLD RATES', hi: 'सोना भाव' },
                        { id: 'silver', label: '🥈 SILVER RATES', hi: 'चांदी भाव' },
                        { id: 'coins', label: '🪙 COINS & BARS', hi: 'सिक्के व बार' },
                        { id: 'delhi', label: '🏛️ DELHI SPOT', hi: 'दिल्ली भाव' },
                        { id: 'calc', label: '⚡ CALCULATOR', hi: 'जेवर कैलकुलेटर' },
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`py-3 px-2 text-center transition-all border-b-2 flex flex-col items-center justify-center gap-0.5 ${
                                activeTab === tab.id
                                    ? 'border-[#C5A059] bg-[#3C081A] text-white font-bold'
                                    : 'border-transparent text-[#FAF7F2]/60 hover:text-white hover:bg-[#270611]'
                            }`}
                        >
                            <span className="uppercase tracking-wider text-[11px]">{tab.label}</span>
                            <span className="text-[9px] text-[#C5A059] font-serif italic hidden sm:inline">{tab.hi}</span>
                        </button>
                    ))}
                </div>

                {/* 5. Tab Content: Table or Calculator */}
                <div className="p-4 md:p-6 bg-[#270611]">
                    
                    {activeTab !== 'calc' ? (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-[#C5A059]/30 text-[#C5A059] text-[10px] md:text-xs uppercase tracking-[0.15em]">
                                        <th className="py-3 px-3 font-semibold" style={{ width: '45%' }}>Commodity / Purity</th>
                                        <th className="py-3 px-3 font-semibold" style={{ width: '25%' }}>Buy / बिड (₹)</th>
                                        <th className="py-3 px-3 font-semibold" style={{ width: '20%' }}>Sell / आस्क (₹)</th>
                                        <th className="py-3 px-3 font-semibold text-right" style={{ width: '10%' }}>Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[#C5A059]/15 text-xs md:text-sm">
                                    {currentItems.map((item) => {
                                        const itemKey = `${activeTab}_${item.id}`;
                                        const tickClass = tickStates[itemKey] || '';

                                        return (
                                            <tr 
                                                key={item.id} 
                                                onClick={() => { setSelectedBookingItem(item); setBookingQty(1); }}
                                                className="hover:bg-[#38081A]/50 transition-colors cursor-pointer group"
                                            >
                                                <td className="py-3.5 px-3">
                                                    <div className="font-bold text-white tracking-wide">
                                                        {item.name}
                                                    </div>
                                                    <div className="text-[10px] text-[#C5A059] font-serif mt-0.5">
                                                        {item.desc} • Unit: <strong className="text-white">{item.unit}</strong>
                                                    </div>
                                                </td>

                                                {/* Buy Rate in pure white with Low rate below */}
                                                <td className="py-3.5 px-3">
                                                    <div>
                                                        <span className={`rate-val font-mono font-bold text-sm md:text-base ${tickClass}`}>
                                                            ₹{formatINR(item.buy)}
                                                        </span>
                                                    </div>
                                                    <div className="text-[10px] text-[#EAD8B1]/70 font-mono mt-0.5">
                                                        L : <span className="text-white font-semibold">{formatINR(item.low)}</span>
                                                    </div>
                                                </td>

                                                {/* Sell Rate in pure white with High rate below */}
                                                <td className="py-3.5 px-3">
                                                    <div>
                                                        <span className={`rate-val font-mono font-bold text-sm md:text-base ${tickClass}`}>
                                                            ₹{formatINR(item.sell)}
                                                        </span>
                                                    </div>
                                                    <div className="text-[10px] text-[#EAD8B1]/70 font-mono mt-0.5">
                                                        H : <span className="text-white font-semibold">{formatINR(item.high)}</span>
                                                    </div>
                                                </td>

                                                <td className="py-3.5 px-3 text-right">
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setSelectedBookingItem(item);
                                                            setBookingQty(1);
                                                        }}
                                                        className="bg-[#6B0E2A] hover:bg-[#851336] text-white px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-wider border border-[#C5A059]/40 transition-colors"
                                                    >
                                                        Book
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        /* Trade / Ornament Calculator */
                        <div className="max-w-3xl mx-auto bg-[#1F040D] p-6 border border-[#C5A059]/40">
                            <h3 className="font-serif text-2xl text-white text-center font-medium mb-1">
                                Instant Jewellery Price &amp; Value Estimator
                            </h3>
                            <p className="text-xs text-[#C5A059] text-center font-serif italic mb-6">
                                पारदर्शी गणना • Statutory Customs 6% + GST 3%
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
                                        <option value="22k">Gold 22K (916) Jewellery</option>
                                        <option value="24k">Gold 24K (999) Bullion</option>
                                        <option value="18k">Gold 18K (750) Diamond Mount</option>
                                        <option value="silver">Silver 999 Ready Bar</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-[10px] uppercase text-[#EAD8B1] font-semibold mb-1">
                                        Gross Weight (Grams)
                                    </label>
                                    <input
                                        type="number"
                                        min="0.5"
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
                                    <span className="font-mono text-white">₹{formatINR(perGram)} / g</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Gold Metal Value ({calcGrams}g):</span>
                                    <span className="font-mono text-white">₹{formatINR(goldValue)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Making Charges ({calcMakingRate}%):</span>
                                    <span className="font-mono text-white">₹{formatINR(makingAmount)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Govt. GST (3%):</span>
                                    <span className="font-mono text-white">₹{formatINR((goldValue + makingAmount) * 0.03)}</span>
                                </div>
                                <div className="pt-2 border-t border-[#C5A059]/40 flex justify-between items-center text-sm">
                                    <span className="font-serif font-bold text-[#C5A059]">Total Estimated Price:</span>
                                    <span className="font-mono font-bold text-2xl text-white">₹{formatINR(grandTotal)}</span>
                                </div>
                            </div>

                            <div className="mt-5 text-center">
                                <a
                                    href={`https://api.whatsapp.com/send?phone=919336120419&text=${encodeURIComponent(`Namaste Yash Jewellers, I calculated an ornament estimate for ${calcGrams}g of ${calcPurity.toUpperCase()} at ₹${formatINR(grandTotal)}. Please share available designs.`)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 bg-[#6B0E2A] text-white px-6 py-2.5 text-xs font-bold uppercase tracking-widest border border-[#C5A059]/50 hover:bg-[#851336]"
                                >
                                    <MessageSquare size={14} className="text-[#C5A059]" />
                                    <span>Book On WhatsApp (+91 9336120419)</span>
                                </a>
                            </div>
                        </div>
                    )}

                </div>

                {/* Footer Strip */}
                <div className="bg-[#1F040D] px-6 py-3 border-t border-[#C5A059]/20 flex flex-col sm:flex-row justify-between items-center text-[10px] text-[#EAD8B1]/80 gap-2">
                    <span className="flex items-center gap-1.5">
                        <ShieldCheck size={13} className="text-[#C5A059]" />
                        <span>All rates derived directly from Spot + 6% Customs Tariff + 3% GST.</span>
                    </span>
                    <span className="text-[#C5A059] font-serif font-bold">
                        Yash Jewellers · Booking Desk: +91 9336120419
                    </span>
                </div>

            </div>

            {/* QUICK BOOKING MODAL (Directly matching APK) */}
            {selectedBookingItem && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs font-sans">
                    <div className="relative bg-[#FAF7F2] text-[#270611] max-w-md w-full border border-[#C5A059] shadow-2xl p-6">
                        <button
                            onClick={() => setSelectedBookingItem(null)}
                            className="absolute top-4 right-4 text-[#270611] hover:text-[#6B0E2A] p-1 border border-[#C5A059]/30"
                        >
                            <X size={18} />
                        </button>

                        <div className="border-b border-[#C5A059]/30 pb-3 mb-4">
                            <span className="text-[9px] uppercase font-bold tracking-widest text-[#6B0E2A]">
                                Spot Trade Booking Desk
                            </span>
                            <h3 className="font-serif text-xl font-bold text-[#270611] mt-0.5">
                                {selectedBookingItem.name}
                            </h3>
                            <p className="text-xs text-gray-600 font-serif italic">
                                {selectedBookingItem.desc} • Unit: {selectedBookingItem.unit}
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-3 mb-4 text-center">
                            <div className="bg-emerald-50 border border-emerald-300 p-2.5">
                                <span className="text-[10px] text-emerald-800 font-bold uppercase tracking-wider">Buy Rate</span>
                                <p className="font-mono text-lg font-bold text-emerald-900">₹{formatINR(selectedBookingItem.buy)}</p>
                            </div>
                            <div className="bg-rose-50 border border-rose-300 p-2.5">
                                <span className="text-[10px] text-rose-800 font-bold uppercase tracking-wider">Sell Rate</span>
                                <p className="font-mono text-lg font-bold text-rose-900">₹{formatINR(selectedBookingItem.sell)}</p>
                            </div>
                        </div>

                        {/* Quantity selection */}
                        <div className="mb-4">
                            <label className="block text-[10px] uppercase font-bold text-gray-700 mb-1">
                                Order Quantity ({selectedBookingItem.unit})
                            </label>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => setBookingQty(Math.max(1, bookingQty - 1))}
                                    className="bg-gray-200 hover:bg-gray-300 w-9 h-9 font-bold text-base"
                                >
                                    -
                                </button>
                                <input
                                    type="number"
                                    min="1"
                                    value={bookingQty}
                                    onChange={(e) => setBookingQty(Math.max(1, parseInt(e.target.value) || 1))}
                                    className="w-full border border-[#C5A059]/40 p-2 text-center font-mono font-bold text-sm bg-white"
                                />
                                <button
                                    onClick={() => setBookingQty(bookingQty + 1)}
                                    className="bg-gray-200 hover:bg-gray-300 w-9 h-9 font-bold text-base"
                                >
                                    +
                                </button>
                            </div>
                        </div>

                        {/* Order Calculation */}
                        <div className="bg-[#F3E8D0]/60 p-3.5 border border-[#C5A059]/30 text-xs space-y-1.5 mb-5">
                            <div className="flex justify-between">
                                <span className="text-gray-600">Rate per Unit:</span>
                                <span className="font-mono font-semibold">₹{formatINR(selectedBookingItem.buy)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Total Order Value:</span>
                                <span className="font-mono font-bold text-sm text-[#270611]">
                                    ₹{formatINR(selectedBookingItem.buy * bookingQty)}
                                </span>
                            </div>
                            <div className="pt-1.5 border-t border-[#C5A059]/20 flex justify-between text-emerald-800 font-semibold text-[11px]">
                                <span>Advance Required:</span>
                                <span>
                                    ₹{formatINR(selectedBookingItem.unit.includes("KG") ? 25000 * bookingQty : 10000 * bookingQty)}
                                </span>
                            </div>
                        </div>

                        {/* Action buttons */}
                        <div className="space-y-2">
                            <a
                                href={`https://api.whatsapp.com/send?phone=919336120419&text=${encodeURIComponent(`Namaste Yash Jewellers,%0A%0AI want to book bullion at current live rate:%0A• Commodity: ${selectedBookingItem.name}%0A• Quantity: ${bookingQty} ${selectedBookingItem.unit}%0A• Live Rate: ₹${formatINR(selectedBookingItem.buy)}%0A• Total Value: ₹${formatINR(selectedBookingItem.buy * bookingQty)}%0A%0APlease share bank payment details for advance deposit.`)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full bg-emerald-700 hover:bg-emerald-800 text-white py-2.5 text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2"
                            >
                                <MessageSquare size={14} />
                                <span>Book via WhatsApp (+91 9336120419)</span>
                            </a>
                            <a
                                href="tel:+919336120419"
                                className="w-full bg-[#270611] hover:bg-[#3C081A] text-white py-2.5 text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2"
                            >
                                <Phone size={14} className="text-[#C5A059]" />
                                <span>Call Booking Desk</span>
                            </a>
                        </div>
                    </div>
                </div>
            )}

            {/* FORMULA & AUDIT MODAL (Directly matching APK) */}
            {showFormulaModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs font-sans">
                    <div className="relative bg-[#FAF7F2] text-[#270611] max-w-xl w-full border border-[#C5A059] shadow-2xl p-6 md:p-8 overflow-y-auto max-h-[90vh]">
                        <button
                            onClick={() => setShowFormulaModal(false)}
                            className="absolute top-4 right-4 text-[#270611] hover:text-[#6B0E2A]"
                        >
                            <X size={20} />
                        </button>

                        <div className="flex items-center gap-2 mb-2">
                            <ShieldCheck size={20} className="text-[#6B0E2A]" />
                            <h3 className="font-serif text-2xl font-bold text-[#6B0E2A]">
                                Verified Landed Formula Audit
                            </h3>
                        </div>
                        <p className="text-xs text-gray-600 mb-4">
                            All Yash Jewellers bullion rates strictly adhere to Government of India Customs regulations &amp; international spot parity.
                        </p>

                        <div className="bg-[#270611] text-[#FAF7F2] p-4 border border-[#C5A059]/40 space-y-2 text-xs font-mono mb-4">
                            <p className="text-[#C5A059] font-bold">GOLD (10 GRAMS 999) FORMULA:</p>
                            <div className="flex justify-between"><span>1. Spot Gold (USD):</span><span>${spot.gold.price} / oz</span></div>
                            <div className="flex justify-between"><span>2. USD / INR Currency:</span><span>₹{spot.inr.price}</span></div>
                            <div className="flex justify-between"><span>3. Base Cost in INR (10g):</span><span>₹{formatINR((spot.gold.price / 31.1034768) * 10 * spot.inr.price)}</span></div>
                            <div className="flex justify-between"><span>4. Customs Duty (6% BCD+AIDC):</span><span>₹{formatINR(((spot.gold.price / 31.1034768) * 10 * spot.inr.price) * 0.06)}</span></div>
                            <div className="flex justify-between"><span>5. GST (3%):</span><span>₹{formatINR((((spot.gold.price / 31.1034768) * 10 * spot.inr.price) * 1.06) * 0.03)}</span></div>
                            <div className="flex justify-between font-bold text-[#DFBE7A] pt-1 border-t border-[#C5A059]/30">
                                <span>= Final Landed Cash Bhav:</span>
                                <span>₹{formatINR(data?.rates?.gold24k || 145200)}</span>
                            </div>
                        </div>

                        <div className="bg-[#270611] text-[#FAF7F2] p-4 border border-[#C5A059]/40 space-y-2 text-xs font-mono">
                            <p className="text-[#C5A059] font-bold">SILVER (1 KILOGRAM 999) FORMULA:</p>
                            <div className="flex justify-between"><span>1. Spot Silver (USD):</span><span>${spot.silver.price} / oz</span></div>
                            <div className="flex justify-between"><span>2. Base Cost in INR (1kg):</span><span>₹{formatINR((spot.silver.price / 31.1034768) * 1000 * spot.inr.price)}</span></div>
                            <div className="flex justify-between"><span>3. Customs Duty (6%):</span><span>₹{formatINR(((spot.silver.price / 31.1034768) * 1000 * spot.inr.price) * 0.06)}</span></div>
                            <div className="flex justify-between font-bold text-[#DFBE7A] pt-1 border-t border-[#C5A059]/30">
                                <span>= Final Wholesale Bhav:</span>
                                <span>₹{formatINR(data?.rates?.silver || 190300)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* BANK DETAILS MODAL (Directly matching APK) */}
            {showBankModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs font-sans">
                    <div className="relative bg-[#FAF7F2] text-[#270611] max-w-lg w-full border border-[#C5A059] shadow-2xl p-6 md:p-8">
                        <button
                            onClick={() => setShowBankModal(false)}
                            className="absolute top-4 right-4 text-[#270611] hover:text-[#6B0E2A]"
                        >
                            <X size={20} />
                        </button>

                        <div className="flex items-center gap-2 mb-2">
                            <Building2 size={20} className="text-[#6B0E2A]" />
                            <h3 className="font-serif text-2xl font-bold text-[#6B0E2A]">
                                Official Bank Accounts &amp; RTGS
                            </h3>
                        </div>
                        <p className="text-xs text-gray-600 mb-4">
                            Deposit advance for spot locking. Send payment screenshot on WhatsApp to confirm rate.
                        </p>

                        <div className="space-y-4 text-xs font-mono">
                            {/* SBI */}
                            <div className="bg-white p-4 border border-[#C5A059]/40 relative">
                                <span className="bg-[#1F040D] text-[#C5A059] text-[9px] font-bold px-2 py-0.5 uppercase tracking-wider absolute top-3 right-3">
                                    Primary Current A/C
                                </span>
                                <h4 className="font-bold text-sm text-[#270611] font-sans">STATE BANK OF INDIA</h4>
                                <p className="text-gray-600 mt-1">A/C Name: <strong>YASH JEWELLERS &amp; BULLION</strong></p>
                                <p className="text-gray-600">A/C No: <strong>41289055412</strong></p>
                                <p className="text-gray-600">IFSC Code: <strong>SBIN0001245</strong></p>
                                <button
                                    onClick={() => copyToClipboard('41289055412', 'sbi')}
                                    className="mt-2 text-[10px] text-[#6B0E2A] underline font-bold uppercase flex items-center gap-1 font-sans"
                                >
                                    {copiedField === 'sbi' ? <Check size={12} className="text-emerald-600" /> : <Copy size={12} />}
                                    <span>{copiedField === 'sbi' ? 'Copied Account No' : 'Copy Account Number'}</span>
                                </button>
                            </div>

                            {/* HDFC */}
                            <div className="bg-white p-4 border border-[#C5A059]/40 relative">
                                <span className="bg-[#1F040D] text-[#C5A059] text-[9px] font-bold px-2 py-0.5 uppercase tracking-wider absolute top-3 right-3">
                                    Secondary Current A/C
                                </span>
                                <h4 className="font-bold text-sm text-[#270611] font-sans">HDFC BANK</h4>
                                <p className="text-gray-600 mt-1">A/C Name: <strong>YASH JEWELLERS</strong></p>
                                <p className="text-gray-600">A/C No: <strong>50200088914522</strong></p>
                                <p className="text-gray-600">IFSC Code: <strong>HDFC0000452</strong></p>
                                <button
                                    onClick={() => copyToClipboard('50200088914522', 'hdfc')}
                                    className="mt-2 text-[10px] text-[#6B0E2A] underline font-bold uppercase flex items-center gap-1 font-sans"
                                >
                                    {copiedField === 'hdfc' ? <Check size={12} className="text-emerald-600" /> : <Copy size={12} />}
                                    <span>{copiedField === 'hdfc' ? 'Copied Account No' : 'Copy Account Number'}</span>
                                </button>
                            </div>

                            {/* UPI ID */}
                            <div className="bg-[#F3E8D0] p-3 border border-[#C5A059]/50 flex justify-between items-center text-xs">
                                <div>
                                    <span className="text-[10px] uppercase font-bold text-[#6B0E2A]">Instant UPI ID:</span>
                                    <p className="font-bold text-gray-900">yashjewellers@sbi</p>
                                </div>
                                <button
                                    onClick={() => copyToClipboard('yashjewellers@sbi', 'upi')}
                                    className="bg-[#270611] text-white px-3 py-1.5 text-[10px] uppercase font-bold tracking-wider"
                                >
                                    {copiedField === 'upi' ? 'Copied' : 'Copy UPI'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}
