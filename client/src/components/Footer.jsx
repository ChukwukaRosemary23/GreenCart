import React, { useState } from 'react';
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = () => {
    if (!email) return alert("Please enter your email");
    // Here you can integrate Mailchimp, SendGrid, or your backend API
    alert(`Subscribed successfully with ${email}!`);
    setEmail("");
  };

  return (
    <footer className="border-t mt-12 bg-gray-50">
      <div className="container mx-auto px-4 py-6 flex flex-col items-center gap-6">

        {/* Copyright */}
        <p className="text-gray-700 text-sm">&copy; Rosemary, All Rights Reserved 2025.</p>

        {/* Social Icons */}
        <div className="flex items-center gap-6 text-2xl">
          <a href="#" className="hover:text-blue-600 transition-colors"><FaFacebook /></a>
          <a href="#" className="hover:text-pink-500 transition-colors"><FaInstagram /></a>
          <a href="#" className="hover:text-blue-700 transition-colors"><FaLinkedin /></a>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-300 w-full my-4"></div>

        {/* Quick Links */}
        <div className="flex gap-6 flex-wrap justify-center">
          <a href="/contact" className="hover:underline hover:text-primary-100 transition-colors">Contact</a>
          <a href="/terms" className="hover:underline hover:text-primary-100 transition-colors">Terms & Conditions</a>
          <a href="/privacy" className="hover:underline hover:text-primary-100 transition-colors">Privacy Policy</a>
          <a href="/shipping" className="hover:underline hover:text-primary-100 transition-colors">Shipping Info</a>
        </div>

        {/* Newsletter Subscription */}
        <div className="mt-6 flex flex-col sm:flex-row items-center gap-2">
          <span className="text-gray-700">Subscribe to our newsletter:</span>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-primary-100"
          />
          <button
            onClick={handleSubscribe}
            className="bg-primary-100 text-white px-4 py-1 rounded hover:bg-primary-200 transition-colors"
          >
            Subscribe
          </button>
        </div>

      </div>
    </footer>
  )
}

export default Footer;
