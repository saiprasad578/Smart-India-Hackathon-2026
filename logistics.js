/* =========================================================
   AgriDirect - AI Logistics & Route Optimizer Controller
   Smart India Hackathon 2026
   ========================================================= */

let currentRouteMode = "ai"; // 'ai' or 'legacy'
let truckAnimProgress = 0;
let truckAnimInterval = null;

const AI_WAYPOINTS = [
    { title: "Node A: Ramesh FPO Gate (Kolar)", time: "08:30 AM", details: "Farm-gate pickup • 1,200 kg Hybrid Tomatoes (Pre-sorted in crates)", type: "normal" },
    { title: "Node B: Green Valley Farm Gate", time: "09:15 AM", details: "Cluster pickup • 800 kg Red Onions (Loaded into multi-temp compartment)", type: "normal" },
    { title: "Node C: AgriDirect Pre-Cooling Hub", time: "10:00 AM", details: "Rapid chilling to 4.0°C • Digital Quality Assay & QR lot seal applied", type: "cooling" },
    { title: "Corridor: Cold Highway Transit", time: "11:30 AM - 04:30 PM", details: "IoT telematics monitored reefer express run • Zero unnecessary touchpoints", type: "cooling" },
    { title: "Destination: Hyderabad Distribution Center", time: "07:30 PM", details: "Direct dock delivery to FreshMart & Consumer Hub • Instant Escrow Trigger", type: "dest" }
];

const LEGACY_WAYPOINTS = [
    { title: "Stop 1: Village Middleman Aggregation", time: "Day 1, 09:00 AM", details: "Produce dumped unchilled on dirt floor • 8% preliminary bruising loss", type: "normal" },
    { title: "Stop 2: Local APMC Primary Mandi", time: "Day 1, 06:00 PM", details: "Auction wait time 14 hours • Open sun exposure • Commission fee 12%", type: "normal" },
    { title: "Stop 3: Secondary Interstate Wholesale Yard", time: "Day 2, 11:00 AM", details: "Reloaded into open non-refrigerated truck • 14% heat rot decay", type: "normal" },
    { title: "Stop 4: City Distributor Godown", time: "Day 3, 04:00 AM", details: "Third manual handling stage • Grade degradation to Grade C", type: "normal" },
    { title: "Final: Push-cart Retailers & Vendors", time: "Day 3, 11:00 AM", details: "Consumer pays 250% markup for 3-day-old produce • 26% total spoilage", type: "dest" }
];

function setRouteMode(mode) {
    currentRouteMode = mode;
    document.querySelectorAll(".route-btn").forEach(b => b.classList.remove("active"));
    if (mode === "ai") document.getElementById("btnAiRoute").classList.add("active");
    if (mode === "legacy") document.getElementById("btnLegacyRoute").classList.add("active");

    updateRouteStats();
    renderRouteSvg();
    renderWaypoints();
}

function updateRouteStats() {
    if (currentRouteMode === "ai") {
        document.getElementById("routeDistance").innerText = "168 km";
        document.getElementById("routeTime").innerText = "11.5 Hours";
        document.getElementById("routeFuel").innerText = "₹6,600";
        document.getElementById("routeSpoilage").innerText = "1.8%";
        document.getElementById("routeSpoilage").style.color = "#10b981";
        document.getElementById("distDelta").innerText = "↓ 51% shorter path";
        document.getElementById("timeDelta").innerText = "↓ 26.5 hrs saved";
        document.getElementById("fuelDelta").innerText = "↓ ₹7,600 saved";
        document.getElementById("spoilDelta").innerText = "↓ from 26% wastage";
        document.getElementById("routeStatusText").innerText = "🟢 AI Route Active • Cold Chain Reefer En Route";
        document.getElementById("clusterTag").innerText = "4 Nodes Unified";
        document.getElementById("clusterTag").className = "badge-tag green";
    } else {
        document.getElementById("routeDistance").innerText = "342 km";
        document.getElementById("routeTime").innerText = "38.0 Hours";
        document.getElementById("routeFuel").innerText = "₹14,200";
        document.getElementById("routeSpoilage").innerText = "26.4%";
        document.getElementById("routeSpoilage").style.color = "#ef4444";
        document.getElementById("distDelta").innerText = "↑ Circuitous 5-hop path";
        document.getElementById("timeDelta").innerText = "↑ Delayed 3-day transit";
        document.getElementById("fuelDelta").innerText = "↑ Multiple empty returns";
        document.getElementById("spoilDelta").innerText = "↑ Severe post-harvest rot";
        document.getElementById("routeStatusText").innerText = "⚠️ Legacy Route • Non-refrigerated Uncoordinated Haul";
        document.getElementById("clusterTag").innerText = "Fragmented 5 Hops";
        document.getElementById("clusterTag").className = "badge-tag red";
    }
}

function renderWaypoints() {
    const timeline = document.getElementById("waypointsTimeline");
    if (!timeline) return;

    const list = currentRouteMode === "ai" ? AI_WAYPOINTS : LEGACY_WAYPOINTS;
    timeline.innerHTML = list.map((w, idx) => `
        <div class="timeline-step">
            <div class="step-marker ${w.type}"></div>
            <div class="step-content">
                <div class="step-header">
                    <h4>${w.title}</h4>
                    <span class="step-time">${w.time}</span>
                </div>
                <p class="step-details">${w.details}</p>
            </div>
        </div>
    `).join("");
}

function renderRouteSvg() {
    const svg = document.getElementById("routeMapSvg");
    if (!svg) return;

    if (currentRouteMode === "ai") {
        // AI Clustered Route
        svg.innerHTML = `
            <!-- Background Map Grid & Roads -->
            <defs>
                <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stop-color="#10b981" />
                    <stop offset="50%" stop-color="#3b82f6" />
                    <stop offset="100%" stop-color="#10b981" />
                </linearGradient>
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="4" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
            </defs>

            <!-- Base Grid Lines -->
            <line x1="60" y1="80" x2="840" y2="80" stroke="#163024" stroke-width="1" stroke-dasharray="8 8" />
            <line x1="60" y1="200" x2="840" y2="200" stroke="#163024" stroke-width="1" stroke-dasharray="8 8" />
            <line x1="60" y1="320" x2="840" y2="320" stroke="#163024" stroke-width="1" stroke-dasharray="8 8" />

            <!-- Region Boundaries -->
            <rect x="70" y="50" width="220" height="280" rx="16" fill="rgba(16, 185, 129, 0.05)" stroke="#10b981" stroke-width="1" stroke-dasharray="4 4" />
            <text x="85" y="75" fill="#34d399" font-size="12" font-weight="bold" font-family="sans-serif">🌿 Rural Producer Cluster (Kolar)</text>

            <rect x="610" y="50" width="220" height="280" rx="16" fill="rgba(59, 130, 246, 0.05)" stroke="#3b82f6" stroke-width="1" stroke-dasharray="4 4" />
            <text x="625" y="75" fill="#60a5fa" font-size="12" font-weight="bold" font-family="sans-serif">🏙️ Urban Consumption Hub</text>

            <!-- AI Highway Route Path -->
            <path id="aiPath" d="M 120 130 Q 180 180 230 160 T 360 210 Q 520 230 640 180 T 780 150" 
                  fill="none" stroke="url(#routeGradient)" stroke-width="5" stroke-linecap="round" filter="url(#glow)" />

            <!-- Farm Node 1 -->
            <circle cx="120" cy="130" r="10" fill="#10b981" stroke="#ffffff" stroke-width="2" />
            <text x="120" y="112" fill="#ffffff" font-size="11" font-weight="bold" text-anchor="middle" font-family="sans-serif">Farm Gate A</text>

            <!-- Farm Node 2 -->
            <circle cx="230" cy="160" r="9" fill="#10b981" stroke="#ffffff" stroke-width="2" />
            <text x="230" y="185" fill="#ffffff" font-size="11" font-weight="bold" text-anchor="middle" font-family="sans-serif">Farm Gate B</text>

            <!-- Central Pre-Cooling Hub -->
            <rect x="330" y="185" width="60" height="50" rx="10" fill="#1e3a8a" stroke="#60a5fa" stroke-width="2" />
            <text x="360" y="215" fill="#ffffff" font-size="20" text-anchor="middle">❄️</text>
            <text x="360" y="255" fill="#93c5fd" font-size="11" font-weight="bold" text-anchor="middle" font-family="sans-serif">Pre-Cooling Hub (4°C)</text>

            <!-- Destination -->
            <circle cx="780" cy="150" r="12" fill="#f59e0b" stroke="#ffffff" stroke-width="3" />
            <text x="780" y="130" fill="#fef08a" font-size="12" font-weight="bold" text-anchor="middle" font-family="sans-serif">Distribution Hub</text>

            <!-- Moving Truck Simulation -->
            <g id="movingTruckGroup" transform="translate(420, 215)">
                <circle cx="0" cy="0" r="16" fill="#10b981" />
                <text x="0" y="6" font-size="15" text-anchor="middle">🚚</text>
            </g>
        `;
    } else {
        // Legacy 5-Hop Route
        svg.innerHTML = `
            <!-- Base Grid Lines -->
            <line x1="60" y1="80" x2="840" y2="80" stroke="#2a1616" stroke-width="1" stroke-dasharray="8 8" />
            <line x1="60" y1="200" x2="840" y2="200" stroke="#2a1616" stroke-width="1" stroke-dasharray="8 8" />
            <line x1="60" y1="320" x2="840" y2="320" stroke="#2a1616" stroke-width="1" stroke-dasharray="8 8" />

            <!-- Legacy Circuitous Zigzag Path -->
            <path d="M 100 240 L 220 90 L 380 290 L 560 110 L 720 280 L 800 160" 
                  fill="none" stroke="#ef4444" stroke-width="3.5" stroke-dasharray="8 4" stroke-linecap="round" />

            <!-- Hop Nodes -->
            <circle cx="100" cy="240" r="9" fill="#ef4444" stroke="#ffffff" stroke-width="2" />
            <text x="100" y="270" fill="#fca5a5" font-size="11" font-weight="bold" text-anchor="middle" font-family="sans-serif">Village Trader</text>

            <circle cx="220" cy="90" r="9" fill="#ef4444" stroke="#ffffff" stroke-width="2" />
            <text x="220" y="70" fill="#fca5a5" font-size="11" font-weight="bold" text-anchor="middle" font-family="sans-serif">APMC Yard (Aadhatiya)</text>

            <circle cx="380" cy="290" r="9" fill="#ef4444" stroke="#ffffff" stroke-width="2" />
            <text x="380" y="320" fill="#fca5a5" font-size="11" font-weight="bold" text-anchor="middle" font-family="sans-serif">State Mandi (Transfer)</text>

            <circle cx="560" cy="110" r="9" fill="#ef4444" stroke="#ffffff" stroke-width="2" />
            <text x="560" y="90" fill="#fca5a5" font-size="11" font-weight="bold" text-anchor="middle" font-family="sans-serif">City Distributor Godown</text>

            <circle cx="720" cy="280" r="9" fill="#ef4444" stroke="#ffffff" stroke-width="2" />
            <text x="720" y="310" fill="#fca5a5" font-size="11" font-weight="bold" text-anchor="middle" font-family="sans-serif">Local Push-cart</text>

            <!-- Warning Callout -->
            <rect x="360" y="150" width="180" height="40" rx="8" fill="rgba(239, 68, 68, 0.2)" stroke="#ef4444" />
            <text x="450" y="175" fill="#fca5a5" font-size="12" font-weight="bold" text-anchor="middle" font-family="sans-serif">⚠️ 26% Spoilage Losses</text>
        `;
    }
}

function runAiRouteOptimization() {
    showToast("🤖 AI recalculating multi-stop cluster routes...", "⚡");
    const truck = document.getElementById("movingTruckGroup");
    if (truck) {
        truck.style.transition = "transform 1.5s ease-in-out";
        truck.setAttribute("transform", "translate(600, 190)");
    }

    setTimeout(() => {
        setRouteMode("ai");
        showToast("✓ Route Optimized! 51% distance cut, 1.8% minimal spoilage.", "🚚");
        speakText("रूट ऑप्टिमाइज़ हो गया है। दूरी 51% घटी, और ताज़गी शत-प्रतिशत सुरक्षित है!", "hi-IN");
    }, 1200);
}

// Live IoT sensor jitter simulation
function startTelematicsJitter() {
    setInterval(() => {
        const tempEl = document.getElementById("sensorTemp");
        const humEl = document.getElementById("sensorHumidity");
        if (tempEl && humEl) {
            const jitterTemp = (4.1 + Math.random() * 0.3).toFixed(1);
            const jitterHum = Math.round(87 + Math.random() * 3);
            tempEl.innerText = `${jitterTemp}°C`;
            humEl.innerText = `${jitterHum}% RH`;
        }
    }, 3500);
}

// Modal Handlers
function openDispatchModal() {
    document.getElementById("dispatchModal").classList.add("open");
}

function closeDispatchModal() {
    document.getElementById("dispatchModal").classList.remove("open");
}

function handleDispatchBooking(e) {
    e.preventDefault();
    const pickup = document.getElementById("dispPickup").value;
    const fleet = document.getElementById("dispFleetType").value;
    const cargo = document.getElementById("dispCargo").value;
    const time = document.getElementById("dispTime").value;

    closeDispatchModal();
    showToast(`🚚 ${fleet} booked for ${pickup}! Pickup scheduled for ${time}.`, "✅");
    speakText(`वाहन बुक हो गया है। ${fleet} कल आपके फार्म गेट पर पहुंचेगी।`, "hi-IN");
}

// Init
document.addEventListener("DOMContentLoaded", () => {
    updateRouteStats();
    renderRouteSvg();
    renderWaypoints();
    startTelematicsJitter();
});