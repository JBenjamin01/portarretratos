import React from 'react';
import { X } from 'lucide-react';

interface VideoPlayerProps {
  videoUrl: string;
  onClose: () => void;
  volume: number;
}

export default function VideoPlayer({ videoUrl, onClose, volume }: VideoPlayerProps) {
  const videoRef = React.useRef<HTMLVideoElement>(null);

  React.useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = volume / 100;
    }
  }, [volume]);

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-2 bg-gray-800/50 hover:bg-gray-700 rounded-full transition-colors"
      >
        <X className="w-6 h-6 text-white" />
      </button>
      <video
        ref={videoRef}
        src={videoUrl}
        controls
        autoPlay
        className="max-w-full max-h-[90vh] rounded-lg"
      />
    </div>
  );
}