import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import CartPage from './pages/CartPage';
import BestSellersPage from './pages/BestSellersPage';
import ProductDetailPage from './pages/ProductDetailPage';
import NewInPage from './pages/NewInPage';
import AsymmetricDressPage from './pages/AsymmetricDressPage';
import FlowyDressPage from './pages/FlowyDressPage';

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  images: string[];
  category: string;
  sizes: string[];
  colors: string[];
  description: string;
  isBestSeller?: boolean;
}

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  image: string;
  size: string;
  color: string;
  quantity: number;
}

function AppContent() {
  const navigate = useNavigate();
  const location = useLocation();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');

  const handleProductClick = (product: Product) => {
    navigate(`/product/${product.id}`);
  };

  const products: Product[] = [
    // Women's Product (1 item)
    {
      id: 'best1',
      name: 'SEQUIN MINI SKIRT',
      price: 65.90,
      image: '/SEQUIN MINI Skirt.jpg',
      images: [
        '/SEQUIN MINI Skirt.jpg',
        '/SEQUIN MINI Skirt.jpg'
      ],
      category: 'Woman',
      sizes: ['S', 'M', 'L'],
      colors: ['Light Blue'],
      description: 'Sequin mini skirt with shimmering finish. Perfect for special occasions.',
      isBestSeller: true
    },
    
    // Men's Product (1 item)
    {
      id: '2',
      name: 'CLASSIC OXFORD SHIRT',
      price: 39.95,
      image: 'https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=500&h=700&fit=crop',
      images: [
        'https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=500&h=700&fit=crop',
        'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=500&h=700&fit=crop'
      ],
      category: 'Man',
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      colors: ['Yellow', 'Blue'],
      description: 'Classic collar shirt with long sleeves and button fastening.',
      isBestSeller: true
    },
    
    // Kids Product (1 item)
    {
      id: '3',
      name: 'CONTRAST PIPING BOW DRESS',
      price: 45.90,
      image: '/CONTRAST PIPING BOW DRESS.jpg',
      images: [
        '/CONTRAST PIPING BOW DRESS.jpg',
        '/CONTRAST PIPING BOW DRESS.jpg'
      ],
      category: 'Kids',
      sizes: ['4-5Y', '6-7Y', '8-9Y', '10-11Y', '12-13Y'],
      colors: ['Black', 'White'],
      description: 'Elegant dress with contrast piping and bow detail.',
      isBestSeller: true
    },
    
    // New Product - Asymmetric Dress
    {
      id: 'asymmetric1',
      name: 'ASYMMETRIC CUT OUT LINEN MIDI DRESS',
      price: 65.90,
      image: '/ASYMMETRIC CUT OUT LINEN MIDI DRESS 65.90.jpg',
      images: [
        '/ASYMMETRIC CUT OUT LINEN MIDI DRESS 65.90.jpg',
        '/ASYMMETRIC CUT OUT LINEN MIDI DRESS 65.90.jpg'
      ],
      category: 'Woman',
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      colors: ['Black'],
      description: 'Asymmetric linen midi dress with cut-out details. Features a modern silhouette with breathable linen fabric perfect for warm weather. The asymmetric hemline adds contemporary edge to this versatile piece.',
      isBestSeller: false
    },
    
    // Flowy Elastic Midi Dress
    {
      id: 'best6',
      name: 'FLOWY ELASTIC MIDI DRESS',
      price: 65.90,
      image: '/FLOWY ELASTIC MIDI DRESS.jpg',
      images: ['/FLOWY ELASTIC MIDI DRESS.jpg'],
      category: 'Woman',
      sizes: ['S', 'M', 'L', 'XL'],
      colors: ['Black'],
      description: 'Midi dress made with viscose yarn. Straight elastic neckline and thin adjustable straps. Draped fabric detail on the chest with elastic.',
      isBestSeller: true
    },
    
    // Home Product (1 item)
    {
      id: '4',
      name: 'COTTON AND LINEN PATCHWORK',
      price: 399.00,
      image: '/COTTON AND LINEN PATCHWORK .jpg',
      images: [
        '/COTTON AND LINEN PATCHWORK .jpg',
        '/COTTON AND LINEN PATCHWORK .jpg'
      ],
      category: 'Home',
      sizes: ['45x45cm', '50x50cm'],
      colors: ['Beige', 'White', 'Grey', 'Navy'],
      description: 'Premium cotton and linen patchwork with artisanal craftsmanship.',
      isBestSeller: true
    }
  ];

  const addToCart = (product: Product, size: string, color: string, quantity: number = 1) => {
    const existingItem = cartItems.find(
      item => item.productId === product.id && item.size === size && item.color === color
    );

    if (existingItem) {
      setCartItems(cartItems.map(item =>
        item.id === existingItem.id
          ? { ...item, quantity: item.quantity + quantity }
          : item
      ));
    } else {
      const newItem: CartItem = {
        id: Date.now().toString(),
        productId: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        size,
        color,
        quantity
      };
      setCartItems([...cartItems, newItem]);
    }
  };

  const updateCartItem = (itemId: string, size: string, color: string) => {
    setCartItems(cartItems.map(item =>
      item.id === itemId
        ? { ...item, size, color }
        : item
    ));
    setShowConfirmation(true);
    setTimeout(() => setShowConfirmation(false), 2000);
  };

  const removeFromCart = (itemId: string) => {
    setCartItems(cartItems.filter(item => item.id !== itemId));
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
    } else {
      setCartItems(cartItems.map(item =>
        item.id === itemId
          ? { ...item, quantity }
          : item
      ));
    }
  };

  const cartTotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

  const handleCartClick = () => {
    navigate('/cart');
  };

  return (
    <div className="min-h-screen bg-white">
      <Header 
        cartItems={cartItems} 
        onCartClick={handleCartClick}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        currentSection={
          location.pathname === '/best-sellers' ? 'Woman' : 
          location.pathname.startsWith('/product/') ? 'Woman' : 
          undefined
        }
      />
      
      <Routes>
        <Route 
          path="/" 
          element={
            <HomePage 
              products={products}
              onProductClick={handleProductClick}
              activeCategory={activeCategory}
            />
          } 
        />
        <Route 
          path="/cart" 
          element={
            <CartPage
              items={cartItems}
              onUpdateItem={updateCartItem}
              onRemoveItem={removeFromCart}
              onUpdateQuantity={updateQuantity}
              products={products}
            />
          } 
        />
        <Route 
          path="/best-sellers" 
          element={
            <BestSellersPage 
              onProductClick={() => {}}
            />
          } 
        />
        <Route 
          path="/new-in" 
          element={
            <NewInPage 
              onProductClick={() => {}}
            />
          } 
        />
        <Route 
          path="/product/:id" 
          element={
            <ProductDetailPage 
              products={products}
              onAddToCart={addToCart}
            />
          } 
        />
        <Route 
          path="/asymmetric-dress" 
          element={
            <AsymmetricDressPage 
              onAddToCart={addToCart}
            />
          } 
        />
        <Route 
          path="/flowy-dress" 
          element={
            <FlowyDressPage 
              onAddToCart={addToCart}
            />
          } 
        />
      </Routes>

      {showConfirmation && (
        <div className="fixed bottom-6 right-6 bg-black text-white px-8 py-4 rounded-lg shadow-2xl z-50 transform transition-all duration-300">
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            <p className="text-sm font-medium">Changes saved successfully</p>
          </div>
        </div>
      )}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;