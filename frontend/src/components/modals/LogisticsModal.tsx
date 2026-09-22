import React, { useState } from 'react';
import { 
  X, 
  Truck, 
  Navigation
} from 'lucide-react';

interface LogisticsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LogisticsModal: React.FC<LogisticsModalProps> = ({ isOpen, onClose }) => {
  const [activeStop, setActiveStop] = useState<number>(2);

  if (!isOpen) return null;

  const stops = [
    { num: 1, name: 'Dindori Farm Hub (Ramesh Patil)', time: '06:30 AM', load: '+500 kg', status: 'Completed' },
    { num: 2, name: 'Pimpalgaon Cluster (Tukaram Shinde)', time: '07:45 AM', load: '+450 kg', status: 'Completed' },
    { num: 3, name: 'Lasalgaon Depot (Ananda Jadhav)', time: '09:15 AM', load: '+350 kg', status: 'En Route' },
    { num: 4, name: 'Ozar Farm gate (Savita Ghadge)', time: '10:30 AM', load: '+400 kg', status: 'Scheduled' },
    { num: 5, name: 'Mumbai Vashi Central APMC Hub', time: '02:00 PM', load: 'Full 2,000 kg Unload', status: 'Scheduled' }
  ];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content animate-fade-in max-w-750" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header bg-teal-light">
          <div className="flex items-center gap-2">
            <div className="modal-header-icon bg-teal-100 text-teal-700">
              <Truck size={22} />
            </div>
            <div>
              <h3 className="modal-title">Pooled Route Optimization (VRP)</h3>
              <p className="modal-subtitle">Vehicle Routing Problem batching with verified per-kg savings</p>
            </div>
          </div>
          <button onClick={onClose} className="modal-close-btn">
            <X size={20} />
          </button>
        </div>

        <div className="modal-body p-6">
          {/* Key Savings Metrics */}
          <div className="grid grid-cols-3 gap-3 mb-5">
            <div className="p-3 bg-slate-50 border border-subtle rounded-xl">
              <span className="text-2xs text-muted block">Unpooled Trip Cost</span>
              <strong className="text-sm line-through text-muted">₹6.40 / kg</strong>
              <span className="text-2xs text-slate-500 block">(5 individual tempos)</span>
            </div>

            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl">
              <span className="text-2xs text-emerald-800 block">Pooled VRP Cost</span>
              <strong className="text-base text-primary">₹4.20 / kg</strong>
              <span className="text-2xs text-primary block">(1 batched 14ft carrier)</span>
            </div>

            <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl">
              <span className="text-2xs text-amber-900 block">Net Farmer & Buyer Saving</span>
              <strong className="text-base text-amber-700">34.3% Saved</strong>
              <span className="text-2xs text-amber-800 block">₹2.20 saved per kg</span>
            </div>
          </div>

          {/* Visual Route Map Canvas */}
          <div className="route-map-canvas mb-5 p-4 rounded-xl border border-subtle bg-slate-900 text-white relative overflow-hidden">
            <div className="flex items-center justify-between mb-3 text-xs">
              <div className="flex items-center gap-2">
                <Navigation size={14} className="text-emerald-400" />
                <span>Active Route: <strong>Dispatch Batch #DB-984 (Corridor: Nashik → Mumbai)</strong></span>
              </div>
              <span className="bg-emerald-500 text-black px-2 py-0.5 rounded text-2xs font-bold">
                Capacity: 88% Utilized (2,000 kg)
              </span>
            </div>

            {/* SVG Visual Map Line */}
            <div className="relative py-4">
              <svg viewBox="0 0 600 80" className="w-full h-16">
                {/* Background Route Line */}
                <line x1="50" y1="40" x2="550" y2="40" stroke="#334155" strokeWidth="4" strokeDasharray="6" />
                <line x1="50" y1="40" x2="300" y2="40" stroke="#10B981" strokeWidth="4" />

                {/* Nodes */}
                <circle cx="50" cy="40" r="8" fill="#10B981" />
                <circle cx="175" cy="40" r="8" fill="#10B981" />
                <circle cx="300" cy="40" r="10" fill="#F59E0B" className="animate-pulse" />
                <circle cx="425" cy="40" r="8" fill="#64748B" />
                <circle cx="550" cy="40" r="10" fill="#3B82F6" />
              </svg>

              <div className="flex justify-between text-2xs text-slate-400 px-2 mt-1">
                <span>Dindori</span>
                <span>Pimpalgaon</span>
                <span className="text-amber-400 font-bold">Lasalgaon (Current)</span>
                <span>Ozar</span>
                <span className="text-blue-400">Vashi APMC</span>
              </div>
            </div>
          </div>

          {/* Stop sequence list */}
          <div className="border border-subtle rounded-xl overflow-hidden mb-4">
            <div className="bg-slate-50 px-4 py-2 text-xs font-bold text-slate-700 border-b border-subtle">
              Clustered Pickup & Delivery Schedule
            </div>
            <div className="divide-y divide-subtle text-xs">
              {stops.map((stop) => (
                <div 
                  key={stop.num}
                  onClick={() => setActiveStop(stop.num)}
                  className={`px-4 py-2.5 flex items-center justify-between cursor-pointer ${activeStop === stop.num ? 'bg-teal-50 font-medium' : 'hover:bg-slate-50'}`}
                >
                  <div className="flex items-center gap-2">
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center text-2xs font-bold ${stop.status === 'Completed' ? 'bg-green-100 text-green-700' : stop.status === 'En Route' ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-600'}`}>
                      {stop.num}
                    </span>
                    <span>{stop.name}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-2xs text-muted">{stop.time}</span>
                    <span className="text-primary font-bold">{stop.load}</span>
                    <span className={`px-2 py-0.5 rounded text-2xs ${stop.status === 'Completed' ? 'bg-green-100 text-green-700' : stop.status === 'En Route' ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-600'}`}>
                      {stop.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end">
            <button onClick={onClose} className="btn-signup-primary text-xs px-5 py-2">
              Done / Close Optimizer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
