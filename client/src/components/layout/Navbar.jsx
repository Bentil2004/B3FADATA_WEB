import { Link } from "wouter";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/">
              <a className="flex-shrink-0 flex items-center cursor-pointer">
                <div className="h-8 w-8 bg-black rounded-full"></div>
              </a>
            </Link>
          </div>
          <div className="flex items-center">
            <div className="hidden md:ml-6 md:flex md:space-x-8">
              <Link href="/">
                <a className="border-black text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  Data Bundles
                </a>
              </Link>
              <Link href="/">
                <a className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  Support
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
