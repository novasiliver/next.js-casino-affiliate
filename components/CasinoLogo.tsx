"use client";

import { useState } from "react";

interface CasinoLogoProps {
  logo: string;
  name: string;
  size?: "small" | "medium" | "large";
}

export default function CasinoLogo({ logo, name, size = "medium" }: CasinoLogoProps) {
  const [imageError, setImageError] = useState(false);
  
  const sizeClasses = {
    small: "w-10 h-10 text-xs",
    medium: "w-16 h-16 text-lg",
    large: "w-20 h-20 text-xl",
  };

  const isImageUrl = logo && (logo.startsWith('/') || logo.startsWith('http'));

  if (imageError || !isImageUrl) {
    return (
      <div className={`${sizeClasses[size]} rounded-xl bg-slate-800 border border-white/5 flex items-center justify-center shrink-0`}>
        <span className={`font-bold tracking-tighter text-white`}>
          {logo || name.substring(0, 3).toUpperCase()}
        </span>
      </div>
    );
  }

  return (
    <div style={{width: "11rem", height: "6rem"}} className={`${sizeClasses[size]} rounded-xl bg-slate-800 border border-white/5 flex items-center justify-center shrink-0 overflow-hidden`}>
      <img 
        src={logo} 
        alt={name}
        className="w-full h-full object-contain p-2"
        onError={() => setImageError(true)}
      />
    </div>
  );
}

