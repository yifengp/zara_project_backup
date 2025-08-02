import React, { useState } from 'react';
import { Eye } from 'lucide-react';
import { Product } from '../App';

interface ProductCardProps {
  product: Product;
  onClick: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <div className="relative overflow-hidden bg-gray-50 mb-6 rounded-2xl">
        {/* Action buttons */}
        <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
          {isHovered && (
            <button className="w-10 h-10 bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-white rounded-full flex items-center justify-center transition-all duration-300 transform translate-y-0 opacity-100">
              <Eye size={16} />
            </button>
          )}
        </div>

        <img
          src={product.image}
          alt={product.name}
          className="w-full h-80 md:h-96 object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Hover overlay */}
        <div className={`absolute inset-0 bg-black transition-all duration-300 flex items-end justify-center pb-8 ${
          isHovered ? 'bg-opacity-20' : 'bg-opacity-0'
        }`}>
          {isHovered && (
            <button className="bg-white text-black px-8 py-3 text-sm font-medium hover:bg-gray-100 transition-all duration-300 transform translate-y-0 opacity-100 rounded-lg shadow-lg">
              QUICK VIEW
            </button>
          )}
        </div>
      </div>
      
      <div className="space-y-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-lg font-medium text-black group-hover:text-gray-600 transition-colors leading-tight">
              {product.name}
            </h3>
            <p className="text-gray-500 text-sm mt-1 tracking-wide">{product.category}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <p className="text-xl font-medium text-black">
            ${product.price.toFixed(2)}
          </p>
          {product.originalPrice && (
            <p className="text-lg text-gray-400 line-through">
              ${product.originalPrice.toFixed(2)}
            </p>
          )}
        </div>
        
        {/* Color options preview */}
        <div className="flex gap-2 mt-3">
          {product.colors.slice(0, 3).map((color, index) => (
            <div
              key={index}
              className={`w-4 h-4 rounded-full border-2 border-gray-200 ${
                color.toLowerCase() === 'black' ? 'bg-black' :
                color.toLowerCase() === 'white' ? 'bg-white' :
                color.toLowerCase() === 'navy' ? 'bg-blue-900' :
                color.toLowerCase() === 'beige' ? 'bg-amber-100' :
                color.toLowerCase() === 'camel' ? 'bg-amber-200' :
                color.toLowerCase() === 'grey' || color.toLowerCase() === 'gray' ? 'bg-gray-400' :
                color.toLowerCase() === 'light blue' ? 'bg-blue-300' :
                color.toLowerCase() === 'dark blue' ? 'bg-blue-800' :
                color.toLowerCase() === 'pink' ? 'bg-pink-300' :
                color.toLowerCase() === 'yellow' ? 'bg-yellow-300' :
                color.toLowerCase() === 'red' ? 'bg-red-500' :
                color.toLowerCase() === 'burgundy' ? 'bg-red-800' :
                color.toLowerCase() === 'charcoal' ? 'bg-gray-700' :
                color.toLowerCase() === 'tan' ? 'bg-amber-600' :
                color.toLowerCase() === 'cognac' ? 'bg-amber-700' :
                color.toLowerCase() === 'olive' ? 'bg-green-600' :
                color.toLowerCase() === 'terracotta' ? 'bg-orange-600' :
                color.toLowerCase() === 'cream' ? 'bg-yellow-50' :
                'bg-gray-300'
              }`}
              title={color}
            />
          ))}
          {product.colors.length > 3 && (
            <span className="text-xs text-gray-500 ml-1">+{product.colors.length - 3}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;