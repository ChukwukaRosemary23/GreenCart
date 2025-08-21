import React from 'react';

const HorizontalBanner = () => {
  return (
    <div className="w-full h-32 md:h-40 bg-gradient-to-r from-orange-100 via-orange-50 to-orange-100 relative overflow-hidden rounded-lg shadow-sm my-2">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-2 left-8 w-6 h-6 rounded-full bg-orange-200"></div>
        <div className="absolute bottom-3 right-12 w-4 h-4 rounded-full bg-yellow-200"></div>
        <div className="absolute top-4 right-20 w-3 h-3 rounded-full bg-red-200"></div>
      </div>
      
      <div className="container mx-auto px-6 h-full flex items-center justify-between">
        
        {/* Left side - Text content */}
        <div className="flex-1">
          <h1 className="text-xl md:text-2xl font-bold text-gray-800 mb-1">
            Rosemary corner
          </h1>
          <p className="text-sm md:text-base text-gray-600 mb-3">
            Your favourite store is now online
          </p>
          <button 
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              
              // Try multiple selectors to find categories
              const categoriesSection = 
                document.querySelector('.grid.grid-cols-5') ||
                document.querySelector('[class*="grid-cols-5"]') ||
                document.querySelector('.container.mx-auto.px-4');
              
              if (categoriesSection) {
                categoriesSection.scrollIntoView({ behavior: 'smooth' });
              } else {
                // If no categories found, scroll down 600px
                window.scrollTo({ top: 600, behavior: 'smooth' });
              }
            }}
            className="bg-green-700 hover:bg-green-800 text-white px-4 py-1.5 rounded text-sm font-medium transition-colors cursor-pointer z-10 relative"
          >
            Shop Now
          </button>
        </div>

        {/* Right side - Product showcase */}
        <div className="flex items-center gap-2 md:gap-4">
          
          {/* Playing cards */}
          <div className="w-8 h-10 md:w-10 md:h-12 bg-white rounded border shadow-sm flex items-center justify-center">
            <div className="text-red-500 text-xs font-bold">A♥</div>
          </div>
          
          {/* Product box */}
          <div className="w-12 h-16 md:w-16 md:h-20 bg-gray-800 rounded text-white text-xs flex flex-col items-center justify-center">
            <div className="text-yellow-400 font-bold text-xs">7</div>
            <div className="text-xs">DRAGON</div>
          </div>
          
          {/* Hookah/Shisha */}
          <div className="w-14 h-16 md:w-16 md:h-20 relative">
            <div className="w-8 h-8 bg-red-500 rounded-full mx-auto"></div>
            <div className="w-1 h-6 bg-gray-600 mx-auto"></div>
            <div className="w-6 h-6 bg-gray-700 rounded-full mx-auto"></div>
          </div>
          
          {/* Cigarette pack */}
          <div className="w-8 h-12 md:w-10 md:h-14 bg-red-500 rounded text-white text-xs flex items-center justify-center">
            <div className="transform rotate-90 text-xs">COCA</div>
          </div>
          
          {/* Drink/Package */}
          <div className="w-10 h-12 md:w-12 md:h-14 bg-yellow-100 rounded border flex items-center justify-center">
            <div className="w-6 h-8 bg-yellow-300 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HorizontalBanner;