import React, { useState } from 'react';
import { 
  X, 
  MapPin, 
  Phone, 
  Building2,
  Navigation
} from 'lucide-react';

interface CenterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CenterModal: React.FC<CenterModalProps> = ({ isOpen, onClose }) => {
  const [search, setSearch] = useState('');

  if (!isOpen) return null;

  const centers = [
    {
      name: 'Sahyadri FPO Village Resource Center',
      village: 'Dindori, Nashik District',
      operator: 'Sachin Wagh (Trained Village Coordinator)',
      phone: '+91 98234 56781',
      distance: '1.8 km away',
      facilities: ['Digital Weighbridge', 'Tablet Assisted Listing', 'Immediate Cash Escrow Help']
    },
    {
      name: 'Pimpalgaon APMC Kisan Seva Kendra',
      village: 'Pimpalgaon Baswant',
      operator: 'Pooja Jadhav (Agri Extension Officer)',
      phone: '+91 94222 18934',
      distance: '6.4 km away',
      facilities: ['Quality Assay Testing', 'Moisture Meter', 'Language Voice Assistance']
    },
    {
      name: 'Lasalgaon Cluster Farmer Hub',
      village: 'Lasalgaon Mandi Road',
      operator: 'Mahesh Borse',
      phone: '+91 98901 23412',
      distance: '12.0 km away',
      facilities: ['Cold Storage Buffer', 'Batch Weighing', 'Direct Buyer Desk']
    }
  ];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content animate-fade-in max-w-600" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header bg-slate-100">
          <div className="flex items-center gap-2">
            <div className="modal-header-icon bg-blue-100 text-blue-700">
              <Building2 size={20} />
            </div>
            <div>
              <h3 className="modal-title">Assisted FPO Village Centers</h3>
              <p className="modal-subtitle">Walk in for free listing assistance, weighing, and verification</p>
            </div>
          </div>
          <button onClick={onClose} className="modal-close-btn">
            <X size={20} />
          </button>
        </div>

        <div className="modal-body p-6">
          <div className="mb-4">
            <input 
              type="text"
              placeholder="Search by village, taluka, or district..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="form-input text-sm"
            />
          </div>

          <div className="space-y-3">
            {centers.map((c, i) => (
              <div key={i} className="p-4 border border-subtle rounded-xl hover:border-primary transition-colors bg-white">
                <div className="flex justify-between items-start mb-1">
                  <h4 className="font-bold text-sm text-slate-800">{c.name}</h4>
                  <span className="badge-pill bg-emerald-50 text-primary text-2xs">
                    <Navigation size={10} /> {c.distance}
                  </span>
                </div>
                
                <div className="flex items-center gap-1.5 text-xs text-muted mb-2">
                  <MapPin size={12} className="text-primary" />
                  <span>{c.village}</span>
                </div>

                <div className="flex items-center justify-between text-xs pt-2 border-t border-subtle">
                  <span className="text-slate-700">Staff: <strong>{c.operator}</strong></span>
                  <a href={`tel:${c.phone}`} className="text-primary font-semibold flex items-center gap-1">
                    <Phone size={12} /> {c.phone}
                  </a>
                </div>

                <div className="flex flex-wrap gap-1.5 mt-2.5">
                  {c.facilities.map((f, fi) => (
                    <span key={fi} className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 text-3xs font-medium">
                      ✓ {f}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
