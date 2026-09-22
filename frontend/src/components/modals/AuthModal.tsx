import React, { useState } from 'react';
import { 
  X, 
  Smartphone, 
  ShieldCheck, 
  Tractor, 
  Users, 
  Store, 
  ShoppingBag, 
  Truck
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode: 'login' | 'signup';
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, initialMode }) => {
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
  const [selectedRole, setSelectedRole] = useState<'farmer' | 'fpo' | 'buyer' | 'consumer' | 'logistics'>('farmer');
  const [phone, setPhone] = useState('9876543210');
  const [otpStep, setOtpStep] = useState(false);
  const [otp, setOtp] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  if (!isOpen) return null;

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setOtpStep(true);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setLoggedIn(true);
    confetti({
      particleCount: 60,
      spread: 50
    });
    setTimeout(() => {
      onClose();
      setLoggedIn(false);
      setOtpStep(false);
    }, 1500);
  };

  const roles = [
    { id: 'farmer', label: 'Farmer', icon: Tractor, desc: 'Sell produce & track payouts' },
    { id: 'fpo', label: 'FPO / Agent', icon: Users, desc: 'Batch list for village members' },
    { id: 'buyer', label: 'Buyer', icon: Store, desc: 'Bulk procurement with escrow' },
    { id: 'consumer', label: 'Consumer', icon: ShoppingBag, desc: 'Farm fresh doorstep deliveries' },
    { id: 'logistics', label: 'Logistics', icon: Truck, desc: 'Pooled vehicle dispatch' },
  ];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content animate-fade-in max-w-450" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <h3 className="modal-title">{mode === 'login' ? 'Welcome Back to KisanConnect' : 'Create KisanConnect Account'}</h3>
            <p className="modal-subtitle">Secure OTP verification via phone number</p>
          </div>
          <button onClick={onClose} className="modal-close-btn">
            <X size={20} />
          </button>
        </div>

        <div className="modal-body p-6">
          {loggedIn ? (
            <div className="text-center py-6 animate-fade-in">
              <ShieldCheck size={48} className="text-primary mx-auto mb-2" />
              <h4 className="font-bold text-slate-800 text-lg">Authenticated Successfully!</h4>
              <p className="text-xs text-muted">Redirecting to your role dashboard...</p>
            </div>
          ) : !otpStep ? (
            <div>
              {/* Role Picker */}
              <label className="form-label mb-2 block">Choose Account Role</label>
              <div className="grid grid-cols-2 gap-2 mb-4">
                {roles.map((r) => {
                  const IconComp = r.icon;
                  const isSel = selectedRole === r.id;
                  return (
                    <button
                      key={r.id}
                      type="button"
                      onClick={() => setSelectedRole(r.id as any)}
                      className={`p-2 rounded-xl border text-left flex items-center gap-2 transition-all ${isSel ? 'border-primary bg-green-50 shadow-sm' : 'border-subtle hover:bg-slate-50'}`}
                    >
                      <IconComp size={18} className={isSel ? 'text-primary' : 'text-slate-500'} />
                      <div className="overflow-hidden">
                        <strong className="block text-xs text-slate-800 leading-tight">{r.label}</strong>
                        <span className="text-3xs text-muted truncate block">{r.desc}</span>
                      </div>
                    </button>
                  );
                })}
              </div>

              <form onSubmit={handleSendOtp}>
                <div className="form-group mb-4">
                  <label className="form-label">Mobile Number</label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 bg-slate-100 border border-r-0 border-subtle rounded-l-lg text-xs text-slate-600 font-semibold">
                      +91
                    </span>
                    <input 
                      type="tel" 
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="form-input rounded-l-none text-sm"
                      placeholder="10-digit mobile number"
                      required
                    />
                  </div>
                </div>

                <button type="submit" className="btn-signup-primary w-full py-3 text-sm">
                  Send OTP via SMS
                </button>
              </form>

              <div className="text-center mt-4 text-xs text-muted">
                {mode === 'login' ? (
                  <span>Don't have an account? <button type="button" onClick={() => setMode('signup')} className="text-primary font-bold">Sign Up</button></span>
                ) : (
                  <span>Already have an account? <button type="button" onClick={() => setMode('login')} className="text-primary font-bold">Login</button></span>
                )}
              </div>
            </div>
          ) : (
            <form onSubmit={handleVerifyOtp} className="animate-fade-in">
              <div className="text-center mb-4">
                <Smartphone size={32} className="text-primary mx-auto mb-1" />
                <h4 className="font-bold text-slate-800 text-sm">Enter 4-digit OTP</h4>
                <p className="text-xs text-muted">Sent to +91 {phone} (Use <strong>1234</strong> for demo)</p>
              </div>

              <div className="form-group mb-4">
                <input 
                  type="text" 
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="1234"
                  maxLength={4}
                  className="form-input text-center text-xl tracking-widest font-mono"
                  autoFocus
                />
              </div>

              <button type="submit" className="btn-signup-primary w-full py-2.5 text-sm mb-2">
                Verify & Login
              </button>

              <button 
                type="button" 
                onClick={() => setOtpStep(false)}
                className="text-xs text-muted w-full text-center hover:underline"
              >
                ← Change Phone Number
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
