import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, User, Search, Menu } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import { useAuth } from '../../contexts/AuthContext';

export const Header: React.FC = () => {
  const { state } = useCart();
  const { user, logout } = useAuth();

  return (
    <header className="dark-glass sticky top-0 z-50 backdrop-blur-xl border-b border-primary-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <h1 className="text-2xl font-bold gradient-text animate-pulse-slow">ShopHub</h1>
          </Link>

          {/* Search Bar */}
          <div className="hidden md:block flex-1 max-w-md mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-2 bg-dark-800/50 border border-primary-500/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-white placeholder-gray-400 glass-effect"
              />
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex items-center space-x-4">
            <Link
              to="/products"
              className="nav-link px-3 py-2 rounded-md text-sm font-medium"
            >
              Products
            </Link>
            
            {user ? (
              <>
                {user.role === 'admin' && (
                  <Link
                    to="/admin"
                    className="nav-link px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Admin
                  </Link>
                )}
                <div className="relative group">
                  <button className="flex items-center space-x-1 nav-link px-3 py-2 rounded-md text-sm font-medium">
                    <User className="w-5 h-5" />
                    <span>{user.name}</span>
                  </button>
                  <div className="absolute right-0 mt-2 w-48 dark-glass rounded-lg shadow-2xl py-1 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 border border-primary-500/20">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-gray-300 hover:bg-primary-600/20 hover:text-white transition-colors"
                    >
                      Profile
                    </Link>
                    <Link
                      to="/orders"
                      className="block px-4 py-2 text-sm text-gray-300 hover:bg-primary-600/20 hover:text-white transition-colors"
                    >
                      Orders
                    </Link>
                    <button
                      onClick={logout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-red-600/20 hover:text-red-400 transition-colors"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="nav-link px-3 py-2 rounded-md text-sm font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="btn-primary text-sm px-4 py-2 rounded-lg glow"
                >
                  Register
                </Link>
              </>
            )}

            {/* Cart */}
            <Link
              to="/cart"
              className="relative p-2 text-gray-300 hover:text-white transition-colors group"
            >
              <ShoppingCart className="w-6 h-6 group-hover:scale-110 transition-transform" />
              {state.items.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-primary-500 to-accent-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center glow animate-pulse">
                  {state.items.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              )}
            </Link>

            {/* Mobile Menu */}
            <button className="md:hidden p-2 text-gray-300 hover:text-white">
              <Menu className="w-6 h-6" />
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};
