import React from 'react';

const Shipping = () => {
  return (
    <div className="container mx-auto p-8 text-center">
      <h1 className="text-3xl font-bold mb-4">Shipping Information</h1>
      <p className="mb-4">
        We strive to deliver your orders quickly and safely. Here’s everything you need to know about our shipping process.
      </p>

      <div className="flex flex-col max-w-2xl mx-auto gap-4 mt-4 text-left">
        <p>🚚 Standard shipping: 3-7 business days, depending on your location.</p>
        <p>⚡ Expedited shipping: Faster delivery options available at checkout.</p>
        <p>🔎 Tracking: You will receive tracking info via email once your order is shipped.</p>
        <p>🏠 Address accuracy: Please ensure your shipping address is correct to avoid delays.</p>
        <p>🌍 International orders: Customs fees may apply depending on your country.</p>
      </div>
    </div>
  )
}

export default Shipping;
