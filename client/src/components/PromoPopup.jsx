// client/src/components/PromoPopup.jsx
import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const PromoPopup = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show popup after 3 seconds
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const closePopup = () => {
    setIsVisible(false);
  };

  const acceptOffer = () => {
    toast.success('🎉 Awesome! Use code WELCOME10 for 10% off!', {
      duration: 4000,
      position: 'top-right',
    });
    closePopup();
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      {/* Popup Box */}
      <div className="bg-white rounded-2xl shadow-2xl max-w-md mx-4 overflow-hidden border-4 border-green-500 animate-popup">
        {/* Close Button */}
        <div className="flex justify-end p-3">
          <button 
            onClick={closePopup}
            className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
          >
            ×
          </button>
        </div>
        
        {/* Content */}
        <div className="px-8 pb-6 text-center">
          {/* Animated Icon */}
          <div className="mb-6">
            <div className="w-20 h-20 mx-auto bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center text-white text-4xl animate-pulse">
              🎉
            </div>
          </div>
          
          {/* Main Message */}
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Welcome to GreenCart! 🛒
          </h2>
          
          {/* Offer */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4 mb-6">
            <p className="text-2xl font-bold text-green-600 mb-2">
              🎊 10% OFF 🎊
            </p>
            <p className="text-lg text-gray-700 font-semibold">
              First-Time Shoppers Special!
            </p>
          </div>
          
          {/* Discount Code */}
          <p className="text-gray-600 mb-6">
            Use code <span className="bg-green-100 text-green-800 px-3 py-1 rounded-lg font-mono text-lg font-bold">WELCOME10</span> at checkout
          </p>
          
          {/* Action Buttons */}
          <div className="space-y-3">
            <button 
              onClick={acceptOffer}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-4 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              🛒 Shop Now & Save 10%!
            </button>
            <button 
              onClick={closePopup}
              className="w-full text-gray-500 hover:text-gray-700 py-2 transition-colors font-medium"
            >
              Maybe Later
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromoPopup;
