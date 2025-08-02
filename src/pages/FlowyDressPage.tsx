import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Share2, Heart } from 'lucide-react';
import { Product, CartItem } from '../App';
import AddToCartOverlay from '../components/AddToCartOverlay';

interface FlowyDressPageProps {
  onAddToCart: (product: Product, size: string, color: string, quantity: number) => void;
}

const FlowyDressPage: React.FC<FlowyDressPageProps> = ({ onAddToCart }) => {
  const navigate = useNavigate();
  const [showSizeSelection, setShowSizeSelection] = useState(false);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [showAddToCartOverlay, setShowAddToCartOverlay] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [hasAddedToCart, setHasAddedToCart] = useState(false);

  // Product data for FLOWY ELASTIC MIDI DRESS
  const product: Product = {
    id: 'best6',
    name: 'FLOWY ELASTIC MIDI DRESS',
    price: 65.90,
    image: '/FLOWY ELASTIC MIDI DRESS.jpg',
    images: [
      '/FLOWY ELASTIC MIDI DRESS.jpg',
      '/FLOWY ELASTIC MIDI DRESS.jpg'
    ],
    category: 'Woman',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Black'],
    description: 'Flowy midi dress with elastic waist. Features a relaxed fit with comfortable stretch fabric perfect for everyday wear. The midi length creates an elegant silhouette.',
    isBestSeller: true
  };

  // Set default selections
  React.useEffect(() => {
    if (!selectedSize) {
      setSelectedSize('');
    }
    if (!selectedColor) {
      setSelectedColor('Black');
    }
  }, [selectedSize, selectedColor]);

  const handleAddToCart = () => {
    if (!showSizeSelection) {
      setShowSizeSelection(true);
    } else if (selectedSize && selectedColor) {
      onAddToCart(product, selectedSize, selectedColor, quantity);
      
      // Update local cart items for overlay display
      const newItem: CartItem = {
        id: Date.now().toString(),
        productId: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        size: selectedSize,
        color: selectedColor,
        quantity
      };
      setCartItems(prev => [...prev, newItem]);
      setShowAddToCartOverlay(true);
      setHasAddedToCart(true);
    }
  };

  const handleCloseOverlay = () => {
    setShowAddToCartOverlay(false);
  };

  const handleGoToCart = () => {
    setShowAddToCartOverlay(false);
    navigate('/cart');
  };

  const getRelatedProducts = () => {
    const relatedProducts: Product[] = [
      {
        id: 'best1',
        name: 'SEQUIN MINI SKIRT',
        price: 65.90,
        image: '/SEQUIN MINI Skirt.jpg',
        images: ['/SEQUIN MINI Skirt.jpg'],
        category: 'Woman',
        sizes: ['XS', 'S', 'M', 'L', 'XL'],
        colors: ['Light Blue', 'Silver', 'Navy'],
        description: 'Sequin mini skirt with shimmering finish.',
        isBestSeller: true
      },
      {
        id: 'asymmetric2',
        name: 'ASYMMETRIC CUT OUT LINEN MIDI DRESS',
        price: 65.90,
        image: '/ASYMMETRIC CUT OUT LINEN MIDI DRESS 65.90.jpg',
        images: ['/ASYMMETRIC CUT OUT LINEN MIDI DRESS 65.90.jpg'],
        category: 'Woman',
        sizes: ['XS', 'S', 'M', 'L', 'XL'],
        colors: ['Black'],
        description: 'Asymmetric linen midi dress with cut-out details.',
        isBestSeller: false
      }
    ];
    return relatedProducts;
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Product content */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[calc(100vh-80px)]">
          {/* Left side - Product image */}
          <div className="bg-white flex items-center justify-center p-8">
            <div className="w-full max-w-2xl">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-auto object-contain max-h-[85vh]"
              />
            </div>
          </div>

          {/* Right side - Product details */}
          <div className="p-8 lg:p-12 flex flex-col">
            {/* Back button */}
            <div className="mb-6">
              <Link 
                to="/best-sellers"
                className="inline-flex items-center gap-2 text-gray-600 hover:text-black transition-colors"
              >
                <ArrowLeft size={20} />
                <span className="text-sm tracking-wide">BACK</span>
              </Link>
            </div>
            
            <div className="flex-1">
              {/* Product title and price */}
              <div className="mb-8">
                <div className="flex items-start justify-between mb-4">
                  <h1 className="text-2xl font-light tracking-wide">{product.name}</h1>
                  <button className="p-2 hover:bg-gray-50 rounded-full">
                    <Heart size={20} />
                  </button>
                </div>
                <div className="text-2xl font-light mb-6">${product.price.toFixed(2)}</div>
                <hr className="border-gray-200" />
              </div>

              {/* Color and SKU */}
              <div className="mb-8">
                <div className="text-sm text-gray-600 tracking-wide">
                  {selectedColor.toUpperCase()} | 3152/268/800
                </div>
              </div>

              {/* Size selection - only show after ADD is clicked */}
              {showSizeSelection && (
                <div className="mb-8">
                  <h3 className="text-sm font-medium mb-4 tracking-wide">SIZE</h3>
                  <div className="border border-gray-300 p-4">
                    <div className="space-y-0">
                      {product.sizes.map((size) => (
                        <div
                          key={size}
                          className="flex items-center justify-between py-3 border-b border-gray-200 last:border-b-0"
                        >
                          <button
                            onClick={() => setSelectedSize(size)}
                            className={`text-sm transition-all ${
                              selectedSize === size 
                                ? 'text-black font-bold' 
                                : 'text-black hover:text-gray-600 font-normal'
                            }`}
                          >
                            {size}
                          </button>
                          <div className="flex items-center gap-2 text-xs">
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-3 pt-3 border-t border-gray-200">
                      <button className="text-xs text-black hover:underline">
                        SIZE RECOMMENDER
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Add to cart button - changes text based on state */}
              <button
                onClick={handleAddToCart}
                className="w-full bg-black text-white py-4 text-sm font-medium tracking-wide hover:bg-gray-800 transition-colors mb-8"
              >
                {!showSizeSelection ? 'ADD' : (selectedSize ? `ADD TO CART - $${(product.price * quantity).toFixed(2)}` : 'SELECT SIZE')}
              </button>

              {/* Complete Order button - shows after adding to cart */}
              {hasAddedToCart && (
                <button
                  onClick={handleGoToCart}
                  className="w-full border border-black text-black py-4 text-sm font-medium tracking-wide hover:bg-gray-50 transition-colors mb-8"
                >
                  COMPLETE ORDER
                </button>
              )}

              {/* Product description */}
              <div className="mb-6">
                <p className="text-sm text-gray-600 leading-relaxed">
                  Midi dress made with viscose yarn. Straight elastic neckline and thin adjustable straps. Draped fabric detail on the chest with elastic.
                </p>
              </div>

              {/* Product details links */}
              <div className="space-y-3 text-sm">
                <button className="block text-left text-gray-600 hover:text-black transition-colors tracking-wide">
                  PRODUCT MEASUREMENTS
                </button>
                <button className="block text-left text-gray-600 hover:text-black transition-colors tracking-wide">
                  COMPOSITION, CARE & ORIGIN
                </button>
                <button className="block text-left text-gray-600 hover:text-black transition-colors tracking-wide">
                  CHECK IN-STORE AVAILABILITY
                </button>
                <button className="block text-left text-gray-600 hover:text-black transition-colors tracking-wide">
                  SHIPPING, EXCHANGES AND RETURNS
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add to Cart Overlay */}
      <AddToCartOverlay
        isVisible={showAddToCartOverlay}
        onClose={handleCloseOverlay}
        addedProduct={product}
        selectedSize={selectedSize}
        selectedColor={selectedColor}
        quantity={quantity}
        cartItems={cartItems}
        onGoToCart={handleGoToCart}
        relatedProducts={getRelatedProducts()}
        onProductClick={(product) => {
          setShowAddToCartOverlay(false);
          navigate(`/product/${product.id}`);
        }}
      />
    </div>
  );
};

export default FlowyDressPage;