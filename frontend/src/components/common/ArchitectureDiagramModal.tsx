import React from 'react';
import { X, Smartphone, PhoneCall, UserCheck, Cpu, Database, Truck, ShieldCheck, CheckCircle } from 'lucide-react';

interface ArchitectureDiagramModalProps {
  isOpen: boolean;
  onClose: () => void;
  onJumpToStep?: (step: number) => void;
}

export const ArchitectureDiagramModal: React.FC<ArchitectureDiagramModalProps> = ({
  isOpen,
  onClose,
  onJumpToStep
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div className="bg-[#FAF7EE] text-[#1C2B19] rounded-2xl max-w-6xl w-full border border-gray-300 shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#1B2917] to-[#2E6B39] text-white px-6 py-4 flex items-center justify-between shrink-0">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold font-serif">KisanConnect System Architecture</span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#D69A2D] text-black font-semibold">SIH 2026</span>
            </div>
            <p className="text-xs text-white/80">Direct from Farm to You — Powered by AI, built for every farmer.</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Canvas */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs">
          {/* Top: Users & Access Channels */}
          <div>
            <h3 className="font-serif text-sm font-bold text-[#1B2917] mb-2 flex items-center gap-1.5">
              <span>1. Users & Access Channels</span>
              <span className="text-[10px] font-mono text-gray-500 font-normal">("One gateway, three access roads")</span>
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-6 gap-2 text-center">
              <div className="p-2.5 rounded-lg bg-[#EBF4ED] border border-[#2E6B39]/30">
                <div className="text-lg mb-1">👨‍🌾</div>
                <div className="font-bold text-[#2E6B39]">Farmers / Rural</div>
                <div className="text-[10px] text-gray-600 mt-1">App · IVR · SMS · FPO Agent</div>
              </div>
              <div className="p-2.5 rounded-lg bg-[#EEF2FC] border border-[#33477A]/30">
                <div className="text-lg mb-1">🏢</div>
                <div className="font-bold text-[#33477A]">FPOs & Agents</div>
                <div className="text-[10px] text-gray-600 mt-1">Intake · Weighing · Quality</div>
              </div>
              <div className="p-2.5 rounded-lg bg-[#FBF4E6] border border-[#D69A2D]/40">
                <div className="text-lg mb-1">🛒</div>
                <div className="font-bold text-[#B5502F]">Buyers</div>
                <div className="text-[10px] text-gray-600 mt-1">Bulk Lots · Web Portal</div>
              </div>
              <div className="p-2.5 rounded-lg bg-white border border-gray-200">
                <div className="text-lg mb-1">🥗</div>
                <div className="font-bold text-gray-800">Consumers</div>
                <div className="text-[10px] text-gray-600 mt-1">Direct Fresh Produce</div>
              </div>
              <div className="p-2.5 rounded-lg bg-white border border-gray-200">
                <div className="text-lg mb-1">🚛</div>
                <div className="font-bold text-gray-800">Logistics Partners</div>
                <div className="text-[10px] text-gray-600 mt-1">Pooled Vehicle Fleet</div>
              </div>
              <div className="p-2.5 rounded-lg bg-white border border-gray-200">
                <div className="text-lg mb-1">🏛️</div>
                <div className="font-bold text-gray-800">Govt / Admin</div>
                <div className="text-[10px] text-gray-600 mt-1">e-NAM Sync & Auditing</div>
              </div>
            </div>
          </div>

          {/* Central Platform Architecture: 3-column layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            {/* Left Column: 7-Step End-to-End Flow */}
            <div className="lg:col-span-3 bg-white p-3.5 rounded-xl border border-gray-200 shadow-2xs">
              <h4 className="font-serif font-bold text-xs text-[#2E6B39] mb-3 flex items-center gap-1.5">
                <span>End-to-End Demo Flow</span>
              </h4>
              <div className="space-y-2">
                {[
                  { n: 1, text: "Farmer Listing (Voice / IVR)", sub: "Telugu speech to structured lot" },
                  { n: 2, text: "AI Demand Forecasting", sub: "Regional seasonal projection" },
                  { n: 3, text: "Matching Engine", sub: "Farmgate-to-buyer scoring" },
                  { n: 4, text: "Logistics Optimization", sub: "Shared vehicle route stops" },
                  { n: 5, text: "Multi-Farmer Allocation", sub: "1,000kg → 300+400+300" },
                  { n: 6, text: "Delivery & Payment", sub: "OTP check & inspection" },
                  { n: 7, text: "Farmer Payout", sub: "Direct escrow credit via UPI" }
                ].map((s) => (
                  <div
                    key={s.n}
                    onClick={() => {
                      if (onJumpToStep) {
                        onJumpToStep(s.n);
                        onClose();
                      }
                    }}
                    className="p-2 rounded-lg bg-[#FAF8F3] hover:bg-[#EBF4ED] border border-gray-200 cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-4 h-4 rounded-full bg-[#2E6B39] text-white flex items-center justify-center font-bold text-[9px]">{s.n}</span>
                      <span className="font-semibold text-[#1C2B19]">{s.text}</span>
                    </div>
                    <div className="text-[9px] text-gray-500 pl-6">{s.sub}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Center Column: Core Engine & 6 AI Modules */}
            <div className="lg:col-span-6 space-y-3">
              {/* Presentation Layer */}
              <div className="p-3 bg-[#EEF2FC]/70 rounded-xl border border-[#33477A]/20">
                <span className="font-mono text-[9px] text-[#33477A] uppercase font-bold tracking-wider">Presentation Layer</span>
                <div className="grid grid-cols-3 gap-2 mt-1.5 text-center font-medium">
                  <div className="p-1.5 bg-white rounded-md border border-gray-200">Farmer App / IVR</div>
                  <div className="p-1.5 bg-white rounded-md border border-gray-200">FPO Hub Portal</div>
                  <div className="p-1.5 bg-white rounded-md border border-gray-200">Buyer Marketplace</div>
                </div>
              </div>

              {/* 6 AI Core Modules */}
              <div className="p-3 bg-[#EBF4ED] rounded-xl border border-[#2E6B39]/30">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-[9px] text-[#2E6B39] uppercase font-bold tracking-wider">AI & Analytics Layer (6 Core Modules)</span>
                  <span className="text-[9px] bg-[#2E6B39] text-white px-2 py-0.5 rounded-full font-medium">Real-time ML</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  <div className="p-2 bg-white rounded-lg border border-gray-200">
                    <div className="font-bold text-[#2E6B39]">1. Demand Forecast</div>
                    <div className="text-[9px] text-gray-500">Seasonality & regional orders</div>
                  </div>
                  <div className="p-2 bg-white rounded-lg border border-gray-200">
                    <div className="font-bold text-[#2E6B39]">2. Price Intelligence</div>
                    <div className="text-[9px] text-gray-500">Mandi reference range</div>
                  </div>
                  <div className="p-2 bg-white rounded-lg border border-gray-200">
                    <div className="font-bold text-[#2E6B39]">3. Supply Matcher</div>
                    <div className="text-[9px] text-gray-500">Proximity & lot scoring</div>
                  </div>
                  <div className="p-2 bg-white rounded-lg border border-gray-200">
                    <div className="font-bold text-[#2E6B39]">4. Route Optimizer</div>
                    <div className="text-[9px] text-gray-500">OR-Tools vehicle pooling</div>
                  </div>
                  <div className="p-2 bg-white rounded-lg border border-gray-200">
                    <div className="font-bold text-[#2E6B39]">5. Voice NLP</div>
                    <div className="text-[9px] text-gray-500">Telugu/Hindi/English parsing</div>
                  </div>
                  <div className="p-2 bg-white rounded-lg border border-gray-200">
                    <div className="font-bold text-[#2E6B39]">6. Risk & Advisory</div>
                    <div className="text-[9px] text-gray-500">Price/quantity anomaly check</div>
                  </div>
                </div>
              </div>

              {/* Data & Integration Layer */}
              <div className="p-3 bg-white rounded-xl border border-gray-200">
                <span className="font-mono text-[9px] text-gray-500 uppercase font-bold tracking-wider">Data & Integration Layer</span>
                <div className="grid grid-cols-2 gap-2 mt-1.5">
                  <div className="p-2 bg-[#FAF8F3] rounded-md border border-gray-200">
                    <div className="font-semibold flex items-center gap-1"><Database className="w-3 h-3 text-[#2E6B39]" /> PostgreSQL & Redis</div>
                    <div className="text-[9px] text-gray-500">Orders, allocations, listings, audit trail</div>
                  </div>
                  <div className="p-2 bg-[#FAF8F3] rounded-md border border-gray-200">
                    <div className="font-semibold flex items-center gap-1"><ShieldCheck className="w-3 h-3 text-[#D69A2D]" /> External Services</div>
                    <div className="text-[9px] text-gray-500">e-NAM, OSRM maps, UPI Escrow rails</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Multi-Farmer Allocation & 9 Checkpoints */}
            <div className="lg:col-span-3 space-y-3">
              {/* Multi-Farmer Allocation Card */}
              <div className="bg-white p-3 rounded-xl border border-gray-200 shadow-2xs">
                <h4 className="font-serif font-bold text-xs text-[#B5502F] mb-1">Multi-Farmer Allocation</h4>
                <p className="text-[9px] text-gray-500 mb-2">One 1,000 kg order. Three local growers.</p>
                <div className="space-y-1.5">
                  <div className="p-1.5 bg-[#EBF4ED] rounded-md text-[10px] flex justify-between items-center font-medium">
                    <span>Farmer A (Shamshabad)</span>
                    <span className="font-bold text-[#2E6B39]">300 kg</span>
                  </div>
                  <div className="p-1.5 bg-[#FBF4E6] rounded-md text-[10px] flex justify-between items-center font-medium">
                    <span>Farmer B (Chevella)</span>
                    <span className="font-bold text-[#D69A2D]">400 kg</span>
                  </div>
                  <div className="p-1.5 bg-[#EEF2FC] rounded-md text-[10px] flex justify-between items-center font-medium">
                    <span>Farmer C (Maheshwaram)</span>
                    <span className="font-bold text-[#33477A]">300 kg</span>
                  </div>
                </div>
              </div>

              {/* Trust & Payment Timeline Card */}
              <div className="bg-white p-3 rounded-xl border border-gray-200 shadow-2xs">
                <h4 className="font-serif font-bold text-xs text-[#1C2B19] mb-1">9 Trust Checkpoints</h4>
                <div className="space-y-1 text-[9px]">
                  <div className="flex items-center gap-1.5 text-[#2E6B39] font-medium"><span>✓ 1.</span> Farmer Listing</div>
                  <div className="flex items-center gap-1.5 text-[#2E6B39] font-medium"><span>✓ 2.</span> FPO Verification</div>
                  <div className="flex items-center gap-1.5 text-[#2E6B39] font-medium"><span>✓ 3.</span> Weight & Quality Grade</div>
                  <div className="flex items-center gap-1.5 text-[#2E6B39] font-medium"><span>✓ 4.</span> Buyer Bulk Order</div>
                  <div className="flex items-center gap-1.5 text-[#2E6B39] font-medium"><span>✓ 5.</span> RBI Escrow Lock</div>
                  <div className="flex items-center gap-1.5 text-[#2E6B39] font-medium"><span>✓ 6.</span> Pickup & Pool Sealed</div>
                  <div className="flex items-center gap-1.5 text-[#D69A2D] font-bold"><span>● 7.</span> Delivery OTP Check</div>
                  <div className="flex items-center gap-1.5 text-gray-500"><span>○ 8.</span> Buyer Acceptance</div>
                  <div className="flex items-center gap-1.5 text-gray-500"><span>○ 9.</span> Per-Farmer Payout</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-white px-6 py-3 border-t border-gray-200 flex items-center justify-between text-xs shrink-0">
          <div className="text-gray-500">
            <span className="font-serif font-semibold text-[#2E6B39]">Better Farming, Brighter Future</span> · Smart India Hackathon
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-[#2E6B39] text-white font-medium hover:bg-[#23532c] transition-colors"
          >
            Close Diagram
          </button>
        </div>
      </div>
    </div>
  );
};
