/* =========================================================
   AgriDirect - AI Demand Intelligence Controller
   Smart India Hackathon 2026
   ========================================================= */

let currentCrop = "tomato";
let currentTimeframe = 7;
let currentScenario = "normal"; // normal, festive, rain

const AI_DATA = {
    tomato: {
        name: "Hybrid Tomatoes",
        baseDemand: [420, 480, 560, 680, 790, 890, 950],
        baseSupply: [500, 520, 550, 580, 600, 610, 630],
        basePrice:  [22, 24, 26, 28, 30, 31, 29],
        advisories: [
            { type: "success", icon: "🟢", title: "Optimal Harvest Window: 18 - 22 Sep", desc: "Urban demand in Hyderabad & Mumbai peaking at 950 Quintals. Harvest now to capture highest direct price of ₹28-31/kg." },
            { type: "warning", icon: "⚠️", title: "Kolar Cluster Logistics Alert", desc: "Reefer vehicle bookings are 80% occupied for Saturday. Pre-book pickup today via Logistics tab." },
            { type: "info", icon: "💡", title: "Retail Packaging Advantage", desc: "Supermarkets paying 12% extra for pre-sorted 1kg breathable mesh punnets." }
        ]
    },
    onion: {
        name: "Red Onions",
        baseDemand: [600, 620, 650, 710, 780, 820, 860],
        baseSupply: [800, 810, 820, 830, 840, 850, 850],
        basePrice:  [20, 21, 22, 24, 25, 26, 25],
        advisories: [
            { type: "warning", icon: "🧅", title: "Nashik Belt Glut Risk: Stagger Harvest", desc: "Late Kharif harvest arrivals expected in 10 days. Recommendation: Divert 35% crop into AgriDirect cold rooms to avoid market dip." },
            { type: "success", icon: "💰", title: "Direct Hotel Contracts Open", desc: "5 HoReCa chains in Pune looking for 20 MT Grade A export size onions at ₹25/kg." }
        ]
    },
    rice: {
        name: "Basmati Rice 1121",
        baseDemand: [1200, 1250, 1300, 1380, 1450, 1500, 1600],
        baseSupply: [1100, 1120, 1150, 1180, 1200, 1220, 1250],
        basePrice:  [72, 74, 75, 77, 78, 80, 82],
        advisories: [
            { type: "success", icon: "🌾", title: "Bullish Export Demand", desc: "Middle-East demand for 1121 Extra Long Grain strong. Stable premium prices guaranteed for next 60 days." },
            { type: "info", icon: "🛡️", title: "Moisture Content Assay", desc: "Ensure moisture is below 12% before dispatch to receive Grade A+ escrow settlement." }
        ]
    },
    potato: {
        name: "Kufri Potatoes",
        baseDemand: [850, 880, 910, 940, 980, 1020, 1050],
        baseSupply: [1000, 1020, 1030, 1040, 1050, 1050, 1060],
        basePrice:  [18, 19, 20, 21, 22, 23, 22],
        advisories: [
            { type: "info", icon: "🥔", title: "Processing Grade Demand", desc: "Snack manufacturing buyers offering forward contracts for 45mm+ low sugar tubers." }
        ]
    },
    mango: {
        name: "Alphonso Mango",
        baseDemand: [200, 260, 320, 410, 520, 600, 680],
        baseSupply: [180, 220, 280, 340, 400, 450, 500],
        basePrice:  [120, 125, 130, 138, 145, 150, 142],
        advisories: [
            { type: "success", icon: "🥭", title: "High Demand Peak Approaching", desc: "Tree-ripened organic lots selling out within 2 hours of listing on B2C storefront." }
        ]
    }
};

function updateForecastChart() {
    const cropKey = document.getElementById("forecastCropSelect").value || "tomato";
    currentCrop = cropKey;
    const cropData = AI_DATA[cropKey] || AI_DATA.tomato;

    let multiplierDemand = 1.0;
    let multiplierSupply = 1.0;
    let multiplierPrice = 1.0;

    if (currentScenario === "festive") {
        multiplierDemand = 1.35;
        multiplierPrice = 1.22;
        multiplierSupply = 1.05;
    } else if (currentScenario === "rain") {
        multiplierSupply = 0.68;
        multiplierPrice = 1.40;
        multiplierDemand = 0.95;
    }

    // Generate series points
    const pointsCount = currentTimeframe === 7 ? 7 : (currentTimeframe === 30 ? 10 : 12);
    const demandSeries = [];
    const supplySeries = [];
    const priceSeries = [];

    for (let i = 0; i < pointsCount; i++) {
        const baseIdx = Math.min(i, cropData.baseDemand.length - 1);
        const d = Math.round(cropData.baseDemand[baseIdx] * multiplierDemand * (1 + (i * 0.04)));
        const s = Math.round(cropData.baseSupply[baseIdx] * multiplierSupply * (1 + (i * 0.02)));
        const p = Math.round(cropData.basePrice[baseIdx] * multiplierPrice * (1 + (i * 0.015)));

        demandSeries.push(d);
        supplySeries.push(s);
        priceSeries.push(p);
    }

    renderSvgChart(demandSeries, supplySeries, priceSeries);
    renderAdvisories(cropData);
}

function renderSvgChart(demand, supply, price) {
    const svg = document.getElementById("forecastSvg");
    if (!svg) return;

    const width = 800;
    const height = 280;
    const padding = 50;

    const maxD = Math.max(...demand, ...supply) * 1.15;
    const maxP = Math.max(...price) * 1.3;

    // Build SVG path
    const getX = (idx) => padding + (idx / (demand.length - 1)) * (width - 2 * padding);
    const getYD = (val) => height - padding - (val / maxD) * (height - 2 * padding);
    const getYP = (val) => height - padding - (val / maxP) * (height - 2 * padding);

    // SVG Grid lines
    let gridSvg = "";
    for (let i = 0; i <= 4; i++) {
        const y = padding + i * ((height - 2 * padding) / 4);
        gridSvg += `<line x1="${padding}" y1="${y}" x2="${width - padding}" y2="${y}" stroke="#e2e8f0" stroke-dasharray="4 4" />`;
    }

    // Paths
    let demandPath = `M ${getX(0)} ${getYD(demand[0])}`;
    let supplyPath = `M ${getX(0)} ${getYD(supply[0])}`;
    let pricePath = `M ${getX(0)} ${getYP(price[0])}`;

    for (let i = 1; i < demand.length; i++) {
        demandPath += ` L ${getX(i)} ${getYD(demand[i])}`;
        supplyPath += ` L ${getX(i)} ${getYD(supply[i])}`;
        pricePath += ` L ${getX(i)} ${getYP(price[i])}`;
    }

    // Circles & Labels
    let dotsSvg = "";
    for (let i = 0; i < demand.length; i++) {
        const x = getX(i);
        const dayLabel = currentTimeframe === 7 ? `Day ${i + 1}` : `Wk ${i + 1}`;
        dotsSvg += `
            <circle cx="${x}" cy="${getYD(demand[i])}" r="5" fill="#10b981" stroke="#ffffff" stroke-width="2" />
            <circle cx="${x}" cy="${getYD(supply[i])}" r="4" fill="#3b82f6" stroke="#ffffff" stroke-width="2" />
            <circle cx="${x}" cy="${getYP(price[i])}" r="4" fill="#f59e0b" stroke="#ffffff" stroke-width="2" />
            <text x="${x}" y="${height - 15}" font-size="11" fill="#64748b" text-anchor="middle" font-family="sans-serif">${dayLabel}</text>
        `;
    }

    svg.innerHTML = `
        ${gridSvg}
        <!-- Demand Path -->
        <path d="${demandPath}" fill="none" stroke="#10b981" stroke-width="3.5" stroke-linecap="round" />
        <!-- Supply Path -->
        <path d="${supplyPath}" fill="none" stroke="#3b82f6" stroke-width="2.5" stroke-dasharray="6 3" stroke-linecap="round" />
        <!-- Price Path -->
        <path d="${pricePath}" fill="none" stroke="#f59e0b" stroke-width="2.5" stroke-linecap="round" />
        ${dotsSvg}
    `;
}

function renderAdvisories(cropData) {
    const list = document.getElementById("advisoryList");
    if (!list) return;

    list.innerHTML = cropData.advisories.map(adv => `
        <div class="advisory-item ${adv.type}">
            <div class="advisory-icon">${adv.icon}</div>
            <div class="advisory-text">
                <h4>${adv.title}</h4>
                <p>${adv.desc}</p>
            </div>
        </div>
    `).join("");
}

function setTimeframe(tf) {
    currentTimeframe = tf;
    document.querySelectorAll(".tf-btn").forEach(b => b.classList.remove("active"));
    if (tf === 7) document.getElementById("tf7").classList.add("active");
    if (tf === 30) document.getElementById("tf30").classList.add("active");
    if (tf === 90) document.getElementById("tf90").classList.add("active");
    updateForecastChart();
}

function setScenario(sc) {
    currentScenario = sc;
    document.querySelectorAll(".scenario-chip").forEach(c => c.classList.remove("active"));
    if (sc === "normal") document.getElementById("scNormal").classList.add("active");
    if (sc === "festive") document.getElementById("scFestive").classList.add("active");
    if (sc === "rain") document.getElementById("scRain").classList.add("active");
    updateForecastChart();
    showToast(`Simulation updated: ${sc.toUpperCase()} scenario applied.`, "🤖");
}

function playAiForecastSpeech() {
    const cropData = AI_DATA[currentCrop] || AI_DATA.tomato;
    const text = `AI मांग रिपोर्ट: ${cropData.name} की मांग अगले 7 दिनों में 38% बढ़ने का अनुमान है। सर्वोत्तम भाव पाने के लिए अपनी फसल को अगले 3 से 5 दिनों में बेचें। यदि मंडी में आवक ज्यादा हो, तो एग्रीडायरेक्ट कोल्ड स्टोरेज का उपयोग करें।`;
    speakText(text, "hi-IN");
}

// Init
document.addEventListener("DOMContentLoaded", () => {
    updateForecastChart();
});