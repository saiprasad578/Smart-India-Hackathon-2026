import React, { useState } from 'react';
import { 
  X, 
  Store, 
  CheckCircle2, 
  ShieldCheck, 
  Lock, 
  TrendingDown,
  PieChart,
  Users
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface BuyerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BuyerModal: React.FC<BuyerModalProps> = ({ isOpen, onClose }) => {
  const [orderQty, setOrderQty] = useState(2000); // 2 tonnes
  const [crop, setCrop] = useState('Nashik Red Onion');
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [escrowStatus, setEscrowStatus] = useState<'held' | 'released'>('held');

  if (!isOpen) return null;

  // Partial fulfilment allocations (One order -> Many farmers per ARCHITECTURE.md)
  const allocations = [
    { farmer: 'Ramesh Patil', village: 'Dindori', qty: 500, pricePerKg: 22, payoutPaise: 1100000 },
    { farmer: 'Tukaram Shinde', village: 'Pimpalgaon', qty: 450, pricePerKg: 21.5, payoutPaise: 967500 },
    { farmer: 'Ananda Jadhav', village: 'Lasalgaon', qty: 350, pricePerKg: 22, payoutPaise: 770000 },
    { farmer: 'Savita Ghadge', village: 'Ozar', qty: 400, pricePerKg: 22, payoutPaise: 880000 },
    { farmer: 'Balu Gaikwad', village: 'Dindori', qty: 300, pricePerKg: 21.8, payoutPaise: 654000 },
  ];

  const totalFulfilled = allocations.reduce((acc, a) => acc + a.qty, 0);
  const avgFarmerPrice = 21.86;
  const logisticsRate = 4.20; // Pooled VRP cost per kg
  const platformRate = 1.94;  // Transparent take rate (includes FPO share)
  const finalPricePerKg = 28.00; // Total delivered price to buyer (retail is ₹35/kg)
  const totalAmount = totalFulfilled * finalPricePerKg;

  const handlePlaceOrder = () => {
    setOrderPlaced(true);
    setEscrowStatus('held');
    confetti({
      particleCount: 80,
      spread: 70
    });
  };

  const handleConfirmDelivery = () => {
    setEscrowStatus('released');
    confetti({
      particleCount: 100,
      spread: 80
    });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content animate-fade-in max-w-750" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header bg-buyer-light">
          <div className="flex items-center gap-2">
            <div className="modal-header-icon bg-buyer-accent text-buyer">
              <Store size={22} />
            </div>
            <div>
              <h3 className="modal-title">Bulk Buyer Procurement</h3>
              <p className="modal-subtitle">Direct FPO Sourcing with Escrow Protection & Partial Fulfilment</p>
            </div>
          </div>
          <button onClick={onClose} className="modal-close-btn">
            <X size={20} />
          </button>
        </div>

        <div className="modal-body p-6">
          {!orderPlaced ? (
            <div>
              {/* Order configuration */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="form-label">Procure Commodity</label>
                  <select 
                    value={crop} 
                    onChange={(e) => setCrop(e.target.value)}
                    className="form-select"
                  >
                    <option value="Nashik Red Onion">Nashik Red Onion (Grade A)</option>
                    <option value="Hybrid Tomato">Hybrid Tomato (Grade A)</option>
                    <option value="Fresh Potato">Fresh Potato (Grade A)</option>
                  </select>
                </div>

                <div>
                  <label className="form-label">Order Volume (kg)</label>
                  <div className="stepper-input">
                    <button type="button" onClick={() => setOrderQty(Math.max(500, orderQty - 500))}>-</button>
                    <input 
                      type="number" 
                      value={orderQty} 
                      onChange={(e) => setOrderQty(Number(e.target.value))}
                      className="stepper-field"
                    />
                    <button type="button" onClick={() => setOrderQty(orderQty + 500)}>+</button>
                  </div>
                  <span className="text-2xs text-muted block mt-1">Simulating 2.0 Metric Tonnes bulk order</span>
                </div>
              </div>

              {/* Differentiator 1: Fair Price Breakdown Bar */}
              <div className="price-breakup-container mb-5">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5 font-bold text-xs text-slate-800">
                    <PieChart size={14} className="text-primary" />
                    <span>Transparent "Fair Price" Breakup (₹{finalPricePerKg}/kg vs Retail ₹35/kg)</span>
                  </div>
                  <span className="badge-pill bg-emerald-100 text-emerald-800 text-xs">
                    <TrendingDown size={12} /> Save 20% vs Retail Mandi
                  </span>
                </div>

                {/* Progress bar breakup */}
                <div className="breakup-bar-stack">
                  <div className="bar-segment farmer-share" style={{ width: '74%' }} title="Farmer Net: ₹21.86/kg (74%)">
                    Farmer (74%)
                  </div>
                  <div className="bar-segment logistics-share" style={{ width: '16%' }} title="Pooled Logistics: ₹4.20/kg (16%)">
                    Logistics (16%)
                  </div>
                  <div className="bar-segment platform-share" style={{ width: '10%' }} title="Platform & FPO Fee: ₹1.94/kg (10%)">
                    Platform (10%)
                  </div>
                </div>
                <div className="flex justify-between text-2xs text-muted mt-1 px-1">
                  <span>🌾 Farmer: ₹{avgFarmerPrice.toFixed(2)}/kg</span>
                  <span>🚚 Pooled Routing: ₹{logisticsRate.toFixed(2)}/kg</span>
                  <span>🛡️ Escrow + FPO Fee: ₹{platformRate.toFixed(2)}/kg</span>
                </div>
              </div>

              {/* Differentiator 2: Multi-Farmer Allocation Preview */}
              <div className="allocations-preview-box mb-5">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5 font-bold text-xs text-slate-800">
                    <Users size={14} className="text-blue" />
                    <span>Algorithmic Partial Fulfilment (1 Order fulfilled across 5 Farmers)</span>
                  </div>
                  <span className="text-2xs text-muted">Cluster: Dindori, Nashik</span>
                </div>

                <div className="overflow-x-auto border border-subtle rounded-lg">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="bg-slate-50 text-muted border-b border-subtle">
                        <th className="p-2">Farmer</th>
                        <th className="p-2">Village</th>
                        <th className="p-2">Allocated Qty</th>
                        <th className="p-2">Ask Rate</th>
                        <th className="p-2">Split Payout</th>
                      </tr>
                    </thead>
                    <tbody>
                      {allocations.map((a, i) => (
                        <tr key={i} className="border-b border-subtle">
                          <td className="p-2 font-medium">{a.farmer}</td>
                          <td className="p-2 text-muted">{a.village}</td>
                          <td className="p-2 font-bold">{a.qty} kg</td>
                          <td className="p-2 text-primary font-semibold">₹{a.pricePerKg}/kg</td>
                          <td className="p-2 font-semibold">₹{(a.payoutPaise / 100).toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Order Total & CTA */}
              <div className="flex items-center justify-between pt-3 border-t border-subtle">
                <div>
                  <span className="text-xs text-muted block">Total Escrow Deposit (2,000 kg):</span>
                  <strong className="text-2xl font-bold text-primary">₹{totalAmount.toLocaleString()}</strong>
                </div>

                <button 
                  onClick={handlePlaceOrder}
                  className="btn-signup-primary px-6 py-3 text-base flex items-center gap-2"
                >
                  <Lock size={18} />
                  <span>Deposit in Escrow & Confirm Order</span>
                </button>
              </div>
            </div>
          ) : (
            /* Order Placed with Escrow State Machine */
            <div className="animate-fade-in">
              <div className="escrow-lifecycle-card p-4 rounded-xl border border-emerald-200 bg-emerald-50 mb-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <ShieldCheck size={24} className="text-primary" />
                    <div>
                      <h4 className="font-bold text-slate-800">Order #KC-ORD-9823 Confirmed</h4>
                      <span className="text-xs text-muted">Escrow protection active · ₹{totalAmount.toLocaleString()} held</span>
                    </div>
                  </div>
                  <span className="badge-pill bg-white text-emerald-800 text-xs border border-emerald-300">
                    Test Mode Payment
                  </span>
                </div>

                {/* State machine steps */}
                <div className="escrow-steps-row">
                  <div className="escrow-step-item done">
                    <span className="step-circle">1</span>
                    <span className="step-label">Paid by Buyer</span>
                  </div>
                  <div className="escrow-step-line done"></div>
                  <div className={`escrow-step-item ${escrowStatus === 'held' ? 'active' : 'done'}`}>
                    <span className="step-circle">2</span>
                    <span className="step-label">Held in Escrow</span>
                  </div>
                  <div className="escrow-step-line done"></div>
                  <div className={`escrow-step-item ${escrowStatus === 'released' ? 'done active' : ''}`}>
                    <span className="step-circle">3</span>
                    <span className="step-label">OTP Delivery</span>
                  </div>
                  <div className="escrow-step-line"></div>
                  <div className={`escrow-step-item ${escrowStatus === 'released' ? 'done active' : ''}`}>
                    <span className="step-circle">4</span>
                    <span className="step-label">Split Payouts Released</span>
                  </div>
                </div>
              </div>

              {escrowStatus === 'held' ? (
                <div className="bg-slate-50 p-4 rounded-lg border border-subtle mb-4 text-center">
                  <p className="text-xs text-muted mb-3">
                    Truck <strong>MH-15-EG-4920</strong> has completed pickup across 5 farms and is out for delivery.
                    <br />Provide delivery OTP to release split payments directly to the 5 farmers' bank accounts.
                  </p>
                  <button 
                    onClick={handleConfirmDelivery}
                    className="btn-signup-primary px-6 py-2.5 text-sm inline-flex items-center gap-2"
                  >
                    <CheckCircle2 size={16} />
                    <span>Simulate OTP Delivery Confirmation</span>
                  </button>
                </div>
              ) : (
                <div className="bg-green-100 p-4 rounded-lg border border-green-300 mb-4 text-center animate-fade-in">
                  <CheckCircle2 size={32} className="text-primary mx-auto mb-1" />
                  <h5 className="font-bold text-slate-800 text-sm">Delivery Confirmed! ₹{(totalFulfilled * avgFarmerPrice).toLocaleString()} Released</h5>
                  <p className="text-xs text-muted">
                    Split payouts dispatched via automated UPI/NEFT to Ramesh Patil, Tukaram Shinde, Ananda Jadhav, Savita Ghadge, and Balu Gaikwad.
                  </p>
                </div>
              )}

              <div className="flex justify-end">
                <button onClick={() => { setOrderPlaced(false); onClose(); }} className="btn-login-outline text-xs px-4 py-2">
                  Close / Back to Dashboard
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
