import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import { useGlobalContext } from '../provider/GlobalProvider';

const Success = () => {
  const location = useLocation();
  const { fetchCartItem } = useGlobalContext();
  // Determine text: use state text if present, otherwise "Payment" as default
  const text = location?.state?.text ? location.state.text : "Payment";

  useEffect(() => {
    // Clear cart after successful payment (for localhost testing)
    const clearCart = async () => {
      try {
        await Axios({
          ...SummaryApi.clearCart
        });
        
        // Refresh cart items to show empty cart
        if(fetchCartItem) {
          fetchCartItem();
        }
        
        console.log('Cart cleared successfully');
      } catch (error) {
        console.log('Error clearing cart:', error);
      }
    };
    
    // Only clear cart if this is a payment success (not order success)
    if (text === "Payment") {
      clearCart();
    }
  }, [text, fetchCartItem]);

  return (
    <div className='m-4 w-full max-w-md bg-green-100 p-6 rounded mx-auto flex flex-col justify-center items-center gap-6 shadow-md'>
        <p className='text-green-800 font-bold text-xl text-center'>
            {text} Successfully
        </p>

        {/* Go Home button always visible */}
        <Link 
          to="/" 
          className="px-6 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-all duration-200 shadow-md"
        >
          Go To Home
        </Link>
    </div>
  );
}

export default Success;