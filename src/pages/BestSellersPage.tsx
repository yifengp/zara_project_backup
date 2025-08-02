import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus } from 'lucide-react';
import { Product } from '../App';

interface BestSellersPageProps {
  onProductClick: (product: Product) => void;
}

const BestSellersPage: React.FC<BestSellersPageProps> = ({ onProductClick }) => {
  const [viewMode, setViewMode] = useState(4);
  const [activeFilter, setActiveFilter] = useState('VIEW ALL');
  const [sortBy, setSortBy] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedColors, setSelectedColors] = useState<{ [productId: string]: string }>({});
  const navigate = useNavigate();

  const filters = ['VIEW ALL', 'JACKETS', 'DRESSES', 'JEANS'];

  // Sample best sellers products data
  const bestSellersProducts: Product[] = [
    {
      id: 'best1',
      name: 'SEQUIN MINI SKIRT',
      price: 65.90,
      image: '/SEQUIN MINI Skirt copy copy.jpg',
      images: [
        '/SEQUIN MINI Skirt copy copy.jpg', // blue
        '/SEQUIN MINI Skirt copy.jpg',      // red
        '/SEQUIN MINI Skirt.jpg'            // yellow
      ],
      colors: [
        { name: 'Blue', value: 'blue', image: '/SEQUIN MINI Skirt copy copy.jpg' },
        { name: 'Red', value: 'red', image: '/SEQUIN MINI Skirt copy.jpg' },
        { name: 'Yellow', value: 'yellow', image: '/SEQUIN MINI Skirt.jpg' }
      ],
      category: 'Woman',
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      description: 'Sequin mini skirt with shimmering finish. Perfect for special occasions.',
      isBestSeller: true
    },
    {
      id: 'best2',
      name: 'ZW COLLECTION ASYMMETRIC LACE DRESS',
      price: 99.90,
      image: '/ZW COLLECTION ASYMMETRIC LACE DRESS copy.jpg',
      images: ['/ZW COLLECTION ASYMMETRIC LACE DRESS copy.jpg'],
      category: 'Woman',
      sizes: ['XS', 'S', 'M', 'L'],
      colors: ['Teal', 'Pink', 'Beige', 'Brown'],
      description: 'Trendy crop top perfect for layering.',
      isBestSeller: true
    },
    {
      id: 'best3',
      name: 'ASYMMETRIC CUT OUT LINEN MIDI DRESS',
      price: 65.90,
      image: '/ASYMMETRIC CUT OUT LINEN MIDI DRESS 65.90.jpg',
      images: ['/ASYMMETRIC CUT OUT LINEN MIDI DRESS 65.90.jpg'],
      category: 'Woman',
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      colors: ['Light Grey', 'Navy', 'Black', 'Brown'],
      description: 'Classic v-neck t-shirt in soft cotton.',
      isBestSeller: true
    },
    {
      id: 'best4',
      name: 'ZW COLLECTION LACE CAMISOLE TOP',
      price: 69.90,
      image: '/ZW COLLECTION LACE CAMISOLE TOP.jpg',
      images: ['/ZW COLLECTION LACE CAMISOLE TOP.jpg'],
      category: 'Woman',
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      colors: ['Light Grey', 'Navy', 'Black', 'Brown'],
      description: 'Linen blend straight pants with comfortable fit.',
      isBestSeller: true
    },
    {
      id: 'best5',
      name: 'LINEN BLEND STRAIGHT PANTS',
      price: 59.90,
      image: '/LINEN BLEND STRAIGHT PANTS.jpg',
      images: ['/LINEN BLEND STRAIGHT PANTS.jpg'],
      category: 'Woman',
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      colors: ['Light Grey', 'Navy', 'Black', 'Brown'],
      description: 'Linen blend straight pants with comfortable fit.',
      isBestSeller: true
    },
    {
      id: 'best6',
      name: 'FLOWY ELASTIC MIDI DRESS',
      price: 65.90,
      image: '/FLOWY ELASTIC MIDI DRESS.jpg',
      images: ['/FLOWY ELASTIC MIDI DRESS.jpg'],
      category: 'Woman',
      sizes: ['S', 'M', 'L', 'XL'],
      colors: ['Black'],
      description: 'Oversized shirt with relaxed fit.',
      isBestSeller: true
    }
  ];

  const getGridCols = () => {
    switch (viewMode) {
      case 6: return 'grid-cols-2 md:grid-cols-3 lg:grid-cols-6';
      case 4: return 'grid-cols-2 md:grid-cols-4';
      default: return 'grid-cols-2 md:grid-cols-4';
    }
  };

  const handleProductClick = (product: Product) => {
    if (product.id === 'best1') {
      navigate(`/product/${product.id}`);
    } else if (product.id === 'best3') {
      navigate('/asymmetric-dress');
    } else if (product.id === 'best6') {
      navigate('/flowy-dress');
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link 
                to="/"
                className="p-3 hover:bg-gray-50 rounded-full transition-colors"
              >
                <ArrowLeft size={24} />
              </Link>
              <div>
                <h1 className="text-3xl font-light tracking-wide">BEST SELLERS</h1>
                <p className="text-gray-500 mt-1">Most popular items for women</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Controls Bar */}
      <div className="bg-white border-b border-gray-100 sticky top-[88px] z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Left side - View and Filters */}
            <div className="flex items-center gap-6">
              {/* View Mode */}
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-gray-700">VIEW:</span>
                <button
                  onClick={() => setViewMode(4)}
                  className={`px-3 py-1 text-sm font-medium transition-colors ${
                    viewMode === 4 ? 'bg-black text-white' : 'text-gray-600 hover:text-black'
                  }`}
                >
                  4
                </button>
                <button
                  onClick={() => setViewMode(6)}
                  className={`px-3 py-1 text-sm font-medium transition-colors ${
                    viewMode === 6 ? 'bg-black text-white' : 'text-gray-600 hover:text-black'
                  }`}
                >
                  6
                </button>
              </div>

              {/* Category Filters */}
              <div className="hidden md:flex items-center gap-1">
                {filters.map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    className={`px-4 py-2 text-sm font-medium transition-colors ${
                      activeFilter === filter
                        ? 'text-black border-b-2 border-black'
                        : 'text-gray-600 hover:text-black'
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>

            {/* Right side - Sort and Filters */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 hover:text-black transition-colors"
              >
                <Plus size={16} />
                SORT BY
              </button>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 hover:text-black transition-colors"
              >
                <Plus size={16} />
                FILTERS
              </button>
            </div>
          </div>

          {/* Mobile Filters */}
          <div className="md:hidden mt-4 flex gap-2 overflow-x-auto">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors ${
                  activeFilter === filter
                    ? 'bg-black text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className={`grid ${getGridCols()} gap-6`}>
          {bestSellersProducts.map((product) => {
            const currentColor = selectedColors[product.id] || (product.colors && product.colors[0]?.value);
            const currentColorObj = product.colors?.find(c => c.value === currentColor);
            return (
              <div
                key={product.id}
                className="group cursor-pointer"
                onClick={() => handleProductClick(product)}
              >
                {/* Product Image */}
                <div className="relative overflow-hidden bg-gray-50 mb-4 aspect-[3/4]">
                  <img
                    src={currentColorObj ? currentColorObj.image : product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Sale badge */}
                  {product.originalPrice && (
                    <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-medium px-2 py-1 rounded">
                      SALE
                    </div>
                  )}
                </div>

                {/* Color Buttons */}
                {product.colors && (
                  <div className="flex gap-2 mb-2">
                    {product.colors.map((color) => (
                      <button
                        key={color.value}
                        onClick={e => {
                          e.stopPropagation();
                          setSelectedColors((prev) => ({ ...prev, [product.id]: color.value }));
                        }}
                        className={`w-6 h-6 rounded-full border-2 ${currentColor === color.value ? 'border-black' : 'border-gray-300'}`}
                        style={{ backgroundColor: color.value }}
                        aria-label={color.name}
                      />
                    ))}
                  </div>
                )}

                {/* Product Info */}
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-black group-hover:text-gray-600 transition-colors h-10 leading-tight">
                    {product.name}
                  </h3>
                  
                  <div className="flex items-center gap-3">
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
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BestSellersPage;