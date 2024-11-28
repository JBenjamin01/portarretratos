import React, { useState } from 'react';
import { Upload, Play, Pause } from 'lucide-react';

interface PhotoControlsProps {
  isAutoPlaying: boolean;
  onAutoPlayToggle: () => void;
}

export default function PhotoControls({
  isAutoPlaying,
  onAutoPlayToggle
}: PhotoControlsProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  return (
    <div className="mt-6 flex justify-center space-x-4">
      <button
        className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-full transition-colors flex items-center space-x-2"
      >
        <label className="cursor-pointer flex items-center space-x-2">
          <Upload className="w-4 h-4" />
          <span>Subir</span>
        </label>
      </button>
      <button
        onClick={onAutoPlayToggle}
        className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-full transition-colors flex items-center space-x-2"
      >
        {isAutoPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
        <span>{isAutoPlaying ? 'Pausar' : 'Reproducir'}</span>
      </button>
    </div>
  );
}