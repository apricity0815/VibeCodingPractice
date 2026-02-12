
import React, { useRef } from 'react';

interface LogoUploaderProps {
  onLogoUpload: (base64: string) => void;
  currentLogo: string | null;
}

const LogoUploader: React.FC<LogoUploaderProps> = ({ onLogoUpload, currentLogo }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onLogoUpload(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerUpload = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col items-center p-6 bg-white rounded-2xl shadow-sm border border-slate-200">
      <h3 className="text-lg font-semibold mb-4 text-slate-800">1. Upload Your Logo</h3>
      <div 
        onClick={triggerUpload}
        className={`w-full h-48 border-2 border-dashed rounded-xl flex flex-col items-center justify-center cursor-pointer transition-all ${
          currentLogo ? 'border-indigo-500 bg-indigo-50' : 'border-slate-300 hover:border-indigo-400 hover:bg-slate-50'
        }`}
      >
        {currentLogo ? (
          <div className="relative group w-full h-full p-4 flex items-center justify-center">
            <img src={currentLogo} alt="Logo Preview" className="max-h-full max-w-full object-contain drop-shadow-md" />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center rounded-xl transition-opacity">
              <span className="text-white font-medium text-sm">Replace Logo</span>
            </div>
          </div>
        ) : (
          <div className="text-center p-6">
            <svg className="mx-auto h-12 w-12 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
            <p className="mt-2 text-sm text-slate-600">Click to upload or drag and drop</p>
            <p className="text-xs text-slate-400">PNG, JPG up to 10MB</p>
          </div>
        )}
      </div>
      <input 
        type="file" 
        ref={fileInputRef} 
        className="hidden" 
        accept="image/*" 
        onChange={handleFileChange} 
      />
    </div>
  );
};

export default LogoUploader;
