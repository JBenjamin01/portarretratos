import React, { useState } from 'react';
import { Save, X } from 'lucide-react';

interface EditDescriptionProps {
  currentDescription: string;
  onSave: (description: string) => void;
  onClose: () => void;
}

export default function EditDescription({ currentDescription, onSave, onClose }: EditDescriptionProps) {
  const [description, setDescription] = useState(currentDescription);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(description);
    onClose();
  };

  return (
    <div className="absolute bottom-0 left-0 right-0 bg-black/90 p-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full bg-gray-800 text-white rounded-lg p-4 text-lg focus:ring-2 focus:ring-blue-500 outline-none"
          rows={5}
          placeholder="Ingresa una descripción para la foto..."
        />
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-3 flex items-center space-x-2 bg-red-500 hover:bg-gray-600 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
            <span className="text-lg">Cancel</span>
          </button>
          <button
            type="submit"
            className="px-6 py-3 flex items-center space-x-2 bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors"
          >
            <Save className="w-5 h-5" />
            <span className="text-lg">Save</span>
          </button>
        </div>
      </form>
    </div>
  );
}
