/* =========================================================
   AgriDirect - Orders & Escrow Tracking Controller
   Smart India Hackathon 2026
   ========================================================= */

let currentOrderFilter = "all";
let orderSearchQuery = "";

function renderOrdersTable() {
    const tbody = document.getElementById("ordersTableBody");
    if (!tbody) return;

    const orders = getOrders();
    const filtered = orders.filter(ord => {
        // Tab filter
        if (currentOrderFilter === "transit" && ord.statusCode !== "transit") return false;
        if (currentOrderFilter === "pending" && ord.statusCode !== "pending") return false;
        if (currentOrderFilter === "delivered" && ord.statusCode !== "delivered") return false;

        // Search query
        if (orderSearchQuery) {
            const text = (ord.id + " " + ord.buyer + " " + ord.farmer + " " + ord.product).toLowerCase();
            if (!text.includes(orderSearchQuery.toLowerCase())) return false;
        }

        return true;
    });

    if (filtered.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="8" style="text-align:center; padding: 40px; color:#94a3b8;">
                    <div style="font-size:36px; margin-bottom:8px;">📦</div>
                    <strong>No orders found matching this filter.</strong>
                </td>
            </tr>
        `;
        return;
    }

    tbody.innerHTML = filtered.map(ord => {
        const extraGain = ord.farmerGain || Math.round(ord.total * 0.35);
        return `
            <tr>
                <td>
                    <strong>#${ord.id}</strong><br>
                    <small style="color:#64748b;">${ord.date}</small>
                </td>
                <td>
                    <strong>${ord.buyer}</strong><br>
                    <small style="color:#94a3b8;">${ord.destination || 'Direct Fulfilment'}</small>
                </td>
                <td>
                    <span style="color:#10b981; font-weight:700;">🌱 ${ord.farmer}</span>
                </td>
                <td>
                    ${ord.emoji || '🌾'} <strong>${ord.product}</strong><br>
                    <small style="color:#64748b;">Lot: ${ord.qty}</small>
                </td>
                <td>
                    <strong style="font-size:15px; color:var(--forest-950);">₹${ord.total.toLocaleString('en-IN')}</strong>
                </td>
                <td>
                    <span style="color:#059669; font-weight:800; background:#ecfdf5; padding:3px 8px; border-radius:4px;">
                        +₹${extraGain.toLocaleString('en-IN')}
                    </span>
                    <br>
                    <small style="color:#64748b; font-size:10px;">vs Mandi Broker</small>
                </td>
                <td>
                    <span class="status ${ord.statusCode || 'transit'}">${ord.status}</span><br>
                    <small style="font-size:10px; color:#64748b;">🛡️ ${ord.escrowStatus || 'Escrow Verified'}</small>
                </td>
                <td>
                    <button class="primary-btn" style="padding:6px 12px; font-size:12px;" onclick="openOrderModal('${ord.id}')">
                        Inspect Tracking ➔
                    </button>
                </td>
            </tr>
        `;
    }).join("");
}

function filterOrders(status) {
    currentOrderFilter = status;
    document.querySelectorAll(".otab-btn").forEach(b => b.classList.remove("active"));
    if (status === "all") document.getElementById("tabAll").classList.add("active");
    if (status === "transit") document.getElementById("tabTransit").classList.add("active");
    if (status === "pending") document.getElementById("tabPending").classList.add("active");
    if (status === "delivered") document.getElementById("tabDelivered").classList.add("active");
    renderOrdersTable();
}

function searchOrders() {
    orderSearchQuery = document.getElementById("orderSearchInput").value;
    renderOrdersTable();
}

// Order Tracking Modal
function openOrderModal(ordId) {
    const modal = document.getElementById("orderModal");
    const title = document.getElementById("modalOrderTitle");
    const body = document.getElementById("modalOrderBody");
    if (!modal || !body) return;

    const orders = getOrders();
    const ord = orders.find(o => o.id === ordId) || orders[0];

    title.innerText = `📦 Live Tracking & Escrow: #${ord.id}`;

    const isDelivered = ord.statusCode === "delivered";
    const isTransit = ord.statusCode === "transit";

    body.innerHTML = `
        <!-- 5-Stage Stepper -->
        <div class="order-stepper">
            <div class="stepper-stage completed">
                <div class="stage-icon-circle">✓</div>
                <div class="stage-title">Harvest Confirmed</div>
            </div>
            <div class="stepper-stage completed">
                <div class="stage-icon-circle">✓</div>
                <div class="stage-title">FPO Pre-Cooled (4°C)</div>
            </div>
            <div class="stepper-stage ${isTransit || isDelivered ? 'completed' : 'active'}">
                <div class="stage-icon-circle">${isTransit || isDelivered ? '✓' : '🚚'}</div>
                <div class="stage-title">AI Route Dispatched</div>
            </div>
            <div class="stepper-stage ${isDelivered ? 'completed' : (isTransit ? 'active' : '')}">
                <div class="stage-icon-circle">${isDelivered ? '✓' : '❄️'}</div>
                <div class="stage-title">Highway Cold-Chain</div>
            </div>
            <div class="stepper-stage ${isDelivered ? 'completed' : ''}">
                <div class="stage-icon-circle">${isDelivered ? '✓' : '💰'}</div>
                <div class="stage-title">Delivered & Escrow Released</div>
            </div>
        </div>

        <!-- Digital QC Certificate -->
        <div class="qc-certificate-box">
            <div class="qc-header">
                <h4>📜 Digital Quality Assay Certificate (FPO Lab Assayed)</h4>
                <span class="badge-tag green">100% Passed</span>
            </div>
            <div class="qc-grid">
                <div class="qc-item">
                    <span>Produce Moisture:</span>
                    <strong>93.4% (Optimal)</strong>
                </div>
                <div class="qc-item">
                    <span>Pesticide Residue:</span>
                    <strong>Zero Detected (Safe)</strong>
                </div>
                <div class="qc-item">
                    <span>Reefer Sensor Temp:</span>
                    <strong>${ord.transitTemp || '4.2°C Chilled'}</strong>
                </div>
            </div>
        </div>

        <!-- Escrow Settlement Breakdown -->
        <div class="settlement-box">
            <h4>🛡️ RBI-Compliant Escrow Settlement Breakdown</h4>
            <div class="settlement-line">
                <span>Total Amount Paid by Buyer (${ord.buyer}):</span>
                <strong>₹${ord.total.toLocaleString('en-IN')}</strong>
            </div>
            <div class="settlement-line">
                <span>Farmer Direct Share (78% Net):</span>
                <strong style="color:#059669;">₹${Math.round(ord.total * 0.78).toLocaleString('en-IN')}</strong>
            </div>
            <div class="settlement-line">
                <span>Direct Cold Logistics Freight (14%):</span>
                <span>₹${Math.round(ord.total * 0.14).toLocaleString('en-IN')}</span>
            </div>
            <div class="settlement-line">
                <span>Quality Assay & Platform Support (8%):</span>
                <span>₹${Math.round(ord.total * 0.08).toLocaleString('en-IN')}</span>
            </div>
            <div class="settlement-line total">
                <span>Status:</span>
                <span style="color:#10b981;">${ord.escrowStatus || 'Protected in Escrow'}</span>
            </div>
        </div>

        <div style="display:flex; justify-content:space-between; margin-top:20px; align-items:center;">
            <button class="audio-guide-pill" onclick="playOrderVoiceNotice('${ord.id}', '${ord.product}', '${ord.status}', '${ord.total}')">
                🔊 स्टेटस सुनें (Audio Notice)
            </button>
            <button class="primary-btn" onclick="closeOrderModal()">
                Close
            </button>
        </div>
    `;

    modal.classList.add("open");
}

function closeOrderModal() {
    document.getElementById("orderModal").classList.remove("open");
}

function playOrderVoiceNotice(id, prod, status, total) {
    const text = `ऑर्डर सूचना: ऑर्डर नंबर ${id}, ${prod}। वर्तमान स्थिति: ${status}। कुल राशि ₹${total} एस्क्रो खाते में सुरक्षित है।`;
    speakText(text, "hi-IN");
}

// Init
document.addEventListener("DOMContentLoaded", () => {
    renderOrdersTable();
});