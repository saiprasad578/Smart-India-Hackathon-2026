import React, { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, KeyRound, IndianRupee, ArrowRight, Sparkles } from 'lucide-react';
import { api } from '../../api/client';
import confetti from 'canvas-confetti';

interface TrustTimelineModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPayoutCompleted?: () => void;
}

export const TrustTimelineModal: React.FC<TrustTimelineModalProps> = ({
  isOpen,
  onClose,
  onPayoutCompleted
}) => {
  const [otpInput, setOtpInput] = useState("482910");
  const [deliveryConfirmed, setDeliveryConfirmed] = useState(false);
  const [payoutReleased, setPayoutReleased] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [payoutDetails, setPayoutDetails] = useState<any[]>([]);

  if (!isOpen) return null;

  const handleConfirmOtp = async () => {
    setIsProcessing(true);
    await api.confirmDelivery("order-001", otpInput);
    setIsProcessing(false);
    setDeliveryConfirmed(true);
  };

  const handleReleaseEscrow = async () => {
    setIsProcessing(true);
    const res = await api.releaseEscrow("order-001");
    setIsProcessing(false);
    setPayoutReleased(true);
    setPayoutDetails(res.payouts || []);

    // Celebratory confetti
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });

    if (onPayoutCompleted) {
      onPayoutCompleted();
    }
  };

  const checkpoints = [
    { n: 1, title: "Farmer Listing", desc: "Captured via Telugu voice / IVR / assisted agent", status: "done", time: "06:00 AM" },
    { n: 2, title: "FPO / Collection Verification", desc: "Physical existence of 1,000 kg tomato lot confirmed", status: "done", time: "07:30 AM" },
    { n: 3, title: "Weight & Quality Check", desc: "Digital tare scale verified, certified Grade A", status: "done", time: "08:15 AM" },
    { n: 4, title: "Buyer Order", desc: "Order #order-001 placed by FreshBasket Wholesale", status: "done", time: "08:30 AM" },
    { n: 5, title: "Escrow Locked", desc: "₹25,600 held safely in RBI-compliant escrow account", status: "done", time: "08:35 AM" },
    { n: 6, title: "Pickup Confirmation", desc: "Vehicle TS-07-AGRI-1088 sealed and geo-tagged", status: "done", time: "09:00 AM" },
    { n: 7, title: "Delivery OTP Verification", desc: "Buyer verifies drop-off code at wholesale dock", status: deliveryConfirmed ? "done" : "active", time: "10:15 AM" },
    { n: 8, title: "Buyer Confirmation", desc: "Physical lot accepted with zero dispute raised", status: deliveryConfirmed ? "done" : "pending", time: "10:20 AM" },
    { n: 9, title: "Farmer Payout Release", desc: "Direct instant bank credit/UPI to Farmer A, B, and C", status: payoutReleased ? "done" : (deliveryConfirmed ? "active" : "pending"), time: "10:25 AM" },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/65 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#FAF7EE] text-[#1C2B19] rounded-2xl max-w-2xl w-full border border-gray-300 shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="bg-[#1B2917] text-white px-6 py-4 flex items-center justify-between shrink-0">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-serif text-lg font-bold">9-Checkpoint Trust & Payment Timeline</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#D69A2D] text-black font-semibold">Escrow Secured</span>
            </div>
            <p className="text-xs text-white/80">Order #order-001 · Total Amount: ₹25,600.00 · Delivery OTP: 482910</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Timeline body */}
        <div className="p-6 overflow-y-auto space-y-6">
          <div className="relative pl-6 space-y-4 before:content-[''] before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-gray-300">
            {checkpoints.map((cp) => {
              const isDone = cp.status === "done";
              const isActive = cp.status === "active";

              return (
                <div key={cp.n} className="relative flex items-start gap-3 text-xs">
                  <div className={`w-5 h-5 -ml-6 rounded-full flex items-center justify-center font-bold text-[10px] z-10 shrink-0 ${
                    isDone ? 'bg-[#2E6B39] text-white' : isActive ? 'bg-[#D69A2D] text-black ring-4 ring-[#D69A2D]/20 animate-pulse' : 'bg-gray-200 text-gray-500'
                  }`}>
                    {isDone ? '✓' : cp.n}
                  </div>

                  <div className="flex-1 bg-white p-3 rounded-xl border border-gray-200 shadow-2xs">
                    <div className="flex justify-between items-baseline mb-0.5">
                      <span className={`font-bold ${isDone ? 'text-[#2E6B39]' : isActive ? 'text-[#D69A2D]' : 'text-gray-700'}`}>
                        {cp.n}. {cp.title}
                      </span>
                      <span className="text-[10px] font-mono text-gray-500">{cp.time}</span>
                    </div>
                    <p className="text-[11px] text-gray-600">{cp.desc}</p>

                    {/* Step 7 Action: Enter OTP */}
                    {cp.n === 7 && !deliveryConfirmed && (
                      <div className="mt-3 p-3 bg-[#FAF8F3] border border-gray-300 rounded-xl flex items-center gap-2">
                        <KeyRound className="w-4 h-4 text-[#D69A2D]" />
                        <input
                          type="text"
                          value={otpInput}
                          onChange={(e) => setOtpInput(e.target.value)}
                          placeholder="Enter 6-digit OTP"
                          className="px-2 py-1 bg-white border border-gray-300 rounded-lg text-xs font-mono font-bold w-28 text-center"
                        />
                        <button
                          onClick={handleConfirmOtp}
                          disabled={isProcessing}
                          className="px-3 py-1 rounded-lg bg-[#2E6B39] hover:bg-[#23532c] text-white font-semibold text-xs transition-colors"
                        >
                          Confirm Delivery OTP
                        </button>
                      </div>
                    )}

                    {/* Step 9 Action: Release Escrow Payout */}
                    {cp.n === 9 && deliveryConfirmed && !payoutReleased && (
                      <div className="mt-3 p-3 bg-[#EBF4ED] border border-[#2E6B39]/30 rounded-xl flex items-center justify-between">
                        <div className="text-xs text-[#2E6B39] font-medium">
                          Delivery verified. Buyer confirmed acceptance. Ready to disburse escrow.
                        </div>
                        <button
                          onClick={handleReleaseEscrow}
                          disabled={isProcessing}
                          className="px-4 py-1.5 rounded-lg bg-[#2E6B39] hover:bg-[#23532c] text-white font-bold text-xs shadow-xs transition-all flex items-center gap-1.5 shrink-0"
                        >
                          <IndianRupee className="w-3.5 h-3.5" />
                          <span>Release ₹25,600 Payout</span>
                        </button>
                      </div>
                    )}

                    {/* Payout Details Result */}
                    {cp.n === 9 && payoutReleased && (
                      <div className="mt-3 p-3 bg-[#EBF4ED] border border-[#2E6B39]/40 rounded-xl space-y-2">
                        <div className="flex items-center gap-1.5 text-[#2E6B39] font-bold text-xs">
                          <Sparkles className="w-4 h-4" /> Escrow Released to All Contributing Farmers!
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-center text-xs">
                          <div className="p-2 bg-white rounded-lg border border-gray-200">
                            <span className="text-[10px] text-gray-500 block">Farmer Venkataiah</span>
                            <span className="font-bold text-[#2E6B39]">₹7,800.00</span>
                            <span className="text-[9px] text-gray-500 block">Credited via UPI</span>
                          </div>
                          <div className="p-2 bg-white rounded-lg border border-gray-200">
                            <span className="text-[10px] text-gray-500 block">Farmer Ramulu</span>
                            <span className="font-bold text-[#2E6B39]">₹10,000.00</span>
                            <span className="text-[9px] text-gray-500 block">Credited via UPI</span>
                          </div>
                          <div className="p-2 bg-white rounded-lg border border-gray-200">
                            <span className="text-[10px] text-gray-500 block">Farmer Lakshmi</span>
                            <span className="font-bold text-[#2E6B39]">₹7,800.00</span>
                            <span className="text-[9px] text-gray-500 block">Credited via UPI</span>
                          </div>
                        </div>
                        <div className="text-[10px] text-gray-500 text-right font-mono">
                          Ref: TXN-ESCROW-CONFIRMED · 0% commission deducted
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-white px-6 py-3 border-t border-gray-200 flex justify-end shrink-0">
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-[#2E6B39] text-white text-xs font-semibold hover:bg-[#23532c] transition-colors"
          >
            Close Timeline
          </button>
        </div>
      </div>
    </div>
  );
};
