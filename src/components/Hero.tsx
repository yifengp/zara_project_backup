import React from 'react';
import { useNavigate } from 'react-router-dom';

const Hero: React.FC = () => {
  const navigate = useNavigate();

  const handleShopNow = () => {
    navigate('/new-in');
  };

  return (
    <section className="relative h-[80vh] bg-gray-50 overflow-hidden" style={{ minHeight: '600px' }}>
      <div className="absolute inset-0">
        <img
          src="/image copy copy copy copy copy.png"
          alt="Fashion Hero"
          className="w-full h-full object-cover"
          style={{ 
            width: '100%', 
            height: '100%', 
            objectFit: 'cover',
            transform: 'scale(1)',
            transformOrigin: 'center center'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent"></div>
      </div>
      
      <div className="relative z-10 flex flex-col items-start justify-center h-full text-white px-6 max-w-7xl mx-auto" style={{ minHeight: '600px' }}>
        <div className="max-w-2xl">
          <div className="mb-4">
            <span className="inline-block bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full font-medium tracking-wide" style={{ fontSize: '0.875rem' }}>
              NEW COLLECTION
            </span>
          </div>
          <h2 className="font-light mb-6 tracking-tight leading-tight" style={{ fontSize: 'clamp(3rem, 8vw, 4.5rem)' }}>
            SUMMER
            <br />
            <span className="font-medium">ESSENTIALS</span>
          </h2>
          <p className="mb-10 font-light leading-relaxed text-white/90" style={{ fontSize: 'clamp(1.125rem, 3vw, 1.5rem)' }}>
            Discover the latest trends in fashion with our carefully curated selection of contemporary pieces for the modern wardrobe.
          </p>
          <div className="flex">
            <button 
              onClick={handleShopNow}
              className="bg-white text-black px-10 py-4 font-medium hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 rounded-lg"
              style={{ fontSize: '1rem' }}
            >
              SHOP NOW
            </button>
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute bottom-10 right-10 hidden lg:block">
        <div className="w-24 h-24 border border-white/30 rounded-full flex items-center justify-center backdrop-blur-sm">
          <div className="w-12 h-12 border border-white/50 rounded-full"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;