/* =========================================================
   AgriDirect - Farmers & FPOs Network Controller
   Smart India Hackathon 2026
   ========================================================= */

const DEFAULT_FPOS = [
    {
        id: "FPO-1",
        name: "Ramesh Agro FPO Collective",
        location: "Kolar & Chikkaballapur, Karnataka",
        members: 142,
        acreage: 480,
        crops: "Tomatoes, Capsicum, Green Chillies",
        rating: 4.9,
        lotsTraded: 86,
        certifications: ["FSSAI Assayed", "APMC Direct Bypass", "e-NAM Linked"],
        upi: "ramesh.fpo@okaxis"
    },
    {
        id: "FPO-2",
        name: "Sahyadri Farmers Producer Co.",
        location: "Lasalgaon & Niphad, Nashik, MH",
        members: 320,
        acreage: 1200,
        crops: "Red Onions, Pomegranates, Grapes",
        rating: 4.8,
        lotsTraded: 210,
        certifications: ["Global GAP", "NPOP Organic", "Cold-Chain Certified"],
        upi: "sahyadri@hdfcbank"
    },
    {
        id: "FPO-3",
        name: "Krishna Valley Agro Collective",
        location: "Karnal & Kurukshetra, Haryana",
        members: 215,
        acreage: 890,
        crops: "Basmati Rice 1121, Sharbati Wheat",
        rating: 4.9,
        lotsTraded: 144,
        certifications: ["Aged Grain Tested", "Zero Pesticide Residue"],
        upi: "krishnavalley@icici"
    },
    {
        id: "FPO-4",
        name: "Devgad Alphonso Mango Producers",
        location: "Devgad & Ratnagiri, Maharashtra",
        members: 95,
        acreage: 380,
        crops: "GI-Tagged Alphonso & Kesar Mango",
        rating: 5.0,
        lotsTraded: 62,
        certifications: ["GI Tagged", "100% Tree Ripened", "Export Assay"],
        upi: "devgad.mango@sbi"
    },
    {
        id: "FPO-5",
        name: "Malwa Progressive Farmers FPO",
        location: "Bathinda & Mansa, Punjab",
        members: 180,
        acreage: 750,
        crops: "Durum Wheat, Mustard, Cotton",
        rating: 4.7,
        lotsTraded: 98,
        certifications: ["Direct Seed Drill", "Organic NPOP"],
        upi: "malwa.fpo@pnb"
    },
    {
        id: "FPO-6",
        name: "Braj Bhoomi Cold Storage FPO",
        location: "Khandauli, Agra, Uttar Pradesh",
        members: 160,
        acreage: 620,
        crops: "Kufri Jyoti Potatoes, Garlic",
        rating: 4.8,
        lotsTraded: 112,
        certifications: ["Pre-cooled 2°C", "Processing Grade Assayed"],
        upi: "brajbhoomi@sbi"
    }
];

function seedFPOs() {
    if (!localStorage.getItem("agridirect_fpos")) {
        localStorage.setItem("agridirect_fpos", JSON.stringify(DEFAULT_FPOS));
    }
}

function getFPOs() {
    return JSON.parse(localStorage.getItem("agridirect_fpos")) || DEFAULT_FPOS;
}

function renderFarmersGrid() {
    const grid = document.getElementById("farmersGrid");
    if (!grid) return;

    const fpos = getFPOs();
    grid.innerHTML = fpos.map(fpo => `
        <div class="farmer-card">
            <div class="farmer-top">
                <div class="farmer-avatar-circle">🌱</div>
                <div class="farmer-info">
                    <h3>${fpo.name}</h3>
                    <p>📍 ${fpo.location}</p>
                </div>
            </div>

            <div class="farmer-cert-tags">
                ${fpo.certifications.map(c => `<span class="cert-tag">✓ ${c}</span>`).join("")}
            </div>

            <p style="font-size:12px; color:var(--slate-700); margin-bottom:12px;">
                <strong>Primary Crops:</strong> ${fpo.crops}
            </p>

            <div class="farmer-metrics-row">
                <div class="fm-stat">
                    <span>${fpo.members}</span>
                    <small>Farmers</small>
                </div>
                <div class="fm-stat">
                    <span>${fpo.acreage} ac</span>
                    <small>Land</small>
                </div>
                <div class="fm-stat">
                    <span style="color:#f59e0b;">${fpo.rating} ⭐</span>
                    <small>${fpo.lotsTraded} Lots</small>
                </div>
            </div>

            <div style="display:flex; gap:8px;">
                <button class="primary-btn" style="flex:1; font-size:12px; padding:8px;" onclick="viewFpoCatalog('${fpo.name}')">
                    🛒 Browse Crops
                </button>
                <button class="secondary-btn" style="font-size:12px; padding:8px;" onclick="speakText('${fpo.name} में ${fpo.members} किसान जुड़े हैं। मुख्य फसलें: ${fpo.crops}', 'hi-IN')">
                    🔊 सुनें
                </button>
            </div>
        </div>
    `).join("");
}

function viewFpoCatalog(fpoName) {
    window.location.href = `marketplace.html`;
}

// AI Fair-Price Advisor Math
const ADVISOR_RATES = {
    tomato: { mandi: 16, directA: 28, directB: 24, organic: 38 },
    onion:  { mandi: 14, directA: 24, directB: 20, organic: 32 },
    rice:   { mandi: 54, directA: 78, directB: 70, organic: 98 },
    potato: { mandi: 12, directA: 22, directB: 18, organic: 30 },
    mango:  { mandi: 85, directA: 140, directB: 115, organic: 185 }
};

function computeFairPrice() {
    const cropKey = document.getElementById("advCropSelect").value || "tomato";
    const grade = document.getElementById("advGradeSelect").value || "gradeA";
    const qty = parseInt(document.getElementById("advQtyInput").value) || 1000;
    const rates = ADVISOR_RATES[cropKey] || ADVISOR_RATES.tomato;

    let directRate = rates.directA;
    if (grade === "gradeB") directRate = rates.directB;
    if (grade === "organic") directRate = rates.organic;

    const mandiRate = rates.mandi;
    const totalMandi = mandiRate * qty;
    const totalDirect = directRate * qty;
    const extraProfit = totalDirect - totalMandi;
    const extraProfitPct = Math.round((extraProfit / totalMandi) * 100);

    document.getElementById("advMandiRate").innerText = `₹${mandiRate} / kg`;
    document.getElementById("advDirectRate").innerText = `₹${directRate} / kg`;
    document.getElementById("advProfitGain").innerText = `+₹${extraProfit.toLocaleString('en-IN')} (+${extraProfitPct}%)`;
}

function playAdvisorSpeech() {
    const cropKey = document.getElementById("advCropSelect").value || "tomato";
    const grade = document.getElementById("advGradeSelect").value || "gradeA";
    const rates = ADVISOR_RATES[cropKey] || ADVISOR_RATES.tomato;
    let directRate = rates.directA;
    if (grade === "gradeB") directRate = rates.directB;
    if (grade === "organic") directRate = rates.organic;

    const cropName = cropKey === "tomato" ? "टमाटर" : cropKey === "onion" ? "प्याज़" : cropKey === "rice" ? "बासमती चावल" : cropKey === "potato" ? "आलू" : "आम";
    const text = `AI सलाहकार रिपोर्ट: ${cropName} का स्थानीय मंडी भाव ₹${rates.mandi} है। यदि आप एग्रीडायरेक्ट पर सीधा बेचते हैं, तो अनुशंसित भाव ₹${directRate} प्रति किलो रखें। आपको लगभग 70% अतिरिक्त मुनाफा होगा!`;
    speakText(text, "hi-IN");
}

// Onboard Farmer Modal
function openRegisterFarmerModal() {
    document.getElementById("registerFarmerModal").classList.add("open");
}

function closeRegisterFarmerModal() {
    document.getElementById("registerFarmerModal").classList.remove("open");
}

function handleFarmerRegistration(e) {
    e.preventDefault();
    const name = document.getElementById("regName").value;
    const loc = document.getElementById("regLocation").value;
    const members = parseInt(document.getElementById("regMembers").value);
    const acreage = parseInt(document.getElementById("regAcreage").value);
    const crops = document.getElementById("regCrops").value;
    const upi = document.getElementById("regUpi").value;

    const fpos = getFPOs();
    fpos.unshift({
        id: "FPO-" + (fpos.length + 1),
        name: name,
        location: loc,
        members: members,
        acreage: acreage,
        crops: crops,
        rating: 5.0,
        lotsTraded: 1,
        certifications: ["New Enrollment", "Escrow UPI Verified"],
        upi: upi
    });

    localStorage.setItem("agridirect_fpos", JSON.stringify(fpos));
    closeRegisterFarmerModal();
    renderFarmersGrid();
    showToast(`🌱 ${name} successfully enrolled! Escrow UPI linked.`, "✅");
    speakText(`बधाई! ${name} का पंजीयन पूरा हुआ। आपका एस्क्रो खाता तैयार है।`, "hi-IN");
}

// Init
document.addEventListener("DOMContentLoaded", () => {
    seedFPOs();
    renderFarmersGrid();
    computeFairPrice();
});