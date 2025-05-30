
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navLinks = [
    { name: 'Lore', path: '/lore' },
    { name: 'Mutants', path: '/mutants' },
    { name: 'Lab Access', path: '/lab' },
    { name: 'Prophecies', path: '/prophecies' },
    { name: 'The Pack', path: '/pack' },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-black/90 shadow-lg backdrop-blur-lg border-b border-green-500/30' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <span className="text-2xl font-bold text-green-400 font-mono glitch-text">
            ACID<span className="text-pink-500">MUTTZ</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`transition-colors duration-300 font-medium uppercase tracking-wider ${
                isActive(link.path)
                  ? 'text-green-400 glow-green'
                  : 'text-gray-300 hover:text-green-400'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <a 
            href="https://twitter.com/acidmuttz" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-green-400 transition-colors"
          >
            X
          </a>
        </nav>

        {/* Mint Button */}
        <div className="hidden md:block">
          <Button className="acid-button">
            MINT NOW
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Menu"
            className="text-green-400 hover:bg-green-500/20"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed top-20 left-0 right-0 bg-black/95 shadow-lg z-40 border-t border-green-500/30">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`py-3 px-4 rounded-md transition-colors duration-300 uppercase tracking-wider ${
                  isActive(link.path)
                    ? 'bg-green-500/20 text-green-400 glow-green'
                    : 'text-gray-300 hover:bg-green-500/10 hover:text-green-400'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Button className="acid-button mt-4">
              MINT NOW
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
