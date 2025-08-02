import React from 'react';
import { useNavigate } from 'react-router-dom';
import { X, ShoppingBag } from 'lucide-react';
import { Product, CartItem } from '../App';

interface AddToCartOverlayProps {
  isVisible: boolean;
  onClose: () => void;
  addedProduct: Product | null;
  selectedSize: string;
  selectedColor: string;
  quantity: number;
  cartItems: CartItem[];
  onGoToCart: () => void;
  relatedProducts: Product[];
  onProductClick: (product: Product) => void;
}

const AddToCartOverlay: React.FC<AddToCartOverlayProps> = ({
  isVisible,
  onClose,
  addedProduct,
  selectedSize,
  selectedColor,
  quantity,
  cartItems,
  onGoToCart,
  relatedProducts,
  onProductClick
}) => {
  const navigate = useNavigate();

  if (!isVisible || !addedProduct) return null;

  const cartTotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const handleProductClick = (product: Product) => {
    if (product.id === 'asymmetric1') {
      onClose();
      navigate('/asymmetric-dress');
    } else if (product.id === 'best6') {
      onClose();
      navigate('/flowy-dress');
    } else {
      onProductClick(product);
    }
  };
  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Background overlay */}
      <div 
        className="flex-1 bg-black bg-opacity-30 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Overlay panel */}
      <div className="w-96 bg-white h-full overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium tracking-wide">ADDED TO YOUR CART</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-50 rounded-full transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Added product */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex gap-4">
            <div className="w-20 h-24 bg-gray-50 rounded-lg overflow-hidden flex-shrink-0">
              <img
                src={addedProduct.image}
                alt={addedProduct.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-medium text-black mb-1 leading-tight">
                {addedProduct.name}
              </h3>
              <div className="text-xs text-gray-500 mb-2">
                {selectedColor.toUpperCase()} | {addedProduct.id}/221/406
              </div>
              <div className="text-xs text-gray-500 mb-2">
                Size: {selectedSize} | Qty: {quantity}
              </div>
              <div className="text-sm font-medium text-black">
                ${(addedProduct.price * quantity).toFixed(2)}
              </div>
            </div>
          </div>
        </div>

        {/* Cart summary */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-gray-600">
              Total ({cartItemCount} {cartItemCount === 1 ? 'item' : 'items'})
            </span>
            <span className="text-lg font-medium text-black">
              ${cartTotal.toFixed(2)}
            </span>
          </div>
          
          <button
            onClick={onGoToCart}
            className="w-full bg-black text-white py-3 text-sm font-medium tracking-wide hover:bg-gray-800 transition-colors"
          >
            VIEW SHOPPING CART
          </button>
        </div>

        {/* You might like section */}
        <div className="p-6">
          <h3 className="text-sm font-medium text-black mb-4 tracking-wide">
            YOU MIGHT LIKE
          </h3>
          
          <div className="grid grid-cols-2 gap-4">
            {relatedProducts.slice(0, 2).map((product) => (
              <div
                key={product.id}
                className="cursor-pointer group"
                onClick={() => handleProductClick(product)}
              >
                <div className="aspect-[3/4] bg-gray-50 rounded-lg overflow-hidden mb-2">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                    loading="lazy"
                  />
                </div>
                <h4 className="text-xs font-medium text-black mb-1 leading-tight line-clamp-2">
                  {product.name}
                </h4>
                <div className="text-xs font-medium text-black">
                  ${product.price.toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddToCartOverlay;