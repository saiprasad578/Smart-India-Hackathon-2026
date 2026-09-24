import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Mic, Check, X, Volume2, CheckCircle2, Globe } from 'lucide-react';
import { api, VoiceParseResult } from '../../api/client';
import { detectLanguage, SupportedLang } from '../../i18n/detectLanguage';

interface VoiceListingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onListingCreated: () => void;
  initialCrop?: string;
}

export const VoiceListingModal: React.FC<VoiceListingModalProps> = ({
  isOpen,
  onClose,
  onListingCreated,
  initialCrop
}) => {
  const { t, i18n } = useTranslation();
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [extractedData, setExtractedData] = useState<VoiceParseResult | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [detectedLang, setDetectedLang] = useState<SupportedLang | null>(null);

  if (!isOpen) return null;

  /** Auto-detect language from text and switch the whole app UI */
  const autoSwitchLanguage = (text: string): SupportedLang => {
    const lang = detectLanguage(text);
    setDetectedLang(lang);
    if (lang !== i18n.language) {
      i18n.changeLanguage(lang);
    }
    return lang;
  };

  const speakAudio = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = i18n.language === 'te' ? 'te-IN' : i18n.language === 'hi' ? 'hi-IN' : 'en-IN';
      utterance.rate = 0.95;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleSimulateVoice = async (forceLang: string, sampleText: string) => {
    setIsRecording(true);
    setTranscript(sampleText);
    setIsProcessing(true);

    // Auto-detect language from the sample text and switch UI
    const lang = autoSwitchLanguage(sampleText) || forceLang;

    setTimeout(async () => {
      setIsRecording(false);
      const parsed = await api.parseVoice(lang, sampleText);
      setExtractedData(parsed);
      setIsProcessing(false);

      const announcement = lang === 'te'
        ? `${parsed.quantity} కిలోల ${parsed.crop} నమోదైంది. కిలోకి ధర ${parsed.estimated_price_per_kg} రూపాయలు.`
        : lang === 'hi'
        ? `${parsed.quantity} किलो ${parsed.crop} दर्ज किया गया। प्रति किलो ₹${parsed.estimated_price_per_kg}.`
        : `${parsed.quantity} kg ${parsed.crop} detected at ₹${parsed.estimated_price_per_kg} per kg.`;
      speakAudio(announcement);
    }, 1000);
  };

  const handleStartMic = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      try {
        const recognition = new SpeechRecognition();
        // Start with current UI language; we'll auto-detect and switch after speech
        recognition.lang = i18n.language === 'te' ? 'te-IN' : i18n.language === 'hi' ? 'hi-IN' : 'en-IN';
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        setIsRecording(true);
        recognition.onstart = () => setIsRecording(true);
        recognition.onresult = async (event: any) => {
          const spoken = event.results[0][0].transcript;
          setTranscript(spoken);
          setIsRecording(false);
          setIsProcessing(true);

          // Auto-detect language from what was spoken and switch UI
          const lang = autoSwitchLanguage(spoken);

          const parsed = await api.parseVoice(lang, spoken);
          setExtractedData(parsed);
          setIsProcessing(false);

          const announcement = lang === 'te'
            ? `${parsed.quantity} కిలోల ${parsed.crop} గుర్తించబడింది.`
            : lang === 'hi'
            ? `${parsed.quantity} किलो ${parsed.crop} पहचाना गया।`
            : `${parsed.quantity} kg ${parsed.crop} detected.`;
          speakAudio(announcement);
        };
        recognition.onerror = () => {
          setIsRecording(false);
          handleSimulateVoice('te', 'నా దగ్గర 500 కిలోల టమాటాలు ఉన్నాయి.');
        };
        recognition.onend = () => setIsRecording(false);
        recognition.start();
        return;
      } catch (err) {
        console.warn("Speech recognition error, fallback to simulation", err);
      }
    }
    // Fallback simulation
    handleSimulateVoice('te', 'నా దగ్గర 500 కిలోల టమాటాలు ఉన్నాయి.');
  };

  const handleConfirmListing = async () => {
    if (!extractedData) return;
    setIsProcessing(true);
    await api.createListing({
      farmer_id: "farmer-001",
      crop: extractedData.crop,
      quantity: extractedData.quantity,
      unit: extractedData.unit,
      price_per_kg: extractedData.estimated_price_per_kg,
      available_from: extractedData.availability,
      location: {
        lat: 17.251,
        lng: 78.432,
        name: "Shamshabad Village, Telangana"
      },
      source_channel: "voice"
    });
    setIsProcessing(false);
    setIsSubmitted(true);

    speakAudio(i18n.language === 'te' 
      ? 'మీ పంట విజయవంతంగా నమోదైంది! ధన్యవాదాలు.' 
      : 'Your produce has been successfully registered!');

    setTimeout(() => {
      setIsSubmitted(false);
      setExtractedData(null);
      setTranscript('');
      onListingCreated();
      onClose();
    }, 1600);
  };

  const cropEmojis: Record<string, string> = {
    tomato: '🍅',
    onion: '🧅',
    potato: '🥔',
    chilli: '🌶️',
    mango: '🥭'
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-[#FAF7EE] text-[#1C2B19] rounded-3xl max-w-lg w-full border border-gray-300 shadow-2xl overflow-hidden">
        {/* Simple Friendly Header */}
        <div className="bg-[#2E6B39] text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center">
              <Mic className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold">రైతు వాయిస్ (Voice Listing)</h3>
              <p className="text-xs text-white/90">నోటితో చెప్పండి · Zero Typing</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {/* Live Detected Language Badge */}
            {detectedLang && (
              <div className="flex items-center gap-1.5 bg-white/20 px-3 py-1.5 rounded-xl text-xs font-bold">
                <Globe className="w-3.5 h-3.5" />
                <span>
                  {detectedLang === 'te' ? '🇮🇳 తెలుగు Auto-Detected' :
                   detectedLang === 'hi' ? '🇮🇳 हिंदी Auto-Detected' :
                   '🌐 English Detected'}
                </span>
              </div>
            )}
            <button 
              onClick={onClose} 
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-5">
          {/* Big Tap-to-Speak Microphone Area */}
          <div className="p-6 bg-white rounded-2xl border-2 border-[#2E6B39]/20 text-center flex flex-col items-center justify-center shadow-xs">
            <button
              onClick={handleStartMic}
              disabled={isRecording || isProcessing}
              className={`w-24 h-24 rounded-full flex items-center justify-center transition-all shadow-lg cursor-pointer ${
                isRecording
                  ? 'bg-red-500 text-white animate-pulse ring-8 ring-red-100 scale-105'
                  : 'bg-[#2E6B39] hover:bg-[#23532c] text-white active:scale-95 ring-8 ring-[#EBF4ED]'
              }`}
            >
              <Mic className="w-11 h-11" />
            </button>

            <span className="font-serif font-bold text-base text-[#1C2B19] mt-4">
              {isRecording 
                ? '🎙️ వింటున్నాము... (Listening... Speak Now)' 
                : 'మైక్ నొక్కి మాట్లాడండి (Tap to Speak)'}
            </span>
            <p className="text-xs text-gray-500 mt-1">
              "నా దగ్గర 500 కిలోల టమాటాలు ఉన్నాయి"
            </p>

            {transcript && (
              <div className="mt-3 p-2.5 bg-[#EBF4ED] text-[#2E6B39] rounded-xl text-xs font-semibold flex items-center gap-2">
                <Volume2 className="w-4 h-4 shrink-0" />
                <span>"{transcript}"</span>
              </div>
            )}
          </div>

          {/* Quick 1-Tap Voice Samples (For instant testing without mic) */}
          <div>
            <span className="text-xs font-semibold text-gray-600 block mb-2">
              లేదా ఒక క్లిక్‌తో ప్రయత్నించండి (Or try with 1 click):
            </span>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                onClick={() => handleSimulateVoice('te', 'నా దగ్గర 500 కిలోల టమాటాలు ఉన్నాయి, రేపటికి సిద్ధం.')}
                className="p-3 rounded-xl bg-white border border-[#2E6B39]/40 hover:bg-[#EBF4ED] text-left transition-all cursor-pointer font-medium"
              >
                <span className="font-bold text-[#2E6B39] block text-sm mb-0.5">🍅 500 kg టమాటాలు</span>
                <span className="text-gray-500 text-[11px]">రేపటికి సిద్ధం (Tomorrow)</span>
              </button>

              <button
                onClick={() => handleSimulateVoice('te', 'నా దగ్గర 300 కిలోల ఉల్లిపాయలు ఉన్నాయి.')}
                className="p-3 rounded-xl bg-white border border-amber-300 hover:bg-amber-50 text-left transition-all cursor-pointer font-medium"
              >
                <span className="font-bold text-amber-700 block text-sm mb-0.5">🧅 300 kg ఉల్లిపాయలు</span>
                <span className="text-gray-500 text-[11px]">ఈరోజు సిద్ధం (Today)</span>
              </button>
            </div>
          </div>

          {/* AI Extracted Result Box */}
          {extractedData && (
            <div className="bg-[#EBF4ED] border-2 border-[#2E6B39] rounded-2xl p-4 space-y-3 animate-in fade-in zoom-in duration-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-3xl">{cropEmojis[extractedData.crop] || '🌾'}</span>
                  <div>
                    <h4 className="font-bold text-base text-[#1C2B19] capitalize">
                      {extractedData.crop} ({extractedData.quantity} {extractedData.unit})
                    </h4>
                    <span className="text-xs text-gray-600">సిద్ధం: {extractedData.availability}</span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xs text-gray-500 block">మార్కెట్ ధర:</span>
                  <span className="text-lg font-bold text-[#2E6B39]">₹{extractedData.estimated_price_per_kg}/kg</span>
                </div>
              </div>

              <div className="p-2.5 bg-white rounded-xl flex items-center justify-between text-xs">
                <span className="text-gray-600">మొత్తం ఆదాయం (Total Earning):</span>
                <span className="font-bold text-base text-[#2E6B39]">
                  ₹{(extractedData.quantity * extractedData.estimated_price_per_kg).toLocaleString()}
                </span>
              </div>

              {isSubmitted ? (
                <div className="p-3 bg-[#2E6B39] text-white rounded-xl text-center text-xs font-bold flex items-center justify-center gap-2">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>నమోదు పూర్తయింది! (Successfully Listed!)</span>
                </div>
              ) : (
                <button
                  onClick={handleConfirmListing}
                  disabled={isProcessing}
                  className="w-full py-3.5 bg-[#2E6B39] hover:bg-[#23532c] text-white font-bold text-sm rounded-xl flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
                >
                  <Check className="w-5 h-5" />
                  <span>ఖరారు చేసి నమోదు చేయండి (Confirm & Post)</span>
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
