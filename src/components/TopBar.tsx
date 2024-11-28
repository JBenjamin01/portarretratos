import React, { useState } from 'react';
import { Clock, Settings, Info, Camera, Palette } from 'lucide-react';
import PhotoControls from './PhotoControls'; // Import PhotoControls here

interface TopBarProps {
  onClockClick: () => void;
  onSettingsClick: () => void;
  onThemeClick: () => void;
  onInfoClick: () => void;
  onCameraClick: () => void;  // Cambiar `onVideoClick` a `onCameraClick`
  isAutoPlaying: boolean;
  onAutoPlayToggle: () => void; // Add onAutoPlayToggle prop
}

export default function TopBar({
  onClockClick,
  onSettingsClick,
  onThemeClick,
  onInfoClick,
  onCameraClick,  // Cambiar `onVideoClick` a `onCameraClick`
  isAutoPlaying,
  onAutoPlayToggle,
}: TopBarProps) {
  return (
    <div className="flex justify-between items-center mb-6">
      <div className="flex items-center space-x-4">
        <button
          onClick={onClockClick}
          className="p-2 hover:bg-gray-700 rounded-full transition-colors"
        >
          <Clock className="w-6 h-6" />
        </button>
        <button
          onClick={onSettingsClick}
          className="p-2 hover:bg-gray-700 rounded-full transition-colors"
        >
          <Settings className="w-6 h-6" />
        </button>
        <button
          onClick={onThemeClick}
          className="p-2 hover:bg-gray-700 rounded-full transition-colors"
        >
          <Palette className="w-6 h-6" />
        </button>
      </div>
      
      {/* Centered PhotoControls component */}
      <div className="flex justify-center flex-grow">
        <PhotoControls 
          isAutoPlaying={isAutoPlaying}
          onAutoPlayToggle={onAutoPlayToggle}
        />
      </div>

      <div className="flex items-center space-x-4">
        <button
          onClick={onInfoClick}
          className="p-2 hover:bg-gray-700 rounded-full transition-colors"
        >
          <Info className="w-6 h-6" />
        </button>
        <button
          onClick={onCameraClick}  // Cambiar el evento de clic
          className="p-2 hover:bg-gray-700 rounded-full transition-colors"
        >
          <Camera className="w-6 h-6" />  {/* Cambiar el ícono a Camera */}
        </button>
      </div>
    </div>
  );
}