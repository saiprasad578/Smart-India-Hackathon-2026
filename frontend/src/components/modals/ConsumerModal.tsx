import React, { useState } from 'react';
import { 
  X, 
  ShoppingBag, 
  QrCode, 
  CheckCircle2, 
  MapPin, 
  Calendar
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface ConsumerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ConsumerModal: React.FC<ConsumerModalProps> = ({ isOpen, onClose }) => {
  const [selectedBasket, setSelectedBasket] = useState<string | null>(null);
  const [showTraceability, setShowTraceability] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  if (!isOpen) return null;

  const baskets = [
    {
      id: 'b1',
      title: 'Farm Fresh Salad Box (5kg)',
      crops: 'Hybrid Tomatoes, Cucumbers, Capsicum',
      farmer: 'Savita Ghadge & Ramesh Patil',
      village: 'Dindori Cluster, Nashik',
      price: 180,
      retailPrice: 240,
      harvested: '6 hours ago'
    },
    {
      id: 'b2',
      title: 'Kitchen Essential Box (10kg)',
      crops: 'Nashik Red Onions (5kg) + Fresh Potatoes (5kg)',
      farmer: 'Tukaram Shinde & Ananda Jadhav',
      village: 'Pimpalgaon Cluster, Nashik',
      price: 240,
      retailPrice: 320,
      harvested: '8 hours ago'
    }
  ];

  const handleOrder = () => {
    setOrderComplete(true);
    confetti({
      particleCount: 70,
      spread: 60
    });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content animate-fade-in" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header bg-purple-light">
          <div className="flex items-center gap-2">
            <div className="modal-header-icon bg-purple-100 text-purple-700">
              <ShoppingBag size={22} />
            </div>
            <div>
              <h3 className="modal-title">Farm-to-Door Consumer Baskets</h3>
              <p className="modal-subtitle">Direct from verified farmers · Zero cold-storage chemicals</p>
            </div>
          </div>
          <button onClick={onClose} className="modal-close-btn">
            <X size={20} />
          </button>
        </div>

        <div className="modal-body p-6">
          {orderComplete ? (
            <div className="text-center p-6 animate-fade-in">
              <CheckCircle2 size={48} className="text-primary mx-auto mb-3" />
              <h4 className="text-lg font-bold text-slate-800">Consumer Order Placed!</h4>
              <p className="text-xs text-muted mb-4">
                Your basket is packed straight from harvest in Dindori and routed on tonight's cold logistics dispatch.
              </p>
              <div className="p-3 bg-purple-50 rounded-lg text-xs mb-4 inline-flex items-center gap-2 text-purple-800">
                <QrCode size={16} /> QR Farm Traceability Code sent to your WhatsApp
              </div>
              <div>
                <button onClick={() => { setOrderComplete(false); onClose(); }} className="btn-signup-primary px-6 py-2 text-xs">
                  Done
                </button>
              </div>
            </div>
          ) : (
            <div>
              <div className="grid gap-3 mb-4">
                {baskets.map((b) => (
                  <div 
                    key={b.id} 
                    className={`p-4 border rounded-xl cursor-pointer transition-all ${selectedBasket === b.id ? 'border-purple-500 bg-purple-50 shadow-sm' : 'border-subtle hover:border-slate-300'}`}
                    onClick={() => setSelectedBasket(b.id)}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="font-bold text-sm text-slate-800">{b.title}</h4>
                      <div className="text-right">
                        <span className="text-sm font-bold text-primary">₹{b.price}</span>
                        <span className="text-2xs text-muted line-through ml-1">₹{b.retailPrice}</span>
                      </div>
                    </div>
                    <p className="text-xs text-slate-600 mb-2">{b.crops}</p>
                    
                    <div className="flex items-center justify-between text-2xs text-muted pt-2 border-t border-subtle">
                      <div className="flex items-center gap-1">
                        <MapPin size={11} className="text-primary" />
                        <span>{b.village}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar size={11} className="text-purple-600" />
                        <span>Harvested: {b.harvested}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Traceability preview toggle */}
              <div className="mb-4">
                <button 
                  type="button" 
                  onClick={() => setShowTraceability(!showTraceability)}
                  className="text-xs text-purple-700 font-semibold flex items-center gap-1 hover:underline"
                >
                  <QrCode size={14} />
                  <span>{showTraceability ? 'Hide Farm Origin Traceability' : 'View QR Traceability Certificate'}</span>
                </button>

                {showTraceability && (
                  <div className="mt-2 p-3 bg-slate-50 border border-subtle rounded-lg text-xs animate-fade-in">
                    <div className="font-bold text-slate-800 mb-1">🌾 Farm Origin Certificate #KC-TRC-982</div>
                    <div className="text-muted">Farmer: Savita Ghadge (Aadhaar/Kisan ID verified)</div>
                    <div className="text-muted">Soil Health Card: Optimal Nitrogen, Organic Carbon 0.72%</div>
                    <div className="text-muted">Pesticide Residue Test: Zero residue compliant (FSSAI grade)</div>
                  </div>
                )}
              </div>

              <button 
                onClick={handleOrder}
                disabled={!selectedBasket}
                className="btn-signup-primary w-full py-3 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {selectedBasket ? 'Proceed to Fresh Checkout (Escrow Safe)' : 'Select a Fresh Farm Basket'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
