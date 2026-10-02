import React, { useState } from 'react';

interface EventImageProps {
  src: string;
  alt: string;
  className?: string;
  aspectRatio?: '16/9' | '4/3' | '1/1' | '3/4' | 'auto';
  fallbackText?: string;
}

export const EventImage: React.FC<EventImageProps> = ({
  src,
  alt,
  className = '',
  aspectRatio = 'auto',
  fallbackText
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const aspectClass = {
    '16/9': 'aspect-[16/9]',
    '4/3': 'aspect-[4/3]',
    '1/1': 'aspect-square',
    '3/4': 'aspect-[3/4]',
    'auto': ''
  }[aspectRatio];

  if (hasError || !src) {
    return (
      <div
        className={`relative overflow-hidden bg-gradient-to-br from-[#FDEEE7] via-[#FAF3ED] to-[#F5E6DC] flex flex-col items-center justify-center p-6 text-center border border-[#EFE4DA] ${aspectClass} ${className}`}
      >
        <div className="w-12 h-12 rounded-full bg-white/70 shadow-xs flex items-center justify-center mb-2.5 text-[#D96035]">
          <svg
            className="w-6 h-6 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
            />
          </svg>
        </div>
        <span className="font-serif text-sm font-medium text-[#564A45] tracking-wide">
          {fallbackText || alt}
        </span>
        <span className="text-[11px] text-[#A89B95] mt-0.5 tracking-wider uppercase">
          MOMENTA Experience
        </span>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden bg-[#FAF3ED] ${aspectClass} ${className}`}>
      {!isLoaded && (
        <div className="absolute inset-0 bg-[#F8EFE9] animate-pulse" />
      )}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        referrerPolicy="no-referrer"
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        className={`w-full h-full object-cover transition-all duration-700 ${
          isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-102'
        }`}
      />
    </div>
  );
};
