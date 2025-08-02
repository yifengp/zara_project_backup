import React from 'react';
import Hero from '../components/Hero';
import ProductGrid from '../components/ProductGrid';
import Footer from '../components/Footer';
import { Product } from '../App';

interface HomePageProps {
  products: Product[];
  onProductClick: (product: Product) => void;
  activeCategory: string;
}

const HomePage: React.FC<HomePageProps> = ({ products, onProductClick, activeCategory }) => {
  return (
    <div>
      <Hero />
      <ProductGrid 
        products={products} 
        onProductClick={onProductClick}
        activeCategory={activeCategory}
      />
      <Footer />
    </div>
  );
};

export default HomePage;