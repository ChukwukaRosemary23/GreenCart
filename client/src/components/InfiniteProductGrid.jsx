// client/src/components/InfiniteProductGrid.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useInfiniteScroll from '../hooks/useInfiniteScroll';

const InfiniteProductGrid = () => {
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [initialLoading, setInitialLoading] = useState(true);
  const productsPerPage = 6;

  // Function to fetch more products (simulate pagination)
  const fetchMoreProducts = async () => {
    try {
      const startIndex = (currentPage + 1) * productsPerPage;
      const endIndex = startIndex + productsPerPage;
      const newProducts = allProducts.slice(startIndex, endIndex);
      
      if (newProducts.length > 0) {
        // Simulate network delay for realistic experience
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setProducts(prev => [...prev, ...newProducts]);
        setCurrentPage(prev => prev + 1);
        
        // Check if there are more products
        return endIndex < allProducts.length;
      }
      
      return false;
    } catch (error) {
      console.error('Error fetching more products:', error);
      return false;
    }
  };

  // Use the infinite scroll hook
  const { loading, hasMore, loadMore } = useInfiniteScroll(fetchMoreProducts);

  // Load all products initially and show first batch
  useEffect(() => {
    const loadInitialProducts = async () => {
      try {
        setInitialLoading(true);
        const response = await axios.post('http://localhost:8080/api/product/get', {});
        
        let productList = [];
        if (response.data.success && response.data.data) {
          productList = response.data.data;
        } else if (response.data.products) {
          productList = response.data.products;
        } else if (Array.isArray(response.data)) {
          productList = response.data;
        }
        
        setAllProducts(productList);
        setProducts(productList.slice(0, productsPerPage));
        setCurrentPage(0);
        setInitialLoading(false);
      } catch (error) {
        console.error('Error loading initial products:', error);
        setInitialLoading(false);
      }
    };

    loadInitialProducts();
  }, []);

  // Product Card Component
  const ProductCard = ({ product }) => (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden">
      {/* Product Image */}
      <div className="relative">
        <img 
          src={product.image?.[0] || `https://via.placeholder.com/400x300?text=${encodeURIComponent(product.name)}`}
          alt={product.name}
          className="w-full h-48 object-cover"
          onError={(e) => {
            e.target.src = `https://via.placeholder.com/400x300?text=${encodeURIComponent(product.name)}`;
          }}
        />
        {product.discount && (
          <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
            -{product.discount}% OFF
          </div>
        )}
      </div>
      
      {/* Product Info */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-800 mb-2 truncate">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
        
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold text-green-600">${product.price}</span>
          <button 
            onClick={() => addToCart(product._id)}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-all duration-200 transform hover:scale-105"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );

  // Loading Skeleton Component
  const SkeletonCard = () => (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden animate-pulse">
      <div className="bg-gray-300 h-48 w-full"></div>
      <div className="p-4 space-y-3">
        <div className="bg-gray-300 h-4 rounded w-3/4"></div>
        <div className="bg-gray-300 h-3 rounded w-full"></div>
        <div className="bg-gray-300 h-3 rounded w-2/3"></div>
        <div className="flex justify-between items-center">
          <div className="bg-gray-300 h-6 rounded w-16"></div>
          <div className="bg-gray-300 h-8 rounded w-24"></div>
        </div>
      </div>
    </div>
  );

  const addToCart = (productId) => {
    // Simple feedback for now
    alert(`Added product ${productId} to cart!`);
    // You can connect this to your existing cart system later
  };

  if (initialLoading) {
    return (
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {products.map((product, index) => (
          <div 
            key={product._id} 
            className="opacity-0 animate-fadeInUp"
            style={{ 
              animationDelay: `${(index % productsPerPage) * 100}ms`, 
              animationFillMode: 'forwards' 
            }}
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      {/* Loading State for New Products */}
      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {[...Array(3)].map((_, index) => (
            <SkeletonCard key={`loading-${index}`} />
          ))}
        </div>
      )}

      {/* Load More Button */}
      <div className="text-center">
        {hasMore ? (
          <button
            onClick={loadMore}
            disabled={loading}
            className={`
              bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 
              text-white font-semibold py-4 px-8 rounded-full transition-all duration-300 
              transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed
              ${loading ? 'animate-pulse' : ''}
            `}
          >
            {loading ? (
              <span className="flex items-center space-x-2">
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                <span>Loading More Products...</span>
              </span>
            ) : (
              <span className="flex items-center space-x-2">
                <span>Load More Products ({products.length} of {allProducts.length})</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                </svg>
              </span>
            )}
          </button>
        ) : (
          <div className="bg-gray-100 rounded-lg p-6">
            <p className="text-gray-600 font-medium text-lg">🎉 You've seen all our amazing products!</p>
            <p className="text-gray-500 text-sm mt-2">Total: {allProducts.length} products</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default InfiniteProductGrid;