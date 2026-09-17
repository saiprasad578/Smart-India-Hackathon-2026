/* =========================================================
   AgriDirect - Marketplace Controller
   Smart India Hackathon 2026
   ========================================================= */

let currentMarketMode = "all"; // all, b2c, b2b
let currentCategory = "All";
let searchQuery = "";

function renderMarketplace() {
    const grid = document.getElementById("productsGrid");
    if (!grid) return;

    const allProducts = getProducts();
    const filtered = allProducts.filter(p => {
        // Mode filter
        if (currentMarketMode === "b2c" && p.type === "b2b") return false;
        if (currentMarketMode === "b2b" && p.type === "b2c") return false;

        // Category filter
        if (currentCategory !== "All" && p.category !== currentCategory) return false;

        // Search query
        if (searchQuery) {
            const text = (p.name + " " + p.farmer + " " + p.location + " " + (p.hindiName || "")).toLowerCase();
            if (!text.includes(searchQuery.toLowerCase())) return false;
        }

        return true;
    });

    if (filtered.length === 0) {
        grid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align:center; padding: 60px 20px; color:#94a3b8;">
                <div style="font-size:50px; margin-bottom:12px;">🌾</div>
                <h3>No Harvest Lots Found</h3>
                <p style="font-size:14px; margin-top:6px;">Try adjusting your search terms or category filter.</p>
            </div>
        `;
        return;
    }

    grid.innerHTML = filtered.map(p => {
        const farmerGainPct = Math.round(((p.directPrice - p.mandiPrice) / p.mandiPrice) * 100);
        const buyerSavingsPct = Math.round(((p.retailPrice - p.directPrice) / p.retailPrice) * 100);

        return `
            <div class="product-card" id="card-${p.id}">
                <div class="product-top-badge">
                    <span class="product-emoji-large">${p.emoji}</span>
                    <span class="product-harvest-time">⏱️ ${p.harvestDate}</span>
                </div>

                <div class="product-body">
                    <div class="product-header-line">
                        <span class="product-category-tag">${p.category}</span>
                        <button class="product-audio-btn" onclick="playCropSpeech('${p.name}', ${p.directPrice}, '${p.unit}')" title="Listen Rate Aloud">
                            🔊 सुनें
                        </button>
                    </div>

                    <h3 class="product-title">${p.name}</h3>
                    <div class="product-farmer-line">
                        <span>🌱</span>
                        <strong>${p.farmer}</strong>
                        <span style="color:#10b981; font-size:11px;">(Verified FPO)</span>
                    </div>
                    <div class="product-farmer-line" style="margin-top:-6px; color:#94a3b8;">
                        <span>📍</span>
                        <span>${p.location}</span>
                    </div>

                    <div class="product-grade-badge">
                        ${p.grade} • Available: <strong>${p.availableQty.toLocaleString('en-IN')} ${p.unit}</strong>
                    </div>

                    <!-- Price Benchmark Box -->
                    <div class="price-comparison-box">
                        <div class="price-main-row">
                            <div>
                                <span class="price-direct-val">₹${p.directPrice}</span>
                                <span style="font-size:12px; color:#64748b;">/${p.unit}</span>
                            </div>
                            <div class="price-mandi-tag">
                                Mandi Rate: <s>₹${p.mandiPrice}</s>
                            </div>
                        </div>
                        <div class="price-savings-tag">
                            <span style="color:#10b981;">Farmer gets: +${farmerGainPct}% extra</span>
                            <span style="color:#2563eb;">Buyer saves: ${buyerSavingsPct}%</span>
                        </div>
                    </div>

                    <!-- Actions -->
                    <div class="product-actions-bar">
                        <button class="primary-btn" onclick="addToCart('${p.id}')">
                            🛒 Add ${p.type === 'b2b' ? 'Lot' : 'to Cart'}
                        </button>
                        <button class="secondary-btn" onclick="requestQuote('${p.id}', '${p.name}')" title="B2B Bulk Contract">
                            📄 RFQ
                        </button>
                    </div>
                </div>
            </div>
        `;
    }).join("");
}

function playCropSpeech(name, price, unit) {
    const text = `${name}! डायरेक्ट भाव ₹${price} प्रति ${unit}. मंडी से बेहतर भाव, सीधे किसान से खरीदें।`;
    speakText(text, "hi-IN");
}

function requestQuote(prodId, prodName) {
    showToast(`RFQ Generated for ${prodName}! Escrow terms sent to FPO desk.`, "📄");
}

function setMarketMode(mode) {
    currentMarketMode = mode;
    document.querySelectorAll(".mode-btn").forEach(b => b.classList.remove("active"));
    if (mode === "all") document.getElementById("btnModeAll").classList.add("active");
    if (mode === "b2c") document.getElementById("btnModeB2C").classList.add("active");
    if (mode === "b2b") document.getElementById("btnModeB2B").classList.add("active");
    renderMarketplace();
}

function setCategory(cat, el) {
    currentCategory = cat;
    document.querySelectorAll(".cat-chip").forEach(c => c.classList.remove("active"));
    if (el) el.classList.add("active");
    renderMarketplace();
}

function filterProducts() {
    searchQuery = document.getElementById("searchInput").value;
    renderMarketplace();
}

// Add Product Modal
function openAddProductModal() {
    document.getElementById("addProductModal").classList.add("open");
}

function closeAddProductModal() {
    document.getElementById("addProductModal").classList.remove("open");
}

function handleNewProductSubmit(e) {
    e.preventDefault();
    const name = document.getElementById("newProdName").value;
    const cat = document.getElementById("newProdCategory").value;
    const price = parseInt(document.getElementById("newProdPrice").value);
    const qty = parseInt(document.getElementById("newProdQty").value);
    const farmer = document.getElementById("newProdFarmer").value;
    const loc = document.getElementById("newProdLocation").value;
    const emoji = document.getElementById("newProdEmoji").value || "🌾";

    createNewHarvestLot(name, cat, price, farmer, loc, qty, "kg", emoji);
    closeAddProductModal();
    renderMarketplace();
    showToast(`🌾 New Harvest lot of ${name} listed successfully!`, "✅");
}

// Init
document.addEventListener("DOMContentLoaded", () => {
    renderMarketplace();
});