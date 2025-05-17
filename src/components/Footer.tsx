
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-dark border-t border-dark-border py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="flex flex-col">
            <Link to="/" className="text-2xl font-bold gradient-text font-outfit mb-4">
              Busty<span className="text-white">Berry</span>
            </Link>
            <p className="text-gray-400 mb-4">
              The juiciest memecoin with AI spice on Solana.
            </p>
            <p className="text-sm text-gray-500">
              &copy; {currentYear} Busty Berry. All rights reserved.
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-berry transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/ai-chat" className="text-gray-400 hover:text-berry transition-colors">
                  AI Chat
                </Link>
              </li>
              <li>
                <Link to="/token" className="text-gray-400 hover:text-berry transition-colors">
                  Buy $BUSTYBERRY
                </Link>
              </li>
              <li>
                <Link to="/community" className="text-gray-400 hover:text-berry transition-colors">
                  Community
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Legal */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/terms" className="text-gray-400 hover:text-berry transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-400 hover:text-berry transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/disclaimer" className="text-gray-400 hover:text-berry transition-colors">
                  Risk Disclaimer
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-6 border-t border-dark-border">
          <p className="text-center text-sm text-gray-500">
            Cryptocurrency investments are volatile and high risk. $BUSTYBERRY is a memecoin with no intrinsic value. Always do your own research.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
