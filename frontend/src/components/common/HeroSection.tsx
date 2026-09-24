import React from 'react';
import { ShoppingCart, ArrowRight } from 'lucide-react';
import { KisanLogo, KisanEmblem } from './KisanLogo';

interface HeroSectionProps {
  onStartFarmer: () => void;
  onExploreMarket: () => void;
  onRoleSelect?: (role: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onStartFarmer,
  onExploreMarket,
  onRoleSelect,
}) => {
  const stakeholderPillars = [
    {
      role: 'farmer',
      title: 'FARMER',
      quote: '“My produce, my price, my future.”',
      icon: '🌾',
      tagColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
    },
    {
      role: 'fpo',
      title: 'FPO',
      quote: '“Stronger FPOs, stronger farmers.”',
      icon: '🏢',
      tagColor: 'bg-blue-500/20 text-blue-300 border-blue-500/40',
    },
    {
      role: 'buyer',
      title: 'BUYER',
      quote: '“Quality produce, on time, every time.”',
      icon: '🛒',
      tagColor: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
    },
    {
      role: 'logistics',
      title: 'LOGISTICS PARTNER',
      quote: '“Smarter routes, lower costs.”',
      icon: '🚛',
      tagColor: 'bg-orange-500/20 text-orange-300 border-orange-500/40',
    },
    {
      role: 'admin',
      title: 'GOVERNMENT / ADMIN',
      quote: '“Supporting sustainable agriculture.”',
      icon: '🌿',
      tagColor: 'bg-lime-500/20 text-lime-300 border-lime-500/40',
    },
  ];

  return (
    <section
      className="w-full relative overflow-hidden text-white"
      style={{
        background: 'radial-gradient(ellipse at 20% 0%, #1a4d2e 0%, #0f2d1a 60%, #07170c 100%)',
      }}
    >
      {/* Subtle organic background patterns */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#4ade80_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="max-w-7xl mx-auto px-6 pt-8 pb-14 flex flex-col lg:flex-row items-center gap-10 min-h-[420px] relative z-10">

        {/* LEFT — Brand & Content */}
        <div className="flex-1">

          {/* Official Brand Lockup */}
          <div className="flex items-center gap-3.5 mb-5">
            <KisanEmblem size={52} className="ring-2 ring-emerald-400/40 shadow-xl" />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif text-3xl font-black tracking-tight">
                  <span className="text-white">Kisan</span>
                  <span className="text-[#4ade80]">Connect</span>
                </span>
                <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-[#4ade80]/20 text-[#4ade80] font-semibold border border-[#4ade80]/30 tracking-wide uppercase">
                  SIH 2026
                </span>
              </div>
              <p className="text-xs text-white/60 tracking-wider font-medium uppercase mt-0.5">
                Direct from Farm to You
              </p>
            </div>
          </div>

          {/* Official Brand Slogan Quote Banner */}
          <div className="mb-6 p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md max-w-xl shadow-lg">
            <p className="text-sm md:text-base font-serif italic text-emerald-200 leading-snug">
              “Better Prices. Fairer Markets. A Stronger Farming Community.”
            </p>
          </div>

          {/* Headline */}
          <h1 className="text-3xl lg:text-5xl font-extrabold leading-tight text-white mb-3 tracking-tight">
            Empowering Farmers, <br className="hidden sm:block" />
            <span className="text-[#4ade80]">Connecting Markets</span>
          </h1>

          {/* Subtitle */}
          <p className="text-white/80 text-sm leading-relaxed max-w-lg mb-7">
            A smart, unified agricultural platform connecting farmers, FPOs, logistics, and buyers with{' '}
            <strong className="text-white">AI demand forecasting</strong>, fair transparent pricing, and smart escrow.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              id="hero-start-farmer"
              onClick={onStartFarmer}
              className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-[#07170c] transition-all duration-200 hover:scale-105 hover:shadow-lg active:scale-95 shadow-md"
              style={{ background: 'linear-gradient(135deg, #4ade80 0%, #22c55e 100%)' }}
            >
              <span>🌾</span>
              <span>Farmer Portal</span>
              <ArrowRight size={16} />
            </button>
            <button
              id="hero-explore-market"
              onClick={onExploreMarket}
              className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-white border border-white/30 bg-white/10 backdrop-blur-md transition-all duration-200 hover:bg-white/20 hover:scale-105 active:scale-95"
            >
              <ShoppingCart size={16} />
              <span>Explore Marketplace</span>
            </button>
          </div>
        </div>

        {/* RIGHT — Official Brand Graphic & Field Showcase */}
        <div className="relative flex-shrink-0 w-full lg:w-[45%] flex justify-center lg:justify-end">
          <div className="relative w-full max-w-md">
            {/* Ribbon badge */}
            <div
              className="absolute -top-3 right-4 z-20 text-[11px] font-bold text-[#1a4d2e] tracking-wide px-3.5 py-1.5 rounded-lg shadow-xl"
              style={{ background: 'linear-gradient(135deg, #fbbf24, #f59e0b)' }}
            >
              Direct from Farm to You
            </div>

            {/* Official Artwork Card with Farmer Backdrop */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-white/20 bg-[#0f2d1a]/80 backdrop-blur-sm p-3">
              <div className="relative rounded-2xl overflow-hidden h-72 lg:h-[300px] flex items-center justify-center bg-white/95">
                <img
                  src="/kisanconnect_brand_full.jpg"
                  alt="KisanConnect Official Brand Identity"
                  className="w-full h-full object-contain p-2"
                />
              </div>

              {/* Floating micro-badge */}
              <div className="mt-3 px-3 py-2 rounded-xl bg-black/40 border border-white/10 flex items-center justify-between text-xs">
                <span className="text-white/80 font-medium">Digital Agriculture Platform</span>
                <span className="text-[#4ade80] font-semibold flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-[#4ade80] animate-pulse" />
                  Live Platform
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 5 STAKEHOLDER PILLARS (Directly from User Brand Resource) */}
      <div className="max-w-7xl mx-auto px-6 pb-8 relative z-10">
        <div className="pt-4 border-t border-white/15">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs uppercase tracking-wider font-bold text-white/60">
              Community Pillars · Click any role to enter portal
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {stakeholderPillars.map((p) => (
              <button
                key={p.role}
                onClick={() => onRoleSelect && onRoleSelect(p.role)}
                className="group text-left p-3.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 hover:border-[#4ade80]/60 transition-all duration-200 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-lg">{p.icon}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${p.tagColor}`}>
                      {p.title}
                    </span>
                  </div>
                  <p className="text-xs italic text-white/90 font-serif leading-snug">
                    {p.quote}
                  </p>
                </div>
                <div className="mt-2.5 flex items-center gap-1 text-[11px] text-[#4ade80] opacity-80 group-hover:opacity-100 font-medium">
                  <span>Enter {p.title}</span>
                  <ArrowRight size={12} className="transition-transform group-hover:translate-x-1" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Wave transition decoration */}
      <div
        className="w-full h-4 bg-[#F8F5EE]"
        style={{ clipPath: 'ellipse(55% 100% at 50% 100%)' }}
      />
    </section>
  );
};
