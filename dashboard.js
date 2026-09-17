/* =========================================================
   AgriDirect - Dashboard Logic & Middleman Calculator
   Smart India Hackathon 2026
   ========================================================= */

const CROP_CALC_DATA = {
    tomato: { name: "Tomatoes", directRate: 28, mandiRate: 16, retailRate: 42, tradSpoilage: 0.26, directSpoilage: 0.018 },
    onion:  { name: "Onions", directRate: 24, mandiRate: 14, retailRate: 38, tradSpoilage: 0.20, directSpoilage: 0.015 },
    rice:   { name: "Rice", directRate: 78, mandiRate: 54, retailRate: 110, tradSpoilage: 0.08, directSpoilage: 0.005 },
    potato: { name: "Potatoes", directRate: 22, mandiRate: 12, retailRate: 34, tradSpoilage: 0.18, directSpoilage: 0.012 },
    mango:  { name: "Mangoes", directRate: 140, mandiRate: 85, retailRate: 220, tradSpoilage: 0.32, directSpoilage: 0.025 }
};

function updateMiddlemanCalculator() {
    const cropKey = document.getElementById("calcCropSelect").value || "tomato";
    const volume = parseInt(document.getElementById("calcVolumeSlider").value) || 1000;
    const crop = CROP_CALC_DATA[cropKey] || CROP_CALC_DATA.tomato;

    document.getElementById("calcVolumeDisplay").innerText = `${volume.toLocaleString('en-IN')} kg`;

    // Traditional Model Math
    const tradFarmerTotal = crop.mandiRate * volume;
    const tradConsumerTotal = crop.retailRate * volume;
    const tradMiddlemanCut = tradConsumerTotal - tradFarmerTotal;
    const tradFarmerPercent = Math.round((tradFarmerTotal / tradConsumerTotal) * 100);
    const tradSpoilageKg = Math.round(volume * crop.tradSpoilage);

    // Direct Model Math
    const directFarmerTotal = crop.directRate * volume;
    const directConsumerPrice = Math.round(crop.directRate * 1.22); // slight platform & logistics fee
    const directConsumerTotal = directConsumerPrice * volume;
    const extraFarmerGain = directFarmerTotal - tradFarmerTotal;
    const extraFarmerGainPct = Math.round((extraFarmerGain / tradFarmerTotal) * 100);
    const buyerSavings = tradConsumerTotal - directConsumerTotal;
    const buyerSavingsPct = Math.round((buyerSavings / tradConsumerTotal) * 100);
    const directSpoilageKg = Math.round(volume * crop.directSpoilage);

    // Update DOM
    document.getElementById("tradFarmerShare").innerText = `₹${tradFarmerTotal.toLocaleString('en-IN')} (${tradFarmerPercent}%)`;
    document.getElementById("tradConsumerPay").innerText = `₹${tradConsumerTotal.toLocaleString('en-IN')}`;
    document.getElementById("tradMiddlemanCut").innerText = `₹${tradMiddlemanCut.toLocaleString('en-IN')}`;
    document.getElementById("tradSpoilageLoss").innerText = `${tradSpoilageKg} kg (${Math.round(crop.tradSpoilage * 100)}%)`;

    document.getElementById("directFarmerEarn").innerText = `₹${directFarmerTotal.toLocaleString('en-IN')} (78%)`;
    document.getElementById("directConsumerPay").innerText = `₹${directConsumerTotal.toLocaleString('en-IN')}`;
    document.getElementById("directExtraFarmerGain").innerText = `+₹${extraFarmerGain.toLocaleString('en-IN')} (+${extraFarmerGainPct}%)`;
    document.getElementById("directBuyerSaving").innerText = `₹${buyerSavings.toLocaleString('en-IN')} Saved (-${buyerSavingsPct}%)`;
    document.getElementById("directSpoilage").innerText = `${directSpoilageKg} kg (${(crop.directSpoilage * 100).toFixed(1)}%)`;
}

function renderDashboardOrders() {
    const tableBody = document.getElementById("dashboardOrdersTable");
    if (!tableBody) return;

    const orders = getOrders().slice(0, 4); // top 4 orders
    if (orders.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="5" style="text-align:center; color:#94a3b8; padding:20px;">No recent orders.</td></tr>`;
        return;
    }

    tableBody.innerHTML = orders.map(ord => `
        <tr>
            <td><strong>#${ord.id}</strong><br><small style="color:#94a3b8;">${ord.date}</small></td>
            <td>${ord.buyer}</td>
            <td>${ord.emoji || '🌾'} ${ord.product} <small style="color:#64748b;">(${ord.qty})</small></td>
            <td>
                <strong>₹${ord.total.toLocaleString('en-IN')}</strong>
                <br>
                <small style="color:#10b981; font-weight:700;">+₹${(ord.farmerGain || 1200).toLocaleString('en-IN')} extra</small>
            </td>
            <td>
                <span class="status ${ord.statusCode || 'transit'}">${ord.status}</span>
            </td>
        </tr>
    `).join("");
}

function renderDashboardPriceFeed() {
    const listEl = document.getElementById("priceFeedList");
    if (!listEl) return;

    const products = getProducts().slice(0, 5);
    listEl.innerHTML = products.map(prod => `
        <div class="price-feed-item">
            <div class="price-feed-info">
                <span class="price-feed-emoji">${prod.emoji}</span>
                <div>
                    <div class="price-feed-name">${prod.name}</div>
                    <div class="price-feed-location">📍 ${prod.location}</div>
                </div>
            </div>
            <div class="price-feed-rates">
                <div>
                    <span class="rate-mandi">Mandi ₹${prod.mandiPrice}</span>
                    <span class="rate-direct">Direct ₹${prod.directPrice}/${prod.unit}</span>
                </div>
                <small style="color:#10b981; font-weight:bold;">
                    +${Math.round(((prod.directPrice - prod.mandiPrice) / prod.mandiPrice) * 100)}% Farmer Gain
                </small>
            </div>
        </div>
    `).join("");
}

// Init Dashboard
document.addEventListener("DOMContentLoaded", () => {
    updateMiddlemanCalculator();
    renderDashboardOrders();
    renderDashboardPriceFeed();
});