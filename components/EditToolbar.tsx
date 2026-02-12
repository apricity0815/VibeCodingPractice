
import React, { useState } from 'react';

interface EditToolbarProps {
  onEdit: (prompt: string) => void;
  isEditing: boolean;
  disabled: boolean;
}

const EditToolbar: React.FC<EditToolbarProps> = ({ onEdit, isEditing, disabled }) => {
  const [prompt, setPrompt] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim()) {
      onEdit(prompt);
      setPrompt('');
    }
  };

  const suggestions = [
    "Make the background a modern cafe",
    "Change the product color to forest green",
    "Add a vintage film grain effect",
    "Change lighting to sunset golden hour"
  ];

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
      <h3 className="text-lg font-semibold text-slate-800">AI Enhancement</h3>
      <form onSubmit={handleSubmit} className="relative">
        <input
          type="text"
          value={prompt}
          disabled={disabled || isEditing}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe any changes... e.g., 'Make it look vintage'"
          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl pr-24 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={disabled || isEditing || !prompt.trim()}
          className="absolute right-2 top-1.5 bottom-1.5 px-4 bg-indigo-600 text-white text-sm font-semibold rounded-lg hover:bg-indigo-700 transition-colors disabled:bg-slate-300"
        >
          {isEditing ? (
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Processing...</span>
            </div>
          ) : 'Apply'}
        </button>
      </form>
      
      <div className="flex flex-wrap gap-2">
        {suggestions.map((suggestion) => (
          <button
            key={suggestion}
            type="button"
            disabled={disabled || isEditing}
            onClick={() => onEdit(suggestion)}
            className="text-xs px-3 py-1.5 bg-slate-100 text-slate-600 rounded-full hover:bg-indigo-50 hover:text-indigo-600 transition-colors disabled:opacity-50"
          >
            {suggestion}
          </button>
        ))}
      </div>
    </div>
  );
};

export default EditToolbar;
