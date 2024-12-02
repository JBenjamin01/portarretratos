import React from 'react';
import { X, Check } from 'lucide-react';

interface ThemeSelectorProps {
  currentTheme: string;
  onThemeSelect: (theme: string) => void;
  onClose: () => void;
}

const themes = [
  {
    id: 'default',
    name: 'Defecto',
    preview: 'bg-gray-800',
  },
  {
    id: 'minimal',
    name: 'Minimalista',
    preview: 'bg-black'
  },
  {
    id: 'geometric',
    name: 'Geométrico',
    preview: 'https://png.pngtree.com/thumb_back/fw800/background/20230704/pngtree-abstract-geometric-background-in-black-a-fresh-design-perfect-for-presentations-image_3717055.jpg' // URL para el fondo geométrico
  },
  {
    id: 'texture',
    name: 'Textura',
    preview: 'https://img.pikbest.com/wp/202344/gray-stone-texture-elegant-black-perfect-as-a-wallpaper-or-background_9915971.jpg!w700wp' // URL para la textura
  },
  {
    id: 'patterns',
    name: 'Patrones',
    preview: 'https://image.slidesdocs.com/responsive-images/background/sleek-onyx-patterns-a-stylish-and-refined-texture-powerpoint-background_f4c1a14a08__960_540.jpg' // URL para los patrones
  },
  {
    id: 'natural',
    name: 'Naturaleza',
    preview: 'https://img.freepik.com/fotos-premium/textura-hojas-verdes-fondo-naturaleza_625816-186.jpg' // URL para los patrones
  },
  {
    id: 'retro',
    name: 'Retro',
    preview: 'https://static.vecteezy.com/system/resources/thumbnails/011/642/463/original/colorful-neon-raining-particles-abstract-animation-particle-background-speedy-futuristic-laser-space-technology-cyber-animation-effect-illustration-free-video.jpg' // URL para los patrones
  },
  {
    id: 'gradient',
    name: 'Gradiente',
    preview: 'https://wallpapers.com/images/hd/dark-gradient-f28kcnkpm1rg5of0.jpg'
  }
];

export default function ThemeSelector({ currentTheme, onThemeSelect, onClose }: ThemeSelectorProps) {
  return (
    <div className="fixed inset-0 bg-black/95 text-white p-8 overflow-y-auto">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-semibold">Seleccionar Tema</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-800 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-6">
          {themes.map((theme) => (
            <button
              key={theme.id}
              onClick={() => onThemeSelect(theme.id)}
              className={`relative aspect-video w-full rounded-xl overflow-hidden hover:ring-2 hover:ring-blue-500 transition-all 
                ${theme.preview.startsWith('http') ? '' : theme.preview}`} // Si es URL, no aplicar la clase de fondo, si es color aplicar
              style={theme.preview.startsWith('http') ? {
                backgroundImage: `url(${theme.preview})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              } : {}}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                {currentTheme === theme.id && (
                  <div className="bg-blue-500 rounded-full p-2">
                    <Check className="w-6 h-6" />
                  </div>
                )}
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                <span className="font-medium">{theme.name}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
