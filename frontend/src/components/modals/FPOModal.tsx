import React, { useState } from 'react';
import { 
  X, 
  Users, 
  CheckCircle2, 
  ShieldCheck, 
  FileCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface FPOModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FPOModal: React.FC<FPOModalProps> = ({ isOpen, onClose }) => {
  const [batchDispatched, setBatchDispatched] = useState(false);

  if (!isOpen) return null;

  const farmers = [
    { id: 'F-101', name: 'Ramesh Patil', village: 'Dindori', crop: 'Nashik Onion', grade: 'Grade A', qty: 450, price: 22 },
    { id: 'F-102', name: 'Tukaram Shinde', village: 'Pimpalgaon', crop: 'Nashik Onion', grade: 'Grade A', qty: 550, price: 21.5 },
    { id: 'F-103', name: 'Ananda Jadhav', village: 'Lasalgaon', crop: 'Nashik Onion', grade: 'Grade B', qty: 350, price: 21 },
    { id: 'F-104', name: 'Savita Ghadge', village: 'Ozar', crop: 'Hybrid Tomato', grade: 'Grade A', qty: 600, price: 18 },
    { id: 'F-105', name: 'Ganpat Bhor', village: 'Dindori', crop: 'Hybrid Tomato', grade: 'Grade A', qty: 450, price: 17.5 }
  ];

  const handleBatchDispatch = () => {
    setBatchDispatched(true);
    confetti({
      particleCount: 70,
      spread: 60
    });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content animate-fade-in max-w-750" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header bg-fpo-light">
          <div className="flex items-center gap-2">
            <div className="modal-header-icon bg-fpo-accent text-fpo">
              <Users size={22} />
            </div>
            <div>
              <h3 className="modal-title">FPO / Agent Coordination Portal</h3>
              <p className="modal-subtitle">Sahyadri Farmer Producer Co., Cluster #MH-08 (Assisted Mode)</p>
            </div>
          </div>
          <button onClick={onClose} className="modal-close-btn">
            <X size={20} />
          </button>
        </div>

        <div className="modal-body p-6">
          {/* Summary stats */}
          <div className="grid grid-cols-3 gap-3 mb-5">
            <div className="fpo-stat-card">
              <span className="text-xs text-muted">Registered Farmers</span>
              <strong className="text-lg text-fpo">142 Farmers</strong>
            </div>
            <div className="fpo-stat-card">
              <span className="text-xs text-muted">Ready for Pooling</span>
              <strong className="text-lg text-primary">2,400 kg</strong>
            </div>
            <div className="fpo-stat-card">
              <span className="text-xs text-muted">Cluster Payouts Held</span>
              <strong className="text-lg text-amber">₹50,450 (Escrow)</strong>
            </div>
          </div>

          {/* Table of Assisted Farmers */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-bold text-sm text-slate-800">Farmers in Batch Queue</h4>
              <span className="badge-pill bg-green-100 text-green-800 text-xs">
                <ShieldCheck size={12} /> Agent Pre-Inspected
              </span>
            </div>

            <div className="overflow-x-auto border border-subtle rounded-lg">
              <table className="fpo-roster-table w-full text-left text-xs">
                <thead>
                  <tr className="bg-slate-50 text-muted border-b border-subtle">
                    <th className="p-2">Farmer</th>
                    <th className="p-2">Village</th>
                    <th className="p-2">Crop & Grade</th>
                    <th className="p-2">Quantity</th>
                    <th className="p-2">Ask Rate</th>
                    <th className="p-2">Verification</th>
                  </tr>
                </thead>
                <tbody>
                  {farmers.map((f) => (
                    <tr key={f.id} className="border-b border-subtle hover:bg-slate-50">
                      <td className="p-2 font-medium">{f.name}</td>
                      <td className="p-2 text-muted">{f.village}</td>
                      <td className="p-2">{f.crop} ({f.grade})</td>
                      <td className="p-2 font-bold">{f.qty} kg</td>
                      <td className="p-2 text-primary font-semibold">₹{f.price}/kg</td>
                      <td className="p-2">
                        <span className="inline-flex items-center gap-1 text-green-700 bg-green-50 px-2 py-0.5 rounded-full text-2xs">
                          <CheckCircle2 size={10} /> Verified
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Action Row */}
          {batchDispatched ? (
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-center animate-fade-in">
              <CheckCircle2 size={32} className="text-primary mx-auto mb-2" />
              <h5 className="font-bold text-slate-800">Batch Pooled & Offered to Matching Engine!</h5>
              <p className="text-xs text-muted mb-3">
                Orders have been batched into Dispatch Batch #DB-984. Pickup route automatically synced with Logistics partner.
              </p>
              <button onClick={() => setBatchDispatched(false)} className="btn-login-outline text-xs px-4 py-1.5">
                Refresh Queue
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-between pt-2 border-t border-subtle">
              <div className="text-xs text-muted">
                Combined weight: <strong>2,400 kg</strong> across 5 farms
              </div>
              <button 
                onClick={handleBatchDispatch}
                className="btn-signup-primary flex items-center gap-2 px-5 py-2.5 text-sm"
              >
                <FileCheck size={16} />
                <span>Publish Batch to Marketplace</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
