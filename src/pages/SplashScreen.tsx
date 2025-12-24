import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import jyothiLogo from '@/assets/jyothi-logo.png';

const SplashScreen: React.FC = () => {
  const navigate = useNavigate();
  const [showLogo, setShowLogo] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Show logo with animation
    const showTimer = setTimeout(() => setShowLogo(true), 200);
    
    // Start fade out
    const fadeTimer = setTimeout(() => setFadeOut(true), 2500);
    
    // Navigate to language selection
    const navTimer = setTimeout(() => navigate('/select-language'), 3000);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(fadeTimer);
      clearTimeout(navTimer);
    };
  }, [navigate]);

  return (
    <div 
      className={`min-h-screen bg-primary flex items-center justify-center transition-opacity duration-500 ${
        fadeOut ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <div 
        className={`flex flex-col items-center transition-all duration-700 ${
          showLogo ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
        }`}
      >
        {/* Logo container with cream circle background */}
        <div className="w-72 h-72 md:w-80 md:h-80 rounded-full bg-cream flex items-center justify-center shadow-2xl">
          <img 
            src={jyothiLogo} 
            alt="Jyothi" 
            className="w-64 h-64 md:w-72 md:h-72 object-contain"
          />
        </div>
        
        {/* App tagline */}
        <p className="mt-8 text-primary-foreground text-xl md:text-2xl font-medium animate-pulse-soft">
          Healthcare for Every Woman
        </p>
      </div>
    </div>
  );
};

export default SplashScreen;
