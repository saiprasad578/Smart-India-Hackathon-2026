import React, { useState } from 'react';
import { 
  X, 
  MessageSquare, 
  Send
} from 'lucide-react';

interface SMSModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SMSModal: React.FC<SMSModalProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([
    {
      sender: 'user',
      text: 'ONION 500KG NASHIK 22',
      time: 'Just now'
    },
    {
      sender: 'system',
      text: 'KisanConnect: Listing verified! #KC-SMS-392. Nashik Red Onion (500kg @ ₹22/kg). 2 buyers matched in your cluster. We will call you when pickup vehicle is scheduled.',
      time: 'Just now'
    }
  ]);
  const [inputVal, setInputVal] = useState('');

  if (!isOpen) return null;

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;

    const newMsg = {
      sender: 'user',
      text: inputVal,
      time: 'Just now'
    };

    setMessages(prev => [...prev, newMsg]);
    setInputVal('');

    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        {
          sender: 'system',
          text: 'KisanConnect: Received your update. Current modal mandi rate in Nashik is ₹22/kg. Your draft is updated.',
          time: 'Just now'
        }
      ]);
    }, 1000);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content animate-fade-in max-w-450" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header bg-slate-100">
          <div className="flex items-center gap-2">
            <div className="modal-header-icon bg-emerald-100 text-emerald-700">
              <MessageSquare size={20} />
            </div>
            <div>
              <h3 className="modal-title">SMS Gateway (Offline / 2G)</h3>
              <p className="modal-subtitle">Text 56767 to list or check prices on basic phones</p>
            </div>
          </div>
          <button onClick={onClose} className="modal-close-btn">
            <X size={20} />
          </button>
        </div>

        <div className="modal-body p-4 bg-slate-50">
          <div className="sms-chat-window divide-y divide-subtle mb-3 max-h-300 overflow-y-auto p-2">
            {messages.map((m, idx) => (
              <div 
                key={idx} 
                className={`flex flex-col mb-3 ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div 
                  className={`p-3 rounded-2xl max-w-xs text-xs ${m.sender === 'user' ? 'bg-primary text-white rounded-br-none' : 'bg-white text-slate-800 border border-subtle shadow-sm rounded-bl-none'}`}
                >
                  {m.text}
                </div>
                <span className="text-3xs text-muted mt-1 px-1">{m.time}</span>
              </div>
            ))}
          </div>

          <form onSubmit={handleSend} className="flex gap-2">
            <input 
              type="text" 
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="e.g. TOMATO 300KG DINDORI"
              className="form-input text-xs"
            />
            <button type="submit" className="btn-signup-primary px-4 py-2 shrink-0">
              <Send size={14} />
            </button>
          </form>

          <div className="mt-3 text-2xs text-muted bg-white p-2.5 rounded-lg border border-subtle">
            💡 <strong>Format Guide:</strong> <code>[CROP] [QUANTITY] [VILLAGE] [PRICE]</code>
            <br />Example: <code>ONION 500KG NASHIK 22</code>
          </div>
        </div>
      </div>
    </div>
  );
};
