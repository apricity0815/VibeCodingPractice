
import React from 'react';
import { PRODUCTS } from '../constants';
import { Product } from '../types';

interface ProductSelectorProps {
  selectedProductId: string | null;
  onSelectProduct: (product: Product) => void;
  disabled: boolean;
}

const ProductSelector: React.FC<ProductSelectorProps> = ({ selectedProductId, onSelectProduct, disabled }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-slate-800">2. Select Product</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {PRODUCTS.map((product) => (
          <button
            key={product.id}
            disabled={disabled}
            onClick={() => onSelectProduct(product)}
            className={`flex flex-col items-center p-3 rounded-xl border-2 transition-all ${
              selectedProductId === product.id 
                ? 'border-indigo-600 bg-indigo-50 shadow-md' 
                : 'border-white bg-white hover:border-slate-200'
            } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
          >
            <img src={product.thumbnail} alt={product.name} className="w-full aspect-square object-cover rounded-lg mb-2 shadow-sm" />
            <span className="text-xs font-bold text-slate-700 uppercase tracking-tight">{product.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductSelector;
