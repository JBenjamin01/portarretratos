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
    preview: 'bg-gray-700' // Este sigue teniendo el gradiente como en el ejemplo original.
  },
  {
    id: 'geometric',
    name: 'Geométrico',
    preview: 'https://static8.depositphotos.com/1154062/1071/v/450/depositphotos_10712741-stock-illustration-white-crumpled-abstract-background.jpg' // URL para el fondo geométrico
  },
  {
    id: 'texture',
    name: 'Textura',
    preview: 'https://img.freepik.com/fotos-premium/textura-fondo-papel-blanco_1036998-289261.jpg' // URL para la textura
  },
  {
    id: 'minimal',
    name: 'Minimalista',
    preview: 'bg-black' // Fondo minimalista
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
              className={`relative aspect-video w-full rounded-xl overflow-hidden hover:ring-2 hover:ring-blue-500 transition-all`}
              style={{
                backgroundImage: theme.preview.startsWith('http') ? `url(${theme.preview})` : undefined,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
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
