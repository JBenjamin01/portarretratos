import React from 'react';
import { X, Sun, Volume2, Clock, Play } from 'lucide-react';

interface SettingsProps {
  settings: {
    brightness: number;
    volume: number;
    autoPlayInterval: number;
    showClock: { start: string; end: string };
    theme: string;
  };
  onSettingsChange: (settings: any) => void;
  onClose: () => void;
  onAutoPlayToggle: () => void;
  isAutoPlaying: boolean;
}

export default function Settings({
  settings,
  onSettingsChange,
  onClose,
  onAutoPlayToggle,
  isAutoPlaying
}: SettingsProps) {
  const handleChange = (key: string, value: any) => {
    onSettingsChange({ ...settings, [key]: value });
  };

  return (
    <div className="fixed inset-0 bg-black/95 text-white p-8 overflow-y-auto">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-semibold">Settings</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-800 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-8">
          {/* Brightness Control */}
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Sun className="w-5 h-5" />
              <label className="text-lg">Brightness</label>
            </div>
            <input
              type="range"
              min="10"
              max="100"
              value={settings.brightness}
              onChange={(e) => handleChange('brightness', parseInt(e.target.value))}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
            />
            <span className="text-sm text-gray-400">{settings.brightness}%</span>
          </div>

          {/* Volume Control */}
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Volume2 className="w-5 h-5" />
              <label className="text-lg">Volume</label>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={settings.volume}
              onChange={(e) => handleChange('volume', parseInt(e.target.value))}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
            />
            <span className="text-sm text-gray-400">{settings.volume}%</span>
          </div>

          {/* Auto-Play Settings */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Play className="w-5 h-5" />
              <label className="text-lg">Auto-Play Settings</label>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={onAutoPlayToggle}
                className={`px-4 py-2 rounded-lg ${
                  isAutoPlaying ? 'bg-blue-600' : 'bg-gray-700'
                } hover:bg-opacity-80 transition-colors`}
              >
                {isAutoPlaying ? 'Auto-Play On' : 'Auto-Play Off'}
              </button>
              <div className="flex items-center space-x-2">
                <span>Interval:</span>
                <select
                  value={settings.autoPlayInterval}
                  onChange={(e) => handleChange('autoPlayInterval', parseInt(e.target.value))}
                  className="bg-gray-700 rounded-lg px-3 py-2"
                >
                  <option value="5">5 seconds</option>
                  <option value="10">10 seconds</option>
                  <option value="30">30 seconds</option>
                  <option value="60">1 minute</option>
                </select>
              </div>
            </div>
          </div>

          {/* Clock Schedule */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5" />
              <label className="text-lg">Clock Schedule</label>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Start Time</label>
                <input
                  type="time"
                  value={settings.showClock.start}
                  onChange={(e) =>
                    handleChange('showClock', { ...settings.showClock, start: e.target.value })
                  }
                  className="bg-gray-700 rounded-lg px-3 py-2 w-full"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">End Time</label>
                <input
                  type="time"
                  value={settings.showClock.end}
                  onChange={(e) =>
                    handleChange('showClock', { ...settings.showClock, end: e.target.value })
                  }
                  className="bg-gray-700 rounded-lg px-3 py-2 w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}