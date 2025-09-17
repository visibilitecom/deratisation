import React, { useState } from 'react';

const OptimizedImage = ({ 
  src, 
  alt, 
  className = '', 
  width, 
  height, 
  priority = false,
  sizes = '100vw',
  placeholder = 'blur'
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setHasError(true);
    setIsLoaded(true);
  };

  return (
    <div className={`relative overflow-hidden bg-gray-100 ${className}`}>
      {!isLoaded && !hasError && placeholder === 'blur' && (
        <div 
          className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse"
          style={{ width, height }}
          aria-hidden="true"
        />
      )}
      
      {!hasError && (
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          className={`object-cover transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          } ${className}`}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          onLoad={handleLoad}
          onError={handleError}
          sizes={sizes}
        />
      )}
      
      {hasError && (
        <div 
          className="flex items-center justify-center bg-gray-100 text-gray-400"
          style={{ width, height }}
          role="img"
          aria-label={`Image non disponible: ${alt}`}
        >
          <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
            <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
          </svg>
        </div>
      )}
    </div>
  );
};

export default OptimizedImage;