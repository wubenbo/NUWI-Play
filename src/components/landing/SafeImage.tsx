import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackText?: string;
  fallbackIcon?: React.ReactNode;
  aspectRatioClass?: string;
  containerClassName?: string;
}

export const SafeImage: React.FC<SafeImageProps> = ({
  src,
  alt = "Nuwi Play",
  fallbackText = "Experiencia Terapéutica Nuwi Play",
  fallbackIcon,
  className = "",
  containerClassName = "",
  aspectRatioClass = "aspect-video",
  ...rest
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className={`relative overflow-hidden bg-indigo-50/70 border border-indigo-100/60 rounded-2xl ${aspectRatioClass} ${containerClassName}`}>
      {/* Loading Skeleton */}
      {isLoading && !hasError && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-tr from-indigo-50 via-cyan-50/50 to-white animate-pulse">
          <div className="w-10 h-10 rounded-full bg-indigo-200/50 flex items-center justify-center mb-2">
            <Sparkles className="w-5 h-5 text-indigo-400 animate-spin" />
          </div>
          <span className="text-xs font-semibold text-indigo-400/80">Cargando experiencia...</span>
        </div>
      )}

      {/* Fallback Display if image fails to load */}
      {hasError ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-indigo-50 via-white to-cyan-50">
          <div className="w-14 h-14 rounded-2xl bg-indigo-100/70 border border-indigo-200 flex items-center justify-center mb-3 shadow-sm text-indigo-600">
            {fallbackIcon || <Sparkles className="w-7 h-7 text-indigo-500" />}
          </div>
          <p className="text-sm font-bold text-indigo-900 line-clamp-2 max-w-xs">{fallbackText}</p>
          <span className="text-[11px] font-semibold text-indigo-400 mt-1 uppercase tracking-wider">Nuwi Play · Salud Infantil</span>
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          referrerPolicy="no-referrer"
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setIsLoading(false);
            setHasError(true);
          }}
          className={`w-full h-full object-cover transition-all duration-700 ${
            isLoading ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
          } ${className}`}
          {...rest}
        />
      )}
    </div>
  );
};
