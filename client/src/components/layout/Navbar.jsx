import { Link, useLocation } from "wouter";
import { useState } from "react";

const Navbar = () => {
  const [location] = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center cursor-pointer">
              <div className="text-black font-bold text-3xl ml-2">BƐFADATA</div>
            </Link>
          </div>

          <div className="flex items-center md:hidden">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-500 hover:text-gray-700 focus:outline-none text-3xl"
            >
              ☰
            </button>
          </div>

          <div className="hidden md:flex md:space-x-8">
            <Link 
              href="/" 
              className={`${location === "/" ? "border-black text-gray-900" : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"} inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
            >
              Data Bundles
            </Link>
            <Link 
              href="/support" 
              className={`${location === "/support" ? "border-black text-gray-900" : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"} inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
            >
              Support
            </Link>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden mt-2 space-y-2">
            <Link 
              href="/" 
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
            >
              Data Bundles
            </Link>
            <Link 
              href="/support" 
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
            >
              Support
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
