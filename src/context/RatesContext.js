"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const RatesContext = createContext(null);

const DEFAULT_RATES = {
    gold995Cash: 140955,
    gold24k: 141663,
    gold22k: 125065,
    gold18k: 103049,
    gold14k: 81497,
    silver: 186284,
    silverKg: 186284,
    silver10g: 1863,
    perGram24k: 14166,
    perGram22k: 12507,
    perGram18k: 10305,
    perGram14k: 8150,
    perGramSilver: 186.28
};

export function RatesProvider({ children }) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [lastUpdated, setLastUpdated] = useState(null);

    const fetchRates = useCallback(async () => {
        try {
            const res = await fetch('/api/rates');
            if (res.ok) {
                const json = await res.json();
                setData(json);
                setLastUpdated(new Date());
            }
        } catch (err) {
            console.error("RatesContext error:", err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchRates();
        // Refresh every 10 seconds to keep in sync with live market
        const interval = setInterval(fetchRates, 10000);
        return () => clearInterval(interval);
    }, [fetchRates]);

    // Format in Indian Numbering System
    const formatINR = (val) => {
        if (!val || isNaN(val)) return "0";
        return new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(Math.round(val));
    };

    /**
     * Dynamically calculates authentic retail jewellery landed price based on Sarafa Mandi live rates
     * Formula: [(Net Weight in g * Per-Gram Purity Rate) + Making Charges] * 1.03 (GST)
     */
    const calculateJewelleryPrice = useCallback((weightStr, purityStr, makingStr, fallbackPrice) => {
        const activeRates = data?.rates || DEFAULT_RATES;
        
        // 1. Extract Weight in grams
        let weight = 0;
        if (typeof weightStr === 'number') {
            weight = weightStr;
        } else if (typeof weightStr === 'string') {
            const match = weightStr.match(/([\d.]+)/);
            if (match) weight = parseFloat(match[1]);
        }

        // If no weight could be extracted, return fallback
        if (!weight || weight <= 0) {
            return {
                formattedPrice: fallbackPrice || "On Request",
                rawPrice: 0,
                isLive: false
            };
        }

        // 2. Determine Purity Standard and Per-Gram Rate
        const purityNormalized = (purityStr || "22k").toLowerCase();
        let ratePerGram = activeRates.perGram22k || 12507;
        let purityStandard = "22K (916 BIS Hallmark)";

        if (purityNormalized.includes("silver") || purityNormalized.includes("925") || purityNormalized.includes("chandi") || purityNormalized.includes("payal")) {
            ratePerGram = activeRates.perGramSilver || 186.28;
            purityStandard = "Silver 999 Fine (Refinery Cash Bhav)";
        } else if (purityNormalized.includes("24k") || purityNormalized.includes("999")) {
            ratePerGram = activeRates.perGram24k || 14166;
            purityStandard = "24K (999 Pure Cash Bhav)";
        } else if (purityNormalized.includes("18k") || purityNormalized.includes("750")) {
            ratePerGram = activeRates.perGram18k || 10305;
            purityStandard = "18K (750 Diamond Mount)";
        } else if (purityNormalized.includes("14k") || purityNormalized.includes("585")) {
            ratePerGram = activeRates.perGram14k || 8150;
            purityStandard = "14K (585 Modern Wear)";
        }

        // 3. Extract Making Charge %
        let makingPct = 9; // Default 9% making charges for handcrafted gold jewellery
        if (typeof makingStr === 'number') {
            makingPct = makingStr;
        } else if (typeof makingStr === 'string') {
            const match = makingStr.match(/([\d.]+)/);
            if (match) {
                makingPct = parseFloat(match[1]);
            } else if (makingStr.toLowerCase().includes("included")) {
                makingPct = 8;
            }
        }

        // 4. Compute Metal Value, Making Charges, and Statutory GST (3%)
        const metalValue = weight * ratePerGram;
        const makingAmount = metalValue * (makingPct / 100);
        const subtotal = metalValue + makingAmount;
        const gstAmount = subtotal * 0.03;
        const grandTotal = Math.round(subtotal + gstAmount);

        return {
            formattedPrice: formatINR(grandTotal),
            rawPrice: grandTotal,
            ratePerGram,
            weight,
            metalValue: Math.round(metalValue),
            makingPct,
            makingAmount: Math.round(makingAmount),
            gstAmount: Math.round(gstAmount),
            purityStandard,
            isLive: true
        };
    }, [data]);

    return (
        <RatesContext.Provider value={{
            data,
            rates: data?.rates || DEFAULT_RATES,
            cashBhav: data?.cashBhav || null,
            spot: data?.spot || null,
            commodities: data?.commodities || null,
            formula: data?.formula || null,
            notice: data?.notice || "",
            loading,
            lastUpdated,
            refreshRates: fetchRates,
            formatINR,
            calculateJewelleryPrice
        }}>
            {children}
        </RatesContext.Provider>
    );
}

export function useRates() {
    const context = useContext(RatesContext);
    if (!context) {
        return {
            rates: DEFAULT_RATES,
            cashBhav: null,
            loading: false,
            formatINR: (val) => new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(val || 0),
            calculateJewelleryPrice: (w, p, m, fallback) => ({
                formattedPrice: fallback || "0",
                rawPrice: 0,
                isLive: false
            })
        };
    }
    return context;
}
