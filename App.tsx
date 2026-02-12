
import React, { useState, useCallback } from 'react';
import LogoUploader from './components/LogoUploader';
import ProductSelector from './components/ProductSelector';
import EditToolbar from './components/EditToolbar';
import { Product, AppState, MockupHistory } from './types';
import { geminiService } from './services/geminiService';

const App: React.FC = () => {
  const [logo, setLogo] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [currentMockup, setCurrentMockup] = useState<string | null>(null);
  const [status, setStatus] = useState<AppState>(AppState.IDLE);
  const [history, setHistory] = useState<MockupHistory[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleLogoUpload = (base64: string) => {
    setLogo(base64);
  };

  const handleProductSelect = async (product: Product) => {
    if (!logo) {
      setError("Please upload a logo first.");
      return;
    }
    
    setSelectedProduct(product);
    setStatus(AppState.GENERATING);
    setError(null);

    try {
      const result = await geminiService.generateMockup(logo, product.prompt);
      setCurrentMockup(result);
      
      const newEntry: MockupHistory = {
        id: Date.now().toString(),
        url: result,
        timestamp: Date.now(),
        promptUsed: `Initial ${product.name} mockup`
      };
      setHistory(prev => [newEntry, ...prev]);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to generate mockup.");
    } finally {
      setStatus(AppState.IDLE);
    }
  };

  const handleEdit = async (prompt: string) => {
    if (!currentMockup) return;

    setStatus(AppState.EDITING);
    setError(null);

    try {
      const result = await geminiService.editMockup(currentMockup, prompt, logo || undefined);
      setCurrentMockup(result);
      
      const newEntry: MockupHistory = {
        id: Date.now().toString(),
        url: result,
        timestamp: Date.now(),
        promptUsed: prompt
      };
      setHistory(prev => [newEntry, ...prev]);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to edit image.");
    } finally {
      setStatus(AppState.IDLE);
    }
  };

  const handleDownload = () => {
    if (!currentMockup) return;
    const link = document.createElement('a');
    link.href = currentMockup;
    link.download = `mockup-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const isLoading = status === AppState.GENERATING || status === AppState.EDITING;

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
              M
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
              MockupGen AI
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            {currentMockup && (
              <button
                onClick={handleDownload}
                className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-all text-sm shadow-sm"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0L8 8m4-4v12" />
                </svg>
                <span>Export PNG</span>
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Controls Panel */}
          <div className="lg:col-span-4 space-y-6">
            <LogoUploader onLogoUpload={handleLogoUpload} currentLogo={logo} />
            
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <ProductSelector 
                selectedProductId={selectedProduct?.id || null} 
                onSelectProduct={handleProductSelect} 
                disabled={isLoading} 
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 p-4 rounded-xl flex items-start space-x-3 text-red-700">
                <svg className="w-5 h-5 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-sm font-medium">{error}</p>
              </div>
            )}
          </div>

          {/* Preview Panel */}
          <div className="lg:col-span-8 space-y-6">
            <div className="relative bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-200 min-h-[500px] flex flex-col items-center justify-center p-4">
              {isLoading && (
                <div className="absolute inset-0 z-20 bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center">
                  <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mb-4"></div>
                  <p className="text-indigo-900 font-bold animate-pulse">
                    {status === AppState.GENERATING ? 'Crafting your mockup...' : 'Applying AI magic...'}
                  </p>
                  <p className="text-slate-500 text-sm mt-2">Gemini 2.5 is processing your image</p>
                </div>
              )}

              {currentMockup ? (
                <div className="w-full flex flex-col items-center">
                   <div className="w-full h-full max-h-[700px] rounded-2xl overflow-hidden shadow-inner bg-slate-100 flex items-center justify-center">
                     <img 
                        src={currentMockup} 
                        alt="Active Mockup" 
                        className="max-w-full max-h-full object-contain transition-all duration-700 ease-in-out"
                      />
                   </div>
                </div>
              ) : (
                <div className="text-center p-12 max-w-md">
                  <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-12 h-12 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-slate-800 mb-2">Visualize Your Brand</h2>
                  <p className="text-slate-500">Upload a logo and select a product to see the magic happen instantly.</p>
                </div>
              )}
            </div>

            {currentMockup && (
              <EditToolbar onEdit={handleEdit} isEditing={isLoading} disabled={!currentMockup} />
            )}

            {/* History Strip */}
            {history.length > 1 && (
              <div className="space-y-3">
                <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Version History</h4>
                <div className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide">
                  {history.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setCurrentMockup(item.url)}
                      className={`relative flex-shrink-0 w-32 aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                        currentMockup === item.url ? 'border-indigo-600 ring-2 ring-indigo-200' : 'border-white hover:border-slate-300'
                      }`}
                    >
                      <img src={item.url} alt="History thumbnail" className="w-full h-full object-cover" />
                      <div className="absolute inset-x-0 bottom-0 bg-black/60 p-1">
                        <p className="text-[8px] text-white truncate text-center font-medium">{item.promptUsed}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer / Mobile Nav placeholder */}
      <footer className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md border-t border-slate-200 py-3 text-center text-xs text-slate-400 sm:hidden">
        Powered by Gemini 2.5 Flash Image
      </footer>
    </div>
  );
};

export default App;
