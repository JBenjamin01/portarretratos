import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface NavigationArrowsProps {
  onPrevious: () => void;
  onNext: () => void;
  disabled?: boolean;
}

export default function NavigationArrows({ onPrevious, onNext, disabled = false }: NavigationArrowsProps) {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    let hideTimeout: NodeJS.Timeout;
    
    const handleMouseMove = () => {
      if (!disabled) {
        setIsVisible(true);
        clearTimeout(hideTimeout);
        hideTimeout = setTimeout(() => {
          setIsVisible(false);
        }, 2000);
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(hideTimeout);
    };
  }, [disabled]);

  if (disabled) {
    return null;
  }

  return (
    <div className="absolute inset-0 flex items-center justify-between p-4 z-10">
      <div className="absolute inset-0 flex">
        <div 
          className="w-1/2 h-full cursor-w-resize"
          onClick={(e) => {
            e.stopPropagation();
            onPrevious();
          }}
        />
        <div 
          className="w-1/2 h-full cursor-e-resize"
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
        />
      </div>
      
      <button
        onClick={(e) => {
          e.stopPropagation();
          onPrevious();
        }}
        className={`p-2 bg-black/50 hover:bg-black/70 rounded-full transition-all z-20 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <ChevronLeft className="w-8 h-8" />
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        className={`p-2 bg-black/50 hover:bg-black/70 rounded-full transition-all z-20 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <ChevronRight className="w-8 h-8" />
      </button>
    </div>
  );
}