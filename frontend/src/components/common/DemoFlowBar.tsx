import React from 'react';
import { Mic, TrendingUp, Shuffle, Navigation, Users, CheckCircle2, IndianRupee, ArrowRight } from 'lucide-react';

interface DemoFlowBarProps {
  currentStep: number;
  onSelectStep: (step: number) => void;
}

export const DemoFlowBar: React.FC<DemoFlowBarProps> = ({ currentStep, onSelectStep }) => {
  const steps = [
    { num: 1, title: "1. Farmer Listing", sub: "Telugu Voice / IVR", icon: Mic, role: "farmer" },
    { num: 2, title: "2. AI Forecasting", sub: "Seasonality & Demand", icon: TrendingUp, role: "admin" },
    { num: 3, title: "3. Matching Engine", sub: "Supply & Demand Scoring", icon: Shuffle, role: "admin" },
    { num: 4, title: "4. Logistics Pooling", sub: "OR-Tools & Route Map", icon: Navigation, role: "logistics" },
    { num: 5, title: "5. Multi-Farmer Split", sub: "1,000kg → 300+400+300", icon: Users, role: "buyer" },
    { num: 6, title: "6. Delivery & OTP", sub: "Inspection & Escrow", icon: CheckCircle2, role: "buyer" },
    { num: 7, title: "7. Farmer Payout", sub: "Instant UPI / Bank Credit", icon: IndianRupee, role: "farmer" },
  ];

  return (
    <div className="bg-[#FAF7EE] border-b border-[#22301D]/10 py-2.5 px-4 shadow-2xs">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 overflow-x-auto scrollbar-none">
        <div className="flex items-center gap-1.5 shrink-0 pr-3 border-r border-gray-300">
          <span className="text-[10px] font-mono tracking-wider uppercase text-[#D69A2D] font-bold">End-to-End</span>
          <span className="text-xs font-serif font-bold text-[#1C2B19]">Demo Flow</span>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {steps.map((s, idx) => {
            const isCurrent = currentStep === s.num;
            const isCompleted = currentStep > s.num;
            const Icon = s.icon;

            return (
              <React.Fragment key={s.num}>
                <button
                  onClick={() => onSelectStep(s.num)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-left transition-all ${
                    isCurrent
                      ? 'bg-[#2E6B39] text-white shadow-xs ring-2 ring-[#2E6B39]/20'
                      : isCompleted
                      ? 'bg-[#EBF4ED] text-[#2E6B39] border border-[#2E6B39]/20'
                      : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                    isCurrent ? 'bg-white text-[#2E6B39]' : isCompleted ? 'bg-[#2E6B39] text-white' : 'bg-gray-200 text-gray-700'
                  }`}>
                    {isCompleted ? '✓' : s.num}
                  </div>
                  <div>
                    <div className="text-xs font-semibold leading-tight">{s.title.split('. ')[1]}</div>
                    <div className={`text-[10px] leading-tight ${isCurrent ? 'text-white/80' : 'text-gray-500'}`}>{s.sub}</div>
                  </div>
                </button>

                {idx < steps.length - 1 && (
                  <ArrowRight className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
};
