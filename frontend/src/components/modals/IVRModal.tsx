import React, { useState } from 'react';
import { 
  X, 
  PhoneOff, 
  Volume2
} from 'lucide-react';

interface IVRModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLang?: string;
}

export const IVRModal: React.FC<IVRModalProps> = ({ isOpen, onClose }) => {
  const [pressedKey, setPressedKey] = useState<string | null>('1');
  const [ivrResponse, setIvrResponse] = useState<string>(
    'You pressed 1 (Sell Produce). "Please speak your crop and quantity after the beep. Example: 500 kilo Tamatar Nashik".'
  );

  if (!isOpen) return null;

  const handleKeyPress = (num: string) => {
    setPressedKey(num);
    if (num === '1') {
      setIvrResponse('Option 1 Selected: "Selling Produce". Voice prompt recording started. Speak your crop and expected price.');
    } else if (num === '2') {
      setIvrResponse('Option 2 Selected: "Today\'s Mandi Rates": Nashik Onion ₹22/kg, Hybrid Tomato ₹18/kg, Potato ₹19/kg.');
    } else if (num === '3') {
      setIvrResponse('Option 3 Selected: "Connecting to Sahyadri FPO Village Helpdesk agent in Dindori... Please hold."');
    } else {
      setIvrResponse(`Key ${num} pressed. Press 1 for Selling, 2 for Mandi Rates, 3 for Village Agent.`);
    }
  };

  const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '0', '#'];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content animate-fade-in max-w-400" onClick={(e) => e.stopPropagation()}>
        {/* Phone dialer mockup */}
        <div className="ivr-phone-shell">
          <div className="ivr-phone-screen">
            <div className="flex justify-between items-center text-xs text-slate-400 mb-2">
              <span>Toll-Free IVR Service</span>
              <button onClick={onClose} className="text-white hover:text-slate-300">
                <X size={16} />
              </button>
            </div>

            <div className="text-center py-2">
              <div className="font-bold text-lg text-white">1800 123 4567</div>
              <div className="flex items-center justify-center gap-1.5 text-xs text-emerald-400 mt-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>Connected (00:24) · Multilingual Active</span>
              </div>
            </div>

            {/* Speech banner */}
            <div className="ivr-speaker-box">
              <Volume2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
              <div className="text-xs text-slate-200">
                {ivrResponse}
              </div>
            </div>
          </div>

          {/* Keypad */}
          <div className="ivr-keypad-grid">
            {keys.map((k) => (
              <button
                key={k}
                onClick={() => handleKeyPress(k)}
                className={`keypad-btn ${pressedKey === k ? 'keypad-active' : ''}`}
              >
                <span className="text-lg font-bold">{k}</span>
                {k === '1' && <span className="keypad-sub">Sell</span>}
                {k === '2' && <span className="keypad-sub">Rates</span>}
                {k === '3' && <span className="keypad-sub">Agent</span>}
              </button>
            ))}
          </div>

          {/* End Call Button */}
          <div className="p-4 flex justify-center bg-slate-950">
            <button 
              onClick={onClose} 
              className="w-14 h-14 rounded-full bg-red-600 hover:bg-red-700 text-white flex items-center justify-center shadow-lg transition-transform active:scale-95"
            >
              <PhoneOff size={24} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
