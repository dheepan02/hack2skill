import React, { useState } from 'react';
import { ImageOff } from 'lucide-react';

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackTitle?: string;
  className?: string;
  aspectRatioClass?: string;
}

export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt = '',
  fallbackTitle = 'Image unavailable',
  className = '',
  aspectRatioClass = 'aspect-[16/9]',
  ...rest
}) => {
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  if (error || !src) {
    return (
      <div
        className={`w-full ${aspectRatioClass} flex flex-col items-center justify-center bg-zinc-900 border border-zinc-800 text-zinc-500 rounded-lg p-4 select-none ${className}`}
      >
        <ImageOff className="w-6 h-6 mb-2 text-zinc-600 stroke-[1.5]" />
        <span className="text-xs font-mono text-zinc-400 text-center max-w-[200px] truncate">
          {fallbackTitle}
        </span>
        <span className="text-[10px] text-zinc-600 mt-1">Fallback container active</span>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {!loaded && (
        <div
          className={`absolute inset-0 bg-zinc-900 animate-pulse ${aspectRatioClass}`}
          aria-hidden="true"
        />
      )}
      <img
        src={src}
        alt={alt}
        referrerPolicy="no-referrer"
        loading="lazy"
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          loaded ? 'opacity-100' : 'opacity-0'
        } ${className}`}
        {...rest}
      />
    </div>
  );
};
