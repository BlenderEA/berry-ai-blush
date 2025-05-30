
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-black text-green-400 flex items-center justify-center font-mono">
      <div className="text-center">
        <div className="mb-8">
          <h1 className="text-6xl md:text-8xl font-bold mb-4 glitch-text">404</h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-6">
            MUTATION NOT FOUND
          </p>
          <p className="text-gray-400 mb-8">
            This specimen has escaped the lab...
          </p>
        </div>
        
        <Link to="/">
          <Button className="acid-button">
            RETURN TO LAB
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
