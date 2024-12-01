import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-gradient-to-r from-gray-700 to-gray-900 text-white py-8">
      <div className="container mx-auto text-center">
        <h2 className="text-2xl font-bold mb-4">Odilov's Blog Website</h2>
        <p className="text-lg text-gray-400 mb-2">All Rights Reserved</p>
        <p className="text-sm text-gray-500">
          © {currentYear} Odilov's Blog. Made with ❤️ and React.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
