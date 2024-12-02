import React, { useState } from 'react';
import { Edit2, Maximize, Menu } from 'lucide-react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import CameraOverlay from './CameraOverlay';
import TopBar from './TopBar';
import Clock from './Clock';
import EditDescription from './EditDescription';
import VideoPlayer from './VideoPlayer';
import Settings from './Settings';
import ThemeSelector from './ThemeSelector';
import NavigationArrows from './NavigationArrows';

interface Media {
  type: 'photo' | 'video';
  url: string;
  description: string;
  date: string;
  location: string;
}

const mediaItems: Media[] = [
  {
    type: 'photo',
    url: "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?auto=format&fit=crop&w=2070&q=80",
    description: "Puesta de sol en las montañas XD",
    date: "2024-03-20",
    location: "Malibu, CA"
  },
  {
    type: 'photo',
    url: "https://images.unsplash.com/photo-1732704827525-4ffb9262eff6?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Vista del desierto",
    date: "2024-03-18",
    location: "Desierto del Sahara"
  },
  {
    type: 'photo',
    url: "https://images.unsplash.com/photo-1731963914155-d22942204d3d?q=80&w=2668&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Ciudad desconocida",
    date: "2024-03-17",
    location: "California"
  },
  {
    type: 'photo',
    url: "https://images.unsplash.com/photo-1702369412540-4fe001f3b07a?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Ciudad flotante xd",
    date: "2024-03-17",
    location: "New York, NY"
  },
  {
    type: 'photo',
    url: "https://lastfm.freetls.fastly.net/i/u/ar0/63a9486e422e4d219d9a4d0e1ad7f343.jpg",
    description: "A C / D C",
    date: "2024-03-17",
    location: "New York, NY"
  }
];

interface DisplaySettings {
  brightness: number;
  volume: number;
  autoPlayInterval: number;
  showClock: { start: string; end: string };
  theme: string;
}

export default function PhotoFrame() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showClock, setShowClock] = useState(false);
  const [showDescription, setShowDescription] = useState(false);
  const [clockStyle, setClockStyle] = useState<'minimal' | 'classic'>('minimal');
  const [isEditing, setIsEditing] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showThemes, setShowThemes] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const [settings, setSettings] = useState<DisplaySettings>({
    brightness: 100,
    volume: 100,
    autoPlayInterval: 5,
    showClock: { start: '22:00', end: '06:00' },
    theme: 'default'
  });

  const [isAutoPlaying, setIsAutoPlaying] = useState(false);

  const [showCameraOverlay, setShowCameraOverlay] = useState(false);
  
  const onAutoPlayToggle = () => {
    setIsAutoPlaying(!isAutoPlaying);
  };

  const onCameraClick = () => {
    setShowCameraOverlay(true); // Mostrar el overlay de la cámara
  };

  React.useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isAutoPlaying) {
      timer = setInterval(() => {
        nextItem();
      }, settings.autoPlayInterval * 1000);
    }
    return () => clearInterval(timer);
  }, [isAutoPlaying, settings.autoPlayInterval]);

  React.useEffect(() => {
    const checkClockSchedule = () => {
      const now = new Date();
      const currentTime = now.getHours() * 100 + now.getMinutes();
      const startTime = parseInt(settings.showClock.start.replace(':', ''));
      const endTime = parseInt(settings.showClock.end.replace(':', ''));
      
      if (startTime > endTime) {
        if (currentTime >= startTime || currentTime <= endTime) {
          setShowClock(true);
        } else {
          setShowClock(false);
        }
      } else {
        if (currentTime >= startTime && currentTime <= endTime) {
          setShowClock(true);
        } else {
          setShowClock(false);
        }
      }
    };

    const timer = setInterval(checkClockSchedule, 60000);
    checkClockSchedule();

    return () => clearInterval(timer);
  }, [settings.showClock]);

  const currentItem = mediaItems[currentIndex];

  const nextItem = () => {
    setCurrentIndex((prev) => (prev + 1) % mediaItems.length);
    setShowVideo(false);
  };

  const previousItem = () => {
    setCurrentIndex((prev) => (prev - 1 + mediaItems.length) % mediaItems.length);
    setShowVideo(false);
  };

  const handleDescriptionSave = (newDescription: string) => {
    mediaItems[currentIndex].description = newDescription;
    setIsEditing(false);
  };

  const toggleFullscreen = () => {
    if (currentItem.type === 'photo') {
      setIsFullscreen(!isFullscreen);
      setShowDescription(false);
      setShowControls(false);
    }
  };

  const handleVideoClick = () => {
    if (currentItem.type === 'video') {
      setShowVideo(true);
    }
  };

  const getBackgroundStyle = () => {
    const brightness = settings.brightness / 100;
    const theme = settings.theme;
    let bgClass = 'bg-gradient-to-br from-gray-900 to-gray-800';
    
    switch (theme) {
      case 'minimal':
        bgClass = 'bg-black';
        break;
      case 'geometric':
        bgClass = 'bg-[url("https://png.pngtree.com/thumb_back/fw800/background/20230704/pngtree-abstract-geometric-background-in-black-a-fresh-design-perfect-for-presentations-image_3717055.jpg")]';
        break;
      case 'texture':
        bgClass = 'bg-[url("https://img.pikbest.com/wp/202344/gray-stone-texture-elegant-black-perfect-as-a-wallpaper-or-background_9915971.jpg!w700wp")]';
        break;
      case 'patterns':
        bgClass = 'bg-[url("https://image.slidesdocs.com/responsive-images/background/sleek-onyx-patterns-a-stylish-and-refined-texture-powerpoint-background_f4c1a14a08__960_540.jpg")]';
        break;
      case 'natural':
        bgClass = 'bg-[url("https://img.freepik.com/fotos-premium/textura-hojas-verdes-fondo-naturaleza_625816-186.jpg")]';
        break;
      case 'retro':
        bgClass = 'bg-[url("https://static.vecteezy.com/system/resources/thumbnails/011/642/463/original/colorful-neon-raining-particles-abstract-animation-particle-background-speedy-futuristic-laser-space-technology-cyber-animation-effect-illustration-free-video.jpg")]';
        break;
      case 'gradient':
        bgClass = 'bg-[url("https://wallpapers.com/images/hd/dark-gradient-f28kcnkpm1rg5of0.jpg")]';
        break;
      default:
        bgClass = 'bg-gradient-to-br from-gray-900 to-gray-800';
    }

    return {
      filter: `brightness(${brightness})`,
      className: `min-h-screen ${isFullscreen ? 'bg-black' : bgClass} text-white`
    };
  };

  if (showClock) {
    return (
      <Clock
        onClose={() => setShowClock(false)}
        clockStyle={clockStyle}
        setClockStyle={setClockStyle}
      />
    );
  }

  if (showVideo && currentItem.type === 'video') {
    return (
      <VideoPlayer
        videoUrl={currentItem.url}
        onClose={() => setShowVideo(false)}
        volume={settings.volume}
      />
    );
  }

  if (showSettings) {
    return (
      <Settings
        settings={settings}
        onSettingsChange={setSettings}
        onClose={() => setShowSettings(false)}
        onAutoPlayToggle={() => setIsAutoPlaying(!isAutoPlaying)}
        isAutoPlaying={isAutoPlaying}
      />
    );
  }

  if (showThemes) {
    return (
      <ThemeSelector
        currentTheme={settings.theme}
        onThemeSelect={(theme) => {
          setSettings({ ...settings, theme });
          setShowThemes(false);
        }}
        onClose={() => setShowThemes(false)}
      />
    );
  }

  const bgStyle = getBackgroundStyle();

  const shouldDisableNavigation = showControls || isEditing || showDescription;

  return (
    <div style={bgStyle} className={`${bgStyle.className} pb-20`}>
      <div className={`h-screen ${isFullscreen ? 'p-0' : 'p-4'}`}>
        {showControls && !isFullscreen && (
          <TopBar
            onClockClick={() => setShowClock(true)}
            onSettingsClick={() => setShowSettings(true)}
            onThemeClick={() => setShowThemes(true)}
            onInfoClick={() => setShowDescription(!showDescription)}
            onCameraClick={onCameraClick}
            isAutoPlaying={isAutoPlaying}
            onAutoPlayToggle={onAutoPlayToggle}
          />
        )}

        <div className={`relative h-full ${isFullscreen ? 'w-screen' : 'rounded-xl'} overflow-hidden bg-black shadow-2xl`}>
          <NavigationArrows 
            onPrevious={previousItem} 
            onNext={nextItem}
            disabled={shouldDisableNavigation}
          />

          <TransformWrapper>
              <TransformComponent>
                <div className={`fade-transition ${currentIndex === mediaItems.indexOf(currentItem) ? 'show' : ''}`}>
                  {currentItem.type === 'photo' ? (
                    <img
                      src={currentItem.url}
                      alt={currentItem.description}
                      className="w-full h-full object-cover cursor-pointer"
                      onClick={handleVideoClick}
                      style={{ filter: `brightness(${settings.brightness / 100})` }}
                    />
                  ) : (
                    <div
                      className="w-full h-full flex items-center justify-center cursor-pointer"
                      onClick={handleVideoClick}
                    >
                      <img
                        src={currentItem.url + '?thumb'}
                        alt={currentItem.description}
                        className="w-full h-full object-cover"
                        style={{ filter: `brightness(${settings.brightness / 100})` }}
                      />
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <div className="bg-white/20 p-6 rounded-full">
                          <div className="w-0 h-0 border-t-[30px] border-t-transparent border-l-[50px] border-l-white border-b-[30px] border-b-transparent ml-4" />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </TransformComponent>
            </TransformWrapper>

          <button
            onClick={() => setShowControls(!showControls)}
            className="absolute top-4 left-4 p-2 bg-black/50 hover:bg-black/70 rounded-full transition-colors z-50"
          >
            <Menu className="w-6 h-6 text-white" />
          </button>

          {showControls && (
            <>
              <button
                onClick={toggleFullscreen}
                className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-black/70 rounded-full transition-colors z-50"
              >
                <Maximize className="w-6 h-6" />
              </button>

              {showDescription && !isEditing && (
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 z-50">
                  <div className="flex justify-between items-start">
                    <div>
                      {/* Título de la descripción con mayor tamaño */}
                      <h3 className="text-xl font-semibold mb-4">{currentItem.description}</h3>
                      
                      <div className="flex justify-between text-xl text-white mt-4">
                        {/* Fecha y ubicación con más espacio entre ellas */}
                        <span>{currentItem.date}</span>
                        <span className="ml-12">{"/           " + currentItem.location}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => setIsEditing(true)}
                      className="p-2 bg-gray-800/50 hover:bg-gray-700 rounded-full transition-colors"
                    >
                      <Edit2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              )}

              {isEditing && (
                <EditDescription
                  currentDescription={currentItem.description}
                  onSave={handleDescriptionSave}
                  onClose={() => setIsEditing(false)}
                />
              )}

              {showCameraOverlay && (
                <CameraOverlay onClose={() => setShowCameraOverlay(false)} />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}