import React, { useState } from 'react';
import { Phone, PhoneOff, Check, X, MessageSquare, Volume2 } from 'lucide-react';
import { api } from '../../api/client';

interface IVRSimulatorProps {
  isOpen: boolean;
  onClose: () => void;
  onListingCreated: () => void;
}

export const IVRSimulator: React.FC<IVRSimulatorProps> = ({
  isOpen,
  onClose,
  onListingCreated
}) => {
  const [callState, setCallState] = useState<'idle' | 'calling' | 'lang_select' | 'crop_select' | 'qty_input' | 'confirmed'>('idle');
  const [enteredDigits, setEnteredDigits] = useState('');
  const [currentPrompt, setCurrentPrompt] = useState('');
  const [smsReceipt, setSmsReceipt] = useState<string | null>(null);

  if (!isOpen) return null;

  const startCall = () => {
    setCallState('calling');
    setCurrentPrompt("Connecting to KisanConnect IVR Toll-Free line (1800-KISAN-26)...");

    setTimeout(() => {
      setCallState('lang_select');
      setCurrentPrompt("నమస్కారం! కిసాన్ కనెక్ట్ కు స్వాగతం. తెలుగు కోసం 1 నొక్కండి. हिंदी के लिए 2 दबाएं. For English press 3.");
    }, 1200);
  };

  const handleKeyPress = async (digit: string) => {
    setEnteredDigits(prev => prev + digit);

    if (callState === 'lang_select') {
      setCurrentPrompt("మీ పంటను ఎంచుకోండి: టమాటాల కోసం 1, ఉల్లిపాయల కోసం 2, బంగాళాదుంపల కోసం 3 నొక్కండి. (Press 1 for Tomato, 2 for Onion, 3 for Potato)");
      setCallState('crop_select');
    } else if (callState === 'crop_select') {
      setCurrentPrompt("ఎన్ని కిలోల టమాటాలు అందుబాటులో ఉన్నాయి? సంఖ్యను టైప్ చేసి # నొక్కండి. (Enter quantity in kg and press #)");
      setCallState('qty_input');
    } else if (callState === 'qty_input') {
      if (digit === '#') {
        const qty = 500; // parsed digits
        setCurrentPrompt(`ధన్యవాదాలు! మీ 500 కిలోల టమాటాలు నమోదు చేయబడ్డాయి. ధృవీకరణ కోసం SMS పంపబడింది.`);
        setCallState('confirmed');

        // Create listing through API
        await api.createListing({
          farmer_id: "farmer-002",
          crop: "tomato",
          quantity: qty,
          unit: "kg",
          price_per_kg: 25.0,
          available_from: "Tomorrow",
          location: {
            lat: 17.312,
            lng: 78.134,
            name: "Chevella Hamlet, Telangana"
          },
          source_channel: "ivr"
        });

        setSmsReceipt("KisanConnect SMS: Mee 500 kg Tomato listing #IVR-8821 confirm ayyindi. Reference price: Rs.25/kg. Payout: Direct Bank/UPI.");
        onListingCreated();
      }
    }
  };

  const endCall = () => {
    setCallState('idle');
    setEnteredDigits('');
    setCurrentPrompt('');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-[#FAF7EE] text-[#1C2B19] rounded-2xl max-w-md w-full border border-gray-300 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-[#1C2B19] text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#D69A2D] text-black flex items-center justify-center">
              <Phone className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif text-sm font-bold">Basic Phone IVR / Voice Simulator</h3>
              <p className="text-[11px] text-gray-300">Channel for non-smartphone farmers</p>
            </div>
          </div>
          <button onClick={onClose} className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Phone screen & keypad */}
        <div className="p-6 space-y-4">
          {/* Simulated Phone Screen */}
          <div className="bg-[#10170F] text-[#4DF07C] font-mono p-4 rounded-xl border border-gray-800 shadow-inner min-h-[110px] flex flex-col justify-between">
            <div className="flex items-center justify-between text-[11px] text-gray-400">
              <span>●●●●○ Airtel 2G</span>
              <span>1800-KISAN-26</span>
            </div>

            <div className="my-2">
              <div className="text-xs text-white flex items-center gap-1.5">
                <Volume2 className="w-4 h-4 text-[#4DF07C] shrink-0" />
                <span>{currentPrompt || "Press Call button to dial KisanConnect IVR"}</span>
              </div>
            </div>

            <div className="text-right text-xs text-yellow-400">
              DTMF: <span className="font-bold text-white">{enteredDigits || "—"}</span>
            </div>
          </div>

          {/* Keypad */}
          <div className="grid grid-cols-3 gap-2.5">
            {['1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '0', '#'].map((k) => (
              <button
                key={k}
                onClick={() => handleKeyPress(k)}
                disabled={callState === 'idle' || callState === 'confirmed'}
                className="h-12 rounded-xl bg-white border border-gray-200 text-base font-bold text-gray-800 hover:bg-gray-100 active:scale-95 transition-all shadow-xs flex flex-col items-center justify-center disabled:opacity-40"
              >
                <span>{k}</span>
                <span className="text-[8px] text-gray-400 -mt-1">
                  {k === '1' ? '⌁' : k === '2' ? 'ABC' : k === '3' ? 'DEF' : k === '4' ? 'GHI' : k === '5' ? 'JKL' : k === '6' ? 'MNO' : k === '7' ? 'PQRS' : k === '8' ? 'TUV' : k === '9' ? 'WXYZ' : ''}
                </span>
              </button>
            ))}
          </div>

          {/* Call Controls */}
          <div className="flex gap-3 pt-2">
            {callState === 'idle' ? (
              <button
                onClick={startCall}
                className="w-full py-2.5 rounded-xl bg-[#2E6B39] hover:bg-[#23532c] text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
              >
                <Phone className="w-4 h-4" />
                <span>Dial 1800-KISAN-26</span>
              </button>
            ) : (
              <button
                onClick={endCall}
                className="w-full py-2.5 rounded-xl bg-[#B5502F] hover:bg-[#964225] text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
              >
                <PhoneOff className="w-4 h-4" />
                <span>End Call</span>
              </button>
            )}
          </div>

          {/* Simulated Basic SMS Receipt */}
          {smsReceipt && (
            <div className="p-3 bg-[#EBF4ED] border border-[#2E6B39]/30 rounded-xl text-xs space-y-1">
              <div className="flex items-center gap-1.5 text-[#2E6B39] font-bold text-[11px]">
                <MessageSquare className="w-3.5 h-3.5" /> SMS Received on Basic Phone
              </div>
              <p className="text-gray-700 italic font-mono text-[11px]">{smsReceipt}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
