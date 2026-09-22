import React, { useState } from 'react';
import { 
  X, 
  Mic, 
  MicOff, 
  Camera, 
  CheckCircle2, 
  AlertTriangle, 
  MapPin, 
  Clock, 
  Tractor
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface FarmerModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLang?: string;
}

export const FarmerModal: React.FC<FarmerModalProps> = ({ isOpen, onClose }) => {
  const [crop, setCrop] = useState('Nashik Red Onion');
  const [grade, setGrade] = useState('Grade A');
  const [quantity, setQuantity] = useState(500);
  const [askPrice, setAskPrice] = useState(23);
  const [isListening, setIsListening] = useState(false);
  const [voiceTranscript, setVoiceTranscript] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  // Real mandi modal benchmark for Maharashtra/Karnataka clusters
  const mandiBenchmark: Record<string, { min: number; modal: number; max: number }> = {
    'Nashik Red Onion': { min: 18, modal: 22, max: 26 },
    'Hybrid Tomato': { min: 14, modal: 18, max: 22 },
    'Sharbati Wheat': { min: 28, modal: 32, max: 36 },
    'Fresh Potato': { min: 15, modal: 19, max: 23 }
  };

  const currentBenchmark = mandiBenchmark[crop] || { min: 18, modal: 22, max: 26 };
  const isHighPrice = askPrice > currentBenchmark.max * 1.25;
  const isLowPrice = askPrice < currentBenchmark.min * 0.75;
  const isFairPrice = !isHighPrice && !isLowPrice;

  const handleVoiceToggle = () => {
    if (isListening) {
      setIsListening(false);
    } else {
      setIsListening(true);
      setVoiceTranscript('Listening... "५०० किलो कांदा २३ रुपये प्रति किलो"...');
      setTimeout(() => {
        setCrop('Nashik Red Onion');
        setQuantity(500);
        setAskPrice(23);
        setVoiceTranscript('Recognized: Nashik Red Onion, 500 kg @ ₹23/kg');
        setIsListening(false);
      }, 2000);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.6 }
    });
  };

  const resetForm = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content animate-fade-in" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header bg-farmer-light">
          <div className="flex items-center gap-2">
            <div className="modal-header-icon bg-farmer-accent text-farmer">
              <Tractor size={22} />
            </div>
            <div>
              <h3 className="modal-title">Farmer Produce Listing</h3>
              <p className="modal-subtitle">Direct listing with voice assistance & mandi price sanity check</p>
            </div>
          </div>
          <button onClick={onClose} className="modal-close-btn">
            <X size={20} />
          </button>
        </div>

        {submitted ? (
          <div className="modal-body text-center p-8">
            <div className="success-icon-circle mx-auto mb-4">
              <CheckCircle2 size={48} className="text-primary" />
            </div>
            <h4 className="text-xl font-bold mb-2">Listing Successfully Verified!</h4>
            <p className="text-muted mb-4">
              Listing <strong>#KC-LST-4092</strong> for <strong>{quantity} kg {crop}</strong> ({grade}) at <strong>₹{askPrice}/kg</strong> is now visible to matched buyers and FPO pooling clusters.
            </p>

            <div className="verified-details-box mb-6">
              <div className="flex items-center justify-between py-2 border-b border-subtle">
                <span className="text-muted">Escrow Payout Guarantee:</span>
                <strong className="text-primary">₹{(quantity * askPrice).toLocaleString()}</strong>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-subtle">
                <span className="text-muted">Geo-Tag:</span>
                <span>Dindori, Nashik (19.9975° N, 73.7898° E)</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-muted">Data Tag:</span>
                <span className="badge-synthetic">is_synthetic = true</span>
              </div>
            </div>

            <button onClick={resetForm} className="btn-signup-primary w-full py-3">
              Done / List Another Produce
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="modal-body p-6">
            {/* Voice Assistant Banner */}
            <div className={`voice-assistant-banner ${isListening ? 'listening' : ''}`}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="voice-wave-dot"></div>
                  <strong>Voice Listing (Speak in Your Language)</strong>
                </div>
                <button
                  type="button"
                  onClick={handleVoiceToggle}
                  className={`voice-mic-btn ${isListening ? 'active' : ''}`}
                >
                  {isListening ? <MicOff size={18} /> : <Mic size={18} />}
                  <span>{isListening ? 'Listening...' : 'Tap & Speak'}</span>
                </button>
              </div>
              <div className="text-xs text-muted">
                {voiceTranscript || 'Supports Hindi, Telugu, Marathi, Tamil, Kannada & English'}
              </div>
            </div>

            {/* Crop Selector */}
            <div className="form-group mb-4">
              <label className="form-label">Select Crop</label>
              <select
                value={crop}
                onChange={(e) => setCrop(e.target.value)}
                className="form-select"
              >
                <option value="Nashik Red Onion">Nashik Red Onion (कांदा / ఉల్లిపాయ)</option>
                <option value="Hybrid Tomato">Hybrid Tomato (टमाटर / టమాటా)</option>
                <option value="Sharbati Wheat">Sharbati Wheat (गेहूं / గోధుమ)</option>
                <option value="Fresh Potato">Fresh Potato (आलू / బంగాళాదుంప)</option>
              </select>
            </div>

            {/* Grade & Quantity */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="form-group">
                <label className="form-label">Quality Grade</label>
                <select
                  value={grade}
                  onChange={(e) => setGrade(e.target.value)}
                  className="form-select"
                >
                  <option value="Grade A">Grade A (Premium / Export)</option>
                  <option value="Grade B">Grade B (Standard Market)</option>
                  <option value="Grade C">Grade C (Processing)</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Quantity (kg)</label>
                <div className="stepper-input">
                  <button type="button" onClick={() => setQuantity(Math.max(50, quantity - 50))}>-</button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    min={10}
                    className="stepper-field"
                  />
                  <button type="button" onClick={() => setQuantity(quantity + 50)}>+</button>
                </div>
              </div>
            </div>

            {/* Ask Price vs Mandi Modal Price */}
            <div className="form-group mb-4">
              <div className="flex items-center justify-between mb-1">
                <label className="form-label">Your Ask Price (₹ per kg)</label>
                <span className="text-xs text-muted">
                  Agmarknet Modal: <strong>₹{currentBenchmark.modal}/kg</strong> (Range: ₹{currentBenchmark.min}-₹{currentBenchmark.max})
                </span>
              </div>
              <div className="price-input-row">
                <span className="currency-prefix">₹</span>
                <input
                  type="number"
                  value={askPrice}
                  onChange={(e) => setAskPrice(Number(e.target.value))}
                  className="form-input"
                  min={1}
                />
                <span className="unit-suffix">/ kg</span>
              </div>

              {/* Real-time price sanity check indicator */}
              <div className="price-sanity-feedback mt-2">
                {isFairPrice && (
                  <div className="price-status-pill pill-fair">
                    <CheckCircle2 size={14} />
                    <span>Fair ask price! Matches current mandi modal range (₹{currentBenchmark.min} - ₹{currentBenchmark.max}/kg).</span>
                  </div>
                )}
                {isHighPrice && (
                  <div className="price-status-pill pill-warning">
                    <AlertTriangle size={14} />
                    <span>Price Outlier Alert: Ask price is &gt;25% above modal mandi price. Requires FPO agent approval.</span>
                  </div>
                )}
                {isLowPrice && (
                  <div className="price-status-pill pill-warning">
                    <AlertTriangle size={14} />
                    <span>Caution: Ask price is significantly below market benchmark. Ensure quality grade match.</span>
                  </div>
                )}
              </div>
            </div>

            {/* Geo-tag & Photo Stamp Stamp */}
            <div className="geo-stamp-card mb-6">
              <div className="flex items-center gap-2 text-xs text-muted mb-2">
                <Camera size={14} />
                <strong>Geo-Tagged & Timestamped Verification</strong>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="flex items-center gap-1 text-slate-700">
                  <MapPin size={12} className="text-primary" />
                  <span>Dindori, Nashik (Verified)</span>
                </div>
                <div className="flex items-center gap-1 text-slate-700">
                  <Clock size={12} className="text-primary" />
                  <span>{new Date().toLocaleDateString()} {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
              </div>
            </div>

            {/* Submit button */}
            <button type="submit" className="btn-signup-primary w-full py-3 text-base">
              Submit & Verify Listing
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
