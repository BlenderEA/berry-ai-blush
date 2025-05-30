
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-black border-t border-green-500/30 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <div className="inline-block p-4 border border-red-500/50 bg-red-500/10 rounded mb-6">
            <span className="text-red-400 font-mono text-lg tracking-wider">
              ⚠️ WARNING: This site contains mutational content.
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="flex flex-col text-center md:text-left">
            <Link to="/" className="text-2xl font-bold text-green-400 font-mono mb-4 glitch-text">
              ACID<span className="text-pink-500">MUTTZ</span>
            </Link>
            <p className="text-gray-400 font-mono mb-4">
              Built in the Acid | Powered by Solana
            </p>
          </div>
          
          {/* Lab Links */}
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-4 text-green-400 font-mono">LAB ACCESS</h3>
            <ul className="space-y-2 font-mono">
              <li>
                <Link to="/mutants" className="text-gray-400 hover:text-green-400 transition-colors">
                  Mutants Gallery
                </Link>
              </li>
              <li>
                <Link to="/lab" className="text-gray-400 hover:text-green-400 transition-colors">
                  Dr. Muttz Lab
                </Link>
              </li>
              <li>
                <Link to="/prophecies" className="text-gray-400 hover:text-green-400 transition-colors">
                  Prophecies
                </Link>
              </li>
              <li>
                <a href="https://twitter.com/acidmuttz" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-green-400 transition-colors">
                  X (Twitter)
                </a>
              </li>
            </ul>
          </div>
          
          {/* Technical */}
          <div className="text-center md:text-right">
            <h3 className="text-lg font-semibold mb-4 text-pink-500 font-mono">EXPERIMENT DATA</h3>
            <ul className="space-y-2 font-mono text-sm">
              <li>
                <span className="text-gray-400">Smart Contract</span>
              </li>
              <li>
                <span className="text-gray-400">GitHub</span>
              </li>
              <li>
                <span className="text-gray-400">Whitepaper</span>
              </li>
              <li>
                <span className="text-gray-400">Contact</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-6 border-t border-green-500/30">
          <p className="text-center text-sm text-gray-500 font-mono">
            &copy; {currentYear} ACID MUTTZ. All rights reserved. 
            <br />
            Not financial advice. DYOR. Mutations may cause side effects.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
