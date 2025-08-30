// client/src/components/TestProducts.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TestProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const testAPI = async () => {
      try {
        console.log('Testing your existing API...');
        
        // Test your existing product API
        const response = await axios.post('http://localhost:8080/api/product/get', {});
        
        console.log('Full API Response:', response.data);
        
        // Try different ways your API might return products
        let productList = [];
        if (response.data.success && response.data.data) {
          productList = response.data.data;
        } else if (response.data.products) {
          productList = response.data.products;
        } else if (Array.isArray(response.data)) {
          productList = response.data;
        }
        
        console.log('Found products:', productList.length);
        setProducts(productList.slice(0, 6)); // Show only first 6 for testing
        
      } catch (error) {
        console.error('API Test Error:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    testAPI();
  }, []);

  if (loading) return <div className="p-4">Testing your API...</div>;
  
  if (error) return (
    <div className="p-4 bg-red-100 text-red-700">
      <h3>API Error:</h3>
      <p>{error}</p>
      <p>Check browser console for details</p>
    </div>
  );

  if (products.length === 0) return (
    <div className="p-4 bg-yellow-100">
      <p>API connected but no products found</p>
      <p>Check browser console for API response details</p>
    </div>
  );

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">✅ API Test Success - {products.length} Products Found</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product, index) => (
          <div key={product._id || index} className="border rounded p-4 bg-white shadow">
            <h3 className="font-bold">{product.name}</h3>
            <p className="text-green-600 font-semibold">${product.price}</p>
            <p className="text-sm text-gray-600">{product.description}</p>
            {product.image && product.image.length > 0 && (
              <div className="mt-2">
                <small className="text-gray-500">Has {product.image.length} image(s)</small>
              </div>
            )}
          </div>
        ))}
      </div>
      
      <div className="mt-6 p-4 bg-green-100 rounded">
        <p className="text-green-800 font-semibold">🎉 Great! Your API is working!</p>
        <p>Now we can build infinite scroll on top of this.</p>
      </div>
    </div>
  );
};

export default TestProducts;