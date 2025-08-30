import React from 'react';
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";

const Contact = () => {
  return (
    <div className="container mx-auto p-8 text-center">
      <h1 className="text-3xl font-bold mb-4">Get in Touch with Us</h1>
      <p className="mb-4">
        We’d love to hear from you! Whether you have a question, feedback, or need assistance with your order, our team is here to help.
      </p>
      <p>Email: <a href="mailto:chukwukarosemary2020@gmail.com" className="text-primary-100 hover:underline">chukwukarosemary2020@gmail.com</a></p>
      <p>Phone: <a href="tel:+2349078535664" className="text-primary-100 hover:underline">+234-9078535664</a></p>

      <div className="mt-4 flex justify-center gap-4 text-2xl">
        <a href="#" className="hover:text-blue-600"><FaFacebook /></a>
        <a href="#" className="hover:text-pink-500"><FaInstagram /></a>
        <a href="#" className="hover:text-blue-700"><FaLinkedin /></a>
      </div>
      <p className="mt-2 text-sm text-gray-500">Follow us for updates, promotions, and more!</p>
    </div>
  )
}

export default Contact;
