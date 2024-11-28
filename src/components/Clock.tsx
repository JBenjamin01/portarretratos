import React from 'react';
import { ClockIcon } from 'lucide-react';

interface ClockProps {
  onClose: () => void;
  clockStyle: 'minimal' | 'classic';
  setClockStyle: (style: 'minimal' | 'classic') => void;
}

export default function Clock({ onClose, clockStyle, setClockStyle }: ClockProps) {
  const [time, setTime] = React.useState(new Date());

  React.useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = () => {
    if (clockStyle === 'minimal') {
      return time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    return time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };

  return (
    <div className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50">
      <button
        onClick={() => onClose()}
        className="absolute top-8 right-8 p-3 rounded-full hover:bg-gray-900 transition-colors"
      >
        <span className="text-white text-lg">×</span>
      </button>
      
      <div className="absolute top-8 left-8">
        <button
          onClick={() => setClockStyle(clockStyle === 'minimal' ? 'classic' : 'minimal')}
          className="p-3 rounded-full hover:bg-gray-900 transition-colors"
        >
          <ClockIcon className="w-6 h-6 text-white" />
        </button>
      </div>

      <div className={`text-white font-light ${clockStyle === 'minimal' ? 'text-9xl' : 'text-9xl'}`}>
        {formatTime()}
      </div>
      
      <div className="text-white/50 text-2xl mt-8">
        {time.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}
      </div>
    </div>
  );
}