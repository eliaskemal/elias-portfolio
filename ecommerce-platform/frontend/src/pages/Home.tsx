import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Truck, Shield, RefreshCw } from 'lucide-react';
import { ProductCard } from '../components/products/ProductCard';
import { type Product } from '../types';

// Mock data for demonstration
const featuredProducts: Product[] = [
  {
    id: '1',
    name: 'Wireless Headphones',
    description: 'Premium noise-canceling wireless headphones with exceptional sound quality.',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop',
    category: 'Electronics',
    stock: 15,
    rating: 4.5,
    reviews: 128,
  },
  {
    id: '2',
    name: 'Smart Watch',
    description: 'Advanced fitness tracking and health monitoring in a sleek design.',
    price: 299.99,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop',
    category: 'Electronics',
    stock: 8,
    rating: 4.8,
    reviews: 89,
  },
  {
    id: '3',
    name: 'Leather Backpack',
    description: 'Handcrafted genuine leather backpack perfect for work and travel.',
    price: 149.99,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop',
    category: 'Fashion',
    stock: 12,
    rating: 4.3,
    reviews: 67,
  },
  {
    id: '4',
    name: 'Coffee Maker',
    description: 'Programmable coffee maker with thermal carafe and brew strength control.',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500&h=500&fit=crop',
    category: 'Home',
    stock: 20,
    rating: 4.6,
    reviews: 156,
  },
];

export const Home: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-gradient text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-dark-900/50"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-shadow-lg animate-float">
              Discover Amazing Products
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-100 animate-pulse-slow">
              Shop the latest trends and enjoy exclusive deals
            </p>
            <div className="space-x-4">
              <Link
                to="/products"
                className="btn-primary text-lg px-8 py-4 rounded-xl glow-lg hover:scale-105 transition-all duration-300 inline-flex items-center"
              >
                Shop Now
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link
                to="/deals"
                className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-primary-600 transition-all duration-300 hover:scale-105"
              >
                View Deals
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute top-10 left-10 w-20 h-20 bg-primary-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-accent-500/20 rounded-full blur-3xl animate-pulse-slow"></div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gradient-to-b from-dark-900 to-dark-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="dark-glass w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 glow">
                <Truck className="w-8 h-8 text-primary-400" />
              </div>
              <h3 className="font-semibold text-lg mb-2 text-white">Free Shipping</h3>
              <p className="text-gray-400">On orders over $50</p>
            </div>
            <div className="text-center group">
              <div className="dark-glass w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 glow">
                <Shield className="w-8 h-8 text-primary-400" />
              </div>
              <h3 className="font-semibold text-lg mb-2 text-white">Secure Payment</h3>
              <p className="text-gray-400">100% secure transactions</p>
            </div>
            <div className="text-center group">
              <div className="dark-glass w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 glow">
                <RefreshCw className="w-8 h-8 text-primary-400" />
              </div>
              <h3 className="font-semibold text-lg mb-2 text-white">Easy Returns</h3>
              <p className="text-gray-400">30-day return policy</p>
            </div>
            <div className="text-center group">
              <div className="dark-glass w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 glow">
                <Star className="w-8 h-8 text-primary-400" />
              </div>
              <h3 className="font-semibold text-lg mb-2 text-white">Best Quality</h3>
              <p className="text-gray-400">Premium products only</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gradient-to-b from-dark-800 to-dark-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 gradient-text">
              Featured Products
            </h2>
            <p className="text-lg text-gray-400">
              Check out our most popular products
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <div key={product.id} className="card-hover">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link
              to="/products"
              className="btn-primary text-lg px-8 py-4 rounded-xl glow-lg hover:scale-105 transition-all duration-300 inline-flex items-center"
            >
              View All Products
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 relative overflow-hidden">
        <div className="absolute inset-0 hero-gradient"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-4 text-shadow-lg">
              Subscribe to Our Newsletter
            </h2>
            <p className="text-lg mb-8 text-primary-100">
              Get the latest updates on new products and exclusive deals
            </p>
            <div className="max-w-md mx-auto flex gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              <button className="btn-primary glow hover:scale-105 transition-all duration-300">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
