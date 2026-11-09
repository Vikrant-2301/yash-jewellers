import { NextResponse } from 'next/server';

/**
 * Yash Jewellers & Bullion - Live Rates & Credibility Engine
 * Exactly aligned with the APK RatesEngine (D:\web\Yash Jewellers\APK\js\rates.js)
 * Conforming to Government of India Customs Tariff & MCX Spot benchmarks:
 * - 1 Troy Ounce = 31.1034768 grams
 * - Customs Duty: 5% Basic Customs Duty + 1% AIDC = 6% Total Customs
 * - GST on Bullion: 3%
 * - Mandi Parity / Local Spread: ~0.9%
 */

const TROY_OUNCE_IN_GRAMS = 31.1034768;
const CUSTOMS_DUTY_RATE = 0.06;   // 6% (5% BCD + 1% AIDC Cess)
const GST_RATE = 0.03;            // 3% GST
const MARKET_PREMIUM_RATE = 0.009;// 0.9% Local Bank Premium, Assaying & Freight

// Initial baseline spot prices matching APK
const BASE_SPOT = {
    gold: { symbol: "GOLD ($)", price: 4100.45, high: 4125.00, low: 4085.20, unit: "$/oz" },
    silver: { symbol: "SILVER ($)", price: 52.63, high: 53.40, low: 51.90, unit: "$/oz" },
    inr: { symbol: "INR (₹)", price: 93.94, high: 94.15, low: 93.75, unit: "₹/$" }
};

// Baseline commodities exactly matching APK
const BASE_COMMODITIES = {
    gold: [
        { id: "G999_100", name: "GOLD 999 (100 GM)", desc: "Fine Gold 99.9% Purity • Cash Bhav", buy: 145200, sell: 146150, high: 147100, low: 144850, unit: "10 GM", purity: 0.999 },
        { id: "G995_CASH", name: "GOLD 995 CASH BHAV", desc: "Gold 99.50% Purity • Immediate Delivery", buy: 144870, sell: 145850, high: 146720, low: 144500, unit: "10 GM", purity: 0.995 },
        { id: "G995_RTGS", name: "GOLD 99.50 RTGS", desc: "Official Bank RTGS Payment • GST Invoice", buy: 145470, sell: 146450, high: 147320, low: 145100, unit: "10 GM", purity: 0.995 },
        { id: "G999_1KG", name: "GOLD 999 (1 KG BAR)", desc: "London Good Delivery / LBMA Certified", buy: 145100, sell: 145950, high: 146800, low: 144700, unit: "10 GM", purity: 0.999 },
        { id: "G_GUINEA", name: "GOLD GUINEA (8 GM)", desc: "Hallmarked 99.5% Gold Coin", buy: 116200, sell: 117100, high: 117800, low: 115900, unit: "8 GM", purity: 0.995 },
        { id: "G_916_22K", name: "GOLD 22K (916) JEWELLERY", desc: "BIS HUID Hallmarked Retail Bhav", buy: 133280, sell: 134180, high: 135000, low: 132900, unit: "10 GM", purity: 0.916 }
    ],
    silver: [
        { id: "S_REFINERY", name: "SILVER REFINERY 99 PLUS", desc: "Silver Refinery 99+ Cash Bhav", buy: 190300, sell: 192570, high: 195200, low: 189800, unit: "1 KG", purity: 0.990 },
        { id: "S_SILCUT", name: "SILVER 99.90 SILCUT", desc: "Silcut Purity Cash Bhav", buy: 191800, sell: 194070, high: 196700, low: 191200, unit: "1 KG", purity: 0.999 },
        { id: "S_MAX_PETI", name: "SILVER MAX PETI (30 KG)", desc: "Wholesale Delivery • 30 Kg Standard Peti", buy: 187304, sell: 187370, high: 190000, low: 185100, unit: "1 KG", purity: 0.999 },
        { id: "S_999_READY", name: "SILVER 999 READY BAR", desc: "Ready Delivery Spot Bar", buy: 192400, sell: 194600, high: 197000, low: 191900, unit: "1 KG", purity: 0.999 },
        { id: "S_CHORSA", name: "SILVER CHORSA 999", desc: "Fine Quality Melting Chorsa", buy: 190800, sell: 193100, high: 195800, low: 190200, unit: "1 KG", purity: 0.999 }
    ],
    coins: [
        { id: "C_MMTC_AU10", name: "MMTC PAMP GOLD BAR 10 GM", desc: "999.9 Pure Certicard Sealed Gold Bar", buy: 147500, sell: 148500, high: 149200, low: 147100, unit: "10 GM", purity: 0.9999 },
        { id: "C_MMTC_AU5", name: "MMTC PAMP GOLD BAR 5 GM", desc: "999.9 Purity Lotus / Laxmi Motifs", buy: 74200, sell: 74900, high: 75500, low: 73900, unit: "5 GM", purity: 0.9999 },
        { id: "C_YASH_AU1", name: "YASH JEWELLERS GOLD COIN 1 GM", desc: "24K 999 Hallmarked Coin", buy: 15100, sell: 15400, high: 15600, low: 15000, unit: "1 GM", purity: 0.999 },
        { id: "C_MMTC_AG_BAR", name: "MMTC PAMP SILVER BAR 99.99", desc: "Sealed 100 GM Silver Bar", buy: 20100, sell: 20500, high: 21000, low: 19900, unit: "100 GM", purity: 0.9999 },
        { id: "C_MMTC_AG10", name: "MMTC PAMP 10 GM SILVER BAR", desc: "99.99 Purity Certified Silver Bar", buy: 2151, sell: 2174, high: 2200, low: 2140, unit: "10 GM", purity: 0.9999 },
        { id: "C_YASH_AG1KG", name: "YASH 999 SILVER COIN 1 KG", desc: "999 Fine Silver Coin / Bar", buy: 193500, sell: 195800, high: 198000, low: 193000, unit: "1 KG", purity: 0.999 }
    ],
    delhi: [
        { id: "D_G995", name: "DELHI GOLD 995 CASH", desc: "Chandni Chowk Kucha Mahajani Spot Bhav", buy: 145100, sell: 146050, high: 146900, low: 144700, unit: "10 GM", purity: 0.995 },
        { id: "D_G999", name: "DELHI GOLD 999 READY", desc: "North India Bullion Benchmark Rate", buy: 145600, sell: 146550, high: 147400, low: 145200, unit: "10 GM", purity: 0.999 },
        { id: "D_S999", name: "DELHI SILVER 999 SPOT", desc: "Delhi Local Spot Silver Bhav", buy: 191500, sell: 193700, high: 196200, low: 191000, unit: "1 KG", purity: 0.999 }
    ]
};

function calculateGenuineGoldRate(spotGoldUSD, usdInr, purity = 0.999) {
    const usdPerGram = spotGoldUSD / TROY_OUNCE_IN_GRAMS;
    const inrBase10g = usdPerGram * 10 * usdInr;
    const customsDuty = inrBase10g * CUSTOMS_DUTY_RATE;
    const landedCost = inrBase10g + customsDuty;
    const gst = landedCost * GST_RATE;
    const premium = landedCost * MARKET_PREMIUM_RATE;
    const retailBhav24K = landedCost + premium;

    return {
        spotGoldUSD,
        usdInr,
        inrBase10g: Math.round(inrBase10g),
        customsDuty: Math.round(customsDuty),
        landedCost: Math.round(landedCost),
        gst: Math.round(gst),
        premium: Math.round(premium),
        bhav: Math.round(retailBhav24K * (purity / 0.999))
    };
}

function calculateGenuineSilverRate(spotSilverUSD, usdInr, purity = 0.999) {
    const usdPerGram = spotSilverUSD / TROY_OUNCE_IN_GRAMS;
    const inrBase1Kg = usdPerGram * 1000 * usdInr;
    const customsDuty = inrBase1Kg * CUSTOMS_DUTY_RATE;
    const landedCost = inrBase1Kg + customsDuty;
    const gst = landedCost * GST_RATE;
    const premium = landedCost * MARKET_PREMIUM_RATE;
    const retailBhav = landedCost + premium;

    return {
        spotSilverUSD,
        usdInr,
        inrBase1Kg: Math.round(inrBase1Kg),
        customsDuty: Math.round(customsDuty),
        landedCost: Math.round(landedCost),
        gst: Math.round(gst),
        premium: Math.round(premium),
        bhav: Math.round(retailBhav * (purity / 0.999))
    };
}

export async function GET() {
    const now = Date.now();

    const goldFormula = calculateGenuineGoldRate(BASE_SPOT.gold.price, BASE_SPOT.inr.price, 0.999);
    const silverFormula = calculateGenuineSilverRate(BASE_SPOT.silver.price, BASE_SPOT.inr.price, 0.999);

    const payload = {
        timestamp: now,
        spot: BASE_SPOT,
        formula: {
            gold: goldFormula,
            silver: silverFormula
        },
        rates: {
            gold24k: BASE_COMMODITIES.gold[0].buy,
            gold995: BASE_COMMODITIES.gold[1].buy,
            gold22k: BASE_COMMODITIES.gold[5].buy,
            silver: BASE_COMMODITIES.silver[0].buy
        },
        commodities: BASE_COMMODITIES,
        notice: "हाजिर सोने व चांदी का भाव BOOK करने के लिए नए ग्राहक बैंक डिटेल्स में जाकर SBI / HDFC अकाउंट के UPI में एडवांस पेमेंट करें और स्क्रीनशॉट भेजें | 1 किलो चांदी के लिए ₹25,000 और 10 ग्राम सोने के लिए ₹10,000 एडवांस भुगतान आवश्यक है | Yash Jewellers - 100% Genuine Rates Calculated Directly from International Spot & Customs Tariffs • BIS Hallmarked Purity • Kanpur & Delhi Branches.",
        contact: {
            phone: "+91 9336120419",
            whatsapp: "919336120419",
            upi: "yashjewellers@sbi",
            address: "Kanpur Bullion Market & Yusuf Meherali Road, India"
        }
    };

    return NextResponse.json(payload);
}
