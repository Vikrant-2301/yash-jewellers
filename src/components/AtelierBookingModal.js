"use client";

import { useState } from "react";
import { X, Calendar, Clock, Sparkles, CheckCircle, MapPin, MessageCircle } from "lucide-react";
import { BUSINESS_DETAILS } from "@/src/config/business";

export default function AtelierBookingModal({ isOpen, onClose }) {
    const [submitted, setSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        category: "Bridal Jewellery",
        date: "",
        timeSlot: "Morning (11:00 AM - 1:00 PM)",
        consultationType: "In-Store Private Lounge (Chaubepur, Kanpur)"
    });

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        
        // Prepare WhatsApp notification
        const msg = `Namaste Yash Jewellers, I have requested a VIP Consultation:%0A- Name: ${formData.name}%0A- Phone: ${formData.phone}%0A- Interest: ${formData.category}%0A- Date: ${formData.date}%0A- Slot: ${formData.timeSlot}%0A- Mode: ${formData.consultationType}`;
        setTimeout(() => {
            window.open(`https://wa.me/${BUSINESS_DETAILS.whatsappClean}?text=${msg}`, '_blank');
        }, 1200);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#270611]/85 backdrop-blur-sm animate-fade-in font-sans">
            <div className="relative bg-[#FAF7F2] max-w-lg w-full border border-[#C5A059] shadow-2xl p-6 md:p-8 overflow-hidden">
                
                <button 
                    onClick={onClose}
                    className="absolute top-4 right-4 text-[#270611] hover:text-[#6B0E2A] p-1 border border-[#C5A059]/40"
                >
                    <X size={20} />
                </button>

                {!submitted ? (
                    <div>
                        <div className="text-center mb-6">
                            <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-[#6B0E2A]">
                                Yash Private Atelier · निजी परामर्श
                            </span>
                            <h2 className="font-serif text-2xl md:text-3xl text-[#270611] font-medium mt-1">
                                Book a VIP Consultation
                            </h2>
                            <div className="w-16 h-0.5 bg-[#C5A059] mx-auto mt-2.5"></div>
                            <p className="text-xs text-gray-600 mt-2">
                                Experience personalized bridal styling, bespoke jewellery customization, and private viewing with our senior master jewellers at our Chaubepur, Kanpur showroom.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                            <div>
                                <label className="block text-[10px] uppercase tracking-wider text-gray-600 mb-1 font-semibold">
                                    Your Full Name / आपका नाम *
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full bg-white border border-[#C5A059]/40 px-3.5 py-2.5 text-xs text-[#270611] focus:outline-none focus:border-[#6B0E2A]"
                                    placeholder="e.g. Ananya Sharma"
                                />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-[10px] uppercase tracking-wider text-gray-600 mb-1 font-semibold">
                                        Phone / WhatsApp *
                                    </label>
                                    <input
                                        type="tel"
                                        required
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        className="w-full bg-white border border-[#C5A059]/40 px-3.5 py-2.5 text-xs text-[#270611] focus:outline-none focus:border-[#6B0E2A]"
                                        placeholder="+91 93077 77500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[10px] uppercase tracking-wider text-gray-600 mb-1 font-semibold">
                                        Jewellery Preference
                                    </label>
                                    <select
                                        value={formData.category}
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                        className="w-full bg-white border border-[#C5A059]/40 px-3 py-2.5 text-xs text-[#270611] focus:outline-none focus:border-[#6B0E2A]"
                                    >
                                        <option value="Bridal Jewellery">Bridal Jewellery Suite</option>
                                        <option value="Polki & Kundan">Polki &amp; Kundan Jadau</option>
                                        <option value="22K Temple Gold">22K Temple Gold Sets</option>
                                        <option value="Diamond Solitaires">Diamond Solitaires &amp; Rings</option>
                                        <option value="Gold Chains & Kangans">Gold Chains, Kangans &amp; Ornaments</option>
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-[10px] uppercase tracking-wider text-gray-600 mb-1 font-semibold">
                                        Preferred Date
                                    </label>
                                    <input
                                        type="date"
                                        required
                                        value={formData.date}
                                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                        className="w-full bg-white border border-[#C5A059]/40 px-3 py-2 text-xs text-[#270611] focus:outline-none focus:border-[#6B0E2A]"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[10px] uppercase tracking-wider text-gray-600 mb-1 font-semibold">
                                        Preferred Time Slot
                                    </label>
                                    <select
                                        value={formData.timeSlot}
                                        onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })}
                                        className="w-full bg-white border border-[#C5A059]/40 px-3 py-2.5 text-xs text-[#270611] focus:outline-none focus:border-[#6B0E2A]"
                                    >
                                        <option value="Morning (11:00 AM - 1:00 PM)">Morning (11:00 AM - 1:00 PM)</option>
                                        <option value="Afternoon (2:00 PM - 5:00 PM)">Afternoon (2:00 PM - 5:00 PM)</option>
                                        <option value="Evening (5:30 PM - 8:00 PM)">Evening (5:30 PM - 8:00 PM)</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-[10px] uppercase tracking-wider text-gray-600 mb-1 font-semibold">
                                    Consultation Mode
                                </label>
                                <select
                                    value={formData.consultationType}
                                    onChange={(e) => setFormData({ ...formData, consultationType: e.target.value })}
                                    className="w-full bg-white border border-[#C5A059]/40 px-3 py-2.5 text-xs text-[#270611] focus:outline-none focus:border-[#6B0E2A]"
                                >
                                    <option value="In-Store Private Lounge (Chaubepur, Kanpur)">In-Store Private Lounge (Chaubepur, Kanpur)</option>
                                    <option value="Virtual High-Def Video Consultation">Virtual HD Video Consultation</option>
                                    <option value="Private Home Preview (On Request)">Private Home Preview (Family wedding)</option>
                                </select>
                            </div>

                            <button
                                type="submit"
                                className="w-full mt-4 bg-[#6B0E2A] hover:bg-[#4E0A1E] text-white py-3.5 text-xs font-bold uppercase tracking-[0.2em] border border-[#C5A059]/50 transition-all flex items-center justify-center gap-2"
                            >
                                <Sparkles size={14} className="text-[#C5A059]" />
                                <span>Confirm VIP Appointment</span>
                            </button>
                        </form>
                    </div>
                ) : (
                    <div className="text-center py-8 space-y-4">
                        <CheckCircle size={48} className="text-emerald-700 mx-auto" />
                        <h3 className="font-serif text-2xl text-[#270611]">
                            Consultation Confirmed
                        </h3>
                        <p className="font-serif text-sm text-[#8C6D38] italic">
                            "आपका स्वागत है यश ज्वेलर्स के परिवार में"
                        </p>
                        <p className="text-xs text-gray-600 max-w-sm mx-auto">
                            Thank you, {formData.name}. Our master jewellery consultant will reach out via WhatsApp / Call at {formData.phone} shortly to finalize your curated viewing.
                        </p>
                        <button
                            onClick={onClose}
                            className="bg-[#270611] text-[#FAF7F2] px-6 py-2.5 text-xs uppercase tracking-widest font-bold mt-2"
                        >
                            Return to Website
                        </button>
                    </div>
                )}

            </div>
        </div>
    );
}
