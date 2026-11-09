"use client";

import { useState, useEffect } from 'react';
import RateCard from "@/src/components/RateCard";
import { Clock, ShieldCheck, Landmark, Phone, MessageSquare, Sparkles, Award } from 'lucide-react';

export default function Rates() {
    const [istTime, setIstTime] = useState('--:--:--');
    const [nyTime, setNyTime] = useState('--:--:--');
    const [londonTime, setLondonTime] = useState('--:--:--');

    useEffect(() => {
        const updateClocks = () => {
            const now = new Date();
            setIstTime(new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }).format(now));
            setNyTime(new Intl.DateTimeFormat('en-GB', { timeZone: 'America/New_York', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }).format(now));
            setLondonTime(new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/London', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }).format(now));
        };
        updateClocks();
        const timer = setInterval(updateClocks, 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="min-h-screen bg-[#270611] text-[#FAF7F2] py-12 md:py-16 font-sans relative">
            <div className="absolute inset-0 opacity-10 bg-heritage-pattern pointer-events-none" />

            <div className="container mx-auto px-4 md:px-8 relative z-10">
                
                {/* 1. International Bullion Clocks Bar */}
                <div className="bg-[#1F040D] border border-[#C5A059]/30 p-3 max-w-5xl mx-auto mb-10 flex flex-wrap justify-between items-center text-xs text-[#FAF7F2] gap-3">
                    <div className="flex flex-wrap items-center gap-6">
                        <div className="flex items-center gap-2">
                            <Clock size={14} className="text-[#C5A059]" />
                            <span className="text-[#EAD8B1]/70">IST (India):</span>
                            <span className="font-mono text-[#FAF7F2] font-bold">{istTime}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-[#EAD8B1]/70">NY Spot:</span>
                            <span className="font-mono text-[#FAF7F2] font-bold">{nyTime}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-[#EAD8B1]/70">London LME:</span>
                            <span className="font-mono text-[#FAF7F2] font-bold">{londonTime}</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 text-emerald-400 font-bold text-[11px] tracking-wider">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                        <span>LIVE BENCHMARK ACTIVE</span>
                    </div>
                </div>

                {/* 2. Page Header */}
                <div className="text-center mb-10 max-w-2xl mx-auto">
                    <div className="inline-flex items-center gap-2 text-[#C5A059] text-[10px] uppercase font-bold tracking-[0.3em] mb-2">
                        <Sparkles size={13} className="text-[#DFBE7A]" />
                        <span>Kanpur &amp; Delhi Bullion Exchange · सर्राफा भाव</span>
                    </div>
                    <h1 className="font-serif text-3xl md:text-5xl text-[#FAF7F2] font-normal">
                        Live Gold &amp; Silver Rates
                    </h1>
                    <div className="ornament-divider">
                        <span className="w-2 h-2 rotate-45 bg-[#C5A059]"></span>
                    </div>
                    <p className="text-xs md:text-sm text-[#EAD8B1]/80 leading-relaxed">
                        100% genuine landed wholesale rates derived directly from International Spot benchmarks conforming to Indian Customs Duty (6%) and GST (3%).
                    </p>
                </div>

                {/* 3. Main Rates Component */}
                <RateCard />

                {/* 4. Trust & Credibility Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mt-14 text-left">
                    <div className="bg-[#1F040D] p-6 border-t-2 border-[#C5A059] border-x border-b border-[#C5A059]/20 shadow-lg">
                        <div className="flex items-center gap-2 text-[#C5A059] font-bold text-sm mb-2">
                            <ShieldCheck size={18} className="text-[#DFBE7A]" /> 
                            <span>100% Genuine Formula</span>
                        </div>
                        <p className="text-xs text-[#EAD8B1]/70 leading-relaxed font-sans">
                            Our rates are mathematically indexed to London bullion spot, dollar exchange rate, and Indian duty with absolute transparency.
                        </p>
                    </div>

                    <div className="bg-[#1F040D] p-6 border-t-2 border-[#C5A059] border-x border-b border-[#C5A059]/20 shadow-lg">
                        <div className="flex items-center gap-2 text-[#C5A059] font-bold text-sm mb-2">
                            <Landmark size={18} className="text-[#DFBE7A]" /> 
                            <span>Kanpur Bullion Parity</span>
                        </div>
                        <p className="text-xs text-[#EAD8B1]/70 leading-relaxed font-sans">
                            Direct execution rates accepted across major bullion dealers and retail patrons in Uttar Pradesh since 1975.
                        </p>
                    </div>

                    <div className="bg-[#1F040D] p-6 border-t-2 border-[#C5A059] border-x border-b border-[#C5A059]/20 shadow-lg">
                        <div className="flex items-center gap-2 text-[#C5A059] font-bold text-sm mb-2">
                            <Award size={18} className="text-[#DFBE7A]" /> 
                            <span>Assay Certified Delivery</span>
                        </div>
                        <p className="text-xs text-[#EAD8B1]/70 leading-relaxed font-sans">
                            Physical 999 coins and 916 gold ornaments accompanied by government hallmarking certificates and immediate assaying.
                        </p>
                    </div>
                </div>

                {/* 5. Bullion Desk Direct WhatsApp CTA */}
                <div className="mt-14 max-w-3xl mx-auto text-center p-8 bg-[#38081A] border border-[#C5A059]/40">
                    <h3 className="font-serif text-2xl text-[#FAF7F2]">
                        Looking for Bulk Bullion or Wedding Jewellery?
                    </h3>
                    <p className="text-xs text-[#EAD8B1] mt-2 mb-6">
                        Lock live wholesale gold prices for upcoming wedding orders directly with our senior bullion desk.
                    </p>
                    <a
                        href="https://wa.me/918881121119?text=Namaste%20Yash%20Jewellers,%20I%20am%20interested%20in%20locking%20gold%20rates%20for%20a%20wedding%20jewellery%20purchase."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-[#6B0E2A] hover:bg-[#851336] text-white px-8 py-3 text-xs uppercase font-bold tracking-widest border border-[#C5A059]/50 transition-colors"
                    >
                        <MessageSquare size={14} className="text-[#C5A059]" />
                        <span>Connect to Bullion Trading Desk</span>
                    </a>
                </div>

            </div>
        </div>
    );
}
