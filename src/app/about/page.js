"use client";

import Link from 'next/link';
import { ShieldCheck, Award, HeartHandshake, Sparkles, Gem, Clock, ArrowRight } from 'lucide-react';

export default function About() {
    return (
        <div className="bg-[#FAF7F2] text-[#270611] font-sans">
            
            {/* 1. Hero Banner */}
            <section className="relative py-20 md:py-28 bg-[#270611] text-[#FAF7F2] text-center border-b border-[#C5A059]/30 overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-heritage-pattern pointer-events-none" />
                
                <div className="container mx-auto px-4 md:px-8 relative z-10 max-w-3xl">
                    <span className="text-[10px] uppercase font-bold tracking-[0.35em] text-[#C5A059]">
                        Our Heritage · पचास वर्षों की अटूट परंपरा
                    </span>
                    <h1 className="font-serif text-4xl md:text-6xl text-[#FAF7F2] mt-3 font-normal leading-tight">
                        A Legacy of Purity,
                        <br />
                        <span className="italic font-serif text-gold-gradient font-normal">
                            Crafted for Generations.
                        </span>
                    </h1>
                    <div className="ornament-divider">
                        <span className="w-2 h-2 rotate-45 bg-[#C5A059]"></span>
                    </div>
                    <p className="font-serif text-lg md:text-xl text-[#EAD8B1] italic mt-2">
                        "पीढ़ियों का विश्वास, खूबसूरती की शाश्वत पहचान।"
                    </p>
                    <p className="text-xs md:text-sm text-[#FAF7F2]/80 mt-4 leading-relaxed max-w-2xl mx-auto">
                        For over half a century, Yash Jewellers has stood as Kanpur’s premier high jewellery house — an emblem of uncompromising purity, benchmark pricing, and royal North Indian craftsmanship.
                    </p>
                </div>
            </section>

            {/* 2. The Founding Story & Journey */}
            <section className="py-20 md:py-28 bg-[#FAF7F2]">
                <div className="container mx-auto px-4 md:px-8 max-w-6xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-center">
                        
                        <div className="relative">
                            <div className="aspect-[4/5] border border-[#C5A059]/40 overflow-hidden shadow-xl">
                                <img
                                    src="https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=1000&q=85"
                                    alt="Master Karigar Crafting Heirloom Gold"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="absolute -bottom-5 -left-5 bg-[#6B0E2A] text-white p-5 border border-[#C5A059]/50 shadow-xl max-w-xs hidden sm:block">
                                <p className="font-serif text-3xl text-gold-gradient font-bold">1975</p>
                                <p className="text-[10px] uppercase tracking-widest text-[#EAD8B1] mt-1">
                                    Founded on pure gold purity standards
                                </p>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#6B0E2A]">
                                The Yash Story · हमारी कहानी
                            </span>

                            <h2 className="font-serif text-3xl md:text-4xl text-[#270611] font-normal leading-tight">
                                Where Tradition Meets Translucent Integrity
                            </h2>

                            <p className="text-xs md:text-sm text-gray-700 leading-relaxed font-sans">
                                When Yash Jewellers first opened its doors in 1975, the jewellery market was fraught with opaque purities and erratic pricing. Our founders established the house on one inviolable tenet: <strong>Zero tolerance for impure gold</strong>.
                            </p>

                            <p className="text-xs md:text-sm text-gray-700 leading-relaxed font-sans">
                                From introducing calibrated assay testing before it was legally mandated, to voluntarily adopting the Government of India BIS Hallmarking standard, we transformed how families in Kanpur purchase jewellery for life’s most auspicious ceremonies.
                            </p>

                            <p className="text-xs md:text-sm text-gray-700 leading-relaxed font-sans">
                                Today, whether you walk into our Chaubepur boutique lounge or consult our live daily gold rates, that same foundational pledge remains: absolute carat integrity, crystalline making charge disclosure, and lifetime gold value buyback.
                            </p>
                        </div>

                    </div>
                </div>
            </section>

            {/* 3. Four Core Pillars */}
            <section className="py-20 bg-[#F3E8D0]/30 border-y border-[#C5A059]/25">
                <div className="container mx-auto px-4 md:px-8 max-w-6xl">
                    <div className="text-center max-w-xl mx-auto mb-14">
                        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#6B0E2A]">
                            The Yash Creed · हमारे चार स्तम्भ
                        </span>
                        <h2 className="font-serif text-3xl md:text-4xl text-[#270611] mt-1 font-normal">
                            Our Core Commitments
                        </h2>
                        <div className="ornament-divider">
                            <span className="w-2 h-2 rotate-45 bg-[#C5A059]"></span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            {
                                icon: ShieldCheck,
                                title: "100% BIS Hallmarking",
                                hi: "शुद्धता का प्रमाण",
                                desc: "Every single piece of gold carries the official BIS triangular stamp, 916 fineness, and unique laser HUID tracking number."
                            },
                            {
                                icon: Award,
                                title: "Transparent Gold Parity",
                                hi: "पारदर्शी भाव",
                                desc: "Zero speculative retail markup. Our prices map directly to authentic daily market benchmarks with transparent itemized billing."
                            },
                            {
                                icon: Gem,
                                title: "Generational Karigari",
                                hi: "अनुभवी कारीगर",
                                desc: "Collaborating with generational artisan families across Varanasi, Bikaner, and Kanpur specializing in Kundan-Jadau, Nakshi, and Filigree."
                            },
                            {
                                icon: HeartHandshake,
                                title: "Lifetime Exchange",
                                hi: "आजीवन गारंटी",
                                desc: "Unconditional buyback and exchange guarantee on gold weight at prevailing market rates with zero deductor fees."
                            }
                        ].map((pillar, idx) => {
                            const IconComponent = pillar.icon;
                            return (
                                <div key={idx} className="bg-white p-6 border border-[#C5A059]/30 shadow-sm flex flex-col justify-between hover:border-[#C5A059] transition-all">
                                    <div>
                                        <div className="w-12 h-12 bg-[#FAF7F2] border border-[#C5A059]/40 flex items-center justify-center mb-4">
                                            <IconComponent size={22} className="text-[#6B0E2A]" />
                                        </div>
                                        <h3 className="font-serif text-lg text-[#270611] font-semibold">
                                            {pillar.title}
                                        </h3>
                                        <p className="text-[11px] font-serif text-[#8C6D38] italic mb-3">
                                            {pillar.hi}
                                        </p>
                                        <p className="text-xs text-gray-600 leading-relaxed font-sans">
                                            {pillar.desc}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* 4. The Artisanal Techniques (हमारी कला) */}
            <section className="py-20 md:py-28 bg-[#FAF7F2]">
                <div className="container mx-auto px-4 md:px-8 max-w-6xl">
                    <div className="text-center max-w-2xl mx-auto mb-14">
                        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#6B0E2A]">
                            Artisanal Mastery · प्राचीन शिल्प कौशल
                        </span>
                        <h2 className="font-serif text-3xl md:text-5xl text-[#270611] mt-2 font-normal">
                            Techniques Preserved in Gold
                        </h2>
                        <div className="ornament-divider">
                            <span className="w-2 h-2 rotate-45 bg-[#C5A059]"></span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white border border-[#C5A059]/30 overflow-hidden shadow-sm">
                            <div className="aspect-[4/3] overflow-hidden">
                                <img
                                    src="https://images.unsplash.com/photo-1602752250055-567f4a127b14?auto=format&fit=crop&q=80&w=600"
                                    alt="Kundan Jadau Craft"
                                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                                />
                            </div>
                            <div className="p-6">
                                <h3 className="font-serif text-xl text-[#270611] font-semibold">
                                    Kundan-Jadau Setting
                                </h3>
                                <p className="text-xs text-[#8C6D38] font-serif italic mb-2">शाही कुंदन जड़ाई</p>
                                <p className="text-xs text-gray-600 leading-relaxed">
                                    The ancient royal technique of setting uncut polki gemstones into 24K purified gold foil (Kundan) without prongs, producing an ethereal translucent glow.
                                </p>
                            </div>
                        </div>

                        <div className="bg-white border border-[#C5A059]/30 overflow-hidden shadow-sm">
                            <div className="aspect-[4/3] overflow-hidden">
                                <img
                                    src="https://images.unsplash.com/photo-1630138235282-5202867e3dfd?auto=format&fit=crop&q=80&w=600"
                                    alt="Temple Nakshi Chiseled Gold"
                                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                                />
                            </div>
                            <div className="p-6">
                                <h3 className="font-serif text-xl text-[#270611] font-semibold">
                                    Nakshi Temple Repoussé
                                </h3>
                                <p className="text-xs text-[#8C6D38] font-serif italic mb-2">देव-कला नक्काशी</p>
                                <p className="text-xs text-gray-600 leading-relaxed">
                                    Sculptural gold relief hammered by hand using miniature iron punches on a bed of natural tree resin, depicting divine Lakshmi and peacock motifs.
                                </p>
                            </div>
                        </div>

                        <div className="bg-white border border-[#C5A059]/30 overflow-hidden shadow-sm">
                            <div className="aspect-[4/3] overflow-hidden">
                                <img
                                    src="https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=600"
                                    alt="Jaali Filigree Gold Bangles"
                                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                                />
                            </div>
                            <div className="p-6">
                                <h3 className="font-serif text-xl text-[#270611] font-semibold">
                                    Jaali Wire Filigree
                                </h3>
                                <p className="text-xs text-[#8C6D38] font-serif italic mb-2">सूक्ष्म तार जालीदार काम</p>
                                <p className="text-xs text-gray-600 leading-relaxed">
                                    Fine threads of 22K gold drawn thinner than a hair strand, twisted, curled, and soldered together to construct weightless, lace-like royal cuffs.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 5. Visit Our Atelier CTA */}
            <section className="py-20 bg-[#270611] text-[#FAF7F2] text-center border-t border-[#C5A059]/30">
                <div className="container mx-auto px-4 max-w-3xl">
                    <h2 className="font-serif text-3xl md:text-5xl text-[#FAF7F2]">
                        Experience the Yash Legacy
                    </h2>
                    <p className="text-xs md:text-sm text-[#EAD8B1] mt-3 max-w-lg mx-auto leading-relaxed">
                        Visit our private showroom in Kanpur to witness these masterpieces in person or consult with our master designers.
                    </p>
                    <div className="mt-8 flex justify-center gap-4">
                        <Link
                            href="/contact"
                            className="bg-gradient-to-r from-[#ECC880] to-[#C5A059] text-[#270611] px-8 py-3.5 text-xs font-bold uppercase tracking-[0.2em] shadow-lg hover:shadow-2xl transition-all"
                        >
                            Visit Our Boutique
                        </Link>
                        <Link
                            href="/shop"
                            className="border border-[#C5A059] text-white px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] hover:bg-[#3C081A] transition-colors"
                        >
                            View Masterpieces
                        </Link>
                    </div>
                </div>
            </section>

        </div>
    );
}
