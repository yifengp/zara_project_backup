import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingBag, Search, User, Menu, X } from 'lucide-react';
import { CartItem } from '../App';

interface HeaderProps {
  cartItems: CartItem[];
  onCartClick: () => void;
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  currentSection?: string;
}

const Header: React.FC<HeaderProps> = ({ cartItems, onCartClick, activeCategory, onCategoryChange, currentSection }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [womanDropdown, setWomanDropdown] = useState(false);
  const [manDropdown, setManDropdown] = useState(false);
  const [kidsDropdown, setKidsDropdown] = useState(false);
  const [homeDropdown, setHomeDropdown] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const categories = {
    Woman: ['NEW IN', 'BEST SELLERS', 'DRESSES | JUMPSUITS', 'MATCHING SETS', 'TOPS | BODYSUITS', 'T-SHIRTS', 'SHIRTS', 'SKIRTS', 'JEANS', 'PANTS', 'SHORTS'],
    Man: ['NEW IN', 'BEST SELLERS', 'VACATION CORE', 'LINEN SHOP', 'SHORTS', 'PANTS', 'SHIRTS', 'T-SHIRTS | TANK TOPS', 'POLO SHIRTS', 'JEANS', 'MATCHING SETS', 'SUITS'],
    Kids: ['NEW IN', 'BEST SELLERS', 'GIRL', 'BOY', 'BABY'],
    Home: ['NEW IN', 'BEST SELLER', 'BED LINEN', 'FURNITURE', 'RUGS', 'LIGHTING', 'MIRRORS', 'DECOR', 'BASKETS', 'THROWS', 'CUSHIONS | INSERTS', 'CURTAINS | BLINDS']
  };

  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const handleCategoryClick = (category: string) => {
    onCategoryChange(category);
    setWomanDropdown(false);
    setManDropdown(false);
    setIsMenuOpen(false);
    navigate('/');
  };

  const handleWomanClick = () => {
    setWomanDropdown(!womanDropdown);
    setManDropdown(false); // Close man dropdown
    setKidsDropdown(false); // Close kids dropdown
    setHomeDropdown(false); // Close home dropdown
  };

  const handleManClick = () => {
    setManDropdown(!manDropdown);
    setWomanDropdown(false); // Close woman dropdown
    setKidsDropdown(false); // Close kids dropdown
    setHomeDropdown(false); // Close home dropdown
  };

  const handleKidsClick = () => {
    setKidsDropdown(!kidsDropdown);
    setWomanDropdown(false); // Close woman dropdown
    setManDropdown(false); // Close man dropdown
    setHomeDropdown(false); // Close home dropdown
  };

  const handleHomeClick = () => {
    setHomeDropdown(!homeDropdown);
    setWomanDropdown(false); // Close woman dropdown
    setManDropdown(false); // Close man dropdown
    setKidsDropdown(false); // Close kids dropdown
  };

  return (
    <header className="bg-white sticky top-0 z-40 shadow-sm">
      {/* Main navigation */}
      <nav className="px-6 py-6">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 hover:bg-gray-50 rounded-lg transition-colors"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Logo */}
          <div className="flex-shrink-0">
            <Link
              to="/"
              className="text-4xl font-bold tracking-tight cursor-pointer select-none"
              style={{ 
                fontFamily: 'Times, "Times New Roman", serif',
                letterSpacing: '-0.02em',
                fontWeight: 700
              }}
            >
              ZARA
            </Link>
          </div>

          {/* Desktop navigation */}
          <div className="hidden lg:flex space-x-8">
            {currentSection ? (
              // Show section-specific navigation
              <div className="flex items-center space-x-8">
                <span className="text-base font-medium text-gray-500 tracking-wide">
                  {currentSection.toUpperCase()}
                </span>
                <div className="flex space-x-6">
                  <Link
                    to="/dresses"
                    className={`text-base font-medium transition-colors py-3 tracking-wide ${
                      location.pathname === '/best-sellers' ? 'text-black border-b-2 border-black' : 'text-gray-600 hover:text-black'
                    }`}
                  >
                    BEST SELLERS
                  </Link>
                  <a href="#" className="text-base font-medium text-gray-600 hover:text-black transition-colors py-3 tracking-wide">
                    NEW IN
                  </a>
                  <a href="#" className="text-base font-medium text-gray-600 hover:text-black transition-colors py-3 tracking-wide">
                    DRESSES | JUMPSUITS
                  </a>
                  <a href="#" className="text-base font-medium text-gray-600 hover:text-black transition-colors py-3 tracking-wide">
                    TOPS | BODYSUITS
                  </a>
                  <a href="#" className="text-base font-medium text-gray-600 hover:text-black transition-colors py-3 tracking-wide">
                    JEANS
                  </a>
                </div>
              </div>
            ) : (
              // Show main category navigation
             <>
            {Object.entries(categories).map(([category, items]) => (
              <div key={category} className="relative group">
                {category === 'Woman' ? (
                  <>
                    <button 
                      className={`text-base font-medium transition-colors py-3 tracking-wide ${
                        activeCategory === category ? 'text-black border-b-2 border-black' : 'text-black hover:text-gray-600'
                      }`}
                      onClick={handleWomanClick}
                    >
                      {category.toUpperCase()}
                    </button>
                  </>
                ) : category === 'Man' ? (
                  <>
                    <button 
                      className={`text-base font-medium transition-colors py-3 tracking-wide ${
                        activeCategory === category ? 'text-black border-b-2 border-black' : 'text-black hover:text-gray-600'
                      }`}
                      onClick={handleManClick}
                    >
                      {category.toUpperCase()}
                    </button>
                  </>
                ) : (
                  <button 
                    className={`text-base font-medium transition-colors py-3 tracking-wide ${
                      activeCategory === category ? 'text-black border-b-2 border-black' : 'text-black hover:text-gray-600'
                    }`}
                    onClick={
                      category === 'Kids' ? handleKidsClick : 
                      category === 'Home' ? handleHomeClick : 
                      () => handleCategoryClick(category)
                    }
                  >
                    {category.toUpperCase()}
                  </button>
                )}
                
                {((category === 'Woman' && womanDropdown) || (category === 'Man' && manDropdown) || (category === 'Kids' && kidsDropdown) || (category === 'Home' && homeDropdown)) && (
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-4 w-64 bg-white shadow-2xl border border-gray-100 rounded-2xl py-6 z-50">
                    <div className="px-6 space-y-3">
                      {items.map((item, index) => (
                        <div key={index}>
                          {item === 'BEST SELLERS' && category === 'Woman' ? (
                          <Link
                            to="/best-sellers"
                            className="block text-sm text-gray-700 hover:text-black hover:bg-gray-50 px-3 py-2 rounded-lg transition-all duration-200"
                            onClick={() => {
                              setWomanDropdown(false);
                            }}
                          >
                            {item}
                          </Link>
                          ) : item === 'NEW IN' && category === 'Woman' ? (
                          <Link
                            to="/new-in"
                            className="block text-sm text-gray-700 hover:text-black hover:bg-gray-50 px-3 py-2 rounded-lg transition-all duration-200"
                            onClick={() => {
                              setWomanDropdown(false);
                            }}
                          >
                            {item}
                          </Link>
                          ) : (
                          <a
                            href="#"
                            className="block text-sm text-gray-700 hover:text-black hover:bg-gray-50 px-3 py-2 rounded-lg transition-all duration-200"
                            onClick={() => {
                              setWomanDropdown(false);
                              setManDropdown(false);
                              setKidsDropdown(false);
                              setHomeDropdown(false);
                            }}
                          >
                            {item}
                          </a>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
            
            {/* Home and special sections after main categories */}
            <a
              href="#"
              className="text-base font-medium text-black hover:text-gray-600 transition-colors py-3 tracking-wide"
            >
              50TH ANNIVERSARY
            </a>
            <a
              href="#"
              className="text-base font-medium text-black hover:text-gray-600 transition-colors py-3 tracking-wide"
            >
              BEAUTY
            </a>
            <a
              href="#"
              className="text-base font-medium text-black hover:text-gray-600 transition-colors py-3 tracking-wide"
            >
              TRAVEL MODE
            </a>
             </>
            )}
          </div>

          {/* Right side icons */}
          <div className="flex items-center space-x-3">
            <button className="p-3 hover:bg-gray-50 rounded-full transition-colors">
              <Search size={22} />
            </button>
            <button className="p-3 hover:bg-gray-50 rounded-full transition-colors">
              <User size={22} />
            </button>
            <button
              onClick={onCartClick}
              className="p-3 hover:bg-gray-50 rounded-full transition-colors relative"
            >
              <ShoppingBag size={22} />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-black text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-medium">
                  {cartItemCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="lg:hidden mt-6 border-t border-gray-100 pt-6">
            {Object.entries(categories).map(([category, items]) => (
              <div key={category} className="mb-6">
                <button
                  onClick={() => handleCategoryClick(category)}
                  className={`font-semibold text-lg tracking-wide mb-3 ${
                    activeCategory === category ? 'text-black border-b border-black' : 'text-black'
                  }`}
                >
                  {category.toUpperCase()}
                </button>
                <div className="pl-4 space-y-2">
                  {items.map((item, index) => (
                    <div key={index}>
                      {item === 'BEST SELLERS' ? (
                      <Link
                        to="/best-sellers"
                        className="block text-gray-600 hover:text-black py-2 text-base transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {item}
                      </Link>
                      ) : (
                      <a
                        href="#"
                        className="block text-gray-600 hover:text-black py-2 text-base transition-colors"
                      >
                        {item}
                      </a>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;