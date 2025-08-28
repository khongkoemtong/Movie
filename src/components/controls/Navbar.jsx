import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div>
      <nav class="bg-black text-white px-6 py-4 flex items-center justify-between shadow-lg">
        <div class="flex items-center space-x-3">
          <span class="text-2xl font-bold tracking-wide">MovieApp</span>
        </div>

        <div class="hidden md:flex space-x-8 text-lg font-medium">
          <Link to='/'>
            <a href="#" class="hover:text-red-500 transition">
              Home
            </a>
          </Link>
          <Link to='/movie'>
            <a href="#" class="hover:text-red-500 transition">
              Movie
            </a>
          </Link>
          <a href="#" class="hover:text-red-500 transition">
            TV Shows
          </a>
          <a href="#" class="hover:text-red-500 transition">
            Trending
          </a>
        </div>

        <div class="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Search..."
            class="px-3 py-1 rounded-full bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
