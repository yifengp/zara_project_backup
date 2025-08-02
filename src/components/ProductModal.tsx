import React, { useState } from 'react';
import { X, Plus, Minus, Share2 } from 'lucide-react';
import { Product } from '../App';

interface ProductModalProps {
  product: Product;
  onClose: () => void;
  onAddToCart: (product: Product, size: string, color: string, quantity: number) => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, onClose, onAddToCart }) => {
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleAddToCart = () => {
    onAddToCart(product, selectedSize, selectedColor, quantity);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-6xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
        <div className="flex h-full">
          {/* Product Images */}
          <div className="flex-1 p-8 bg-gray-50">
            <div className="relative mb-6">
              <img
                src={product.images[currentImageIndex]}
                alt={product.name}
                className="w-full h-96 md:h-[500px] object-cover rounded-2xl"
              />
              <button
                onClick={onClose}
                className="absolute top-6 right-6 bg-white bg-opacity-90 p-3 rounded-full hover:bg-opacity-100 transition-colors shadow-lg"
              >
                <X size={20} />
              </button>
              
              {/* Product badges */}
              <div className="absolute top-6 left-6 flex flex-col gap-2">
                {product.isNew && (
                  <span className="bg-black text-white px-4 py-2 text-xs font-medium rounded-full">
                    NEW
                  </span>
                )}
                {product.isSale && (
                  <span className="bg-red-500 text-white px-4 py-2 text-xs font-medium rounded-full">
                    SALE
                  </span>
                )}
                {product.isBestSeller && (
                  <span className="bg-green-600 text-white px-4 py-2 text-xs font-medium rounded-full">
                    BEST SELLER
                  </span>
                )}
              </div>
            </div>
            
            {/* Image thumbnails */}
            <div className="flex gap-3 justify-center">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-20 h-20 rounded-xl overflow-hidden border-3 transition-all ${
                    currentImageIndex === index ? 'border-black shadow-lg' : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="flex-1 p-8 overflow-y-auto">
            <div className="space-y-8">
              {/* Header */}
              <div>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-3xl font-light mb-2 tracking-wide">{product.name}</h2>
                    <p className="text-gray-500 text-lg">{product.category}</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-3 bg-gray-50 text-gray-500 hover:bg-gray-100 rounded-full transition-colors">
                      <Share2 size={20} />
                    </button>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <p className="text-3xl font-medium text-black">${product.price.toFixed(2)}</p>
                  {product.originalPrice && (
                    <p className="text-xl text-gray-400 line-through">${product.originalPrice.toFixed(2)}</p>
                  )}
                </div>
              </div>

              {/* Description */}
              <div>
                <p className="text-gray-600 leading-relaxed text-lg">{product.description}</p>
              </div>

              {/* Size Selection */}
              <div>
                <h3 className="text-lg font-medium text-black mb-4">Size</h3>
                <div className="grid grid-cols-4 gap-3">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-3 border-2 text-base font-medium transition-all rounded-xl ${
                        selectedSize === size
                          ? 'border-black bg-black text-white shadow-lg'
                          : 'border-gray-200 hover:border-gray-300 bg-white'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Selection */}
              <div>
                <h3 className="text-lg font-medium text-black mb-4">Color</h3>
                <div className="flex gap-3 flex-wrap">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-6 py-3 border-2 text-base font-medium transition-all rounded-xl ${
                        selectedColor === color
                          ? 'border-black bg-black text-white shadow-lg'
                          : 'border-gray-200 hover:border-gray-300 bg-white'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div>
                <h3 className="text-lg font-medium text-black mb-4">Quantity</h3>
                <div className="flex items-center gap-4 bg-gray-50 rounded-xl p-2 w-fit">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-12 h-12 flex items-center justify-center hover:bg-white rounded-lg transition-colors"
                  >
                    <Minus size={18} />
                  </button>
                  <span className="w-12 text-center font-medium text-lg">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-12 h-12 flex items-center justify-center hover:bg-white rounded-lg transition-colors"
                  >
                    <Plus size={18} />
                  </button>
                </div>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                className="w-full bg-black text-white py-4 px-8 text-lg font-medium hover:bg-gray-800 transition-colors rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-transform"
              >
                ADD TO CART - ${(product.price * quantity).toFixed(2)}
              </button>
              
              {/* Additional Info */}
              <div className="text-sm text-gray-500 space-y-2 pt-4 border-t border-gray-100">
                <p>• Free shipping on orders over $50</p>
                <p>• Free returns within 30 days</p>
                <p>• Secure payment with SSL encryption</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;