import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus } from 'lucide-react';
import { Product } from '../App';

interface NewInPageProps {
  onProductClick: (product: Product) => void;
}

const NewInPage: React.FC<NewInPageProps> = ({ onProductClick }) => {
  const [viewMode, setViewMode] = useState(4);
  const [activeFilter, setActiveFilter] = useState('VIEW ALL');
  const [sortBy, setSortBy] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const navigate = useNavigate();

  const filters = ['VIEW ALL', 'DRESSES', 'TOPS', 'JEANS', 'JACKETS'];

  // Sample new in products data
  const newInProducts: Product[] = [
    {
      id: 'new1',
      name: 'LONG POPLIN JUMPSUIT',
      price: 73.90,
      image: '/LONG POPLIN JUMPSUIT.jpg',
      images: ['/LONG POPLIN JUMPSUIT.jpg'],
      category: 'Woman',
      sizes: ['XS', 'S', 'M', 'L'],
      colors: ['Brown'],
      description: 'Sleeveless poplin jumpsuit with button-down front and belted waist.',
      isBestSeller: false
    },
    {
      id: 'new2',
      name: 'BELTED MIDI DRESS',
      price: 73.90,
      image: '/BELTED MIDI DRESS.jpg',
      images: ['/BELTED MIDI DRESS.jpg'],
      category: 'Woman',
      sizes: ['XS', 'S', 'M', 'L'],
      colors: ['Olive'],
      description: 'Midi dress with wide straps and a large belt buckle.',
      isBestSeller: false
    },
    {
      id: 'new3',
      name: 'POLO COLLAR MIDI DRESS',
      price: 59.90,
      image: '/POLO COLLAR MIDI DRESS.jpg',
      images: ['/POLO COLLAR MIDI DRESS.jpg'],
      category: 'Woman',
      sizes: ['XS', 'S', 'M', 'L'],
      colors: ['Beige'],
      description: 'Fitted polo collar dress with ruched waist and gold buttons.',
      isBestSeller: false
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
    // For now, just log - can be extended to navigate to product detail
    console.log('Product clicked:', product.name);
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
                <h1 className="text-3xl font-light tracking-wide">NEW IN</h1>
                <p className="text-gray-500 mt-1">Latest arrivals for women</p>
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
          {newInProducts.map((product) => (
            <div
              key={product.id}
              className="group cursor-pointer"
              onClick={() => handleProductClick(product)}
            >
              {/* Product Image */}
              <div className="relative overflow-hidden bg-gray-50 mb-4 aspect-[3/4]">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                
                {/* New badge */}
                <div className="absolute top-3 left-3 bg-green-600 text-white text-xs font-medium px-2 py-1 rounded">
                  NEW
                </div>
              </div>

              {/* Product Info */}
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-black group-hover:text-gray-600 transition-colors h-10 leading-tight">
                  {product.name}
                </h3>
                
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-black">
                    ${product.price.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewInPage;