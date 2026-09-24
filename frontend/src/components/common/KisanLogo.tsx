import React from 'react';

interface KisanLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'full' | 'compact' | 'emblem-only' | 'graphic';
  theme?: 'light' | 'dark';
  className?: string;
}

/**
 * Official KisanConnect Emblem cropped with pixel-precision from the brand artwork.
 * Shows the stylized green leaf, the farmer silhouette in turban, and yellow furrowed fields.
 */
export const KisanEmblem: React.FC<{ size?: number; className?: string }> = ({
  size = 40,
  className = '',
}) => {
  return (
    <div
      className={`relative overflow-hidden rounded-xl bg-white shadow-sm flex items-center justify-center flex-shrink-0 border border-emerald-900/10 ${className}`}
      style={{ width: size, height: size }}
      title="KisanConnect Official Emblem"
    >
      <svg
        viewBox="275 40 474 370"
        className="w-full h-full object-contain"
        preserveAspectRatio="xMidYMid meet"
      >
        <image
          href="/kisanconnect_brand_full.jpg"
          width="1024"
          height="1024"
          x="0"
          y="0"
        />
      </svg>
    </div>
  );
};

export const KisanLogo: React.FC<KisanLogoProps> = ({
  size = 'md',
  variant = 'compact',
  theme = 'light',
  className = '',
}) => {
  const pixelSizes = {
    sm: 32,
    md: 40,
    lg: 52,
    xl: 64,
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl',
    xl: 'text-4xl',
  };

  const isDark = theme === 'dark';
  const emblemSize = pixelSizes[size];

  if (variant === 'emblem-only') {
    return <KisanEmblem size={emblemSize} className={className} />;
  }

  if (variant === 'graphic') {
    return (
      <div className={`flex flex-col items-center text-center ${className}`}>
        <div
          className="relative overflow-hidden rounded-2xl shadow-xl border-2 border-white/20 bg-white"
          style={{ width: emblemSize * 2.2, height: emblemSize * 2.2 }}
        >
          <svg
            viewBox="275 40 474 370"
            className="w-full h-full"
            preserveAspectRatio="xMidYMid meet"
          >
            <image href="/kisanconnect_brand_full.jpg" width="1024" height="1024" />
          </svg>
        </div>
        <div className="mt-3">
          <span className={`font-serif ${textSizes[size]} font-black tracking-tight`}>
            <span className={isDark ? 'text-white' : 'text-[#166534]'}>Kisan</span>
            <span className={isDark ? 'text-[#4ade80]' : 'text-[#22c55e]'}>Connect</span>
          </span>
          <div className="flex items-center justify-center gap-1.5 mt-0.5">
            <span className="h-px w-4 bg-[#22c55e]/60" />
            <span className={`text-[11px] font-medium tracking-wide uppercase ${isDark ? 'text-white/70' : 'text-[#2e6b39]'}`}>
              Direct from Farm to You
            </span>
            <span className="h-px w-4 bg-[#22c55e]/60" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      <KisanEmblem size={emblemSize} />
      <div>
        <div className="flex items-center gap-2 leading-none">
          <span className={`font-serif ${textSizes[size]} font-black tracking-tight`}>
            <span className={isDark ? 'text-white' : 'text-[#14532d]'}>Kisan</span>
            <span className={isDark ? 'text-[#4ade80]' : 'text-[#22c55e]'}>Connect</span>
          </span>
        </div>
        {(variant === 'full' || variant === 'compact') && (
          <p
            className={`text-xs mt-0.5 tracking-tight font-medium ${
              isDark ? 'text-white/75' : 'text-[#365314]'
            }`}
          >
            Direct from Farm to You
          </p>
        )}
      </div>
    </div>
  );
};
