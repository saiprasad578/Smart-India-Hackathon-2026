import React, { useState, useEffect } from 'react';
import { Cpu, TrendingUp, DollarSign, Shuffle, Navigation, Mic, ShieldAlert, CheckCircle2, AlertTriangle, Database } from 'lucide-react';
import { api } from '../../api/client';

export const AdminPortal: React.FC = () => {
  const [forecastData, setForecastData] = useState<any>(null);
  const [priceData, setPriceData] = useState<any>(null);

  useEffect(() => {
    const fetchAI = async () => {
      const f = await api.getDemandForecast();
      setForecastData(f);
      const p = await api.getPriceReference("tomato");
      setPriceData(p);
    };
    fetchAI();
  }, []);

  return (
    <div className="space-y-6">
      {/* Admin & AI Header */}
      <div className="bg-gradient-to-r from-[#1C2B19] to-[#243620] text-white rounded-2xl p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xl font-bold font-serif">KisanConnect Government & AI Platform Analytics</span>
            <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-[#D69A2D] text-black font-semibold">e-NAM Integrated</span>
          </div>
          <p className="text-xs text-white/80">Supervisory Dashboard · Regional Mandi Data Sync · AI Inference Telemetry</p>

          <div className="flex items-center gap-4 mt-4 text-xs font-mono">
            <div>
              <span className="text-white/60 block text-[10px]">Registered Farmers</span>
              <span className="text-base font-bold text-white">1,480 Active</span>
            </div>
            <div className="border-l border-white/20 pl-4">
              <span className="text-white/60 block text-[10px]">Total Traded Volume</span>
              <span className="text-base font-bold text-[#D69A2D]">42,500 kg</span>
            </div>
            <div className="border-l border-white/20 pl-4">
              <span className="text-white/60 block text-[10px]">Escrow Settlement Rate</span>
              <span className="text-base font-bold text-[#EBF4ED]">99.8% (0 Disputes)</span>
            </div>
          </div>
        </div>

        <div className="bg-white/10 p-3 rounded-xl border border-white/20 shrink-0 text-xs text-white space-y-1">
          <div className="font-bold flex items-center gap-1.5"><Database className="w-4 h-4 text-[#D69A2D]" /> PostgreSQL Cluster</div>
          <div className="text-[11px] text-white/80">Lat: 12ms · Uptime: 100%</div>
          <div className="text-[11px] text-white/80">6 ML Modules: Online & Calibrated</div>
        </div>
      </div>

      {/* 6 AI Core Modules Detailed Telemetry */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Cpu className="w-5 h-5 text-[#2E6B39]" />
            <h3 className="font-serif text-base font-bold text-[#1C2B19]">6 AI Core Modules Telemetry</h3>
          </div>
          <span className="text-xs text-[#2E6B39] font-medium bg-[#EBF4ED] px-2.5 py-0.5 rounded-full">All Models Operational</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Module 1: Demand Forecasting */}
          <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#2E6B39] flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4" /> 1. Demand Forecasting
              </span>
              <span className="text-[10px] font-mono text-gray-500">Seasonality ML</span>
            </div>
            <div className="space-y-2 text-xs">
              {forecastData?.forecasts?.map((f: any) => (
                <div key={f.crop} className="p-2 rounded-lg bg-[#FAF8F3] border border-gray-200">
                  <div className="flex justify-between font-semibold capitalize text-[#1C2B19]">
                    <span>{f.crop}</span>
                    <span className="text-[#2E6B39]">{f.projected_demand_kg.toLocaleString()} kg</span>
                  </div>
                  <div className="text-[10px] text-gray-500 mt-0.5 line-clamp-1">{f.recommended_action}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Module 2: Price Intelligence */}
          <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#D69A2D] flex items-center gap-1.5">
                <DollarSign className="w-4 h-4" /> 2. Price Intelligence
              </span>
              <span className="text-[10px] font-mono text-gray-500">Mandi + e-NAM</span>
            </div>

            <div className="p-3 bg-[#FBF4E6] rounded-xl border border-[#D69A2D]/30 space-y-2 text-xs">
              <div className="font-bold text-[#1C2B19]">Tomato (Shamshabad Mandi)</div>
              <div className="grid grid-cols-3 gap-1 text-center font-mono">
                <div className="bg-white p-1.5 rounded-md">
                  <span className="text-[9px] text-gray-500 block">Min</span>
                  <span className="font-bold text-gray-800">₹22/kg</span>
                </div>
                <div className="bg-white p-1.5 rounded-md border-2 border-[#2E6B39]">
                  <span className="text-[9px] text-[#2E6B39] font-bold block">Modal</span>
                  <span className="font-bold text-[#2E6B39]">₹26/kg</span>
                </div>
                <div className="bg-white p-1.5 rounded-md">
                  <span className="text-[9px] text-gray-500 block">Max</span>
                  <span className="font-bold text-gray-800">₹30/kg</span>
                </div>
              </div>
              <div className="text-[10px] text-gray-600 pt-1">
                Trend: <b className="text-[#2E6B39]">+4.5% wholesale rise</b>. Farmers advised to list lots immediately.
              </div>
            </div>

            <div className="text-[11px] text-gray-500 italic">
              "Surfaces a reference price range from mandi data so no farmer is negotiating blind."
            </div>
          </div>

          {/* Module 3: Matching Engine */}
          <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#33477A] flex items-center gap-1.5">
                <Shuffle className="w-4 h-4" /> 3. Matching Engine
              </span>
              <span className="text-[10px] font-mono text-gray-500">Scoring Model</span>
            </div>

            <p className="text-xs text-gray-600">
              Matches incoming buyer lot requirements against available local farmer clusters based on geographic proximity, freshness window, and capacity.
            </p>

            <div className="p-2.5 bg-[#EEF2FC] rounded-xl text-xs space-y-1.5">
              <div className="flex justify-between font-medium">
                <span>Cluster Proximity Match:</span>
                <span className="font-bold text-[#33477A]">98.2%</span>
              </div>
              <div className="flex justify-between font-medium">
                <span>Lot Splitting Efficiency:</span>
                <span className="font-bold text-[#33477A]">100% (3 Growers)</span>
              </div>
            </div>
          </div>

          {/* Module 4: Route Optimization */}
          <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-2xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#2E6B39] flex items-center gap-1.5">
                <Navigation className="w-4 h-4" /> 4. Route Optimization
              </span>
              <span className="text-[10px] font-mono text-gray-500">Google OR-Tools</span>
            </div>
            <p className="text-xs text-gray-600">
              Solves Capacitated Vehicle Routing Problem (CVRP) to pool 3 farm pickups into 1 central hub stop and 1 delivery drop.
            </p>
            <div className="p-2 bg-[#FAF8F3] rounded-lg text-xs space-y-1">
              <div className="flex justify-between"><span>Vehicle:</span><span className="font-mono">TS-07-AGRI-1088</span></div>
              <div className="flex justify-between"><span>Mileage Saved:</span><span className="text-[#2E6B39] font-bold">54%</span></div>
            </div>
          </div>

          {/* Module 5: Voice NLP */}
          <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-2xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#B5502F] flex items-center gap-1.5">
                <Mic className="w-4 h-4" /> 5. Multilingual Voice NLP
              </span>
              <span className="text-[10px] font-mono text-gray-500">Phonetic Parser</span>
            </div>
            <p className="text-xs text-gray-600">
              Extracts crop, quantity, unit, availability from regional dialects (Telugu, Hindi, English) with speech confirmation.
            </p>
            <div className="p-2 bg-[#FAF8F3] rounded-lg text-xs flex justify-between">
              <span>Intent Accuracy:</span>
              <span className="text-[#2E6B39] font-bold">96.4%</span>
            </div>
          </div>

          {/* Module 6: Risk & Anomaly Detection */}
          <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-2xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#33477A] flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4" /> 6. Risk & Advisory
              </span>
              <span className="text-[10px] font-mono text-gray-500">Anomaly Engine</span>
            </div>
            <p className="text-xs text-gray-600">
              Assists human review by flagging extreme price deviations or abnormal bulk orders without accusing users.
            </p>
            <div className="p-2 bg-[#EBF4ED] text-[#2E6B39] rounded-lg text-xs flex items-center gap-1.5 font-medium">
              <CheckCircle2 className="w-4 h-4" />
              <span>Current Pipeline: All Listings Normal</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
