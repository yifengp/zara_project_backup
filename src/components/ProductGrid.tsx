import React, { useState } from 'react';
import ProductCard from './ProductCard';
import { Product } from '../App';

interface ProductGridProps {
  products: Product[];
  onProductClick: (product: Product) => void;
  activeCategory: string;
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, onProductClick, activeCategory }) => {
  const [activeFilter, setActiveFilter] = useState('All');
  
  const filters = ['All', 'Woman', 'Man', 'Kids', 'Home'];
  
  const getFilteredProducts = () => {
    let filtered = products.filter(product => product.isBestSeller);
    
    if (activeFilter !== 'All') {
      filtered = filtered.filter(product => product.category === activeFilter);
    }
    
    return filtered;
  };

  const filteredProducts = getFilteredProducts();

  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light mb-6 tracking-tight">BEST SELLERS</h2>
          <p className="text-gray-600 text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed">
            Discover our most popular pieces that define contemporary style
          </p>
        </div>
        
        {/* Filter buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-8 py-3 text-sm font-medium tracking-wide transition-all duration-300 rounded-full ${
                activeFilter === filter
                  ? 'bg-black text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {filter === 'All' ? 'ALL' : filter.toUpperCase()}
            </button>
          ))}
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="group cursor-default"
            >
              <div className="relative overflow-hidden bg-gray-50 mb-6 rounded-2xl">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-80 md:h-96 object-cover"
                />
              </div>
              
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                    <h3 className="text-sm font-medium text-black group-hover:text-gray-600 transition-colors h-10 leading-tight">
                      {product.name}
                    </h3>
                  </div>
                
                <div className="flex items-center gap-2">
                  {product.originalPrice ? (
                    <>
                      <span className="text-sm font-medium text-black">
                        ${product.price.toFixed(2)}
                      </span>
                      <span className="text-sm text-gray-400 line-through">
                        ${product.originalPrice.toFixed(2)}
                      </span>
                    </>
                  ) : (
                    <span className="text-sm font-medium text-black">
                      ${product.price.toFixed(2)}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
          {filteredProducts.length === 0 && (
            <p className="text-gray-500 text-lg">No products found for the selected filter.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;