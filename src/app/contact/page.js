"use client";

import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, MessageSquare, Sparkles, CheckCircle, ShieldCheck } from 'lucide-react';

export default function Contact() {
    const [submitted, setSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        interest: 'Bridal Jewellery Consultation',
        message: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);

        const waText = `Namaste Yash Jewellers,%0A- Client: ${formData.name}%0A- Phone: ${formData.phone}%0A- Email: ${formData.email}%0A- Interest: ${formData.interest}%0A- Message: ${formData.message}`;
        setTimeout(() => {
            window.open(`https://wa.me/918881121119?text=${waText}`, '_blank');
        }, 1200);
    };

    return (
        <div className="bg-[#FAF7F2] text-[#270611] font-sans min-h-screen py-12 md:py-20">
            <div className="container mx-auto px-4 md:px-8 max-w-6xl">
                
                {/* Header Banner */}
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <span className="text-[10px] uppercase font-bold tracking-[0.35em] text-[#6B0E2A]">
                        Boutique &amp; Concierge · संपर्क एवं निजी परामर्श
                    </span>
                    <h1 className="font-serif text-3xl md:text-5xl text-[#270611] mt-2 font-normal">
                        Experience Our Atelier
                    </h1>
                    <div className="ornament-divider">
                        <span className="w-2 h-2 rotate-45 bg-[#C5A059]"></span>
                    </div>
                    <p className="text-xs md:text-sm text-gray-600 leading-relaxed">
                        Whether visiting our boutique showroom in Kanpur or arranging a private bridal preview, our senior jewellery consultants are at your service.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                    
                    {/* Store Information (5 cols) */}
                    <div className="lg:col-span-5 space-y-6">
                        
                        <div className="bg-[#270611] text-[#FAF7F2] p-8 border border-[#C5A059]/40 shadow-xl relative overflow-hidden">
                            <div className="absolute inset-0 opacity-10 bg-heritage-pattern pointer-events-none" />
                            
                            <div className="relative z-10">
                                <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#C5A059]">
                                    Flagship Showroom · मुख्य प्रतिष्ठान
                                </span>
                                <h2 className="font-serif text-2xl text-[#FAF7F2] font-semibold mt-1 mb-6">
                                    Yash Jewellers
                                </h2>

                                <div className="space-y-5 text-xs text-[#FAF7F2]/90">
                                    <div className="flex items-start gap-3">
                                        <MapPin size={18} className="text-[#C5A059] shrink-0 mt-0.5" />
                                        <div>
                                            <p className="font-bold text-[#FAF7F2]">Kanpur Boutique &amp; Bullion Desk</p>
                                            <p className="text-[#EAD8B1]/75 leading-relaxed mt-0.5">
                                                307, Krishna Niwas, Yusuf Meherali Road &amp; Kanpur Bullion Center, Uttar Pradesh, India
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <Phone size={18} className="text-[#C5A059] shrink-0 mt-0.5" />
                                        <div>
                                            <p className="font-bold text-[#FAF7F2]">Concierge Line &amp; WhatsApp</p>
                                            <p className="text-[#EAD8B1]/75 mt-0.5">+91 88811 21119</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <Clock size={18} className="text-[#C5A059] shrink-0 mt-0.5" />
                                        <div>
                                            <p className="font-bold text-[#FAF7F2]">Showroom Hours</p>
                                            <p className="text-[#EAD8B1]/75 mt-0.5">Monday – Saturday: 10:30 AM – 8:30 PM</p>
                                            <p className="text-[#C5A059] text-[10px] mt-0.5 italic">Sunday: Reserved for VIP Bridal Appointments</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <Mail size={18} className="text-[#C5A059] shrink-0 mt-0.5" />
                                        <div>
                                            <p className="font-bold text-[#FAF7F2]">Email Inquiries</p>
                                            <p className="text-[#EAD8B1]/75 mt-0.5">concierge@yashjewellers.com</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-8 pt-6 border-t border-[#C5A059]/30">
                                    <a
                                        href="https://maps.google.com/?q=Yash+Jewellers+Kanpur"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 bg-[#6B0E2A] hover:bg-[#851336] text-white px-5 py-2.5 text-[11px] uppercase tracking-widest font-bold border border-[#C5A059]/40 transition-colors"
                                    >
                                        <MapPin size={13} className="text-[#C5A059]" />
                                        <span>Get Driving Directions</span>
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Assurance badge */}
                        <div className="bg-white p-5 border border-[#C5A059]/30 flex items-center gap-4 shadow-sm">
                            <ShieldCheck size={32} className="text-[#6B0E2A] shrink-0" />
                            <div>
                                <h4 className="font-serif text-sm font-bold text-[#270611]">Valet Parking &amp; Private Lounge</h4>
                                <p className="text-xs text-gray-600 mt-0.5">Dedicated private viewing room with security escort for bridal and high-value selections.</p>
                            </div>
                        </div>

                    </div>

                    {/* Booking & Inquiry Form (7 cols) */}
                    <div className="lg:col-span-7 bg-white p-8 md:p-10 border border-[#C5A059]/30 shadow-md">
                        
                        {!submitted ? (
                            <div>
                                <div className="mb-6">
                                    <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#6B0E2A]">
                                        Send an Inquiry · संदेश भेजें
                                    </span>
                                    <h2 className="font-serif text-2xl md:text-3xl text-[#270611] font-semibold mt-1">
                                        Personal Jewellery Consultation
                                    </h2>
                                    <p className="text-xs text-gray-600 mt-1">
                                        Please share your details below and our senior consultant will respond promptly.
                                    </p>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-[10px] uppercase tracking-wider text-gray-700 font-bold mb-1.5">
                                                Your Full Name *
                                            </label>
                                            <input
                                                type="text"
                                                required
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                className="w-full bg-[#FAF7F2] border border-[#C5A059]/40 px-3.5 py-2.5 text-xs text-[#270611] focus:outline-none focus:border-[#6B0E2A]"
                                                placeholder="e.g. Smt. Radhika Khanna"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-[10px] uppercase tracking-wider text-gray-700 font-bold mb-1.5">
                                                Phone Number (WhatsApp) *
                                            </label>
                                            <input
                                                type="tel"
                                                required
                                                value={formData.phone}
                                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                className="w-full bg-[#FAF7F2] border border-[#C5A059]/40 px-3.5 py-2.5 text-xs text-[#270611] focus:outline-none focus:border-[#6B0E2A]"
                                                placeholder="+91 98888 XXXXX"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-[10px] uppercase tracking-wider text-gray-700 font-bold mb-1.5">
                                                Email Address
                                            </label>
                                            <input
                                                type="email"
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                className="w-full bg-[#FAF7F2] border border-[#C5A059]/40 px-3.5 py-2.5 text-xs text-[#270611] focus:outline-none focus:border-[#6B0E2A]"
                                                placeholder="name@example.com"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-[10px] uppercase tracking-wider text-gray-700 font-bold mb-1.5">
                                                Area of Interest
                                            </label>
                                            <select
                                                value={formData.interest}
                                                onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                                                className="w-full bg-[#FAF7F2] border border-[#C5A059]/40 px-3.5 py-2.5 text-xs text-[#270611] focus:outline-none focus:border-[#6B0E2A]"
                                            >
                                                <option value="Bridal Jewellery Consultation">Bridal Jewellery Consultation</option>
                                                <option value="Polki & Kundan Custom Set">Polki &amp; Kundan Custom Set</option>
                                                <option value="Temple Gold Ornaments">Temple Gold Ornaments</option>
                                                <option value="Solitaire Engagement Ring">Solitaire Engagement Ring</option>
                                                <option value="Bullion Investment / Bulk Gold">Bullion Investment / Bulk Gold</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-[10px] uppercase tracking-wider text-gray-700 font-bold mb-1.5">
                                            Message / Custom Requirements
                                        </label>
                                        <textarea
                                            rows={4}
                                            value={formData.message}
                                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                            className="w-full bg-[#FAF7F2] border border-[#C5A059]/40 p-3 text-xs text-[#270611] focus:outline-none focus:border-[#6B0E2A]"
                                            placeholder="Tell us about the occasion, preferred dates, or specific pieces you would like to view..."
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full bg-[#6B0E2A] hover:bg-[#4E0A1E] text-white py-3.5 text-xs font-bold uppercase tracking-[0.2em] border border-[#C5A059]/50 transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
                                    >
                                        <Sparkles size={14} className="text-[#C5A059]" />
                                        <span>Submit Consultation Request</span>
                                    </button>
                                </form>
                            </div>
                        ) : (
                            <div className="text-center py-12 space-y-4">
                                <CheckCircle size={52} className="text-emerald-700 mx-auto" />
                                <h3 className="font-serif text-3xl text-[#270611]">
                                    Request Received
                                </h3>
                                <p className="font-serif text-sm text-[#8C6D38] italic">
                                    "यश ज्वेलर्स परिवार में आपका स्वागत है"
                                </p>
                                <p className="text-xs text-gray-600 max-w-sm mx-auto leading-relaxed">
                                    Thank you, {formData.name}. Our master jewellery concierge has received your request and will connect with you on WhatsApp within 30 minutes.
                                </p>
                                <button
                                    onClick={() => setSubmitted(false)}
                                    className="bg-[#270611] text-[#FAF7F2] px-6 py-2.5 text-xs uppercase tracking-widest font-bold mt-2"
                                >
                                    Submit Another Inquiry
                                </button>
                            </div>
                        )}

                    </div>

                </div>

            </div>
        </div>
    );
}
