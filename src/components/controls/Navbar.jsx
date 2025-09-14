import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react"; // icons

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-black text-white px-6 py-4 shadow-lg sticky top-0 z-50">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="text-2xl font-bold tracking-wide">ToNg-MoVIe</div>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-8 text-lg font-medium">
          <Link to="/" className="hover:text-red-500 transition">Home</Link>
          <Link to="/tv" className="hover:text-red-500 transition">TV</Link>
          <Link to="/movie" className="hover:text-red-500 transition">Movie</Link>
          <Link to="/trending" className="hover:text-red-500 transition">Trending</Link>
        </div>

        {/* Desktop Search */}
        <div className="hidden md:flex items-center space-x-4">
          <input
            type="text"
            placeholder="Search..."
            className="px-3 py-1 rounded-full bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden mt-4 space-y-4 text-lg font-medium flex flex-col">
          <Link to="/" onClick={() => setIsOpen(false)} className="hover:text-red-500 transition">Home</Link>
          <Link to="/movie" onClick={() => setIsOpen(false)} className="hover:text-red-500 transition">Movie</Link>
          <Link to="/tv" onClick={() => setIsOpen(false)} className="hover:text-red-500 transition">TV</Link>
          <Link to="/trending" onClick={() => setIsOpen(false)} className="hover:text-red-500 transition">Trending</Link>

          {/* Mobile Search */}
          <input
            type="text"
            placeholder="Search..."
            className="px-3 py-1 rounded-full bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>
      )}
    </nav>
  );
}

export default Navbar;
